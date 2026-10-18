// 어휘 · 표현 · 문법 · 연결어 데이터 (예문은 학습용으로 새로 만든 문장입니다)
window.VOCAB = [
  // ---------- 교육 일반 ----------
  { es: "cultivar", pos: "v.", ko: "가꾸다, 기르다, 함양하다", en: "to cultivate", cat: "교육 일반", ex: "La escuela debe cultivar el pensamiento crítico.", exko: "학교는 비판적 사고를 길러 주어야 한다.", tip: "농사(cultivar la tierra)와 정신(cultivar la mente) 모두에 쓰입니다. 지문의 핵심 동사!" },
  { es: "la humanidad", pos: "n.f.", ko: "인류; 인간성, 인간다움", en: "humanity; humaneness", cat: "교육 일반", ex: "Leer novelas nos enseña humanidad.", exko: "소설을 읽는 것은 우리에게 인간다움을 가르쳐 준다.", tip: "문맥에 따라 '인류 전체'와 '인간다움' 두 뜻이 있습니다. Savater는 후자의 의미." },
  { es: "la enseñanza", pos: "n.f.", ko: "가르침, 교육(활동)", en: "teaching, instruction", cat: "교육 일반", ex: "La enseñanza pública debería ser gratuita.", exko: "공교육은 무료여야 한다.", tip: "educación(교육 전반, 양육 포함)과 달리 가르치는 행위·제도에 초점. enseñar(가르치다)의 명사." },
  { es: "el aula", pos: "n.f.", ko: "교실", en: "classroom", cat: "교육 일반", ex: "En el aula todos deben respetar las reglas.", exko: "교실에서는 모두가 규칙을 지켜야 한다.", tip: "여성명사지만 a 강세 때문에 el aula, 복수는 las aulas. 형용사는 여성형: el aula pequeña." },
  { es: "la deserción escolar", pos: "n.f.", ko: "학업 중도 포기, 중퇴", en: "school dropout", cat: "교육 일반", ex: "La deserción escolar es mayor en zonas rurales.", exko: "학업 중도 포기는 농촌 지역에서 더 높다.", tip: "'desertar'(이탈하다)에서 온 말. 사람은 el desertor / el estudiante que abandona los estudios." },
  { es: "abandonar", pos: "v.", ko: "포기하다, 그만두다, 버리다", en: "to abandon, to give up", cat: "교육 일반", ex: "Muchos jóvenes abandonan los estudios para trabajar.", exko: "많은 젊은이들이 일하기 위해 학업을 그만둔다.", tip: "abandonar + 목적어(직접). 'dejar los estudios'와 비슷하지만 더 격식 있고 강한 느낌." },
  { es: "el rendimiento", pos: "n.m.", ko: "성과, 성적, 효율", en: "performance, output", cat: "교육 일반", ex: "Dormir bien mejora el rendimiento escolar.", exko: "잘 자면 학업 성취도가 좋아진다.", tip: "rendimiento académico = 학업 성취도. 지문에서는 '즉각적인 성과'의 뜻." },
  { es: "la herramienta", pos: "n.f.", ko: "도구", en: "tool", cat: "교육 일반", ex: "Internet es una herramienta, no un maestro.", exko: "인터넷은 도구이지 스승이 아니다.", tip: "Savater: 교육 = 도구(herramienta)가 아니라 목적(fin). 대비 구조에 필수." },
  { es: "intrínseco/a", pos: "adj.", ko: "내재적인, 본질적인", en: "intrinsic", cat: "교육 일반", ex: "El arte tiene un valor intrínseco.", exko: "예술은 본질적인 가치를 지닌다.", tip: "반의어: extrínseco/a(외재적), instrumental. 에세이 핵심어!" },
  { es: "meramente", pos: "adv.", ko: "단지, 순전히", en: "merely, purely", cat: "교육 일반", ex: "No es meramente un trabajo, es una vocación.", exko: "그것은 단순한 일이 아니라 소명이다.", tip: "mero/a(단순한)의 부사형. solamente, simplemente보다 격식체." },
  { es: "valioso/a", pos: "adj.", ko: "가치 있는, 소중한", en: "valuable", cat: "교육 일반", ex: "Aprender un idioma es una experiencia muy valiosa.", exko: "언어를 배우는 것은 매우 값진 경험이다.", tip: "lo valioso = 가치 있는 것 (lo + 형용사). valer, el valor와 같은 어원." },
  { es: "transmitir", pos: "v.", ko: "전달하다, 전수하다", en: "to transmit, to pass on", cat: "교육 일반", ex: "Los abuelos transmiten las tradiciones a sus nietos.", exko: "조부모는 손주들에게 전통을 전해 준다.", tip: "명사 la transmisión, 형용사/명사 transmisor(a) (지문: transmisora de humanidad)." },
  { es: "la herencia", pos: "n.f.", ko: "유산, 상속; 전통", en: "heritage, inheritance", cat: "교육 일반", ex: "El idioma es una herencia cultural.", exko: "언어는 문화적 유산이다.", tip: "herencia cultural = 문화유산. 재산 상속에도, 정신적 유산에도 쓰입니다." },
  { es: "laboral", pos: "adj.", ko: "노동의, 직업의", en: "work-related, labour", cat: "교육 일반", ex: "El mercado laboral exige nuevas habilidades.", exko: "노동 시장은 새로운 능력을 요구한다.", tip: "남녀 동형. el trabajo(일)의 형용사형. 'función laboral' = 직업적 기능." },
  { es: "el fin", pos: "n.m.", ko: "목적; 끝", en: "end, purpose", cat: "교육 일반", ex: "Para ella, aprender es un fin en sí mismo.", exko: "그녀에게 배움은 그 자체로 목적이다.", tip: "un fin en sí mismo = 그 자체로 목적. 'a fin de que'(~하기 위해서)와 구분." },
  { es: "el estatus social", pos: "n.m.", ko: "사회적 지위", en: "social status", cat: "교육 일반", ex: "Algunos estudian solo por el estatus social.", exko: "어떤 이들은 오직 사회적 지위 때문에 공부한다.", tip: "비슷한 표현: la posición social, el prestigio." },
  { es: "aumentar", pos: "v.", ko: "증가하다; 증가시키다", en: "to increase", cat: "교육 일반", ex: "El número de alumnos ha aumentado este año.", exko: "올해 학생 수가 늘었다.", tip: "반의어: disminuir, reducir. 자동사·타동사 모두 가능." },

  // ---------- 교사 · 권위 ----------
  { es: "el maestro / la maestra", pos: "n.", ko: "(초등) 교사, 스승", en: "(primary) teacher, master", cat: "교사·권위", ex: "Mi maestra de primaria me enseñó a leer.", exko: "초등학교 선생님이 나에게 읽기를 가르쳐 주셨다.", tip: "중남미에서는 maestro = 초등 교사, profesor = 중·고등 교사. 지문에서는 '스승'의 뉘앙스도 있음." },
  { es: "el/la docente", pos: "n.", ko: "교원, 교사 (성 중립)", en: "teacher (gender-neutral)", cat: "교사·권위", ex: "Cada docente recibió un reconocimiento.", exko: "모든 교사가 표창을 받았다.", tip: "남녀 동형(el docente / la docente). 공식 문서·뉴스에서 자주 사용." },
  { es: "la pieza", pos: "n.f.", ko: "부품, 조각; 핵심 요소", en: "piece, component", cat: "교사·권위", ex: "El profesor es una pieza clave del sistema.", exko: "교사는 시스템의 핵심 요소이다.", tip: "pieza esencial / pieza clave = 핵심 요소." },
  { es: "encarnar", pos: "v.", ko: "구현하다, 몸소 보여 주다", en: "to embody", cat: "교사·권위", ex: "Esa maestra encarna los valores que enseña.", exko: "그 선생님은 자신이 가르치는 가치를 몸소 구현한다.", tip: "carne(살)에서 온 단어 → '살을 입히다'. Savater: 교사 = 유산을 encarnar하는 사람." },
  { es: "la autoridad", pos: "n.f.", ko: "권위, 당국", en: "authority", cat: "교사·권위", ex: "El maestro necesita autoridad para enseñar.", exko: "교사가 가르치려면 권위가 필요하다.", tip: "autoritarismo(권위주의)와 구분! 에세이 4번 핵심 어휘." },
  { es: "la jerarquía", pos: "n.f.", ko: "위계, 서열", en: "hierarchy", cat: "교사·권위", ex: "En un aula debe haber una jerarquía clara.", exko: "교실에는 분명한 위계가 있어야 한다.", tip: "jerárquico/a(위계적인). 발음 [헤라르끼아]." },
  { es: "la disciplina", pos: "n.f.", ko: "규율, 훈육", en: "discipline", cat: "교사·권위", ex: "Sin disciplina es difícil concentrarse.", exko: "규율이 없으면 집중하기 어렵다.", tip: "disciplinar(훈육하다), disciplinado/a(규율 있는)." },
  { es: "disciplinar", pos: "v.", ko: "훈육하다", en: "to discipline", cat: "교사·권위", ex: "No es fácil disciplinar a un grupo grande.", exko: "큰 집단을 훈육하는 것은 쉽지 않다.", tip: "지문: disciplinarlo (lo = 학생). 동사원형에 대명사가 붙는 형태." },
  { es: "someterse (a)", pos: "v. refl.", ko: "복종하다, 따르다", en: "to submit (to)", cat: "교사·권위", ex: "Todos deben someterse a las normas del colegio.", exko: "모두가 학교 규칙을 따라야 한다.", tip: "someterse a + 명사. 강한 어감(복종). 비슷한 표현: acatar, obedecer." },
  { es: "castigar / el castigo", pos: "v. / n.m.", ko: "벌주다 / 벌", en: "to punish / punishment", cat: "교사·권위", ex: "El castigo debe ser justo y proporcional.", exko: "벌은 공정하고 비례적이어야 한다.", tip: "castigado: 과거분사(벌 받은). por haber castigado = 벌을 주었기 때문에." },
  { es: "transgredir", pos: "v.", ko: "(규칙을) 위반하다", en: "to break, to transgress", cat: "교사·권위", ex: "Transgredir las normas tiene consecuencias.", exko: "규칙을 위반하면 결과가 따른다.", tip: "격식체. 일상: romper las reglas, no cumplir las normas." },
  { es: "la norma", pos: "n.f.", ko: "규칙, 규범", en: "rule, norm", cat: "교사·권위", ex: "Las normas de la escuela son claras.", exko: "학교의 규칙은 분명하다.", tip: "normas de la escuela = 교칙. 'la regla'는 자(ruler)·규칙 두 뜻." },
  { es: "ejercer", pos: "v.", ko: "행사하다; (직업을) 수행하다", en: "to exercise; to practise (a profession)", cat: "교사·권위", ex: "Ella ejerce de maestra desde hace diez años.", exko: "그녀는 10년째 교사로 일하고 있다.", tip: "ejercer la autoridad, ejercer una profesión. 어미변화: ejerzo (1인칭 c→z)." },
  { es: "la seducción", pos: "n.f.", ko: "유혹, 매혹", en: "seduction, charm", cat: "교사·권위", ex: "Algunos maestros usan la seducción para motivar.", exko: "어떤 교사들은 동기 부여를 위해 매력을 활용한다.", tip: "seducir(유혹하다, 매료시키다). Savater는 약간 아이러니한 뉘앙스로 사용." },
  { es: "la hipnosis", pos: "n.f.", ko: "최면", en: "hypnosis", cat: "교사·권위", ex: "Su voz producía una especie de hipnosis en la clase.", exko: "그의 목소리는 교실에 일종의 최면 효과를 일으켰다.", tip: "-sis로 끝나는 여성명사(la crisis, la tesis, la hipnosis)." },
  { es: "pegar", pos: "v.", ko: "때리다; 붙이다", en: "to hit; to stick", cat: "교사·권위", ex: "Está prohibido pegar a los alumnos.", exko: "학생을 때리는 것은 금지되어 있다.", tip: "지문: le pega al maestro (간접목적 대명사 le가 중복 사용됨)." },
  { es: "tocar", pos: "v.", ko: "만지다; 연주하다", en: "to touch; to play (an instrument)", cat: "교사·권위", ex: "No se puede tocar a un alumno sin permiso.", exko: "허락 없이 학생을 만질 수 없다.", tip: "tocar al alumno: 사람 직접목적어 앞에 a (개인 a)." },
  { es: "justo/a", pos: "adj.", ko: "공정한, 정당한", en: "fair, just", cat: "교사·권위", ex: "Una nota justa motiva al estudiante.", exko: "공정한 성적은 학생에게 동기를 부여한다.", tip: "반의어 injusto/a. de la manera más justa = 가장 공정한 방식으로." },
  { es: "la superstición", pos: "n.f.", ko: "미신, 근거 없는 통념", en: "superstition", cat: "교사·권위", ex: "Creer que los jóvenes ya no aprenden es una superstición.", exko: "젊은이들이 더 이상 배우지 않는다고 믿는 것은 미신이다.", tip: "복수: supersticiones. 지문에서는 '근거 없는 일반화'의 뜻." },
  { es: "igual", pos: "adj.", ko: "동등한, 같은", en: "equal, same", cat: "교사·권위", ex: "En clase no todos somos iguales: el maestro guía.", exko: "교실에서 우리 모두가 같지는 않다: 교사가 이끈다.", tip: "un igual = 동등한 존재. entender al maestro como un igual." },
  { es: "la mentalidad", pos: "n.f.", ko: "사고방식, 정신 상태", en: "mindset, mentality", cat: "교사·권위", ex: "Hay que cambiar la mentalidad de la sociedad.", exko: "사회의 사고방식을 바꿔야 한다.", tip: "cambiar de mentalidad = 생각을 바꾸다." },
  { es: "la animación cultural", pos: "n.f.", ko: "문화 오락·여가 활동 진행", en: "cultural entertainment activity", cat: "교사·권위", ex: "El aula no es un taller de animación cultural.", exko: "교실은 문화 오락 워크숍이 아니다.", tip: "스페인에서 여가·문화 활동을 이끄는 일을 animador cultural라 부릅니다. 교실을 '놀이 모임'에 빗댄 표현." },
  { es: "los demás", pos: "pron.", ko: "나머지 사람들, 다른 사람들", en: "the others, everyone else", cat: "교사·권위", ex: "Debemos respetar a los demás.", exko: "우리는 다른 사람들을 존중해야 한다.", tip: "los demás = 사람/사물의 나머지(복수). 'los otros'보다 문어체." },
  { es: "siquiera / ni siquiera", pos: "adv.", ko: "~조차 (않다)", en: "not even", cat: "교사·권위", ex: "Ni siquiera me saludó.", exko: "그는 나에게 인사조차 하지 않았다.", tip: "ni siquiera + 동사 (no 불필요) / No + 동사 + ni siquiera. 지문에 두 번 등장." },
  { es: "navegar", pos: "v.", ko: "항해하다; 인터넷을 서핑하다", en: "to sail; to surf the web", cat: "교사·권위", ex: "Los niños navegan en Internet sin supervisión.", exko: "아이들은 감독 없이 인터넷을 서핑한다.", tip: "navegar por Internet / en Internet 둘 다 가능. 지문: naveguen (접속법)." },
  { es: "el ordenador", pos: "n.m.", ko: "컴퓨터 (스페인식)", en: "computer (Spain)", cat: "교사·권위", ex: "En España se dice «ordenador» y en América «computadora».", exko: "스페인에서는 ordenador, 중남미에서는 computadora라고 한다.", tip: "지역 차이 어휘! 스페인(ordenador) vs 중남미(computadora/computador)." },

  // ---------- 농촌 학교 · 코스타 ----------
  { es: "el reconocimiento", pos: "n.m.", ko: "인정, 표창", en: "recognition, acknowledgement", cat: "농촌 학교", ex: "Su esfuerzo recibió un reconocimiento nacional.", exko: "그의 노력은 전국적인 인정을 받았다.", tip: "ganar/recibir reconocimiento. reconocer(인정하다, 알아보다)의 명사." },
  { es: "el premio", pos: "n.m.", ko: "상", en: "award, prize", cat: "농촌 학교", ex: "Obtuvo el premio al mejor docente.", exko: "그는 최우수 교사상을 받았다.", tip: "obtener/recibir/ganar un premio. premiar(상을 주다)." },
  { es: "la fundación", pos: "n.f.", ko: "재단", en: "foundation", cat: "농촌 학교", ex: "La fundación ofrece becas a estudiantes pobres.", exko: "그 재단은 가난한 학생들에게 장학금을 제공한다.", tip: "fundar(설립하다)의 명사. fundación = 재단/설립 두 뜻." },
  { es: "vulnerable", pos: "adj.", ko: "취약한", en: "vulnerable", cat: "농촌 학교", ex: "Los niños más vulnerables necesitan apoyo.", exko: "가장 취약한 아이들은 지원이 필요하다.", tip: "남녀 동형. 복수 vulnerables. 'población vulnerable' = 취약 계층." },
  { es: "el noticiero", pos: "n.m.", ko: "뉴스 프로그램 (중남미)", en: "news programme", cat: "농촌 학교", ex: "Los alumnos presentan un noticiero cada viernes.", exko: "학생들은 매주 금요일 뉴스 프로그램을 진행한다.", tip: "중남미: noticiero/noticiario, 스페인: telediario/informativo." },
  { es: "expandir los horizontes", pos: "loc. v.", ko: "시야를 넓히다", en: "to broaden one's horizons", cat: "농촌 학교", ex: "Viajar expande los horizontes de los jóvenes.", exko: "여행은 젊은이들의 시야를 넓혀 준다.", tip: "ampliar los horizontes도 같은 뜻. 에세이 단골 표현." },
  { es: "despoblar(se)", pos: "v.", ko: "인구가 줄다, 사람이 떠나 황폐해지다", en: "to become depopulated", cat: "농촌 학교", ex: "El campo se despuebla porque los jóvenes se van a la ciudad.", exko: "젊은이들이 도시로 떠나서 농촌의 인구가 줄고 있다.", tip: "o→ue 어간변화(despueblo). 명사: la despoblación. 반대: poblar." },
  { es: "la ruralidad", pos: "n.f.", ko: "시골 생활, 농촌성", en: "rural life / rurality", cat: "농촌 학교", ex: "Extraña la ruralidad de su pueblo.", exko: "그는 고향의 시골 정취를 그리워한다.", tip: "rural(농촌의)에서 파생. 반의어 la urbanidad(도시성/예의)에 주의: 뜻이 다름." },
  { es: "el multigrado", pos: "n.m.", ko: "복식학급 (여러 학년이 한 교실)", en: "multigrade teaching", cat: "농촌 학교", ex: "En el multigrado los mayores ayudan a los pequeños.", exko: "복식학급에서는 큰 아이들이 어린 아이들을 돕는다.", tip: "escuela multigrado / aula multigrado. 농촌의 소규모 학교에서 흔함." },
  { es: "engancharse (con)", pos: "v. refl.", ko: "흥미를 느끼고 빠져들다 (구어)", en: "to get hooked (on)", cat: "농촌 학교", ex: "Se enganchó con la lectura desde pequeño.", exko: "그는 어릴 때부터 독서에 푹 빠졌다.", tip: "구어체. 격식체로는 interesarse por, entusiasmarse con." },
  { es: "soltarse", pos: "v. refl.", ko: "벗어나다, 놓다, 풀어지다", en: "to let go; to loosen up", cat: "농촌 학교", ex: "Le cuesta soltarse de sus costumbres.", exko: "그는 자신의 습관에서 벗어나기 힘들어한다.", tip: "교재 용어 풀이: liberarse, dejar. 지문: cuesta soltarse de la ruralidad." },
  { es: "el gurí / la gurisa", pos: "n.", ko: "아이 (우루과이·아르헨티나·파라과이 구어)", en: "kid (River Plate slang)", cat: "농촌 학교", ex: "Los gurises juegan en el patio de la escuela.", exko: "아이들이 학교 운동장에서 논다.", tip: "복수 gurises. 스페인에서는 niño/a, chico/a, 멕시코에서는 chavo/a." },
  { es: "sostener", pos: "v.", ko: "주장하다; 지탱하다", en: "to maintain, to claim; to hold up", cat: "농촌 학교", ex: "Costa sostuvo que el multigrado es positivo.", exko: "코스타는 복식학급이 긍정적이라고 주장했다.", tip: "e→ie 어간변화 + tener 계열 (sostengo, sostuvo). 보도 동사." },
  { es: "asegurar", pos: "v.", ko: "단언하다; 보장하다", en: "to assure, to state firmly", cat: "농촌 학교", ex: "Aseguró que volvería al año siguiente.", exko: "그는 이듬해에 돌아오겠다고 단언했다.", tip: "보도 동사. 에세이에서 인용할 때 'según + 사람' 대신 번갈아 쓰기 좋음." },
  { es: "señalar", pos: "v.", ko: "지적하다, 언급하다; 가리키다", en: "to point out, to indicate", cat: "농촌 학교", ex: "El director señaló varios problemas.", exko: "교장은 여러 문제를 지적했다.", tip: "señalar que + 직설법: ~라고 지적하다." },
  { es: "la perspectiva", pos: "n.f.", ko: "관점, 전망", en: "perspective, outlook", cat: "농촌 학교", ex: "Viajar me dio otra perspectiva de la vida.", exko: "여행은 나에게 인생에 대한 다른 관점을 주었다.", tip: "tener otra perspectiva de + 명사 = ~에 대한 다른 관점을 갖다." },
  { es: "los escolares", pos: "n.m.pl.", ko: "학생들 (초·중등 학령기)", en: "schoolchildren", cat: "농촌 학교", ex: "Los escolares crearon un canal de YouTube.", exko: "학생들이 유튜브 채널을 만들었다.", tip: "형용사 escolar(학교의, 학생의)가 명사로 쓰임: un escolar, los escolares." }
];

window.EXPRESSIONS = [
  { es: "en líneas generales", ko: "대체로, 일반적으로", en: "in general terms", ex: "En líneas generales, la educación rural enfrenta menos recursos.", exko: "대체로 농촌 교육은 자원이 더 부족하다.", use: "서론에서 일반 현상을 소개할 때" },
  { es: "de alguna manera / de alguna forma", ko: "어떤 식으로든, 어떻게든", en: "in some way", ex: "El maestro debe, de alguna manera, ser un ejemplo.", exko: "교사는 어떤 식으로든 본보기가 되어야 한다.", use: "단정을 부드럽게 만들 때" },
  { es: "en contra de lo que se da a entender", ko: "흔히 암시되는 것과는 달리", en: "contrary to what is suggested", ex: "En contra de lo que se cree, los jóvenes sí quieren aprender.", exko: "흔히 믿는 것과 달리 젊은이들은 배우고 싶어 한다.", use: "통념을 반박할 때 (= contrariamente a lo que se cree)" },
  { es: "ni siquiera", ko: "~조차 …않다", en: "not even", ex: "Ni siquiera tenía un libro en casa.", exko: "그는 집에 책 한 권조차 없었다.", use: "강한 부정을 강조할 때" },
  { es: "un fin en sí mismo", ko: "그 자체로 목적", en: "an end in itself", ex: "Para Savater, la educación es un fin en sí mismo.", exko: "사바테르에게 교육은 그 자체로 목적이다.", use: "Savater 핵심 개념을 설명할 때" },
  { es: "por su valor intrínseco", ko: "본질적 가치 때문에", en: "for its intrinsic value", ex: "Debemos valorar el arte por su valor intrínseco.", exko: "우리는 예술을 그 본질적 가치 때문에 존중해야 한다.", use: "도구적 가치와 대비할 때" },
  { es: "tener que ver con", ko: "~와 관련이 있다", en: "to have to do with", ex: "Esto no tiene nada que ver con el dinero.", exko: "이것은 돈과 아무 관련이 없다.", use: "관련성 설명 (nada que ver = 전혀 상관없다)" },
  { es: "basarse en", ko: "~에 기초하다", en: "to be based on", ex: "La enseñanza se basa en el respeto mutuo.", exko: "교육은 상호 존중에 기초한다.", use: "논거를 설명할 때" },
  { es: "deberse a", ko: "~ 때문이다 (원인)", en: "to be due to", ex: "La deserción se debe a causas económicas.", exko: "중도 포기는 경제적 이유 때문이다.", use: "원인 분석 (debe ≠ deber)" },
  { es: "cada vez más / cada vez menos", ko: "점점 더 / 점점 덜", en: "more and more / less and less", ex: "Cada vez más alumnos usan el móvil en clase.", exko: "점점 더 많은 학생이 수업 중에 휴대폰을 쓴다.", use: "변화 추세 서술" },
  { es: "Sin A, no hay B", ko: "A가 없으면 B도 없다", en: "Without A there is no B", ex: "Sin esfuerzo no hay aprendizaje.", exko: "노력이 없으면 배움도 없다.", use: "강한 주장·결론 (Sin autoridad no hay enseñanza)" },
  { es: "no es A sino B", ko: "A가 아니라 B다", en: "it is not A but B", ex: "No es un juego, sino una forma de aprender.", exko: "그것은 놀이가 아니라 배움의 한 방식이다.", use: "오해 바로잡기 (절이면 sino que)" },
  { es: "a nivel nacional / a nivel local", ko: "전국적으로 / 지역적으로", en: "nationwide / locally", ex: "El proyecto es conocido a nivel nacional.", exko: "그 프로젝트는 전국적으로 알려져 있다.", use: "범위를 한정할 때" },
  { es: "ganar reconocimiento", ko: "인정을 받다", en: "to gain recognition", ex: "El canal ganó reconocimiento en todo el país.", exko: "그 채널은 전국에서 인정을 받았다.", use: "성과 서술" },
  { es: "gracias a", ko: "~ 덕분에", en: "thanks to", ex: "Gracias a Internet, los niños conocen otras culturas.", exko: "인터넷 덕분에 아이들은 다른 문화를 안다.", use: "긍정적 원인 (부정적 원인은 por culpa de, debido a)" },
  { es: "por haber + participio", ko: "~했기 때문에 (완료된 일)", en: "for having + past participle", ex: "Lo felicitaron por haber ganado el premio.", exko: "그는 상을 받았다는 이유로 축하받았다.", use: "이미 일어난 일을 이유로 말할 때" },
  { es: "hace + 기간", ko: "~ 전에", en: "ago", ex: "Hace cuatro años llegó a la escuela.", exko: "4년 전에 그는 학교에 도착했다.", use: "과거 시점 표현" },
  { es: "costar + 동사원형", ko: "~하는 것이 힘들다", en: "to find it hard to", ex: "Me cuesta levantarme temprano.", exko: "나는 일찍 일어나기가 힘들다.", use: "gustar형 동사: 사람은 간접목적 대명사(me, te, le...)" },
  { es: "con respecto a / respecto de", ko: "~에 관해서", en: "regarding", ex: "Con respecto a la tecnología, hay opiniones diferentes.", exko: "기술에 관해서는 의견이 다양하다.", use: "새 논점 소개" },
  { es: "ser visto como", ko: "~로 여겨지다", en: "to be seen as", ex: "El maestro es visto como un amigo, no como una autoridad.", exko: "교사는 권위자가 아니라 친구로 여겨진다.", use: "인식 서술 (= ser considerado como)" },
  { es: "tener sus ventajas / sus dificultades", ko: "나름의 장점/어려움이 있다", en: "to have its pros / cons", ex: "El multigrado tiene sus ventajas y sus dificultades.", exko: "복식학급은 나름의 장점과 어려움이 있다.", use: "장단점 평가" },
  { es: "en cambio", ko: "반면에", en: "on the other hand, by contrast", ex: "Antes se castigaba; hoy, en cambio, se dialoga.", exko: "예전엔 벌을 주었지만, 오늘날엔 반대로 대화한다.", use: "대조 연결어" },
  { es: "desde A hasta B", ko: "A부터 B까지", en: "from A to B", ex: "Hay clases desde cocina hasta inglés.", exko: "요리부터 영어까지 다양한 수업이 있다.", use: "범위·다양성 표현" },
  { es: "sobre todo", ko: "특히, 무엇보다", en: "especially, above all", ex: "Es importante, sobre todo, escuchar a los alumnos.", exko: "무엇보다 학생들의 말을 듣는 것이 중요하다.", use: "강조" },
  { es: "al momento de + 동사원형", ko: "~할 때에", en: "when it comes to", ex: "Al momento de planificar hay que ser flexible.", exko: "계획할 때는 유연해야 한다.", use: "중남미에서 자주 쓰는 '~할 때' 표현 (= a la hora de)" },
  { es: "lo importante es + 동사원형/que", ko: "중요한 것은 ~이다", en: "what matters is", ex: "Lo importante es que el alumno quiera aprender.", exko: "중요한 것은 학생이 배우고 싶어 하는 것이다.", use: "중심 주장 강조 (lo + 형용사)" },
  { es: "una especie de", ko: "일종의", en: "a kind of", ex: "Es una especie de juego educativo.", exko: "그것은 일종의 교육용 게임이다.", use: "비유·설명" },
  { es: "dar a entender", ko: "암시하다, 넌지시 말하다", en: "to imply", ex: "Su respuesta daba a entender que estaba cansado.", exko: "그의 대답은 그가 피곤하다는 것을 암시했다.", use: "함축 의미 설명" },
  { es: "en este sentido / en ese sentido", ko: "이런 의미에서", en: "in this sense", ex: "En este sentido, Costa coincide con Savater.", exko: "이런 의미에서 코스타는 사바테르와 뜻을 같이한다.", use: "앞 내용을 이어 정리할 때" }
];

window.GRAMMAR = [
  {
    title: "1. lo + 형용사 (중성 관사 lo)",
    explain: "형용사 앞에 lo를 붙이면 '~한 것(점)'이라는 추상 명사구가 됩니다. 에세이에서 주장을 선명하게 만들어 줍니다.",
    examples: [
      ["Lo valioso es la educación como transmisora de humanidad.", "가치 있는 것은 인간성을 전하는 교육이다. (지문)"],
      ["Lo importante es el maestro.", "중요한 것은 교사이다. (지문)"],
      ["Lo más difícil es mantener la disciplina.", "가장 어려운 것은 규율을 유지하는 것이다. (응용)"]
    ],
    tip: "lo + más + 형용사 = 가장 ~한 것. 서론 첫 문장에 쓰면 인상이 좋습니다."
  },
  {
    title: "2. 수동의 se (se pasiva) 와 일반화의 se",
    explain: "행위자를 밝히지 않고 일반적인 사실을 말할 때 se + 3인칭 동사를 씁니다. 명사가 복수면 동사도 복수.",
    examples: [
      ["No se considera la educación por su valor intrínseco.", "교육은 그 본질적 가치로 여겨지지 않는다. (지문)"],
      ["Eso es lo que se transmite con la educación.", "교육을 통해 전해지는 것이 그것이다. (지문)"],
      ["Se estudian muchas materias en el colegio.", "학교에서는 많은 과목을 공부한다. (응용)"]
    ],
    tip: "'la gente piensa que…' 대신 'se piensa que…'를 쓰면 훨씬 격식 있는 글이 됩니다."
  },
  {
    title: "3. 접속법: 목적·평가·불특정 대상",
    explain: "para que(목적), 평가 표현 뒤의 que, 아직 특정되지 않은 대상을 꾸미는 관계절에서는 접속법을 씁니다.",
    examples: [
      ["…para que pudieran expandir sus horizontes.", "…그들이 시야를 넓힐 수 있도록. (지문 1: para que + 접속법 불완료과거)"],
      ["…un ser humano que encarne esa herencia.", "그 유산을 구현하는 한 사람의 인간 (지문 3: 불특정 대상 → 접속법)"],
      ["¿A qué cree que pueda deberse esto?", "이것은 무엇 때문일 수 있다고 보십니까? (지문 2: 추측)"]
    ],
    tip: "주절이 과거(animó)면 종속절은 접속법 불완료과거(pudieran), 현재면 접속법 현재(puedan)."
  },
  {
    title: "4. Pareciera que… (접속법 불완료과거 -ra형의 완곡 표현)",
    explain: "pareciera, quisiera, debiera처럼 -ra형을 현재 상황에 써서 단정을 누그러뜨립니다. 일반적인 '~인 것 같다'는 parece que + 직설법.",
    examples: [
      ["Pareciera que el alumno entiende al maestro como un igual.", "학생이 교사를 동등한 존재로 이해하는 것 같다. (지문 3)"],
      ["Parece que los alumnos están cansados.", "학생들이 피곤한 것 같다. (일반적 표현)"],
      ["Quisiera hablar de la autoridad.", "권위에 대해 이야기하고 싶습니다. (공손)"]
    ],
    tip: "에세이에서는 보통 'parece que'로 충분합니다. 'pareciera'는 인용·독해에서 알아볼 수 있으면 OK."
  },
  {
    title: "5. 불완료과거 (과거의 습관) vs 부정과거 (사건)",
    explain: "'예전에는 늘 ~했다'는 반복 습관은 불완료과거, '그때 ~했다'는 완결된 사건은 부정과거를 씁니다.",
    examples: [
      ["Si hace unos años ibas a tu casa y decías…, tu padre te daba otro castigo.", "몇 년 전에 집에 가서 ~라고 말하면, 아버지가 또 벌을 주었다. (습관)"],
      ["Hace cuatro años llegó a la escuela.", "4년 전에 그는 학교에 왔다. (단발 사건)"]
    ],
    tip: "비교 에세이에서 '예전 vs 오늘날'을 서술할 때: antes + 불완료과거 / hoy + 현재."
  },
  {
    title: "6. por + haber + 과거분사 / 완료 부정사",
    explain: "이미 일어난 행위를 이유로 들 때 por haber + 과거분사를 씁니다.",
    examples: [
      ["…por haber transgredido las normas de la escuela.", "학교 규칙을 어겼다는 이유로 (지문 3)"],
      ["…por haber castigado al niño.", "아이를 벌했다는 이유로 (지문 3)"]
    ],
    tip: "주절과 주어가 다르면 'porque + 직설법'도 가능하지만, 주어가 같을 때 por haber…가 간결합니다."
  },
  {
    title: "7. 보도·인용 동사와 간접화법",
    explain: "인용할 때 같은 동사(dijo)만 반복하지 말고 다양한 동사를 쓰세요.",
    examples: [
      ["Costa señaló que…", "코스타는 ~라고 지적했다."],
      ["Costa aseguró / sostuvo / comentó / explicó / contó que…", "코스타는 ~라고 단언/주장/언급/설명/이야기했다."],
      ["Según Savater, …", "사바테르에 따르면 …"]
    ],
    tip: "señalar/aseguró/sostuvo + que + 직설법. 인용 문장의 시제 일치에 주의 (현재→불완료과거)."
  },
  {
    title: "8. ir + 현재분사 (점진적 변화)",
    explain: "ir + gerundio는 '점점 ~해 가다'라는 변화의 과정을 나타냅니다.",
    examples: [
      ["El campo se va despoblando.", "농촌이 점점 인구를 잃어 가고 있다. (지문 1)"],
      ["Se van yendo a la ciudad.", "사람들이 점점 도시로 떠나가고 있다. (지문 1)"]
    ],
    tip: "'cada vez más' 대신 쓸 수 있는 세련된 표현."
  },
  {
    title: "9. 수동태 ser + 과거분사",
    explain: "행위자를 강조하거나 격식 있는 글에서 ser + 과거분사(성·수 일치)를 씁니다.",
    examples: [
      ["El reconocimiento fue declarado de interés educativo por la ANEP.", "그 표창은 ANEP에 의해 교육적 의의가 있다고 선언되었다. (지문 1)"],
      ["El maestro es visto como una figura sin autoridad.", "교사는 권위 없는 존재로 여겨진다. (지문 3)"]
    ],
    tip: "과거분사는 주어의 성·수에 일치: declarado (el reconocimiento), vista (la figura)."
  },
  {
    title: "10. 개인 a (a personal) 와 간접목적 대명사 중복",
    explain: "특정한 사람이 직접목적어일 때는 앞에 a를 붙입니다. 또 le/les가 명사 간접목적어와 함께 중복되어 쓰이기도 합니다.",
    examples: [
      ["El maestro no puede tocar siquiera al alumno.", "교사는 학생을 만질 수조차 없다. (지문 3)"],
      ["El padre le pega al maestro.", "아버지가 교사를 때린다. (지문 3: le + al maestro 중복)"]
    ],
    tip: "pegar, escribir, decir 등 간접목적어를 취하는 동사는 'a + 명사'와 le를 함께 씁니다."
  }
];

window.CONNECTORS = [
  { group: "서론 (주제 소개)", items: [
    ["En la actualidad…", "오늘날"], ["Hoy en día…", "오늘날"], ["Según + 사람/글,…", "~에 따르면"], ["El texto trata de…", "이 글은 ~를 다룬다"], ["En su entrevista de 2010, Savater afirma que…", "2010년 인터뷰에서 사바테르는 ~라고 말한다"]
  ]},
  { group: "나열·추가", items: [
    ["En primer lugar,… En segundo lugar,… Por último,…", "첫째, 둘째, 마지막으로"], ["Además,…", "게다가"], ["Asimismo,…", "마찬가지로, 또한"], ["Por otro lado,…", "다른 한편으로"], ["No solo… sino también…", "~뿐만 아니라 ~도"]
  ]},
  { group: "대조·양보", items: [
    ["Sin embargo,…", "그러나"], ["En cambio,…", "반면에"], ["Por el contrario,…", "오히려 반대로"], ["Aunque + 접속법/직설법,…", "비록 ~이지만"], ["A pesar de + 명사/que,…", "~에도 불구하고"], ["Mientras que…", "~인 반면"]
  ]},
  { group: "원인·결과", items: [
    ["Porque / Ya que / Puesto que…", "~때문에"], ["Debido a…", "~로 인해"], ["Por eso / Por lo tanto / Por consiguiente,…", "그러므로"], ["De ahí que + 접속법…", "그래서 ~하게 된다"], ["Esto se debe a…", "이는 ~ 때문이다"]
  ]},
  { group: "예시·강조", items: [
    ["Por ejemplo,…", "예를 들어"], ["Es el caso de…", "~의 경우가 그렇다"], ["Cabe destacar que…", "~를 강조할 만하다"], ["Sobre todo,…", "특히"], ["De hecho,…", "사실"]
  ]},
  { group: "의견 표현", items: [
    ["En mi opinión,…", "내 생각에는"], ["Personalmente, creo que…", "개인적으로 ~라고 생각한다"], ["Estoy (totalmente) de acuerdo con…", "~에 (전적으로) 동의한다"], ["No estoy de acuerdo con… porque…", "~에 동의하지 않는다, 왜냐하면"], ["Me parece que…", "~인 것 같다"], ["Considero que…", "~라고 여긴다"]
  ]},
  { group: "결론", items: [
    ["En conclusión,…", "결론적으로"], ["En resumen,…", "요약하면"], ["Para concluir,…", "끝으로"], ["En definitiva,…", "결국"], ["Por todo lo anterior,…", "앞서 말한 모든 이유로"]
  ]}
];
