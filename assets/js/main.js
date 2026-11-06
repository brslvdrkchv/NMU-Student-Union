/**
 * ПРОФКОМ СТУДЕНТІВ НМУ ІМЕНІ О.О. БОГОМОЛЬЦЯ
 * Main Interactive Engine, i18n Translation & Theme Controller
 */

// Global State
let currentLang = localStorage.getItem('nmu_lang') || 'uk';
let currentTheme = localStorage.getItem('nmu_theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initHeader();
  initMobileMenu();
  initScrollReveals();
  initStatCounters();
  initCalculator();
  initDigitalPass3D();
  initKyivClock();
  initModals();
  initCardSpotlights();
  initFormHandlers();
  initBackToTop();
});

/* ==========================================================================
   1. THEME TOGGLE (LIGHT / DARK)
   ========================================================================== */
function initTheme() {
  // Apply initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);

  const themeButtons = document.querySelectorAll('.theme-toggle-btn');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('nmu_theme', currentTheme);
      updateThemeButtons();
    });
  });

  updateThemeButtons();
}

function updateThemeButtons() {
  const isLight = currentTheme === 'light';
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.setAttribute('aria-label', isLight ? 'Увімкнути темну тему' : 'Увімкнути світлу тему');
    btn.setAttribute('title', isLight ? 'Темна тема' : 'Світла тема');
    btn.classList.toggle('is-light', isLight);
  });
}

/* ==========================================================================
   2. BILINGUAL TRANSLATIONS (UK / EN)
   ========================================================================== */
const I18N = {
  uk: {
    // Document
    "doc.title": "Профком студентів НМУ імені О.О. Богомольця — Офіційний веб-сайт",
    
    // Header & Navigation
    "brand.name": "ПРОФКОМ НМУ",
    "brand.sub": "СИЛА ТА ОПОРА СТУДЕНТІВ",
    "nav.about": "Про нас",
    "nav.benefits": "Переваги",
    "nav.services": "Пільги & Стипендії",
    "nav.leadership": "Команда",
    "nav.commissions": "Комісії",
    "nav.clubs": "Клуби",
    "nav.contact": "Контакти",
    "nav.officeHours": "Каб. 438 • Пн, Чт",
    "nav.applyBtn": "ВСТУПИТИ",
    "mobile.apply": "ПОДАТИ ЗАЯВУ ОНЛАЙН",
    "mobile.telegram": "ТЕЛЕГРАМ-КАНАЛ (5.4K)",

    // Hero Section
    "hero.badge": "ППО студентів НМУ імені О.О. Богомольця",
    "hero.title.p1": "ПРОФКОМ —",
    "hero.title.p2": "СИЛА ТА ОПОРА",
    "hero.title.p3": "СТУДЕНТІВ",
    "hero.subtitle": "Самоврядна організація, яка стоїть на захисті твоїх прав, забезпечує соціальні стипендії, знижки на проживання у гуртожитках, квитки на події культури та гуртує прогресивну медичну спільноту.",
    "hero.cta.apply": "ПОДАТИ ЗАЯВУ",
    "hero.cta.telegram": "TELEGRAM (5.4K)",
    "hero.cta.feedback": "Скринька скарг",
    "hero.stats.students": "Студентів у мережі",
    "hero.stats.protection": "Захист прав",
    "hero.stats.dorms": "Пільги на гуртожиток",
    "hero.stats.clubs": "Клубів за інтересами",

    // Hero 3D Card & Digital Pass 2026
    "hero.card.legal": "Повний правовий захист",
    "hero.card.status": "ОФІЦІЙНИЙ СТАТУС",
    "hero.card.title": "ППО СТУДЕНТІВ УНІВЕРСИТЕТУ",
    "hero.card.desc": "Діє на основі Закону України «Про професійні спілки, їх права та гарантії діяльності» та Статуту Київської міської профспілки працівників охорони здоров'я.",
    "hero.card.addr": "Берестейський проспект, 34",
    "hero.card.room": "Морф. корпус, каб. 438",
    "hero.card.head": "Ґвазкова Ярослава",
    "pass.org": "ПРОФКОМ НМУ",
    "pass.sub": "STUDENT UNION MEMBER PASS",
    "pass.verified": "VERIFIED · 2026",
    "pass.cardIdLabel": "MEMBERSHIP ID",
    "pass.headLabel": "ГОЛОВА ПРОФКОМУ",
    "pass.headVal": "Ґвазкова Ярослава",
    "pass.locationLabel": "ШТАБ-КВАРТИРА",
    "pass.locationVal": "Каб. 438, Морф. корпус",
    "pass.status": "ДІЙСНИЙ КВИТОК",

    // Marquee
    "marquee.text": "СОЦІАЛЬНИЙ ЗАХИСТ • СТИПЕНДІЇ • ГУРТОЖИТКИ • ЮРИДИЧНА ДОПОМОГА • СПОРТ • ЗНИЖКИ • ВОЛОНТЕРСТВО • КУЛЬТУРА • СТУДЕНТСЬКА РОДИНА",

    // Privileges & Bento Grid
    "benefits.tag": "Чому варто бути в Профкомі",
    "benefits.title": "8 КЛЮЧОВИХ ПЕРЕВАГ ДЛЯ МЕДИКІВ",
    "benefits.desc": "Членство у Профкомі — це реальний щоденний захист та фінансові привілеї під час навчання в НМУ.",
    "bento.shield.title": "ЮРИДИЧНИЙ ТА АКАДЕМІЧНИЙ ЗАХИСТ",
    "bento.shield.desc": "Повне правове представництво студентів при виникненні спірних ситуацій, загрозі неправомірного відрахування, конфліктах на іспитах та заліках. Член профспілки не може бути відрахований без офіційної згоди Профкому.",
    "bento.shield.badge1": "Захист від відрахування",
    "bento.shield.badge2": "24/7 Захист прав",
    "bento.shield.badge3": "Представництво в ректораті",
    "bento.calcLink": "Розрахувати пакет",
    "bento.culture.title": "ТЕАТРАЛЬНІ ТА КОНЦЕРТНІ КВИТКИ",
    "bento.culture.desc": "Безкоштовний доступ та пільгові квитки у найкращі театри столиці: Національна опера, Театр Франка, Театр Лесі Українки, Молодий театр. Організація легендарних Благодійних медичних балів НМУ.",
    "bento.culture.admit": "ADMIT ONE • ВІЛЬНИЙ ВХІД",
    "benefits.c1.title": "Юридичний захист",
    "benefits.c1.desc": "Захист прав студентів у разі неправомірних дій, конфліктів на іспитах, заліках чи загрози відрахування. Представництво на засіданнях ректорату та деканатів.",
    "benefits.c1.tag": "Захист прав",
    "benefits.c2.title": "Соціальні стипендії",
    "benefits.c2.desc": "Повний документальний супровід та консультації щодо нарахування державних соціальних стипендій для ВПО, дітей УБД, сиріт та осіб з інвалідністю.",
    "benefits.c2.tag": "Фінансова опора",
    "benefits.c3.title": "Пільги на гуртожитки",
    "benefits.c3.desc": "Оформлення 49% знижки на оплату проживання у гуртожитках для ВПО та 100% звільнення від оплати для пільгових категорій. Контроль побуту.",
    "benefits.c3.tag": "Побут та житло",
    "benefits.c4.title": "Квитки та культура",
    "benefits.c4.desc": "Безкоштовні та пільгові квитки у провідні театри Києва, кіно, на концерти, організація легендарних благодійних балів НМУ та творчих вечорів.",
    "benefits.c4.tag": "Дозвілля",
    "benefits.c5.title": "Матеріальна допомога",
    "benefits.c5.desc": "Одноразові грошові виплати членам профспілки у зв'язку зі скрутним матеріальним становищем, хворобою, лікуванням або особливими життєвими подіями.",
    "benefits.c5.tag": "Грошова підтримка",
    "benefits.c6.title": "Спорт та здоров'я",
    "benefits.c6.desc": "Організація турнірів з міні-футболу, волейболу, настільного тенісу, підтримка університетських збірних, участь у Spartan Race та благодійних забігах.",
    "benefits.c6.tag": "Активне життя",
    "benefits.c7.title": "7 Клубів за інтересами",
    "benefits.c7.desc": "Мафія, дебати в укритті морфологічного корпусу, книжковий та кіноклуб, True Crime спільнота, театральна студія та волонтерські ініціативи.",
    "benefits.c7.tag": "Студентська родина",
    "benefits.c8.title": "Лідерство та ініціативи",
    "benefits.c8.desc": "Прямий вплив на процеси в університеті. Можливість реалізувати власний культурний чи соціальний проєкт із повною підтримкою команди Профкому.",
    "benefits.c8.tag": "Розвиток кар'єри",

    // Calculator
    "calc.tag": "Інтерактивний гід",
    "calc.title": "ПІЛЬГИ, СТИПЕНДІЇ ТА ГУРТОЖИТКИ",
    "calc.desc": "Оберіть вашу категорію, щоб миттєво отримати актуальний чекліст документів відповідно до Постанови КМУ №1045 та внутрішніх розпоряджень НМУ.",
    "calc.tab1": "1. Соціальні стипендії",
    "calc.tab2": "2. Пільги на гуртожиток",
    "calc.tab3": "3. Як вступити в Профком",
    "calc.selectHeading": "ОБЕРІТЬ ВАШУ ПІЛЬГОВУ КАТЕГОРІЮ:",
    "calc.selectSub": "Зверніть увагу: Профком студентів веде прямий прийом документів для ННІ медицини, ФПЛЗСУ та Факультету педіатрії.",
    "calc.cat.vpo.title": "ВПО",
    "calc.cat.vpo.desc": "Внутрішньо переміщена особа",
    "calc.cat.ubd.title": "Діти УБД / АТО",
    "calc.cat.ubd.desc": "Учасники бойових дій",
    "calc.cat.orphan.title": "Сироти",
    "calc.cat.orphan.desc": "Позбавлені піклування",
    "calc.cat.chaes.title": "ЧАЕС",
    "calc.cat.chaes.desc": "Постраждалі 1-3 категорії",
    "calc.cat.miners.title": "Шахтарі",
    "calc.cat.miners.desc": "Стаж батьків 15+ років",
    "calc.cat.disability.title": "Інвалідність",
    "calc.cat.disability.desc": "Особи I-III групи",
    "calc.applyBtn": "ПОДАТИ ЗАЯВУ",
    "calc.reqHeading": "Необхідний пакет документів:",
    "calc.termsLabel": "Вимоги:",
    "calc.progress.label": "Готовність пакету:",
    "calc.progress.complete": "✓ Пакет повністю зібрано! Завітайте у каб. 438 або надішліть заявку онлайн.",
    "calc.progress.tip": "Натискайте на документи, щоб відзначити зібрані довідки:",
    "calc.progress.counterSuffix": "документів",

    // Housing panel
    "calc.housing.title": "ПРОЖИВАННЯ У ГУРТОЖИТКАХ УНІВЕРСИТЕТУ",
    "calc.housing.desc": "Питаннями надання знижок на проживання та захистом житлово-побутових умов опікується Житлово-побутова комісія Профкому студентів.",
    "calc.housing.freeBadge": "100% БЕЗОПЛАТНО",
    "calc.housing.freeTitle": "ПОВНЕ ЗВІЛЬНЕННЯ ВІД ОПЛАТИ",
    "calc.housing.freeList": "<li>• Учасники бойових дій (УБД)</li><li>• Діти учасників бойових дій</li><li>• Діти загиблих захисників України</li><li>• Діти-сироти та діти, позбавлені батьківського піклування</li>",
    "calc.housing.discBadge": "49% ЗНИЖКА",
    "calc.housing.discTitle": "ПІЛЬГОВА ВАРТІСТЬ",
    "calc.housing.discList": "<li>• Студенти, які мають статус ВПО (внутрішньо переміщені особи)</li><li>• Першочергове поселення для осіб з інвалідністю</li><li>• Постраждалі від ЧАЕС (I, II категорії)</li>",

    // How to Join panel
    "calc.join.title": "ВСЕ ДУЖЕ ПРОСТО",
    "calc.join.desc": "Щоб долучитися до лав Профспілки студентів НМУ імені О.О. Богомольця, необхідно завітати до нашого кабінету у Морфологічному корпусі або заповнити швидку електронну форму!",
    "calc.join.s1.title": "Офлайн візит",
    "calc.join.s1.desc": "Морфологічний корпус, 4 поверх, кабінет №438. Заповніть паперову заяву за 2 хвилини.",
    "calc.join.s2.title": "Онлайн форма",
    "calc.join.s2.desc": "Надішліть заявку через наш сайт, і секретар профкому зв'яжеться з Вами в Telegram.",
    "calc.join.btn": "ЗАПОВНИТИ ОНЛАЙН-ЗАЯВУ",

    // Leadership
    "lead.tag": "Команда захисту",
    "lead.title": "КЕРІВНИЦТВО ПРОФКОМУ",
    "lead.desc": "Студенти, які щодня представляють інтереси університетської спільноти, вирішують конфлікти та організовують масштабні ініціативи.",
    "lead.role.head": "ГОЛОВА ПРОФКОМУ",
    "lead.role.deputy": "ЗАСТУПНИК ГОЛОВИ",
    "lead.role.secretary": "СЕКРЕТАР ПРОФКОМУ",
    "lead.name.gwazkova": "Ґвазкова Ярослава",
    "lead.fac.gwazkova": "Студентка ННІ медицини",
    "lead.name.kharyshuk": "Харишук Єлизавета",
    "lead.fac.kharyshuk": "Студентка Факультету Педіатрії",
    "lead.name.kutsenko": "Куценко Ілля",
    "lead.fac.kutsenko": "Студент ННІ громадського здоров'я",
    "lead.name.melnyk": "Мельник Еліна",
    "lead.fac.melnyk": "Студентка ННІ медицини",

    // Commissions
    "comm.tag": "Структурні підрозділи",
    "comm.title": "КОМІСІЇ ПРОФКОМУ СТУДЕНТІВ",
    "comm.desc": "Чотири профільні напрями, які організовують культурні заходи, розвивають спорт, ведуть медіаресурси та контролюють умови побуту в гуртожитках.",
    "comm.c1.tag": "Культура & Дозвілля",
    "comm.c1.title": "Культурно-масова комісія",
    "comm.c1.head": "Голова: Бондарєв Данііл Олегович (ННІМ)",
    "comm.c1.desc": "Організація студентського дозвілля: благодійні бали, творчі вечори, концерти, фестивалі, конкурси та великі університетські події.",
    "comm.c1.how": "<strong>Як потрапити:</strong> звернутися до голови комісії або заповнити анкету активіста, проявити креативність та енергію в підготовці подій.",
    
    "comm.c2.tag": "Медіа & Комунікації",
    "comm.c2.title": "Соціально-інформаційна комісія",
    "comm.c2.head": "Голова: Ющук Олександра Сергіївна (ННІМ)",
    "comm.c2.desc": "Висвітлення діяльності Профкому, ведення Telegram-каналу (5.4K) та Instagram, створення афіш, дизайн, копірайтинг та комунікація зі студентами.",
    "comm.c2.how": "<strong>Як потрапити:</strong> написати голові комісії, мати бажання працювати з контентом, дизайном або SMM.",

    "comm.c3.tag": "Спорт & Здоров'я",
    "comm.c3.title": "Спортивно-оздоровча комісія",
    "comm.c3.head": "Голова: Лук'яненко Юлія Миколаївна (ФПЛЗСУ)",
    "comm.c3.desc": "Популяризація активного способу життя: організація турнірів, футбольних і волейбольних першостей, участь у Spartan Trifecta та забігах.",
    "comm.c3.how": "<strong>Як потрапити:</strong> звернутися до голови комісії, виявити активність у спорті та суддівстві або долучитися до збірних команд.",

    "comm.c4.tag": "Побут & Пільги",
    "comm.c4.title": "Житлово-побутова комісія",
    "comm.c4.head": "Голова: Мороз Віталій Сергійович (ННІМ)",
    "comm.c4.desc": "Контроль умов проживання у студентських гуртожитках, розгляд звернень на знижки 49% та 100% безоплатне поселення для вразливих категорій.",
    "comm.c4.how": "<strong>Як потрапити:</strong> звернутися до голови комісії, цікавитися захистом прав мешканців гуртожитків.",

    // Profbyuro
    "pb.tag": "Представники на місцях",
    "pb.title": "ГОЛОВИ ПРОФБЮРО ФАКУЛЬТЕТІВ",
    "pb.desc": "Ваш перший контакт на кожному факультеті та інституті університету:",
    "pb.fac.med1": "ННІ медицини",
    "pb.fac.military": "Факультет лікарів для ЗСУ",
    "pb.fac.pediatrics": "Факультет Педіатрії",
    "pb.fac.stomatology": "ННІ стоматології",
    "pb.fac.pharma": "Фармацевтичний факультет",
    "pb.fac.mental": "ННІ психічного здоров'я",
    "pb.fac.public": "ННІ громадського здоров'я",

    // Clubs
    "clubs.tag": "Студентське життя",
    "clubs.title": "КЛУБИ ЗА ІНТЕРЕСАМИ ПРОФКОМУ",
    "clubs.desc": "Простір для самовираження, знайомств та відпочинку від пар і чергувань.",
    "clubs.c1.title": "Дебатний клуб NMU",
    "clubs.c1.desc": "Розвиток ораторського мистецтва, критичного мислення та медичної біоетики. Регулярні зустрічі в укритті.",
    "clubs.c2.title": "True Crime Community",
    "clubs.c2.desc": "Аналіз резонансних судових справ, судова психіатрія та криміналістичний аналіз із лікарями-експертами.",
    "clubs.c3.title": "Клуб Настільних Ігор & Мафія",
    "clubs.c3.desc": "Щотижневі турніри з Мафії, Codenames, монополії та стратегій для розвантаження після складних пар.",
    "clubs.c4.title": "Книжковий та Кіноклуб",
    "clubs.c4.desc": "Спільний перегляд культових медичних фільмів, документалок та обговорення світової літератури.",
    "clubs.c5.title": "Театральна Студія",
    "clubs.c5.desc": "Постановка студентських вистав, участь у благодійних вечорах та ректорських концертах.",
    "clubs.c6.title": "Медичне Волонтерство",
    "clubs.c6.desc": "Допомога військовим шпиталям, донорство крові, виїзні тренінги з тактичної медицини (Stop the Bleed).",

    // Contact & Application Form
    "contact.tag": "Штаб-квартира",
    "contact.title": "ЗВ'ЯЗОК З ПРОФКОМОМ",
    "contact.desc": "Ми відкриті до кожного студента. Завітай до нас особисто або звертайся онлайн у зручний для тебе месенджер.",
    "contact.addrLabel": "АДРЕСА",
    "contact.addrVal": "Проспект Берестейський, 34<br>Морфологічний корпус, 4 поверх, кабінет №438",
    "contact.phoneLabel": "ТЕЛЕФОН",
    "contact.phoneVal": "+38 (066) 225-01-89 (Голова ППО)",
    "contact.emailLabel": "EMAIL",

    // Form
    "form.tag": "Швидка заявка",
    "form.title": "ВСТУП ДО ПРОФКОМУ / АКТИВУ",
    "form.desc": "Заповни дані, і ми оформимо твоє членство або запросимо до команди комісій:",
    "form.name": "ПРІЗВИЩЕ, ІМ'Я, ПО БАТЬКОВІ",
    "form.namePh": "Наприклад: Коваленко Дарія Олександрівна",
    "form.fac": "ФАКУЛЬТЕТ / ІНСТИТУТ",
    "form.facDefault": "Оберіть факультет...",
    "form.course": "КУРС ТА ГРУПА",
    "form.coursePh": "Наприклад: 2 курс, 10204",
    "form.phone": "НОМЕР ТЕЛЕФОНУ",
    "form.tg": "НІК У TELEGRAM",
    "form.interest": "НАПРЯМОК, ЯКИЙ ЦІКАВИТЬ",
    "form.intOpt1": "Отримання членства та пільг (соц. стипендія / гуртожиток)",
    "form.intOpt2": "Культурно-масова комісія (заходи, бали, концерти)",
    "form.intOpt3": "Соціально-інформаційна комісія (SMM, дизайн, фото)",
    "form.intOpt4": "Спортивна комісія (турніри, змагання)",
    "form.intOpt5": "Житлово-побутова комісія (гуртожитки)",
    "form.intOpt6": "Клуби за інтересами (дебати, мафія, кіноклуб)",
    "form.submit": "ВІДПРАВИТИ ЗАЯВКУ",

    // Modals
    "modal.apply.title": "ЗАЯВКА НА ВСТУП ДО ПРОФКОМУ",
    "modal.apply.desc": "Заповніть коротку форму для оформлення профспілкового квитка та доступу до всіх студентських пільг.",
    "modal.fb.title": "СКРИНЬКА ДОВІРИ ТА СКАРГ",
    "modal.fb.desc": "Анонімне звернення щодо порушення прав, корупції, неправомірних дій або проблем у гуртожитку. Захист конфіденційності гарантовано.",
    "modal.fb.type": "ТЕМА ЗВЕРНЕННЯ",
    "modal.fb.typeOpt1": "Порушення прав під час сесії / заліку",
    "modal.fb.typeOpt2": "Проблеми у гуртожитку (побут, тиск)",
    "modal.fb.typeOpt3": "Неправомірні вимоги / корупція",
    "modal.fb.typeOpt4": "Інше конфіденційне питання",
    "modal.fb.msg": "ОПИС СИТУАЦІЇ",
    "modal.fb.msgPh": "Детально опишіть проблему, вкажіть кафедру / гуртожиток...",
    "modal.fb.contact": "КОНТАКТ ДЛЯ ЗВОРОТНОГО ЗВ'ЯЗКУ (ЗА БАЖАННЯМ)",
    "modal.fb.contactPh": "Номер телефону або Telegram нік (можна залишити пустим для повної анонімності)",
    "modal.fb.submit": "НАДІСЛАТИ АНОНІМНО",

    // Footer
    "footer.union": "Первинна профспілкова організація студентів",
    "footer.university": "Національний медичний університет імені О.О. Богомольця",
    "footer.rights": "Всі права захищено.",
    "footer.locationLabel": "ГОЛОВНИЙ ОФІС / МОРФОЛОГІЧНИЙ КОРПУС",
    "footer.timeLabel": "МІСЦЕВИЙ ЧАС (КИЇВ)",
    "footer.protocolLabel": "СТАТУС СИСТЕМИ",
    "footer.protocolVal": "SYSTEM OPERATIONAL • 2026"
  },

  en: {
    // Document
    "doc.title": "Student Trade Union of Bogomolets NMU — Official Web Portal",

    // Header & Navigation
    "brand.name": "NMU UNION",
    "brand.sub": "STUDENT POWER & DEFENSE",
    "nav.about": "About",
    "nav.benefits": "Privileges",
    "nav.services": "Benefits & Grants",
    "nav.leadership": "Team",
    "nav.commissions": "Commissions",
    "nav.clubs": "Clubs",
    "nav.contact": "Contacts",
    "nav.officeHours": "Room 438 • Mon, Thu",
    "nav.applyBtn": "JOIN UNION",
    "mobile.apply": "APPLY ONLINE",
    "mobile.telegram": "TELEGRAM CHANNEL (5.4K)",

    // Hero Section
    "hero.badge": "Student Trade Union of Bogomolets NMU",
    "hero.title.p1": "TRADE UNION —",
    "hero.title.p2": "STRENGTH & SUPPORT",
    "hero.title.p3": "FOR STUDENTS",
    "hero.subtitle": "Autonomous student organization protecting your rights, securing social scholarships, dormitory discounts, cultural tickets, and uniting the progressive medical community.",
    "hero.cta.apply": "APPLY NOW",
    "hero.cta.telegram": "TELEGRAM (5.4K)",
    "hero.cta.feedback": "Grievance Box",
    "hero.stats.students": "Students in network",
    "hero.stats.protection": "Rights defense",
    "hero.stats.dorms": "Dormitory discounts",
    "hero.stats.clubs": "Student clubs",

    // Hero 3D Card & Digital Pass 2026
    "hero.card.legal": "Full legal defense",
    "hero.card.status": "OFFICIAL STATUS",
    "hero.card.title": "UNIVERSITY STUDENT UNION",
    "hero.card.desc": "Operates under the Law of Ukraine 'On Trade Unions' and the Statute of Kyiv Healthcare Workers Trade Union.",
    "hero.card.addr": "34 Beresteiskyi Avenue",
    "hero.card.room": "Morph. bldg, room 438",
    "hero.card.head": "Yaroslava Gwazkova",
    "pass.org": "NMU UNION",
    "pass.sub": "STUDENT UNION MEMBER PASS",
    "pass.verified": "VERIFIED · 2026",
    "pass.cardIdLabel": "MEMBERSHIP ID",
    "pass.headLabel": "UNION PRESIDENT",
    "pass.headVal": "Yaroslava Gvazkova",
    "pass.locationLabel": "HEADQUARTERS",
    "pass.locationVal": "Room 438, Morph. Bldg",
    "pass.status": "ACTIVE PASS",

    // Marquee
    "marquee.text": "SOCIAL PROTECTION • SCHOLARSHIPS • DORMITORIES • LEGAL DEFENSE • SPORTS • DISCOUNTS • VOLUNTEERING • CULTURE • STUDENT FAMILY",

    // Privileges & Bento Grid
    "benefits.tag": "Why Join the Union",
    "benefits.title": "8 KEY PRIVILEGES FOR MEDICAL STUDENTS",
    "benefits.desc": "Union membership guarantees real daily protection and tangible financial privileges throughout your studies at NMU.",
    "bento.shield.title": "LEGAL & ACADEMIC DEFENSE",
    "bento.shield.desc": "Comprehensive legal representation for students during grading disputes, risk of unlawful expulsion, or faculty conflicts. A union member cannot be expelled without official Profkom approval.",
    "bento.shield.badge1": "Expulsion protection",
    "bento.shield.badge2": "24/7 Rights defense",
    "bento.shield.badge3": "Rectorate representation",
    "bento.calcLink": "Calculate document checklist",
    "bento.culture.title": "THEATRE & CONCERT PASSES",
    "bento.culture.desc": "Complimentary and discounted tickets to Kyiv's leading stages: National Opera of Ukraine, Franko Theatre, Lesya Ukrainka Theatre, Molodyi Theatre. Plus organization of legendary NMU Charity Balls.",
    "bento.culture.admit": "ADMIT ONE • FREE ENTRY",
    "benefits.c1.title": "Legal Protection",
    "benefits.c1.desc": "Protection of student rights during credit and examination sessions, grading disputes, or risks of expulsion. Representation at rectorate and dean's meetings.",
    "benefits.c1.tag": "Rights Defense",
    "benefits.c2.title": "Social Scholarships",
    "benefits.c2.desc": "Full document handling and expert advice on state social scholarships for IDPs, children of combatants, orphans, and students with disabilities.",
    "benefits.c2.tag": "Financial Support",
    "benefits.c3.title": "Dormitory Discounts",
    "benefits.c3.desc": "Processing 49% discounts on dormitory accommodation for IDPs and 100% free living for vulnerable student categories. Housing oversight.",
    "benefits.c3.tag": "Housing & Living",
    "benefits.c4.title": "Cultural Life & Tickets",
    "benefits.c4.desc": "Free and discounted tickets to Kyiv top theatres, cinema, concerts, as well as organization of legendary NMU charity balls and creative evenings.",
    "benefits.c4.tag": "Leisure",
    "benefits.c5.title": "Financial Relief",
    "benefits.c5.desc": "One-time financial relief grants for union members in difficult personal, economic, or medical situations requiring healthcare treatment.",
    "benefits.c5.tag": "Direct Grants",
    "benefits.c6.title": "Sports & Health",
    "benefits.c6.desc": "Tournaments in mini-football, volleyball, and table tennis, university athletic team sponsorship, Spartan Race, and charity marathons.",
    "benefits.c6.tag": "Active Life",
    "benefits.c7.title": "7 Student Clubs",
    "benefits.c7.desc": "Debate club, Mafia in the morphological shelter, book and cinema clubs, True Crime community, drama studio, and volunteer initiatives.",
    "benefits.c7.tag": "Student Family",
    "benefits.c8.title": "Leadership & Initiatives",
    "benefits.c8.desc": "Direct influence on university decisions. Opportunities to launch your own cultural or healthcare project with full Union backing.",
    "benefits.c8.tag": "Career Growth",

    // Calculator
    "calc.tag": "Interactive Guide",
    "calc.title": "BENEFITS, SCHOLARSHIPS & DORMS",
    "calc.desc": "Select your category to instantly receive an up-to-date checklist of documents pursuant to CMU Resolution №1045 and NMU internal regulations.",
    "calc.tab1": "1. Social Scholarships",
    "calc.tab2": "2. Dormitory Discounts",
    "calc.tab3": "3. How to Join Union",
    "calc.selectHeading": "SELECT YOUR BENEFIT CATEGORY:",
    "calc.selectSub": "Please note: Student Trade Union directly accepts documents for Medical Institute, Military Faculty, and Faculty of Pediatrics.",
    "calc.cat.vpo.title": "IDP",
    "calc.cat.vpo.desc": "Internally Displaced Person",
    "calc.cat.ubd.title": "Combatants' Children",
    "calc.cat.ubd.desc": "Veterans & Combatants",
    "calc.cat.orphan.title": "Orphans",
    "calc.cat.orphan.desc": "Deprived of Parental Care",
    "calc.cat.chaes.title": "Chornobyl",
    "calc.cat.chaes.desc": "Categories 1–3 Victims",
    "calc.cat.miners.title": "Miners",
    "calc.cat.miners.desc": "Parents with 15+ yrs exp.",
    "calc.cat.disability.title": "Disability",
    "calc.cat.disability.desc": "Groups I–III",
    "calc.applyBtn": "APPLY NOW",
    "calc.reqHeading": "Required Document Package:",
    "calc.termsLabel": "Requirements:",
    "calc.progress.label": "Package completeness:",
    "calc.progress.complete": "✓ Document package complete! Visit Room 438 or submit application online.",
    "calc.progress.tip": "Click on documents to check off the ones you have ready:",
    "calc.progress.counterSuffix": "documents",

    // Housing panel
    "calc.housing.title": "LIVING IN UNIVERSITY DORMITORIES",
    "calc.housing.desc": "Housing fee discounts and living conditions oversight are managed by the Student Union Housing & Living Commission.",
    "calc.housing.freeBadge": "100% FREE",
    "calc.housing.freeTitle": "FULL FEE WAIVER",
    "calc.housing.freeList": "<li>• Combatants & war veterans (UBD)</li><li>• Children of combatants</li><li>• Children of fallen defenders of Ukraine</li><li>• Orphan students & children deprived of parental care</li>",
    "calc.housing.discBadge": "49% DISCOUNT",
    "calc.housing.discTitle": "DISCOUNTED HOUSING",
    "calc.housing.discList": "<li>• Students with official IDP status</li><li>• Priority room allocation for students with disabilities</li><li>• Chornobyl disaster victims (Categories I & II)</li>",

    // How to Join panel
    "calc.join.title": "SIMPLE & QUICK",
    "calc.join.desc": "To join the Student Trade Union of Bogomolets NMU, visit our office in the Morphological Building or submit a quick online application!",
    "calc.join.s1.title": "In-Person Visit",
    "calc.join.s1.desc": "Morphological building, 4th floor, room 438. Fill in a paper application in 2 minutes.",
    "calc.join.s2.title": "Online Form",
    "calc.join.s2.desc": "Submit an application on our website, and union secretary will contact you via Telegram.",
    "calc.join.btn": "FILL IN ONLINE APPLICATION",

    // Leadership
    "lead.tag": "Defense Team",
    "lead.title": "PROFKOM LEADERSHIP",
    "lead.desc": "Students who represent the medical university community daily, resolve conflicts, and organize large-scale initiatives.",
    "lead.role.head": "HEAD OF UNION",
    "lead.role.deputy": "DEPUTY HEAD",
    "lead.role.secretary": "SECRETARY",
    "lead.name.gwazkova": "Yaroslava Gwazkova",
    "lead.fac.gwazkova": "Student, Medical Institute",
    "lead.name.kharyshuk": "Elizaveta Kharyshuk",
    "lead.fac.kharyshuk": "Student, Faculty of Pediatrics",
    "lead.name.kutsenko": "Ilya Kutsenko",
    "lead.fac.kutsenko": "Student, Public Health Institute",
    "lead.name.melnyk": "Elina Melnyk",
    "lead.fac.melnyk": "Student, Medical Institute",

    // Commissions
    "comm.tag": "Commissions",
    "comm.title": "PROFKOM COMMISSIONS",
    "comm.desc": "Four dedicated branches organizing cultural events, fostering sports, running media channels, and monitoring dormitory conditions.",
    "comm.c1.tag": "Culture & Leisure",
    "comm.c1.title": "Cultural & Entertainment Commission",
    "comm.c1.head": "Head: Daniil Bondarev (Med. Inst.)",
    "comm.c1.desc": "Student leisure organization: charity balls, creative evenings, concerts, festivals, contests, and major university events.",
    "comm.c1.how": "<strong>How to join:</strong> contact the head of commission or fill out activist form, show creativity and enthusiasm in event planning.",

    "comm.c2.tag": "Media & Communications",
    "comm.c2.title": "Social & Information Commission",
    "comm.c2.head": "Head: Oleksandra Yushchuk (Med. Inst.)",
    "comm.c2.desc": "Promoting Union activities, managing Telegram channel (5.4K) and Instagram, creating posters, graphic design, copywriting, and student PR.",
    "comm.c2.how": "<strong>How to join:</strong> message the head of commission, possess interest in content creation, design, or social media.",

    "comm.c3.tag": "Sports & Health",
    "comm.c3.title": "Sports & Health Commission",
    "comm.c3.head": "Head: Yulia Lukyanenko (Military Fac.)",
    "comm.c3.desc": "Fostering active lifestyles: organizing tournaments, football and volleyball leagues, participating in Spartan Trifecta and charity runs.",
    "comm.c3.how": "<strong>How to join:</strong> reach out to the head of commission, get involved in athletic activities, refereeing, or join university teams.",

    "comm.c4.tag": "Living & Housing",
    "comm.c4.title": "Housing & Living Commission",
    "comm.c4.head": "Head: Vitaliy Moroz (Med. Inst.)",
    "comm.c4.desc": "Monitoring dormitory conditions, reviewing applications for 49% discounts and 100% free room allocations for vulnerable students.",
    "comm.c4.how": "<strong>How to join:</strong> contact the head of commission, show interest in protecting dormitory residents' rights.",

    // Profbyuro
    "pb.tag": "Faculty Representatives",
    "pb.title": "FACULTY PROFBYURO HEADS",
    "pb.desc": "Your first point of contact across each faculty and institute of the university:",
    "pb.fac.med1": "Medical Institute №1",
    "pb.fac.military": "Faculty of Military Physicians",
    "pb.fac.pediatrics": "Faculty of Pediatrics",
    "pb.fac.stomatology": "Dental Institute",
    "pb.fac.pharma": "Pharmaceutical Faculty",
    "pb.fac.mental": "Mental Health Institute",
    "pb.fac.public": "Public Health Institute",

    // Clubs
    "clubs.tag": "Student Life",
    "clubs.title": "PROFKOM STUDENT CLUBS",
    "clubs.desc": "Spaces for self-expression, networking, and unwinding from classes and hospital shifts.",
    "clubs.c1.title": "NMU Debate Club",
    "clubs.c1.desc": "Public speaking, critical thinking, and medical bioethics debates. Regular sessions held in the morphological shelter.",
    "clubs.c2.title": "True Crime Community",
    "clubs.c2.desc": "Analysis of landmark legal cases, forensic psychiatry, and criminalistics reviews alongside expert medical specialists.",
    "clubs.c3.title": "Board Games & Mafia Club",
    "clubs.c3.desc": "Weekly Mafia tournaments, Codenames, strategy games to relax and connect with fellow students after tough exam weeks.",
    "clubs.c4.title": "Book & Cinema Club",
    "clubs.c4.desc": "Movie screenings of cult medical films, documentaries, and engaging discussions of classic and modern literature.",
    "clubs.c5.title": "Drama & Theatre Studio",
    "clubs.c5.desc": "Student theatrical productions, participation in charity evenings and festive university concerts.",
    "clubs.c6.title": "Medical Volunteering",
    "clubs.c6.desc": "Support for military hospitals, blood donation drives, field tactical medicine workshops (Stop the Bleed certification).",

    // Contact & Application Form
    "contact.tag": "Headquarters",
    "contact.title": "CONTACT PROFKOM",
    "contact.desc": "We are open to every student. Visit us in person or reach out online via your preferred messenger.",
    "contact.addrLabel": "ADDRESS",
    "contact.addrVal": "34 Beresteiskyi Avenue<br>Morphological building, 4th floor, room №438",
    "contact.phoneLabel": "PHONE",
    "contact.phoneVal": "+38 (066) 225-01-89 (Union Head)",
    "contact.emailLabel": "EMAIL",

    // Form
    "form.tag": "Quick Application",
    "form.title": "JOIN PROFKOM / ACTIVIST TEAM",
    "form.desc": "Fill in your details, and we will issue your membership or invite you to join our teams:",
    "form.name": "FULL NAME",
    "form.namePh": "e.g., Daria Kovalenko",
    "form.fac": "FACULTY / INSTITUTE",
    "form.facDefault": "Select faculty...",
    "form.course": "YEAR & GROUP",
    "form.coursePh": "e.g., Year 2, Group 10204",
    "form.phone": "PHONE NUMBER",
    "form.tg": "TELEGRAM USERNAME",
    "form.interest": "AREA OF INTEREST",
    "form.intOpt1": "Membership & benefits (social grant / dormitory discount)",
    "form.intOpt2": "Cultural & Entertainment Commission (events, balls)",
    "form.intOpt3": "Social & Media Commission (SMM, design, photo)",
    "form.intOpt4": "Sports Commission (tournaments, leagues)",
    "form.intOpt5": "Housing Commission (dormitories)",
    "form.intOpt6": "Student Clubs (debates, mafia, cinema)",
    "form.submit": "SUBMIT APPLICATION",

    // Modals
    "modal.apply.title": "APPLICATION TO JOIN PROFKOM",
    "modal.apply.desc": "Fill in a brief form to get your union ticket and unlock all student privileges.",
    "modal.fb.title": "CONFIDENTIAL GRIEVANCE BOX",
    "modal.fb.desc": "Anonymous report regarding rights violations, corruption, academic misconduct, or dormitory issues. Strict confidentiality guaranteed.",
    "modal.fb.type": "ISSUE TOPIC",
    "modal.fb.typeOpt1": "Rights violations during exams / credits",
    "modal.fb.typeOpt2": "Dormitory living issues / mistreatment",
    "modal.fb.typeOpt3": "Illegal demands / corruption concerns",
    "modal.fb.typeOpt4": "Other confidential matter",
    "modal.fb.msg": "SITUATION DETAILS",
    "modal.fb.msgPh": "Describe the issue in detail, specify department / dorm...",
    "modal.fb.contact": "FEEDBACK CONTACT (OPTIONAL)",
    "modal.fb.contactPh": "Phone or Telegram handle (leave blank for complete anonymity)",
    "modal.fb.submit": "SUBMIT ANONYMOUSLY",

    // Footer
    "footer.union": "Primary Trade Union Organization of Students",
    "footer.university": "Bogomolets National Medical University",
    "footer.rights": "All rights reserved.",
    "footer.locationLabel": "HEAD OFFICE / MORPHOLOGICAL BUILDING",
    "footer.timeLabel": "LOCAL TIME (KYIV)",
    "footer.protocolLabel": "SYSTEM STATUS",
    "footer.protocolVal": "SYSTEM OPERATIONAL • 2026"
  }
};

function initLanguage() {
  applyLanguage(currentLang);

  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang && lang !== currentLang) {
        currentLang = lang;
        localStorage.setItem('nmu_lang', lang);
        applyLanguage(lang);
      }
    });
  });
}

function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.uk;
  document.documentElement.lang = lang;
  document.title = dict["doc.title"] || document.title;

  // Update text elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update HTML elements with data-i18n-html
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update input placeholders with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Update active states on switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    btn.classList.toggle('active', btnLang === lang);
  });

  // Re-render calculator content for current language
  renderActiveScholarshipCategory();
}

/* ==========================================================================
   3. HEADER SCROLL & BACK TO TOP
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   4. MOBILE OVERLAY NAVIGATION
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  const links = document.querySelectorAll('.mobile-menu-link, .mobile-menu .btn');

  if (!toggle || !menu) return;

  const toggleMenu = () => {
    const isOpen = menu.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', isOpen);
  };

  toggle.addEventListener('click', toggleMenu);

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   5. SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-item');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-animate');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('reveal-animate'));
  }
}

/* ==========================================================================
   6. ANIMATED COUNTERS
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  if (!statNumbers.length) return;

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isK = el.getAttribute('data-is-k') === 'true';
    const duration = 1600;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = (ease * target).toFixed(isK ? 1 : 0);

      el.textContent = isK ? `${current}K+` : (target === 100 ? `${current}%` : current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = isK ? `${target}K+` : (target === 100 ? '100%' : target);
      }
    };

    requestAnimationFrame(update);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(num => observer.observe(num));
  } else {
    statNumbers.forEach(num => animateCounter(num));
  }
}

/* ==========================================================================
   7. SOCIAL SCHOLARSHIPS CALCULATOR DATA
   ========================================================================== */
const SCHOLARSHIP_DATA = {
  uk: {
    vpo: {
      title: "Внутрішньо переміщена особа (ВПО)",
      facultyNote: "Профком веде супровід для: ННІМ, ФПЛЗСУ, Факультет Педіатрії. На інших факультетах — через деканат.",
      documents: [
        "Копія довідки про взяття на облік внутрішньо переміщеної особи (чинна)",
        "Копія паспорта громадянина України (1, 2 сторінки та прописка / ID-картка з витягом)",
        "Копія реєстраційного номера облікової картки платника податків (ІПН)",
        "Копія студентського квитка",
        "Заява на ім'я ректора (бланк надається профоргом або в каб. 438)",
        "Довідка про те, що студент не отримує соціальну стипендію в іншому ЗВО"
      ],
      terms: "Денна форма навчання за державним замовленням, відсутність академічної заборгованості."
    },
    ubd: {
      title: "Діти учасників бойових дій (УБД / АТО / ООС)",
      facultyNote: "Виплата здійснюється до закінчення навчання, але не довше ніж до досягнення 23 років.",
      documents: [
        "Копія посвідчення учасника бойових дій батька або матері",
        "Копія свідоцтва про народження студента (для підтвердження родинних зв'язків)",
        "Довідка про безпосередню участь у бойових діях / заходах оборони України",
        "Копія паспорта та ІПН студента",
        "Копія студентського квитка",
        "Заява встановленого зразка"
      ],
      terms: "Денна бюджетна форма навчання, вік до 23 років, відсутність академзаборгованості."
    },
    orphan: {
      title: "Діти-сироти та діти, позбавлені батьківського піклування",
      facultyNote: "Категорія гарантує підвищений розмір стипендії та першочергову матеріальну допомогу.",
      documents: [
        "Копія рішення органу опіки про надання статусу сироти / позбавленої піклування",
        "Копія свідоцтва про смерть батьків (або рішення суду про позбавлення батьківських прав)",
        "Копія паспорта, ІПН та студентського квитка",
        "Заява на нарахування соціальної стипендії",
        "Реквізити банківської картки для стипендіальних виплат"
      ],
      terms: "Вік від 18 до 23 років, студенти, які в період навчання втратили батьків."
    },
    chaes: {
      title: "Постраждалі внаслідок Чорнобильської катастрофи (ЧАЕС)",
      facultyNote: "Згідно з Законом України про статус і соціальний захист постраждалих від ЧАЕС.",
      documents: [
        "Копія посвідчення громадянина, який постраждав внаслідок аварії на ЧАЕС (категорії 1–3)",
        "Для неповнолітніх дітей померлого ліквідатора — копія довідки встановленого зразка",
        "Копія свідоцтва про смерть, пов'язану з аварією на ЧАЕС (за наявності)",
        "Копія паспорта, ІПН, студентського квитка та заява"
      ],
      terms: "Денна бюджетна форма навчання."
    },
    miners: {
      title: "Шахтарський стаж батьків (15+ років підземної роботи)",
      facultyNote: "Згідно зі статтею 5 Закону України «Про підвищення престижності шахтарської праці».",
      documents: [
        "Довідка з гірничого підприємства із зазначенням підземного стажу одного з батьків (не менше 15 років)",
        "АБО акт про нещасний випадок на виробництві (форма Н-1) / довідка МСЕК про інвалідність",
        "Копія свідоцтва про народження студента",
        "Копія паспорта, ІПН та студентського квитка",
        "Заява"
      ],
      terms: "Вступ протягом 3 років після здобуття повної загальної середньої освіти."
    },
    disability: {
      title: "Особи з інвалідністю (I, II, III групи)",
      facultyNote: "Надається право на соціальну стипендію за умови відсутності академічної заборгованості.",
      documents: [
        "Копія довідки МСЕК про встановлення групи інвалідності",
        "АБО пенсійне посвідчення / посвідчення отримувача державної соціальної допомоги",
        "Копія індивідуальної програми реабілітації (за вимогою)",
        "Копія паспорта, ІПН, студентського квитка та заява"
      ],
      terms: "Чинний строк дії довідки МСЕК на момент подання заяви."
    }
  },
  en: {
    vpo: {
      title: "Internally Displaced Person (IDP)",
      facultyNote: "Union directly assists students from: Med. Institute, Military Faculty, Faculty of Pediatrics. Other faculties via dean's office.",
      documents: [
        "Copy of valid certificate of registration as an internally displaced person (IDP)",
        "Copy of Ukrainian passport (pages 1, 2 & registration address / ID-card with residence extract)",
        "Copy of Taxpayer Registration Number (TIN / RNOKPP)",
        "Copy of valid Student ID card",
        "Application addressed to the Rector (form provided by union representative or in room 438)",
        "Certificate confirming the student does not receive a social scholarship at another university"
      ],
      terms: "Full-time state-funded study, no academic backlogs."
    },
    ubd: {
      title: "Children of Combatants (ATO / War Veterans)",
      facultyNote: "Granted until graduation, but not beyond reaching 23 years of age.",
      documents: [
        "Copy of father's or mother's Combatant Certificate (UBD)",
        "Copy of student's birth certificate (to verify family relation)",
        "Certificate of direct participation in defense operations of Ukraine",
        "Copy of student's passport and Tax ID",
        "Copy of student ID card",
        "Standard application form"
      ],
      terms: "Full-time state-funded education, age under 23, no academic backlogs."
    },
    orphan: {
      title: "Orphan Students & Children Deprived of Parental Care",
      facultyNote: "Guarantees elevated scholarship rates and priority financial assistance.",
      documents: [
        "Copy of official guardianship authority decision granting orphan/deprived status",
        "Copy of parents' death certificate (or court decision terminating parental rights)",
        "Copy of passport, Tax ID, and student card",
        "Application for social scholarship allocation",
        "Bank account card details for payments"
      ],
      terms: "Aged 18–23, or students who lost parents during their study period."
    },
    chaes: {
      title: "Chornobyl Disaster Victims (Categories 1–3)",
      facultyNote: "Under the Law of Ukraine on status and social protection of Chornobyl disaster victims.",
      documents: [
        "Copy of Chornobyl victim certificate (categories 1–3)",
        "For minor children of deceased liquidators — copy of certified document",
        "Copy of death certificate related to Chornobyl disaster (if applicable)",
        "Copy of passport, Tax ID, student card, and application"
      ],
      terms: "Full-time state-funded study."
    },
    miners: {
      title: "Miners' Children (15+ Years Underground Experience)",
      facultyNote: "Pursuant to Article 5 of the Law of Ukraine on Mining Prestige.",
      documents: [
        "Certificate from mining enterprise stating parent's underground work experience (15+ years)",
        "OR workplace accident certificate (Form N-1) / disability certificate",
        "Copy of student's birth certificate",
        "Copy of passport, Tax ID, and student card",
        "Application"
      ],
      terms: "Enrollment within 3 years after graduating from secondary school."
    },
    disability: {
      title: "Persons with Disabilities (Groups I, II, III)",
      facultyNote: "Grants eligibility for social scholarship provided there are no academic backlogs.",
      documents: [
        "Copy of MSEK (Medical & Social Examination Commission) disability certificate",
        "OR pension certificate / state social assistance recipient card",
        "Copy of individual rehabilitation program (upon request)",
        "Copy of passport, Tax ID, student card, and application"
      ],
      terms: "Valid MSEK certificate at the time of application submission."
    }
  }
};

let activeCategory = 'vpo';
const checkedDocIndices = new Set();

function updateChecklistProgress(totalDocs) {
  const dict = I18N[currentLang] || I18N.uk;
  const count = checkedDocIndices.size;
  const pct = totalDocs > 0 ? Math.round((count / totalDocs) * 100) : 0;

  const counterEl = document.getElementById('checklist-progress-counter');
  const pctEl = document.getElementById('checklist-progress-pct');
  const barEl = document.getElementById('checklistProgressBar');
  const bannerEl = document.getElementById('checklistCompletedBanner');

  const suffix = dict["calc.progress.counterSuffix"] || (currentLang === 'en' ? 'documents' : 'документів');
  if (counterEl) counterEl.textContent = `${count} / ${totalDocs} ${suffix}`;
  if (pctEl) pctEl.textContent = `${pct}%`;
  if (barEl) barEl.style.width = `${pct}%`;
  if (bannerEl) bannerEl.style.display = (pct === 100 && totalDocs > 0) ? 'flex' : 'none';
}

function renderActiveScholarshipCategory(resetChecked = false) {
  if (resetChecked) {
    checkedDocIndices.clear();
  }

  const langData = SCHOLARSHIP_DATA[currentLang] || SCHOLARSHIP_DATA.uk;
  const data = langData[activeCategory] || langData.vpo;

  const resultTitle = document.getElementById('scholarship-result-title');
  const resultFacultyNote = document.getElementById('scholarship-faculty-note');
  const resultTerms = document.getElementById('scholarship-terms');
  const checklistContainer = document.getElementById('scholarship-checklist-items');

  if (resultTitle) resultTitle.textContent = data.title;
  if (resultFacultyNote) resultFacultyNote.textContent = data.facultyNote;
  if (resultTerms) resultTerms.textContent = data.terms;

  if (checklistContainer) {
    checklistContainer.innerHTML = data.documents.map((doc, idx) => {
      const isChecked = checkedDocIndices.has(idx);
      return `
        <li class="checklist-item ${isChecked ? 'checked' : ''}" role="checkbox" aria-checked="${isChecked}" tabindex="0" data-doc-index="${idx}">
          <div class="checklist-checkbox" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="checklist-text">${doc}</span>
        </li>
      `;
    }).join('');

    checklistContainer.querySelectorAll('.checklist-item').forEach(item => {
      const toggleItem = () => {
        const idx = parseInt(item.getAttribute('data-doc-index'), 10);
        if (checkedDocIndices.has(idx)) {
          checkedDocIndices.delete(idx);
          item.classList.remove('checked');
          item.setAttribute('aria-checked', 'false');
        } else {
          checkedDocIndices.add(idx);
          item.classList.add('checked');
          item.setAttribute('aria-checked', 'true');
        }
        updateChecklistProgress(data.documents.length);
      };

      item.addEventListener('click', toggleItem);
      item.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggleItem();
        }
      });
    });

    updateChecklistProgress(data.documents.length);
  }
}

function initCalculator() {
  const tabs = document.querySelectorAll('.calc-tab');
  const panels = document.querySelectorAll('.calc-panel');
  const catButtons = document.querySelectorAll('.cat-btn');

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Category selection for scholarship checklist
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      activeCategory = btn.getAttribute('data-category') || 'vpo';
      renderActiveScholarshipCategory(true); // reset progress for newly selected category
    });
  });

  renderActiveScholarshipCategory(true);
}

/* ==========================================================================
   8. MODAL WINDOWS
   ========================================================================== */
function initModals() {
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const backdrops = document.querySelectorAll('.modal-backdrop');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
      }
    });
  });

  const closeModal = (modal) => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) closeModal(modal);
    });
  });

  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      backdrops.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });
}

/* ==========================================================================
   9. INTERACTIVE SPOTLIGHT ON GLASS CARDS
   ========================================================================== */
function initCardSpotlights() {
  const cards = document.querySelectorAll('.glass-card, .leader-card, .club-card, .benefit-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   10. FORM SUBMISSION FEEDBACK
   ========================================================================== */
function initFormHandlers() {
  const forms = document.querySelectorAll('.app-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const isEn = currentLang === 'en';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          ${isEn ? 'Processing request...' : 'Обробка запиту...'}
        `;
      }

      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align: center; padding: 40px 20px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); border: 2px solid #10b981; color: #10b981; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 class="font-druk" style="font-size: 1.4rem; color: var(--heading-color, #fff); margin-bottom: 10px;">
              ${isEn ? 'APPLICATION ACCEPTED!' : 'ЗАЯВКУ ПРИЙНЯТО!'}
            </h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 420px; margin: 0 auto 24px;">
              ${isEn ? 'Thank you! Our secretary or union representative will contact you via Telegram shortly.' : 'Дякуємо за звернення! Наш секретар або представник Профкому зв\'яжеться з Вами в Telegram найближчим часом.'}
            </p>
            <a href="https://t.me/Profkom_NMU" target="_blank" class="btn btn-primary btn-druk">
              ${isEn ? 'OPEN TELEGRAM CHANNEL' : 'ПЕРЕЙТИ В ТЕЛЕГРАМ-КАНАЛ'}
            </a>
          </div>
        `;
      }, 1000);
    });
  });
}

/* ==========================================================================
   11. HERO DIGITAL PASS 3D TILT PHYSICS & HOLOGRAPHIC GLARE
   ========================================================================== */
function initDigitalPass3D() {
  const wrapper = document.getElementById('heroCardWrapper');
  const card = document.getElementById('digitalPassCard');
  const glare = document.getElementById('passHologramGlare');
  if (!wrapper || !card) return;

  let ticking = false;

  wrapper.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return; // Skip on mobile for ergonomics

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    if (!ticking) {
      requestAnimationFrame(() => {
        const rotateY = (deltaX * 12).toFixed(2);
        const rotateX = (-deltaY * 12).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.boxShadow = `${-deltaX * 15}px ${-deltaY * 15 + 25}px 50px -10px rgba(0, 0, 0, 0.7), 0 0 50px -10px var(--emerald-glow)`;

        if (glare) {
          const glareX = ((x / rect.width) * 100).toFixed(1);
          const glareY = ((y / rect.height) * 100).toFixed(1);
          glare.style.transform = `translate(${glareX - 100}%, ${glareY - 100}%)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  wrapper.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = '';
  });
}

/* ==========================================================================
   12. REAL-TIME KYIV CLOCK TELEMETRY
   ========================================================================== */
function initKyivClock() {
  const clockEl = document.getElementById('kyivClock');
  if (!clockEl) return;

  const updateClock = () => {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('uk-UA', {
        timeZone: 'Europe/Kyiv',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      const timeStr = formatter.format(now);
      clockEl.textContent = `KYIV, UA • ${timeStr} • UTC+2`;
    } catch (e) {
      const d = new Date();
      clockEl.textContent = `KYIV, UA • ${d.toLocaleTimeString()} • UTC+2`;
    }
  };

  updateClock();
  setInterval(updateClock, 1000);
}

