(function () {
  'use strict';

  /* ---------- helpers ---------- */
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === 'class') el.className = v;
        else if (k === 'html') el.innerHTML = v;
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
        else if (v === true) el.setAttribute(k, '');
        else el.setAttribute(k, v);
      });
    }
    var kids = Array.prototype.slice.call(arguments, 2);
    (function add(list) {
      list.forEach(function (c) {
        if (c == null || c === false) return;
        if (Array.isArray(c)) return add(c);
        el.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
      });
    })(kids);
    return el;
  }

  var store = {
    get: function (k, d) {
      try { var v = localStorage.getItem('dse:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem('dse:' + k, JSON.stringify(v)); } catch (e) { /* ignore */ }
    }
  };

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function speak(text) {
    try {
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'es-ES';
      u.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  function bar(pct) {
    return h('div', { class: 'progress', role: 'progressbar', 'aria-valuenow': String(Math.round(pct)), 'aria-valuemin': '0', 'aria-valuemax': '100' },
      h('i', { style: 'width:' + Math.max(0, Math.min(100, pct)) + '%' }));
  }

  var timers = [];
  var leaveFns = [];
  function onLeave(fn) { leaveFns.push(fn); }
  function cleanup() {
    timers.forEach(clearInterval); timers = [];
    leaveFns.forEach(function (f) { try { f(); } catch (e) { /* ignore */ } });
    leaveFns = [];
  }

  var lastTA = null;

  var VOCAB = window.VOCAB || [];
  var EXPRESSIONS = window.EXPRESSIONS || [];
  var GRAMMAR = window.GRAMMAR || [];
  var CONNECTORS = window.CONNECTORS || [];
  var READINGS = window.READINGS || [];
  var ESSAYS = window.ESSAYS || [];
  var COMPREHENSION = window.COMPREHENSION || [];

  var NAV = [
    ['home', '🏠 시작하기'],
    ['r1', '📖 지문 1'],
    ['r2', '📖 지문 2'],
    ['r3', '📖 지문 3'],
    ['vocab', '🔤 어휘'],
    ['expr', '💬 표현·문법'],
    ['essays', '✍️ 에세이 10문제'],
    ['quiz', '🎯 퀴즈'],
    ['help', '🧰 작문 도우미']
  ];

  /* ---------- special character bar ---------- */
  document.addEventListener('focusin', function (e) {
    if (e.target && e.target.tagName === 'TEXTAREA') lastTA = e.target;
  });

  function insertChar(c) {
    var ta = lastTA;
    if (!ta || !document.body.contains(ta)) return;
    var s = ta.selectionStart, e = ta.selectionEnd;
    ta.value = ta.value.slice(0, s) + c + ta.value.slice(e);
    ta.selectionStart = ta.selectionEnd = s + c.length;
    ta.focus();
    ta.dispatchEvent(new Event('input'));
  }

  function charBar() {
    var chars = ['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ', '¿', '¡', '«', '»', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ'];
    var wrap = h('div', { class: 'charbar', 'aria-label': '스페인어 특수문자 입력' });
    chars.forEach(function (c) {
      wrap.appendChild(h('button', {
        type: 'button',
        title: c,
        onmousedown: function (e) { e.preventDefault(); },
        onclick: function () { insertChar(c); }
      }, c));
    });
    return wrap;
  }

  /* ---------- writing pad ---------- */
  function copyText(text, btn) {
    function done() {
      var old = btn.textContent;
      btn.textContent = '복사됨 ✓';
      setTimeout(function () { btn.textContent = old; }, 1400);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  }
  function fallbackCopy(text) {
    var t = h('textarea', { style: 'position:fixed;opacity:0' });
    t.value = text;
    document.body.appendChild(t);
    t.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    document.body.removeChild(t);
  }

  function writingPad(key, withTimer) {
    var ta = h('textarea', { class: 'pad', rows: '12', spellcheck: 'false', lang: 'es', placeholder: '여기에 스페인어로 에세이를 써 보세요… (자동 저장됩니다)' });
    ta.value = store.get('pad:' + key, '');
    var count = h('span', { class: 'count' });
    function upd() {
      var words = (ta.value.trim().match(/\S+/g) || []).length;
      count.textContent = words + ' 단어 · ' + ta.value.length + ' 글자';
    }
    ta.addEventListener('input', function () { store.set('pad:' + key, ta.value); upd(); });
    ta.addEventListener('focus', function () { lastTA = ta; });
    upd();

    var bar1 = h('div', { class: 'pad-bar' });
    if (withTimer) {
      var total = 30 * 60, left = total, id = null;
      var tm = h('span', { class: 'timer' }, '30:00');
      var startBtn = h('button', { type: 'button', class: 'btn small' }, '⏱ 30분 타이머 시작');
      function fmt(s) { var m = Math.floor(s / 60), r = s % 60; return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r; }
      startBtn.addEventListener('click', function () {
        if (id) {
          clearInterval(id); id = null; startBtn.textContent = '⏱ 다시 시작';
          return;
        }
        if (left <= 0) left = total;
        startBtn.textContent = '⏸ 일시정지';
        id = setInterval(function () {
          left--;
          tm.textContent = fmt(Math.max(left, 0));
          tm.classList.toggle('warn', left <= 300);
          if (left <= 0) { clearInterval(id); id = null; startBtn.textContent = '⏱ 다시 시작'; tm.textContent = '시간 종료!'; }
        }, 1000);
        timers.push(id);
      });
      bar1.appendChild(tm);
      bar1.appendChild(startBtn);
    }
    bar1.appendChild(count);
    bar1.appendChild(h('span', { class: 'spacer' }));
    var copyBtn = h('button', { type: 'button', class: 'btn small' }, '📋 복사');
    copyBtn.addEventListener('click', function () { copyText(ta.value, copyBtn); });
    var clearBtn = h('button', { type: 'button', class: 'btn small' }, '지우기');
    clearBtn.addEventListener('click', function () {
      if (ta.value && !window.confirm('작성한 글을 모두 지울까요?')) return;
      ta.value = ''; store.set('pad:' + key, ''); upd();
    });
    bar1.appendChild(copyBtn);
    bar1.appendChild(clearBtn);

    return h('div', null, charBar(), ta, bar1);
  }

  /* ---------- views ---------- */
  function viewHome() {
    var vk = store.get('vocabKnown', {});
    var ek = store.get('exprKnown', {});
    var best = store.get('best', {});
    var vKnown = VOCAB.filter(function (v) { return vk[v.es]; }).length;
    var eKnown = EXPRESSIONS.filter(function (v) { return ek[v.es]; }).length;
    var bestKeys = ['comp', 'vocab', 'expr'];
    var bestVals = bestKeys.map(function (k) { return best[k] != null ? best[k] + '%' : '—'; });

    var wrap = h('div');
    wrap.appendChild(h('section', { class: 'hero' },
      h('h1', null, '스페인어 에세이 시험, 이 사이트로 한 번에 정리!'),
      h('p', null, '교육의 가치(Savater) · 올해의 교사(Costa) 세 지문을 영어·한글로 풀어 읽고, 핵심 어휘와 표현을 익힌 뒤, 예상 에세이 10문제를 직접 써 볼 수 있습니다.'),
      h('div', { class: 'row' },
        h('a', { class: 'btn accent', href: '#r1' }, '지문부터 읽기 →'),
        h('a', { class: 'btn', href: '#essays' }, '에세이 10문제 바로가기'),
        h('a', { class: 'btn', href: '#quiz' }, '퀴즈로 점검')
      )
    ));

    wrap.appendChild(h('div', { class: 'grid three' },
      h('div', { class: 'card stat' }, h('b', null, String(READINGS.length)), '지문 번역 노트'),
      h('div', { class: 'card stat' }, h('b', null, String(VOCAB.length + EXPRESSIONS.length)), '어휘 + 표현'),
      h('div', { class: 'card stat' }, h('b', null, String(ESSAYS.length)), '예상 에세이 문제')
    ));

    wrap.appendChild(h('h2', null, '🗓 오늘 밤 추천 학습 순서'));
    var plan = h('ul', { class: 'plan clean' });
    [
      ['지문 1·2·3 번역 노트 정독 (“번역 가리기”로 스스로 테스트)', '약 30분'],
      ['어휘 플래시카드 — 모르는 단어만 반복', '약 30분'],
      ['표현·문법·연결어 훑기 (lo + 형용사, 접속법, Sin A no hay B)', '약 20분'],
      ['에세이 1·3·4·10번은 개요 → 직접 작성 → 모범답안과 비교', '약 60분'],
      ['퀴즈로 이해도 확인, 틀린 문제 복습', '약 15분'],
      ['시험 아침: 작문 도우미의 체크리스트와 연결어만 다시 보기', '약 10분']
    ].forEach(function (p) {
      plan.appendChild(h('li', null, h('span', null, p[0]), h('span', { class: 'time' }, p[1])));
    });
    wrap.appendChild(plan);

    wrap.appendChild(h('h2', { style: 'margin-top:22px' }, '📊 내 진행 상황'));
    wrap.appendChild(h('div', { class: 'grid two' },
      h('div', { class: 'card' },
        h('p', null, h('b', null, '어휘 '), vKnown + ' / ' + VOCAB.length + ' 암기'),
        bar(VOCAB.length ? (vKnown / VOCAB.length) * 100 : 0)),
      h('div', { class: 'card' },
        h('p', null, h('b', null, '표현 '), eKnown + ' / ' + EXPRESSIONS.length + ' 암기'),
        bar(EXPRESSIONS.length ? (eKnown / EXPRESSIONS.length) * 100 : 0)),
      h('div', { class: 'card' },
        h('p', null, h('b', null, '퀴즈 최고 점수')),
        h('p', { class: 'muted small' }, '읽기 이해 ' + bestVals[0] + ' · 어휘 ' + bestVals[1] + ' · 표현 ' + bestVals[2]))
    ));

    wrap.appendChild(h('h2', { style: 'margin-top:22px' }, '🎯 에세이 시험 핵심 전략'));
    wrap.appendChild(h('div', { class: 'grid two' },
      h('div', { class: 'card tint-red' },
        h('h3', null, '이 세 지문을 한 문장으로'),
        h('p', null, '교육의 목표는 취업이라는 “도구”가 아니라 “인간성을 가꾸는 것(cultivar la humanidad)”이며, 그 전수는 권위와 규율을 갖춘 “교사”를 통해 이루어진다 — 그리고 Costa의 학교는 기술을 쓰되 교사가 이끈 좋은 예다.')),
      h('div', { class: 'card tint-blue' },
        h('h3', null, '고득점 공식'),
        h('ul', { class: 'notes' },
          h('li', null, '입장을 서론에서 분명히 (한 문장 thesis)'),
          h('li', null, '지문 근거는 “Según Savater,…” 로 출처 표시'),
          h('li', null, '반론을 한 번 인정하고 재반박'),
          h('li', null, '연결어(Sin embargo, En cambio, Por eso…) 5개 이상'),
          h('li', null, '접속법·수동의 se·lo + 형용사 구문 포함'))),
      h('div', { class: 'card' },
        h('h3', null, '이 사이트 사용법'),
        h('p', { class: 'small' }, '글자 크기가 작으면 브라우저 확대를 쓰세요. 작성한 글과 암기 체크는 이 브라우저에 자동 저장됩니다. 스페인어 단어 옆 🔊 버튼으로 발음을 들을 수 있습니다(기기에 스페인어 음성이 있을 때).')),
      h('div', { class: 'card' },
        h('h3', null, '꼭 지킬 것'),
        h('p', { class: 'small' }, '모범답안은 “참고용”입니다. 그대로 외워서 쓰기보다 구조와 표현을 가져와서 자기 말로 바꿔 쓰는 연습을 하세요. 교재의 원문은 번역 노트와 대조하며 읽으면 가장 효과적입니다.'))
    ));
    return wrap;
  }

  /* ----- reading ----- */
  function viewReading(id) {
    var R = READINGS.filter(function (r) { return r.id === id; })[0];
    if (!R) return h('p', null, '지문을 찾을 수 없습니다.');
    var st = Object.assign({ en: true, ko: true, cover: false }, store.get('readCtl', {}));
    var wrap = h('div', { class: 'page' });

    function apply() {
      wrap.classList.toggle('hide-en', !st.en);
      wrap.classList.toggle('hide-ko', !st.ko);
      wrap.classList.toggle('cover', !!st.cover);
      $$('.tr', wrap).forEach(function (el) { el.classList.remove('shown'); });
      $$('button[data-k]', wrap).forEach(function (b) { b.setAttribute('aria-pressed', st[b.getAttribute('data-k')] ? 'true' : 'false'); });
      store.set('readCtl', st);
    }
    function toggleBtn(k, label) {
      return h('button', { type: 'button', class: 'btn small', 'data-k': k, onclick: function () { st[k] = !st[k]; apply(); } }, label);
    }

    wrap.appendChild(h('div', { class: 'reading-head' },
      h('span', { class: 'tag' }, R.tab),
      h('h1', { lang: 'es', style: 'margin-top:8px' }, R.es_title),
      h('p', { class: 'lead' }, R.ko_title),
      h('p', { class: 'muted', lang: 'en' }, R.en_title),
      h('div', { class: 'meta' }, h('span', null, R.source))
    ));

    wrap.appendChild(h('div', { class: 'card tint-blue' },
      h('h3', null, '한눈에 보기'),
      h('p', null, R.summary_ko),
      h('p', { class: 'muted', lang: 'en' }, R.summary_en),
      h('div', { class: 'chips' }, R.themes.map(function (t) { return h('span', { class: 'chip' }, t); }))
    ));

    wrap.appendChild(h('div', { class: 'toolbar' },
      toggleBtn('en', '🇬🇧 영어 보기'),
      toggleBtn('ko', '🇰🇷 한글 보기'),
      toggleBtn('cover', '🙈 번역 가리기(셀프 테스트)'),
      h('span', { class: 'muted small' }, '가리기를 켜고 번역 문장을 클릭하면 확인할 수 있어요.')
    ));

    R.sections.forEach(function (s) {
      var card = h('section', { class: 'card sec' },
        h('h3', null, s.label),
        h('div', { class: 'tr tr-en', onclick: function (e) { e.currentTarget.classList.toggle('shown'); } },
          h('span', { class: 'lang' }, 'ENGLISH'), h('p', { lang: 'en' }, s.en)),
        h('div', { class: 'tr tr-ko', onclick: function (e) { e.currentTarget.classList.toggle('shown'); } },
          h('span', { class: 'lang' }, '한국어'), h('p', null, s.ko))
      );
      if (s.notes && s.notes.length) {
        var ul = h('ul', { class: 'notes' });
        s.notes.forEach(function (n) {
          var m = n.match(/^(«[^»]+»)(.*)$/);
          ul.appendChild(m ? h('li', null, h('b', { lang: 'es' }, m[1]), m[2]) : h('li', null, n));
        });
        card.appendChild(h('details', { class: 'acc', style: 'margin-top:10px' },
          h('summary', null, '🔍 표현·문법 포인트 (' + s.notes.length + ')'),
          h('div', { class: 'acc-body' }, ul)));
      }
      wrap.appendChild(card);
    });

    wrap.appendChild(h('div', { class: 'card' }, h('h3', null, '📌 이 지문의 어휘 메모'), h('p', null, R.glossary_note)));

    var idx = READINGS.indexOf(R);
    var prev = READINGS[idx - 1], next = READINGS[idx + 1];
    wrap.appendChild(h('div', { class: 'pager' },
      prev ? h('a', { class: 'btn', href: '#' + prev.id }, '← ' + prev.tab) : h('span'),
      next ? h('a', { class: 'btn primary', href: '#' + next.id }, next.tab + ' →') : h('a', { class: 'btn primary', href: '#vocab' }, '어휘 학습으로 →')
    ));
    apply();
    return wrap;
  }

  /* ----- vocab ----- */
  function viewVocab() {
    var vk = store.get('vocabKnown', {});
    var cats = ['전체'].concat(VOCAB.reduce(function (a, v) { if (a.indexOf(v.cat) < 0) a.push(v.cat); return a; }, [])).concat(['모르는 단어만']);
    var state = { cat: '전체', q: '', mode: 'list' };
    var wrap = h('div');
    wrap.appendChild(h('h1', null, '🔤 핵심 어휘 ' + VOCAB.length + '개'));
    wrap.appendChild(h('p', { class: 'lead' }, '지문에서 형광펜으로 표시된 단어와 에세이에 꼭 필요한 단어들입니다. 예문은 학습용으로 새로 만든 문장이에요.'));

    var counter = h('span', { class: 'muted small' });
    var chips = h('div', { class: 'chips' });
    var list = h('div');
    var search = h('input', { type: 'search', placeholder: '단어/뜻 검색…', 'aria-label': '검색' });
    search.addEventListener('input', function () { state.q = search.value.trim().toLowerCase(); draw(); });

    var listBtn = h('button', { type: 'button', class: 'btn small', onclick: function () { state.mode = 'list'; draw(); } }, '📋 목록');
    var cardBtn = h('button', { type: 'button', class: 'btn small', onclick: function () { state.mode = 'cards'; draw(); } }, '🃏 플래시카드');

    wrap.appendChild(h('div', { class: 'toolbar' }, search, listBtn, cardBtn, h('span', { class: 'spacer' }), counter));
    wrap.appendChild(chips);
    wrap.appendChild(list);

    function filtered() {
      return VOCAB.filter(function (v) {
        if (state.cat === '모르는 단어만' && vk[v.es]) return false;
        if (state.cat !== '전체' && state.cat !== '모르는 단어만' && v.cat !== state.cat) return false;
        if (state.q) {
          var hay = (v.es + ' ' + v.ko + ' ' + v.en + ' ' + v.ex).toLowerCase();
          if (hay.indexOf(state.q) < 0) return false;
        }
        return true;
      });
    }
    function updCounter() {
      var k = VOCAB.filter(function (v) { return vk[v.es]; }).length;
      counter.textContent = '암기 ' + k + ' / ' + VOCAB.length;
    }

    function wordCard(v) {
      var cb = h('input', { type: 'checkbox', checked: !!vk[v.es] });
      cb.addEventListener('change', function () { vk[v.es] = cb.checked; store.set('vocabKnown', vk); updCounter(); });
      return h('div', { class: 'card word' },
        h('div', null,
          h('span', { class: 'es', lang: 'es' }, v.es), h('span', { class: 'pos' }, v.pos), ' ',
          h('button', { type: 'button', class: 'icon-btn', title: '발음 듣기', 'aria-label': v.es + ' 발음 듣기', onclick: function () { speak(v.es); } }, '🔊')),
        h('label', { class: 'check' }, cb, '알아요'),
        h('div', { class: 'ko' }, v.ko),
        h('div', { class: 'en', lang: 'en' }, v.en),
        h('div', { class: 'ex', lang: 'es' }, v.ex, h('span', { class: 'exko' }, v.exko)),
        h('div', { class: 'tip' }, v.tip)
      );
    }

    function flash(items) {
      var deck = items.slice(), i = 0, flipped = false, dir = store.get('fcDir', 'es');
      var box = h('div', { class: 'fc-wrap' });
      function draw2() {
        box.replaceChildren();
        if (!deck.length) { box.appendChild(h('div', { class: 'card' }, '해당 조건의 단어가 없습니다.')); return; }
        var v = deck[i];
        var front, back;
        if (dir === 'es') {
          front = [h('div', { class: 'big', lang: 'es' }, v.es), h('div', { class: 'muted' }, v.pos), h('div', { class: 'muted small' }, '카드를 눌러 뜻 확인 (Space)')];
          back = [h('div', { class: 'big ko' }, v.ko), h('div', { class: 'en', lang: 'en' }, v.en), h('div', { class: 'ex-line', lang: 'es' }, v.ex, h('span', { class: 'k' }, v.exko)), h('div', { class: 'muted small' }, v.tip)];
        } else {
          front = [h('div', { class: 'big ko' }, v.ko), h('div', { class: 'muted small' }, '스페인어로 말해 본 뒤 카드를 누르세요')];
          back = [h('div', { class: 'big', lang: 'es' }, v.es), h('div', { class: 'muted' }, v.pos + ' · ' + v.en), h('div', { class: 'ex-line', lang: 'es' }, v.ex, h('span', { class: 'k' }, v.exko))];
        }
        var face = h('div', { class: 'fc-face' + (flipped ? ' back' : ''), role: 'button', tabindex: '0', onclick: function () { flipped = !flipped; draw2(); } }, flipped ? back : front);
        box.appendChild(h('div', { class: 'fc-count' }, (i + 1) + ' / ' + deck.length));
        box.appendChild(h('div', { class: 'fc' }, face));
        var ctl = h('div', { class: 'row', style: 'justify-content:center;margin-top:12px' },
          h('button', { type: 'button', class: 'btn', onclick: function () { go(-1); } }, '◀ 이전'),
          h('button', { type: 'button', class: 'btn', onclick: function () { speak(v.es); } }, '🔊'),
          h('button', { type: 'button', class: 'btn', onclick: function () { go(1); } }, '다음 ▶'));
        box.appendChild(ctl);
        box.appendChild(h('div', { class: 'row', style: 'justify-content:center;margin-top:10px' },
          h('button', { type: 'button', class: 'btn small', onclick: function () { vk[v.es] = true; store.set('vocabKnown', vk); updCounter(); go(1); } }, '✅ 알아요'),
          h('button', { type: 'button', class: 'btn small', onclick: function () { vk[v.es] = false; store.set('vocabKnown', vk); updCounter(); go(1); } }, '🔁 다시 볼래요'),
          h('button', { type: 'button', class: 'btn small', onclick: function () { deck = shuffle(deck); i = 0; flipped = false; draw2(); } }, '🔀 섞기'),
          h('button', { type: 'button', class: 'btn small', onclick: function () { dir = dir === 'es' ? 'ko' : 'es'; store.set('fcDir', dir); flipped = false; draw2(); } }, dir === 'es' ? '방향: ES→KO' : '방향: KO→ES')));
      }
      function go(d) { i = (i + d + deck.length) % deck.length; flipped = false; draw2(); }
      function key(e) {
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
        if (e.key === 'ArrowRight') go(1);
        else if (e.key === 'ArrowLeft') go(-1);
        else if (e.key === ' ') { e.preventDefault(); flipped = !flipped; draw2(); }
      }
      document.addEventListener('keydown', key);
      onLeave(function () { document.removeEventListener('keydown', key); });
      draw2();
      return box;
    }

    function draw() {
      chips.replaceChildren();
      cats.forEach(function (c) {
        chips.appendChild(h('button', { type: 'button', class: 'chip' + (state.cat === c ? ' on' : ''), onclick: function () { state.cat = c; draw(); } }, c));
      });
      listBtn.setAttribute('aria-pressed', state.mode === 'list' ? 'true' : 'false');
      cardBtn.setAttribute('aria-pressed', state.mode === 'cards' ? 'true' : 'false');
      list.replaceChildren();
      var items = filtered();
      if (state.mode === 'cards') {
        // remove any previous key handler by re-registering in flash (onLeave handles removal on route change)
        list.appendChild(flash(items));
      } else {
        if (!items.length) list.appendChild(h('div', { class: 'card' }, '검색 결과가 없습니다.'));
        items.forEach(function (v) { list.appendChild(wordCard(v)); });
      }
      updCounter();
    }
    draw();
    return wrap;
  }

  /* ----- expressions / grammar / connectors ----- */
  function viewExpr() {
    var ek = store.get('exprKnown', {});
    var tab = store.get('exprTab', 'expr');
    var wrap = h('div');
    wrap.appendChild(h('h1', null, '💬 표현 · 문법 · 연결어'));
    wrap.appendChild(h('p', { class: 'lead' }, '에세이에서 바로 쓸 수 있는 숙어 표현, 지문에 나온 문법 포인트, 연결어를 모았습니다.'));
    var body = h('div');
    var tabs = h('div', { class: 'chips' });
    [['expr', '숙어·표현 ' + EXPRESSIONS.length], ['grammar', '문법 포인트 ' + GRAMMAR.length], ['conn', '연결어']].forEach(function (t) {
      tabs.appendChild(h('button', { type: 'button', class: 'chip' + (tab === t[0] ? ' on' : ''), onclick: function () { tab = t[0]; store.set('exprTab', tab); draw(); } }, t[1]));
    });
    wrap.appendChild(tabs);
    wrap.appendChild(body);

    function draw() {
      $$('button.chip', tabs).forEach(function (b, i) {
        b.classList.toggle('on', ['expr', 'grammar', 'conn'][i] === tab);
      });
      body.replaceChildren();
      if (tab === 'expr') {
        EXPRESSIONS.forEach(function (e) {
          var cb = h('input', { type: 'checkbox', checked: !!ek[e.es] });
          cb.addEventListener('change', function () { ek[e.es] = cb.checked; store.set('exprKnown', ek); });
          body.appendChild(h('div', { class: 'card word' },
            h('div', null, h('span', { class: 'es', lang: 'es' }, e.es), ' ',
              h('button', { type: 'button', class: 'icon-btn', 'aria-label': e.es + ' 발음 듣기', onclick: function () { speak(e.es); } }, '🔊')),
            h('label', { class: 'check' }, cb, '알아요'),
            h('div', { class: 'ko' }, e.ko),
            h('div', { class: 'en', lang: 'en' }, e.en),
            h('div', { class: 'ex', lang: 'es' }, e.ex, h('span', { class: 'exko' }, e.exko)),
            h('div', { class: 'tip' }, e.use)));
        });
      } else if (tab === 'grammar') {
        GRAMMAR.forEach(function (g, i) {
          var d = h('details', { class: 'acc' });
          if (i === 0) d.setAttribute('open', '');
          d.appendChild(h('summary', null, g.title));
          var b = h('div', { class: 'acc-body' }, h('p', null, g.explain));
          g.examples.forEach(function (ex) {
            b.appendChild(h('div', { class: 'ex-line', lang: 'es' }, ex[0], h('span', { class: 'k' }, ex[1])));
          });
          b.appendChild(h('p', { class: 'small', style: 'margin-top:10px' }, '💡 ' + g.tip));
          d.appendChild(b);
          body.appendChild(d);
        });
      } else {
        CONNECTORS.forEach(function (c) {
          var t = h('table', { class: 't' }, h('tr', null, h('th', null, '스페인어'), h('th', null, '뜻')));
          c.items.forEach(function (it) { t.appendChild(h('tr', null, h('td', { lang: 'es' }, it[0]), h('td', null, it[1]))); });
          body.appendChild(h('div', { class: 'card' }, h('h3', null, c.group), t));
        });
      }
    }
    draw();
    return wrap;
  }

  /* ----- essays ----- */
  function viewEssays() {
    var wrap = h('div');
    wrap.appendChild(h('h1', null, '✍️ 에세이 예상문제 ' + ESSAYS.length + '개'));
    wrap.appendChild(h('p', { class: 'lead' }, '순서: ① 문제 이해 → ② 개요 체크 → ③ 모범답안을 보지 않고 직접 쓰기(30분 타이머) → ④ 모범답안과 비교 → ⑤ 실수 포인트 확인'));

    var index = h('div', { class: 'essay-index' });
    ESSAYS.forEach(function (e) {
      index.appendChild(h('a', { href: '#essays', onclick: function (ev) {
        ev.preventDefault();
        var d = document.getElementById('essay-' + e.n);
        if (d) { d.setAttribute('open', ''); d.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      } }, h('b', null, '문제 ' + e.n), e.type.split(' (')[0]));
    });
    wrap.appendChild(index);

    ESSAYS.forEach(function (e) {
      var d = h('details', { class: 'acc', id: 'essay-' + e.n });
      d.appendChild(h('summary', null, h('span', { class: 'tag' }, '문제 ' + e.n), h('span', null, e.type), h('span', { class: 'muted small' }, e.level)));
      var b = h('div', { class: 'acc-body' });

      b.appendChild(h('div', { class: 'q-es', lang: 'es' }, e.es));
      b.appendChild(h('div', { class: 'q-tr' }, h('b', null, 'EN '), e.en));
      b.appendChild(h('div', { class: 'q-tr' }, h('b', null, 'KO '), e.ko));
      b.appendChild(h('p', { class: 'small', style: 'margin-top:12px' }, h('b', null, '🎯 출제 의도: '), e.intent));

      var ol = h('ul', { class: 'outline' });
      var olState = store.get('ol:' + e.n, {});
      e.outline.forEach(function (o, i) {
        var cb = h('input', { type: 'checkbox', checked: !!olState[i] });
        cb.addEventListener('change', function () { olState[i] = cb.checked; store.set('ol:' + e.n, olState); });
        ol.appendChild(h('li', null, h('label', null, cb, h('span', null, o))));
      });
      b.appendChild(h('h3', { style: 'margin-top:14px' }, '1) 개요 (쓴 항목은 체크)'));
      b.appendChild(ol);

      b.appendChild(h('h3', { style: 'margin-top:14px' }, '2) 쓸 만한 표현'));
      b.appendChild(h('div', { class: 'chips' }, e.phrases.map(function (p) { return h('span', { class: 'chip', lang: 'es' }, p); })));

      b.appendChild(h('h3', { style: 'margin-top:14px' }, '3) 직접 써 보기'));
      b.appendChild(writingPad('e' + e.n, true));

      var model = h('div', { style: 'display:none' });
      var koBox = h('div', { class: 'model-ko', style: 'display:none' });
      var paras = e.answer.split('\n\n');
      var parasKo = e.answer_ko.split('\n\n');
      var mBody = h('div', { class: 'card model', lang: 'es' });
      paras.forEach(function (p) { mBody.appendChild(h('p', null, p)); });
      mBody.appendChild(h('button', { type: 'button', class: 'btn small', onclick: function () { speak(e.answer.replace(/\n\n/g, ' ')); } }, '🔊 전체 듣기'));
      model.appendChild(mBody);
      parasKo.forEach(function (p) { koBox.appendChild(h('p', null, p)); });
      var koWrap = h('div', { class: 'card tint-blue' }, h('h3', null, '한글 번역'), koBox);
      koBox.style.display = 'block';
      koWrap.style.display = 'none';
      model.appendChild(koWrap);
      var wc = e.answer.split(/\s+/).length;
      var showBtn = h('button', { type: 'button', class: 'btn primary' }, '👀 모범답안 보기 (스페인어, 약 ' + wc + '단어)');
      var koBtn = h('button', { type: 'button', class: 'btn', style: 'display:none' }, '🇰🇷 한글 번역 보기');
      showBtn.addEventListener('click', function () {
        var open = model.style.display !== 'none';
        model.style.display = open ? 'none' : 'block';
        koBtn.style.display = open ? 'none' : 'inline-flex';
        showBtn.textContent = open ? '👀 모범답안 보기 (스페인어, 약 ' + wc + '단어)' : '🙈 모범답안 숨기기';
      });
      koBtn.addEventListener('click', function () {
        var open = koWrap.style.display !== 'none';
        koWrap.style.display = open ? 'none' : 'block';
        koBtn.textContent = open ? '🇰🇷 한글 번역 보기' : '🇰🇷 한글 번역 숨기기';
      });
      b.appendChild(h('h3', { style: 'margin-top:14px' }, '4) 모범답안과 비교'));
      b.appendChild(h('p', { class: 'small muted' }, '먼저 직접 써 본 뒤에 확인하세요. 그대로 외우기보다 구조와 표현을 가져와 자기 말로 바꿔 쓰는 것이 목표입니다.'));
      b.appendChild(h('div', { class: 'row' }, showBtn, koBtn));
      b.appendChild(model);

      b.appendChild(h('h3', { style: 'margin-top:14px' }, '5) 자주 하는 실수'));
      var ul = h('ul', { class: 'warn-box' });
      e.mistakes.forEach(function (m) { ul.appendChild(h('li', null, m)); });
      b.appendChild(ul);

      d.appendChild(b);
      wrap.appendChild(d);
    });
    return wrap;
  }

  /* ----- quiz ----- */
  function shuffleQ(q) {
    var correct = q.opts[q.a];
    var opts = shuffle(q.opts);
    return { q: q.q, opts: opts, a: opts.indexOf(correct), why: q.why, lang: q.lang };
  }

  function buildVocabQuiz(n) {
    var items = shuffle(VOCAB).slice(0, n);
    return items.map(function (v) {
      var toKo = Math.random() < 0.5;
      var key = toKo ? 'ko' : 'es';
      var others = shuffle(VOCAB.filter(function (o) { return o !== v && o[key] !== v[key]; })).slice(0, 3).map(function (o) { return o[key]; });
      var opts = [v[key]].concat(others);
      return shuffleQ({
        q: toKo ? '«' + v.es + '» 의 뜻은?' : '“' + v.ko + '” 을(를) 뜻하는 스페인어는?',
        opts: opts,
        a: 0,
        why: v.es + ' = ' + v.ko + ' · 예문: ' + v.ex + ' (' + v.exko + ')'
      });
    });
  }
  function buildExprQuiz(n) {
    var items = shuffle(EXPRESSIONS).slice(0, n);
    return items.map(function (v) {
      var others = shuffle(EXPRESSIONS.filter(function (o) { return o !== v && o.ko !== v.ko; })).slice(0, 3).map(function (o) { return o.ko; });
      return shuffleQ({
        q: '«' + v.es + '» 의 뜻은?',
        opts: [v.ko].concat(others),
        a: 0,
        why: v.es + ' = ' + v.ko + ' · 예문: ' + v.ex + ' (' + v.exko + ')'
      });
    });
  }

  function runQuiz(container, title, questions, bestKey, back) {
    var idx = 0, score = 0, wrongs = [];
    function render() {
      container.replaceChildren();
      if (idx >= questions.length) return result();
      var q = questions[idx];
      var box = h('div', { class: 'card' });
      box.appendChild(h('div', { class: 'row' }, h('span', { class: 'tag blue' }, title), h('span', { class: 'spacer' }), h('span', { class: 'muted' }, (idx + 1) + ' / ' + questions.length + ' · 점수 ' + score)));
      box.appendChild(bar((idx / questions.length) * 100));
      box.appendChild(h('div', { class: 'qz-q', style: 'margin-top:14px' }, q.q));
      var locked = false;
      var why = h('div');
      q.opts.forEach(function (o, i) {
        var btn = h('button', { type: 'button', class: 'qz-opt' }, o);
        btn.addEventListener('click', function () {
          if (locked) return;
          locked = true;
          var ok = i === q.a;
          if (ok) score++; else wrongs.push({ q: q.q, chosen: o, correct: q.opts[q.a], why: q.why });
          $$('.qz-opt', box).forEach(function (b, bi) {
            b.disabled = true;
            if (bi === q.a) b.classList.add('right');
            else if (bi === i) b.classList.add('wrong');
          });
          why.appendChild(h('div', { class: 'qz-why' }, h('b', null, ok ? '✅ 정답! ' : '❌ 아쉬워요. '), q.why));
          why.appendChild(h('div', { class: 'row', style: 'margin-top:10px' },
            h('button', { type: 'button', class: 'btn primary', onclick: function () { idx++; render(); } }, idx + 1 >= questions.length ? '결과 보기' : '다음 문제 →')));
        });
        box.appendChild(btn);
      });
      box.appendChild(why);
      container.appendChild(box);
    }
    function result() {
      var pct = Math.round((score / questions.length) * 100);
      var best = store.get('best', {});
      if (best[bestKey] == null || pct > best[bestKey]) { best[bestKey] = pct; store.set('best', best); }
      var msg = pct >= 90 ? '완벽해요! 이 상태로 시험 보면 됩니다 🎉' : pct >= 70 ? '좋아요! 틀린 문제만 복습해요 👍' : '괜찮아요, 지문 노트와 어휘를 한 번 더 보고 다시 도전! 💪';
      var box = h('div', { class: 'card' },
        h('div', { class: 'score-big' }, score + ' / ' + questions.length),
        h('p', { class: 'lead' }, pct + '점 · ' + msg),
        h('div', { class: 'row' },
          h('button', { type: 'button', class: 'btn primary', onclick: function () { back('retry'); } }, '🔁 다시 풀기'),
          h('button', { type: 'button', class: 'btn', onclick: function () { back('menu'); } }, '다른 퀴즈')));
      container.appendChild(box);
      if (wrongs.length) {
        container.appendChild(h('h2', null, '틀린 문제 복습'));
        wrongs.forEach(function (w) {
          container.appendChild(h('div', { class: 'card' },
            h('p', null, h('b', null, w.q)),
            h('p', { class: 'small' }, '내 답: ', h('span', { style: 'color:var(--bad)' }, w.chosen), ' → 정답: ', h('b', { style: 'color:var(--good)' }, w.correct)),
            h('p', { class: 'small muted' }, w.why)));
        });
      }
    }
    render();
  }

  function viewQuiz() {
    var wrap = h('div');
    wrap.appendChild(h('h1', null, '🎯 연습 퀴즈'));
    var area = h('div');
    wrap.appendChild(area);
    var best = store.get('best', {});

    var modes = [
      { k: 'comp', t: '📖 읽기 이해 퀴즈', d: '세 지문의 내용을 정확히 이해했는지 점검 (' + COMPREHENSION.length + '문제)', mk: function () { return shuffle(COMPREHENSION).map(shuffleQ); } },
      { k: 'vocab', t: '🔤 어휘 퀴즈', d: '스페인어 ↔ 한국어 뜻 고르기 (20문제, 매번 새로 출제)', mk: function () { return buildVocabQuiz(20); } },
      { k: 'expr', t: '💬 표현 퀴즈', d: '숙어·표현의 뜻 고르기 (10문제, 매번 새로 출제)', mk: function () { return buildExprQuiz(10); } }
    ];

    function menu() {
      area.replaceChildren();
      area.appendChild(h('p', { class: 'lead' }, '하나를 골라 시작하세요. 틀린 문제는 마지막에 해설과 함께 다시 보여 줍니다.'));
      var g = h('div', { class: 'grid three' });
      modes.forEach(function (m) {
        g.appendChild(h('div', { class: 'card' },
          h('h3', null, m.t), h('p', { class: 'small muted' }, m.d),
          h('p', { class: 'small' }, '최고 점수: ' + (best[m.k] != null ? best[m.k] + '%' : '—')),
          h('button', { type: 'button', class: 'btn primary', onclick: function () { start(m); } }, '시작하기')));
      });
      area.appendChild(g);
    }
    function start(m) {
      area.replaceChildren();
      var c = h('div');
      area.appendChild(c);
      runQuiz(c, m.t, m.mk(), m.k, function (what) {
        best = store.get('best', {});
        if (what === 'retry') start(m); else menu();
      });
    }
    menu();
    return wrap;
  }

  /* ----- help ----- */
  function viewHelp() {
    var wrap = h('div');
    wrap.appendChild(h('h1', null, '🧰 작문 도우미'));
    wrap.appendChild(h('p', { class: 'lead' }, '구조 템플릿, 자가 점검 체크리스트, 자유 연습 공간입니다.'));

    wrap.appendChild(h('div', { class: 'card tint-red' },
      h('h3', null, '5단락 에세이 구조'),
      (function () {
        var t = h('table', { class: 't' }, h('tr', null, h('th', null, '단락'), h('th', null, '역할'), h('th', null, '문장 틀 (스페인어)')));
        [
          ['① 서론', '주제 소개 + 입장(thesis)', 'En la actualidad, muchas personas piensan que… Sin embargo, creo que…'],
          ['② 본론 1', '첫째 논거 + 지문 근거', 'En primer lugar, según Savater,… Por ejemplo,…'],
          ['③ 본론 2', '둘째 논거 + 지문 근거', 'En segundo lugar,… Además, el caso de Costa demuestra que…'],
          ['④ 반론', '반대 의견 인정 + 재반박', 'Algunos podrían objetar que… Sin embargo, esto no es así porque…'],
          ['⑤ 결론', '입장 재확인 + 마무리', 'En conclusión,… Por todo lo anterior, la educación debe…']
        ].forEach(function (r) { t.appendChild(h('tr', null, h('td', null, r[0]), h('td', null, r[1]), h('td', { lang: 'es' }, r[2]))); });
        return t;
      })()));

    wrap.appendChild(h('div', { class: 'card' },
      h('h3', null, '채점 기준 자가 점검 (일반적인 예시)'),
      h('p', { class: 'small muted' }, '※ 실제 시험의 루브릭은 선생님이 알려 주신 기준을 우선하세요.'),
      (function () {
        var t = h('table', { class: 't' }, h('tr', null, h('th', null, '항목'), h('th', null, '이렇게 하면 높은 점수')));
        [
          ['내용 · 이해', '질문에 정확히 답하고, 지문 근거(Según…)를 2개 이상 사용'],
          ['구성 · 논리', '서론–본론–결론, 연결어로 흐름 연결, 반론 처리'],
          ['어휘 · 표현', '지문 어휘(cultivar, herencia, intrínseco…)와 숙어 활용'],
          ['문법 · 정확성', '성·수 일치, 동사 시제, 접속법, 악센트, ¿ ¡ 부호']
        ].forEach(function (r) { t.appendChild(h('tr', null, h('td', null, h('b', null, r[0])), h('td', null, r[1]))); });
        return t;
      })()));

    var chk = store.get('checklist', {});
    var items = [
      '입장(thesis)이 서론에 분명히 있다',
      '지문 근거를 “Según Savater / Costa”로 표시했다',
      '지문 3개 중 최소 2개를 사용했다 (종합 문제는 3개 모두)',
      '연결어를 5개 이상 썼다 (Sin embargo, Además, Por eso…)',
      '접속법을 한 번 이상 썼다 (para que…, que + 접속법)',
      '반론을 인정하고 재반박했다',
      'ser / estar, por / para를 다시 확인했다',
      '명사–형용사 성·수 일치를 확인했다',
      '악센트(á é í ó ú)와 ñ, ¿ ¡ 를 확인했다',
      '결론에서 새로운 논점을 꺼내지 않았다',
      '요구된 분량·요구 사항(예: 해결책 두 가지)을 충족했다'
    ];
    var ul = h('ul', { class: 'outline' });
    var prog = h('p', { class: 'small muted' });
    function updProg() {
      var n = items.filter(function (_, i) { return chk[i]; }).length;
      prog.textContent = '체크 ' + n + ' / ' + items.length;
    }
    items.forEach(function (t, i) {
      var cb = h('input', { type: 'checkbox', checked: !!chk[i] });
      cb.addEventListener('change', function () { chk[i] = cb.checked; store.set('checklist', chk); updProg(); });
      ul.appendChild(h('li', null, h('label', null, cb, h('span', null, t))));
    });
    wrap.appendChild(h('div', { class: 'card' },
      h('h3', null, '제출 전 체크리스트'), ul, prog,
      h('button', { type: 'button', class: 'btn small', onclick: function () { chk = {}; store.set('checklist', chk); render(); } }, '체크 초기화')));
    updProg();

    wrap.appendChild(h('div', { class: 'card' },
      h('h3', null, '인용·출처 표시 틀'),
      h('ul', { class: 'notes', lang: 'es' },
        h('li', null, 'Según Fernando Savater, la educación…'),
        h('li', null, 'Savater sostiene / afirma / señala que…'),
        h('li', null, 'Como explica el filósofo en su entrevista de 2010,…'),
        h('li', null, 'En el texto sobre el «docente del año», Costa explica que…'),
        h('li', null, 'Esto se relaciona con la idea de Savater de que…'))));

    wrap.appendChild(h('div', { class: 'card' },
      h('h3', null, '✏️ 자유 연습 공간'),
      h('p', { class: 'small muted' }, '어떤 주제든 연습해 보세요. 자동 저장됩니다.'),
      writingPad('free', true)));
    return wrap;
  }

  /* ---------- router ---------- */
  function render() {
    cleanup();
    var id = (location.hash || '#home').replace(/^#/, '') || 'home';
    var view;
    if (id === 'home') view = viewHome();
    else if (/^r\d+$/.test(id)) view = viewReading(id);
    else if (id === 'vocab') view = viewVocab();
    else if (id === 'expr') view = viewExpr();
    else if (id === 'essays') view = viewEssays();
    else if (id === 'quiz') view = viewQuiz();
    else if (id === 'help') view = viewHelp();
    else view = viewHome();
    var main = $('#main');
    main.replaceChildren(view);
    $$('#nav a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
    window.scrollTo(0, 0);
  }

  function init() {
    var nav = $('#nav');
    NAV.forEach(function (n) { nav.appendChild(h('a', { href: '#' + n[0] }, n[1])); });
    window.addEventListener('hashchange', render);
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
