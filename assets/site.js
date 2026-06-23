/* ============================================================
   Clinky — landing logic (vanilla port of Clinky.dc.html).
   No framework. State -> render(html string) -> #app.
   3D hero uses <model-viewer> with the real GLB/USDZ in /models.
   ============================================================ */
(function () {
  'use strict';

  // ===== integration config =====
  var EO_ACTION = '';          // EmailOctopus embedded-form action URL (waitlist). Empty => just confirm locally.
  var SUPPORT_ENDPOINT = '';   // optional POST endpoint for support; empty => mailto
  var CONTACT_EMAIL = 'evgeniymityulya.ios@gmail.com';
  var C = '#FF4F62';

  // ===== state =====
  var state = {
    lang: 'en', page: 'home', scrolled: false, sel: 'beer',
    gameIndex: 0, qIndex: 0, waitlistDone: false, supportDone: false
  };
  var animTimer = null, animBack = null, animKickoff = null;

  // ===== content =====
  var DICT = {
    en: {
      navHome: 'Home', navAbout: 'About', navSupport: 'Support', navPrivacy: 'Privacy', navTerms: 'Terms', navJoin: 'Join waitlist',
      heroEyebrow: 'Coming soon to the App Store',
      heroTitle: 'Make seeing your friends a game',
      heroLede: 'Clinky turns any hangout into a game. Break the ice with real cards, log every meet-up, and collect a 3D drink for each clink.',
      heroCta: 'Join the waitlist', heroMicro: 'No spam. One email the day we launch.', trust1: 'Free to join', trust2: 'No spam, ever', trust3: 'iPhone · iOS 17+', swipeHint: 'Hover to take a closer look',
      heroDone: "You're on the list. We'll send the App Store link the moment Clinky goes live.",
      emailPh: 'you@email.com', beer: 'Beer', coffee: 'Coffee',
      gamesKicker: 'Try it right here', gamesTitle: 'Cards that break any silence',
      gamesSub: 'These are real cards from the app. Pick a game and tap through — no download needed.',
      tapSwipe: 'Tap or swipe', dislike: 'Skip', like: 'Like', cardHint: 'Tap the card for the next question',
      galleryTitle: 'Take a look inside', gallerySub: 'Real screens straight from the app.',
      featTitle: 'Everything in one app', featSub: 'No accounts. No clutter. Just your people.',
      howKicker: 'How it works', howTitle: 'Three taps to a better hangout',
      finalTitle: 'Be first to clink', finalSub: "Join the waitlist — we'll send the App Store link the day Clinky is live.",
      aboutTitle: 'About Clinky',
      aboutLede: 'Clinky is an iOS app for the friendships you never want to drift. Track who you meet, play party-game cards together, and keep a little 3D memento from every get-together.',
      aboutMission: "We built Clinky because the best moments happen face to face — and they're easy to let slip. Clinky is a gentle nudge to see your people more often, and a game to make every meet-up worth remembering.",
      p1t: 'A friends tracker', p1d: "Remember who you saw, when, and who you haven't met in a while.",
      p2t: 'Any drink', p2d: 'Beer, coffee, tea or nothing at all — Clinky is about meeting, not drinking.',
      p3t: 'Party games', p3d: 'Ice-breaker cards that get any table talking in seconds.',
      supTitle: 'Support', supSub: 'Found a bug or have an idea? Write to us — we read everything.',
      supName: 'Your name', supEmailPh: 'you@email.com', supMsgPh: 'Tell us what happened or what you have in mind…',
      supSend: 'Send message', supNote: 'Opens your mail app, addressed straight to the Clinky team.',
      supDone: "Thanks — your message is on its way. We'll get back to you soon.",
      privTitle: 'Privacy Policy', termsTitle: 'Terms of Use', docUpdated: 'Last updated: June 22, 2026',
      docContact: 'Questions about this document? Email us at evgeniymityulya.ios@gmail.com and we will help.',
      footNote: 'A social tracker for the people, drinks and moments worth remembering.',
      footComingSoon: 'Coming to the App Store', footProduct: 'Product', footLegalReach: 'Legal & contact', footEmail: 'Email us',
      footRights: 'Made for people who would rather meet up.'
    },
    ru: {
      navHome: 'Главная', navAbout: 'О нас', navSupport: 'Поддержка', navPrivacy: 'Privacy', navTerms: 'Terms', navJoin: 'В очередь',
      heroEyebrow: 'Скоро в App Store',
      heroTitle: 'Преврати встречи с друзьями в игру',
      heroLede: 'Clinky превращает любую встречу в игру. Разговори компанию реальными карточками, отмечай встречи и собирай 3D-напиток за каждый «чок».',
      heroCta: 'Встать в очередь', heroMicro: 'Без спама. Одно письмо в день релиза.', trust1: 'Бесплатно', trust2: 'Без спама', trust3: 'iPhone · iOS 17+', swipeHint: 'Наведи, чтобы рассмотреть',
      heroDone: 'Ты в очереди. Пришлём ссылку на App Store, как только Clinky выйдет.',
      emailPh: 'ты@почта.com', beer: 'Пиво', coffee: 'Кофе',
      gamesKicker: 'Попробуй прямо тут', gamesTitle: 'Карточки, что разговорят любую компанию',
      gamesSub: 'Это реальные карточки из приложения. Выбери игру и листай — ничего качать не нужно.',
      tapSwipe: 'Тап или свайп', dislike: 'Пропустить', like: 'Нравится', cardHint: 'Нажми на карточку — будет следующий вопрос',
      galleryTitle: 'Загляни внутрь', gallerySub: 'Реальные экраны прямо из приложения.',
      featTitle: 'Всё в одном приложении', featSub: 'Без аккаунтов и лишнего. Только твои люди.',
      howKicker: 'Как это работает', howTitle: 'Три шага к лучшей встрече',
      finalTitle: 'Будь первым, кто чокнется', finalSub: 'Встань в очередь — пришлём ссылку на App Store в день релиза Clinky.',
      aboutTitle: 'О Clinky',
      aboutLede: 'Clinky — iOS-приложение для дружбы, которую не хочется терять. Отмечай встречи, играй вместе в карточки-игры и забирай маленький 3D-сувенир с каждой посиделки.',
      aboutMission: 'Мы сделали Clinky, потому что лучшие моменты случаются вживую — и их так легко упустить. Clinky мягко напоминает видеться чаще и превращает каждую встречу в игру, которую хочется запомнить.',
      p1t: 'Трекер друзей', p1d: 'Помни, кого и когда видел и с кем давно не пересекался.',
      p2t: 'Любой напиток', p2d: 'Пиво, кофе, чай или вообще без — Clinky про встречи, а не про алкоголь.',
      p3t: 'Игры для компании', p3d: 'Карточки-ice-breaker, которые разговорят любой стол за секунды.',
      supTitle: 'Поддержка', supSub: 'Нашёл баг или есть идея? Напиши нам — мы читаем всё.',
      supName: 'Как тебя зовут', supEmailPh: 'ты@почта.com', supMsgPh: 'Расскажи, что случилось или что задумал…',
      supSend: 'Отправить', supNote: 'Откроется почтовый клиент с письмом прямо команде Clinky.',
      supDone: 'Спасибо — письмо отправляется. Скоро ответим.',
      privTitle: 'Политика конфиденциальности', termsTitle: 'Условия использования', docUpdated: 'Последнее обновление: 22 июня 2026 г.',
      docContact: 'Вопросы по документу? Напиши на evgeniymityulya.ios@gmail.com — поможем.',
      footNote: 'Социальный трекер людей, напитков и моментов, которые стоит помнить.',
      footComingSoon: 'Скоро в App Store', footProduct: 'Продукт', footLegalReach: 'Документы и связь', footEmail: 'Написать нам',
      footRights: 'Сделано для тех, кто лучше встретится.'
    }
  };

  var GAMES = [
    { title: { en: 'Never have I ever', ru: 'Я никогда не' }, q: [
      { en: "Never have I ever greeted a stranger's dog with way more enthusiasm than I gave the owner", ru: 'Я никогда не здоровался с чужой собакой охотнее, чем с её хозяином' },
      { en: "Never have I ever rehearsed an entire conversation in my head with someone I hadn't even met yet", ru: 'Я никогда не придумывал целые диалоги в голове с теми, кого только собирался встретить' },
      { en: "Never have I ever saved something too nice 'for a special occasion' that never actually came", ru: 'Я никогда не хранил слишком хорошую вещь «для особого случая», который так и не наступил' },
      { en: 'Never have I ever remembered a random stranger and later wondered how their life turned out', ru: 'Я никогда не запоминал случайного прохожего и потом гадал, как сложилась его жизнь' },
      { en: 'Never have I ever gone down a 2 a.m. rabbit hole of my own old photos and chats', ru: 'Я никогда не залипал ночью на своих старых фото и переписках' }
    ]},
    { title: { en: 'Roulette', ru: 'Рулетка' }, q: [
      { en: "*Alex*, tell us the funniest thing that's ever gone down with *Sam*", ru: '*Аня*, расскажи самый смешной случай, связанный с *Максом*' },
      { en: "*Alex*, what's the one thing about *Sam* you genuinely admire?", ru: '*Аня*, что в *Максе* тебя восхищает больше всего?' },
      { en: '*Alex*, what about *Sam* drove you a little nuts at first but now just makes you smile?', ru: '*Аня*, что в *Максе* тебя поначалу слегка раздражало, а теперь вспоминается с улыбкой?' },
      { en: '*Alex*, in what kind of mess would you trust *Sam* to have your back?', ru: '*Аня*, в какой ситуации ты бы доверила *Максу* прикрыть тебя?' },
      { en: "*Alex*, what's *Sam* weirdly good at that you wish you could pick up?", ru: '*Аня*, что *Макс* умеет такого, чему стоит поучиться?' }
    ]},
    { title: { en: 'Tell a moment', ru: 'Расскажи момент' }, q: [
      { en: 'Tell us about your most cringe-worthy moment from school', ru: 'Расскажи самый неловкий момент в школе' },
      { en: 'Tell us about a time you genuinely shocked yourself', ru: 'Расскажи момент, когда ты сильнее всего удивил себя самого' },
      { en: "Tell us about a gift you'll remember for the rest of your life", ru: 'Расскажи о подарке, который ты запомнил на всю жизнь' },
      { en: "Tell us about the strangest dream you've ever had", ru: 'Расскажи самый странный сон, который тебе снился' },
      { en: "Tell us about a place you're dying to go back to", ru: 'Расскажи о месте, куда хочешь обязательно вернуться' }
    ]},
    { title: { en: 'Would you rather', ru: 'Что выберешь' }, q: [
      { en: 'Would you rather jump 10 years into the past or 10 years into the future?', ru: 'Что выберешь: вернуться на 10 лет назад или прыгнуть на 10 лет вперёд?' },
      { en: 'Would you rather always tell other people the truth or never lie to yourself?', ru: 'Что выберешь: всегда говорить правду или никогда не врать самому себе?' },
      { en: 'Would you rather travel the world for a year with no money or stay home for a year with no internet?', ru: 'Что выберешь: один год путешествовать без денег или год дома без интернета?' },
      { en: 'Would you rather know the answer to any question or be able to talk anyone into anything?', ru: 'Что выберешь: знать ответ на любой вопрос или уметь убедить любого в чём угодно?' },
      { en: 'Would you rather forget anything you want on command or never forget a single thing?', ru: 'Что выберешь: уметь забывать что угодно по желанию или никогда ничего не забывать?' }
    ]}
  ];

  var FAQ = {
    en: [
      { q: 'When does Clinky launch?', a: "Soon. Join the waitlist and we'll email you the App Store link the day it's live." },
      { q: 'Is it free?', a: 'Yes — Clinky is free to start. An optional Clinky Pro will unlock a few extras.' },
      { q: 'What about my data?', a: 'Clinky is offline-first with no accounts. Your data stays on your device — we never see it.' },
      { q: 'Which devices are supported?', a: 'iPhone on iOS 17 and later.' }
    ],
    ru: [
      { q: 'Когда выйдет Clinky?', a: 'Скоро. Встань в очередь — пришлём ссылку на App Store в день релиза.' },
      { q: 'Это бесплатно?', a: 'Да — Clinky бесплатен на старте. Опциональный Clinky Pro откроет пару дополнений.' },
      { q: 'А что с моими данными?', a: 'Clinky работает офлайн и без аккаунтов. Данные остаются на твоём устройстве — мы их не видим.' },
      { q: 'Какие устройства поддерживаются?', a: 'iPhone на iOS 17 и новее.' }
    ]
  };

  // ===== helpers =====
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function tdict() {
    var raw = DICT[state.lang], t = {};
    for (var k in raw) t[k] = typeof raw[k] === 'string' ? raw[k].replace(/\.+$/, '') : raw[k];
    return t;
  }
  function ph(name, size, color, weight) {
    return '<i class="' + (weight || 'ph') + ' ph-' + name + '" style="font-size:' + (size || 22) + 'px;color:' + (color || 'currentColor') + ';line-height:1;display:inline-flex;flex:none"></i>';
  }
  function overHero() { return (state.page === 'home' || state.page === 'about') && !state.scrolled; }

  // ===== style builders =====
  function navPill(active, light) {
    var b = "border:0;cursor:pointer;border-radius:999px;padding:8px 15px;font-weight:700;font-size:14px;white-space:nowrap;transition:all .22s;font-family:'DM Sans',sans-serif;";
    if (active) return b + (light ? 'background:#FFFBFA;color:#E11D48;box-shadow:0 4px 14px rgba(120,10,30,.22);' : 'background:#FF4F62;color:#fff;box-shadow:0 6px 16px rgba(255,79,98,.35);');
    return b + 'background:transparent;color:' + (light ? 'rgba(255,251,250,.92)' : '#6b6b76') + ';';
  }
  function pill(active) {
    var b = 'border:0;cursor:pointer;border-radius:999px;padding:10px 16px;font-weight:700;font-size:14.5px;transition:all .22s;display:inline-flex;align-items:center;gap:7px;';
    return active ? b + 'background:#FF4F62;color:#fff;box-shadow:0 8px 20px rgba(255,79,98,.32);' : b + 'background:#fff;color:#6b6b76;border:1px solid #f0dde1;';
  }
  function langSeg(active, light) {
    var b = 'border:0;cursor:pointer;border-radius:999px;padding:6px 12px;font-weight:700;font-size:13px;transition:all .25s;';
    return active ? b + 'background:' + (light ? '#FFFBFA' : '#1c1326') + ';color:' + (light ? '#C32748' : '#fff') + ';' : b + 'background:transparent;color:' + (light ? 'rgba(255,251,250,.85)' : '#6b6b76') + ';';
  }
  function langSegDark(active) {
    var b = 'border:1px solid rgba(255,255,255,.2);cursor:pointer;border-radius:8px;padding:5px 11px;font-weight:700;font-size:12.5px;transition:all .2s;';
    return active ? b + 'background:#FF4F62;color:#fff;border-color:#FF4F62;' : b + 'background:transparent;color:rgba(255,251,250,.7);';
  }
  function drinkSeg(active) {
    var b = 'border:0;cursor:pointer;border-radius:999px;padding:9px 16px;font-weight:700;font-size:14px;transition:all .25s;backdrop-filter:blur(6px);white-space:nowrap;display:inline-flex;align-items:center;gap:6px;';
    return active ? b + 'background:#FFFBFA;color:#C32748;box-shadow:0 6px 16px rgba(0,0,0,.2);' : b + 'background:rgba(255,255,255,.18);color:#FFFBFA;border:1px solid rgba(255,255,255,.32);';
  }
  function gameIcon(i, color, s) {
    var names = ['eye-slash', 'target', 'chat-circle', 'arrows-left-right'];
    return ph(names[i] || names[3], s || 18, color, 'ph-bold');
  }

  function icons() {
    return {
      people: ph('users-three', 28, C, 'ph-fill'),
      cupBig: ph('coffee', 28, C, 'ph-fill'),
      game: ph('game-controller', 28, C, 'ph-fill'),
      chat: ph('chat-teardrop-dots', 30, C, 'ph-fill'),
      flame: ph('flame', 26, C, 'ph-fill'),
      cube: ph('cube', 26, C, 'ph-fill'),
      chart: ph('chart-bar', 26, C, 'ph-fill'),
      mail: ph('envelope', 18, 'currentColor'),
      apple: ph('apple-logo', 20, 'currentColor', 'ph-fill'),
      check: ph('check-circle', 24, '#fff', 'ph-fill'),
      checkPink: ph('check-circle', 24, '#FF4F62', 'ph-fill'),
      checkMini: ph('check', 15, '#FFD166', 'ph-bold'),
      skip: ph('x', 22, '#b9b0b6', 'ph-bold'),
      heart: ph('heart', 26, '#fff', 'ph-fill'),
      never: gameIcon(0, '#6b6b76', 18),
      target: gameIcon(1, '#6b6b76', 18),
      bubble: gameIcon(2, '#6b6b76', 18),
      swap: gameIcon(3, '#6b6b76', 18)
    };
  }
  function pchk() { return ph('check', 15, '#FF4F62', 'ph-bold'); }

  // ===== model attrs =====
  function modelGlb() { return state.sel === 'coffee' ? 'models/CoffeeCup.glb' : 'models/BeerCap.glb'; }
  function modelUsdz() { return state.sel === 'coffee' ? 'models/CoffeeCup.usdz' : 'models/BeerCap.usdz'; }
  function camOrbit() { return state.sel === 'coffee' ? '18deg 80deg auto' : '25deg 62deg auto'; }
  function fov() { return state.sel === 'coffee' ? '27deg' : '30deg'; }
  function rotSpeed() { return state.sel === 'coffee' ? '16deg' : '18deg'; }

  // ===== header / footer =====
  function renderHeader() {
    var t = tdict(), oh = overHero(), p = state.page;
    var seg = 'display:flex;padding:4px;border-radius:999px;flex:none;backdrop-filter:blur(6px);background:' + (oh ? 'rgba(255,255,255,.18)' : 'rgba(28,19,38,.06)') + ';border:' + (oh ? '1px solid rgba(255,255,255,.26)' : '1px solid rgba(28,19,38,.08)') + ';';
    var word = "font-family:'Nunito',sans-serif;font-weight:900;font-size:22px;letter-spacing:-.5px;color:" + (oh ? '#FFFBFA' : '#1c1326') + ';';
    var navDiv = 'width:1px;height:20px;background:' + (oh ? 'rgba(255,255,255,.3)' : 'rgba(28,19,38,.12)') + ';margin:0 6px;flex:none;';
    var join = "border:0;cursor:pointer;border-radius:999px;padding:9px 17px;font-weight:800;font-size:14px;font-family:'Nunito',sans-serif;white-space:nowrap;transition:transform .2s,box-shadow .2s;" + (oh ? 'background:#FFFBFA;color:#E11D48;' : 'background:#FF4F62;color:#fff;box-shadow:0 6px 16px rgba(255,79,98,.35);');
    return '' +
      '<button data-act="home" style="display:flex;align-items:center;gap:10px;background:transparent;border:0;cursor:pointer;padding:0;flex:none">' +
        '<img src="assets/clinky-icon.png" alt="Clinky" style="width:38px;height:38px;border-radius:11px;box-shadow:0 5px 16px rgba(225,29,72,.35)">' +
        '<span style="' + word + '">Clinky</span>' +
      '</button>' +
      '<nav class="nav-mid" style="flex:1;display:flex;align-items:center;justify-content:center;gap:4px;padding:0 8px">' +
        '<button data-act="home" style="' + navPill(p === 'home', oh) + '">' + esc(t.navHome) + '</button>' +
        '<button data-act="about" style="' + navPill(p === 'about', oh) + '">' + esc(t.navAbout) + '</button>' +
        '<button data-act="support" style="' + navPill(p === 'support', oh) + '">' + esc(t.navSupport) + '</button>' +
        '<span class="nav-legal" style="' + navDiv + '"></span>' +
        '<button data-act="privacy" class="nav-legal" style="' + navPill(p === 'privacy', oh) + '">' + esc(t.navPrivacy) + '</button>' +
        '<button data-act="terms" class="nav-legal" style="' + navPill(p === 'terms', oh) + '">' + esc(t.navTerms) + '</button>' +
      '</nav>' +
      '<div style="display:flex;align-items:center;gap:10px;flex:none">' +
        '<button data-act="join" class="join-cta" style="' + join + '">' + esc(t.navJoin) + '</button>' +
        '<div style="' + seg + '">' +
          '<button data-act="en" style="' + langSeg(state.lang === 'en', oh) + '">EN</button>' +
          '<button data-act="ru" style="' + langSeg(state.lang === 'ru', oh) + '">RU</button>' +
        '</div>' +
      '</div>';
  }

  function renderFooter() {
    var t = tdict(), I = icons();
    var lnk = "background:transparent;border:0;cursor:pointer;font-size:14.5px;color:rgba(255,251,250,.82);padding:0;font-family:'DM Sans',sans-serif";
    return '' +
      '<div style="height:clamp(44px,6vh,64px)"></div>' +
      '<div style="max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:34px" class="pillars">' +
        '<div style="max-width:300px">' +
          '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">' +
            '<img src="assets/clinky-icon.png" alt="Clinky" style="width:38px;height:38px;border-radius:11px">' +
            '<span style="font-family:\'Nunito\',sans-serif;font-weight:900;font-size:23px">Clinky</span>' +
          '</div>' +
          '<p style="font-family:\'Nunito\',sans-serif;font-weight:800;font-size:15px;color:rgba(255,251,250,.92);margin:0 0 8px">Tap. Clink. Meet again.</p>' +
          '<p style="font-size:13.5px;color:rgba(255,251,250,.5);margin:0 0 18px;line-height:1.55">' + esc(t.footNote) + '</p>' +
          '<div style="display:inline-flex;align-items:center;gap:10px;padding:10px 16px;border-radius:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);font-size:13.5px;font-weight:600;color:rgba(255,251,250,.88)">' + I.apple + esc(t.footComingSoon) + '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">' +
          '<div style="font-family:\'Nunito\',sans-serif;font-weight:800;font-size:12.5px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,251,250,.4);margin-bottom:2px">' + esc(t.footProduct) + '</div>' +
          '<button data-act="home" style="' + lnk + '">' + esc(t.navHome) + '</button>' +
          '<button data-act="about" style="' + lnk + '">' + esc(t.navAbout) + '</button>' +
          '<button data-act="support" style="' + lnk + '">' + esc(t.navSupport) + '</button>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">' +
          '<div style="font-family:\'Nunito\',sans-serif;font-weight:800;font-size:12.5px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,251,250,.4);margin-bottom:2px">' + esc(t.footLegalReach) + '</div>' +
          '<button data-act="privacy" style="' + lnk + '">' + esc(t.navPrivacy) + '</button>' +
          '<button data-act="terms" style="' + lnk + '">' + esc(t.navTerms) + '</button>' +
          '<a href="mailto:' + CONTACT_EMAIL + '" style="display:inline-flex;align-items:center;gap:7px;font-size:14.5px;color:rgba(255,251,250,.82)">' + I.mail + esc(t.footEmail) + '</a>' +
        '</div>' +
      '</div>' +
      '<div style="max-width:1080px;margin:34px auto 0;padding-top:20px;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap">' +
        '<span style="font-size:12.5px;color:rgba(255,251,250,.45)">© 2026 Clinky · ' + esc(t.footRights) + '</span>' +
        '<div style="display:flex;gap:6px">' +
          '<button data-act="en" style="' + langSegDark(state.lang === 'en') + '">EN</button>' +
          '<button data-act="ru" style="' + langSegDark(state.lang === 'ru') + '">RU</button>' +
        '</div>' +
      '</div>';
  }

  // ===== waitlist form =====
  function waitlistForm(centered) {
    var t = tdict();
    if (state.waitlistDone) {
      return '<div style="display:inline-flex;align-items:center;gap:13px;padding:18px 22px;border-radius:18px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.32);max-width:31em;animation:popIn .5s ease both">' +
        '<span style="display:inline-flex;flex:none">' + icons().check + '</span><span style="font-weight:600;font-size:15.5px;line-height:1.45">' + esc(t.heroDone) + '</span></div>';
    }
    var formStyle = centered ? 'display:flex;gap:10px;max-width:30em;margin:0 auto;flex-wrap:wrap' : 'display:flex;gap:10px;max-width:31em';
    return '<form data-form="waitlist" style="' + formStyle + '">' +
        '<input name="email" type="email" required placeholder="' + esc(t.emailPh) + '" style="flex:1;min-width:' + (centered ? '200px' : '160px') + ';border:0;border-radius:15px;padding:' + (centered ? '16px 18px' : '17px 18px') + ';font-size:15.5px;background:#FFFBFA;color:#1c1326;outline:none;box-shadow:0 10px 30px rgba(120,10,30,.28)">' +
        '<button type="submit" class="cta-btn" style="border:0;cursor:pointer;border-radius:15px;padding:' + (centered ? '16px 26px' : '17px 26px') + ';font-family:\'Nunito\',sans-serif;font-weight:800;font-size:15.5px;color:#3a1a02;background:linear-gradient(180deg,#FFD75E,#FFB92E);box-shadow:0 12px 28px rgba(180,110,10,.42);transition:transform .2s,box-shadow .2s;white-space:nowrap">' + esc(t.heroCta) + '</button>' +
      '</form>';
  }

  // ===== HOME =====
  function renderHome() {
    var t = tdict(), I = icons(), L = state.lang;

    var hero = '<section style="position:relative;background:linear-gradient(165deg,#FF5C6E 0%,#E11D48 56%,#C21540 100%);color:#FFFBFA;padding:clamp(116px,16vh,158px) clamp(20px,5vw,72px) clamp(60px,10vh,104px);overflow:hidden">' +
      '<div data-blob="1" style="position:absolute;width:540px;height:540px;border-radius:50%;background:radial-gradient(circle,rgba(255,184,140,.5),transparent 66%);top:-14%;left:-12%;animation:meshA 16s ease-in-out infinite;pointer-events:none;will-change:transform;filter:blur(8px)"></div>' +
      '<div data-blob="2" style="position:absolute;width:480px;height:480px;border-radius:50%;background:radial-gradient(circle,rgba(255,86,128,.5),transparent 66%);bottom:-18%;right:-10%;animation:meshB 19s ease-in-out infinite;pointer-events:none;will-change:transform;filter:blur(8px)"></div>' +
      '<div style="position:absolute;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(255,209,102,.3),transparent 64%);top:28%;left:38%;animation:floatSlow 14s ease-in-out infinite;pointer-events:none"></div>' +
      '<div style="position:absolute;color:#fff;font-size:24px;top:15%;right:30%;animation:twinkle 4s ease-in-out infinite;pointer-events:none">✦</div>' +
      '<div style="position:absolute;color:#fff;font-size:14px;top:27%;right:24%;animation:twinkle 3.2s ease-in-out infinite .5s;pointer-events:none">✦</div>' +
      '<div style="position:absolute;color:rgba(255,255,255,.7);font-size:13px;bottom:26%;left:9%;animation:twinkle 3.6s ease-in-out infinite .9s;pointer-events:none">✦</div>' +
      '<div style="position:absolute;inset:0;pointer-events:none;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px);background-size:4px 4px"></div>' +
      '<div style="position:relative;max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.08fr .92fr;gap:clamp(28px,5vw,64px);align-items:center" class="hero-grid">' +
        '<div>' +
          '<div class="hero-eyebrow" style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);font-weight:700;font-size:13.5px;margin-bottom:24px;backdrop-filter:blur(6px);white-space:nowrap">' +
            '<span style="width:8px;height:8px;border-radius:50%;background:#FFD166;box-shadow:0 0 10px #FFD166;animation:pulse 2.2s ease-in-out infinite"></span>' + esc(t.heroEyebrow) +
          '</div>' +
          '<h1 style="font-family:\'Nunito\',sans-serif;font-weight:900;font-size:clamp(40px,5.8vw,66px);line-height:1.04;letter-spacing:-1.8px;margin:0 0 20px;text-wrap:balance">' + esc(t.heroTitle) + '</h1>' +
          '<p style="font-size:clamp(16.5px,1.55vw,20px);line-height:1.55;color:rgba(255,251,250,.9);max-width:30em;margin:0 0 30px">' + esc(t.heroLede) + '</p>' +
          '<div id="wl1">' + waitlistForm(false) + '</div>' +
          (state.waitlistDone ? '' :
          '<div class="hero-trust" style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin:18px 2px 0;font-size:13px;font-weight:600;color:rgba(255,251,250,.84)">' +
            '<span style="display:inline-flex;align-items:center;gap:6px">' + I.checkMini + esc(t.trust1) + '</span>' +
            '<span style="display:inline-flex;align-items:center;gap:6px">' + I.checkMini + esc(t.trust2) + '</span>' +
            '<span style="display:inline-flex;align-items:center;gap:6px">' + I.checkMini + esc(t.trust3) + '</span>' +
          '</div>') +
        '</div>' +
        '<div style="position:relative">' +
          '<div data-act="play" style="position:relative;aspect-ratio:1/1;max-width:520px;margin:0 auto;perspective:900px;cursor:pointer">' +
            '<div style="position:absolute;inset:4% 4% 6%;background:radial-gradient(circle at 50% 52%,rgba(255,209,102,.4),rgba(255,140,120,.12) 45%,transparent 66%);pointer-events:none"></div>' +
            '<div style="position:absolute;left:18%;right:18%;bottom:14%;height:26px;background:radial-gradient(ellipse at center,rgba(60,10,25,.4),transparent 72%);filter:blur(9px);pointer-events:none"></div>' +
            '<model-viewer id="drinkModel" src="' + modelGlb() + '" ios-src="' + modelUsdz() + '" alt="Clinky 3D collectible" ar ar-modes="quick-look webxr" auto-rotate auto-rotate-delay="0" rotation-per-second="' + rotSpeed() + '" camera-orbit="' + camOrbit() + '" field-of-view="' + fov() + '" interaction-prompt="none" disable-tap disable-zoom interpolation-decay="180" shadow-intensity="0.85" exposure="1.05" environment-image="neutral" style="position:absolute;inset:0;width:100%;height:100%;transform-origin:50% 60%;--poster-color:transparent;background-color:transparent"></model-viewer>' +
            '<div id="fxLayer" aria-hidden="true" style="position:absolute;inset:0;pointer-events:none;overflow:visible;z-index:2"></div>' +
            '<div style="position:absolute;left:0;right:0;bottom:14px;display:flex;justify-content:center;gap:8px;z-index:3">' +
              '<button id="chipBeer" data-act="beer" style="' + drinkSeg(state.sel === 'beer') + '">' + esc(t.beer) + '</button>' +
              '<button id="chipCoffee" data-act="coffee" style="' + drinkSeg(state.sel === 'coffee') + '">' + esc(t.coffee) + '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';

    var proofData = {
      en: [{ t: '100% private — no accounts', ic: ph('lock-simple', 18, C, 'ph-fill') }, { t: 'Works fully offline', ic: ph('wifi-slash', 18, C, 'ph-fill') }, { t: 'Free to join the waitlist', ic: ph('gift', 18, C, 'ph-fill') }],
      ru: [{ t: '100% приватно — без аккаунтов', ic: ph('lock-simple', 18, C, 'ph-fill') }, { t: 'Работает полностью офлайн', ic: ph('wifi-slash', 18, C, 'ph-fill') }, { t: 'Очередь — бесплатно', ic: ph('gift', 18, C, 'ph-fill') }]
    }[L];
    var proof = '<section style="background:#FFF8F4;border-bottom:1px solid #f4e7ea;padding:18px clamp(20px,5vw,72px)">' +
      '<div style="max-width:1000px;margin:0 auto;display:flex;flex-wrap:wrap;gap:14px 38px;justify-content:center;align-items:center">' +
      proofData.map(function (p) { return '<span style="display:inline-flex;align-items:center;gap:9px;font-size:14px;font-weight:600;color:#5d5660">' + p.ic + esc(p.t) + '</span>'; }).join('') +
      '</div></section>';

    var card = renderQuestionSection();

    var galBase = [1, 2, 3, 4, 5, 6, 7];
    var galItems = galBase.concat(galBase).map(function (n) {
      return '<div class="gcard" style="flex:none;width:240px;border-radius:30px;overflow:hidden;box-shadow:0 18px 42px rgba(225,29,72,.18);background:#fff">' +
        '<img src="assets/shots/' + L + '-' + n + '.jpg" alt="Clinky screen" loading="lazy" draggable="false" style="display:block;width:100%;aspect-ratio:1080/2340;height:auto;-webkit-user-drag:none"></div>';
    }).join('');
    var gallery = '<section style="background:linear-gradient(180deg,#FFF1ED,#FFF8F4);padding:clamp(58px,9vh,104px) 0">' +
      '<div style="max-width:1080px;margin:0 auto 6px;padding:0 clamp(20px,5vw,72px);text-align:center">' +
        '<h2 style="font-family:\'Nunito\',sans-serif;font-weight:900;font-size:clamp(27px,3.8vw,44px);line-height:1.08;letter-spacing:-1px;margin:0 0 10px;text-wrap:balance">' + esc(t.galleryTitle) + '</h2>' +
        '<p style="font-size:16.5px;color:#6b6b76;margin:0">' + esc(t.gallerySub) + '</p>' +
      '</div>' +
      '<div class="mwrap"><div class="marquee" id="clinkygal">' + galItems + '</div></div>' +
      '<p style="text-align:center;font-size:13.5px;color:#a99ea6;margin:6px 0 0">' + esc(t.swipeHint) + '</p>' +
    '</section>';

    var stepData = {
      en: [
        { n: '1', t: 'Log a meet-up', d: 'Mark who you saw and what you drank — beer, coffee or nothing at all', ic: I.people },
        { n: '2', t: 'Play a card', d: 'Break the ice with party-game cards that get any table talking', ic: I.game },
        { n: '3', t: 'Collect a 3D drink', d: 'Earn a collectible souvenir for every clink you log', ic: I.cube }
      ],
      ru: [
        { n: '1', t: 'Отметь встречу', d: 'Запиши, кого видел и что пили — пиво, кофе или вообще без', ic: I.people },
        { n: '2', t: 'Сыграй в карточку', d: 'Разговори компанию карточками-играми за секунды', ic: I.game },
        { n: '3', t: 'Забери 3D-напиток', d: 'Получай коллекционный сувенир за каждый «чок»', ic: I.cube }
      ]
    }[L];
    var how = '<section style="background:#FFFBFA;padding:clamp(56px,8vh,96px) clamp(20px,5vw,72px)">' +
      '<div style="max-width:1000px;margin:0 auto">' +
      '<div style="text-align:center;margin-bottom:46px">' +
        '<div style="font-family:\'Nunito\',sans-serif;font-weight:800;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#FF4F62;margin-bottom:12px">' + esc(t.howKicker) + '</div>' +
        '<h2 style="font-family:\'Nunito\',sans-serif;font-weight:900;font-size:clamp(27px,3.8vw,44px);line-height:1.08;letter-spacing:-1px;margin:0;text-wrap:balance">' + esc(t.howTitle) + '</h2>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:22px" class="feat-grid">' +
      stepData.map(function (s) {
        return '<div style="text-align:center;padding:8px">' +
          '<div style="position:relative;width:64px;height:64px;border-radius:20px;background:linear-gradient(165deg,#FF6B7A,#E11D48);display:flex;align-items:center;justify-content:center;margin:0 auto 18px;box-shadow:0 12px 26px rgba(225,29,72,.28);color:#fff">' + s.ic +
            '<span style="position:absolute;top:-9px;right:-9px;width:27px;height:27px;border-radius:50%;background:#1c1326;color:#fff;font-family:\'Nunito\',sans-serif;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;border:2px solid #FFFBFA">' + s.n + '</span></div>' +
          '<h3 style="font-family:\'Nunito\',sans-serif;font-weight:800;font-size:19px;margin:0 0 8px">' + esc(s.t) + '</h3>' +
          '<p style="font-size:14.5px;line-height:1.55;color:#6b6b76;margin:0 auto;max-width:22em">' + esc(s.d) + '</p>' +
        '</div>';
      }).join('') +
      '</div></div></section>';

    var spotData = {
      en: [
        { t: 'Keep your streaks alive', d: 'See who you meet most, hold a streak with the people who matter, and get a gentle nudge when it has been too long', n: 3, ic: I.flame, points: ['Meeting streaks', 'Smart reminders'] },
        { t: 'A souvenir from every clink', d: 'Every meet-up you log earns a collectible 3D drink you can spin and keep — your friendships, on a shelf', n: 2, ic: I.cube, points: ['3D collectibles', 'Unlockable achievements'] },
        { t: 'Your whole social year', d: 'Who you see most, your favourite drinks and how your year adds up — all in clean, private charts', n: 6, ic: I.chart, points: ['Personal stats', 'Private & offline'] }
      ],
      ru: [
        { t: 'Держи серию встреч', d: 'Смотри, кого видишь чаще, держи серию с близкими и получай мягкое напоминание, когда давно не виделись', n: 3, ic: I.flame, points: ['Серии встреч', 'Умные напоминания'] },
        { t: 'Сувенир за каждый «чок»', d: 'Каждая отмеченная встреча приносит коллекционный 3D-напиток, который можно покрутить и оставить себе', n: 2, ic: I.cube, points: ['3D-коллекция', 'Достижения'] },
        { t: 'Твой год встреч', d: 'Кого видишь чаще, любимые напитки и как складывается год — в чистых приватных графиках', n: 6, ic: I.chart, points: ['Личная статистика', 'Приватно и офлайн'] }
      ]
    }[L];
    var spots = '<section style="background:#FFF8F4;padding:clamp(60px,9vh,108px) clamp(20px,5vw,72px)">' +
      '<div style="max-width:1040px;margin:0 auto">' +
      '<div style="text-align:center;margin-bottom:clamp(40px,6vh,60px)">' +
        '<h2 style="font-family:\'Nunito\',sans-serif;font-weight:900;font-size:clamp(27px,3.8vw,44px);line-height:1.08;letter-spacing:-1px;margin:0 0 12px;text-wrap:balance">' + esc(t.featTitle) + '</h2>' +
        '<p style="font-size:16.5px;color:#6b6b76;margin:0">' + esc(t.featSub) + '</p>' +
      '</div>' +
      spotData.map(function (s, i) {
        var pts = s.points.map(function (pt) { return '<span style="display:inline-flex;align-items:center;gap:9px;font-size:14.5px;font-weight:600;color:#1c1326">' + pchk() + esc(pt) + '</span>'; }).join('');
        return '<div class="spot-row" style="display:flex;gap:clamp(30px,5vw,68px);align-items:center;margin-bottom:clamp(40px,6vh,70px);flex-direction:' + (i % 2 ? 'row-reverse' : 'row') + '">' +
          '<div style="flex:1;min-width:0">' +
            '<span style="display:inline-flex;width:52px;height:52px;border-radius:15px;background:#FFE2E6;align-items:center;justify-content:center;margin-bottom:18px">' + s.ic + '</span>' +
            '<h3 style="font-family:\'Nunito\',sans-serif;font-weight:900;font-size:clamp(22px,2.9vw,31px);letter-spacing:-.6px;margin:0 0 13px;line-height:1.1;text-wrap:balance">' + esc(s.t) + '</h3>' +
            '<p style="font-size:16px;line-height:1.6;color:#6b6b76;margin:0 0 16px;max-width:30em">' + esc(s.d) + '</p>' +
            '<div style="display:flex;flex-direction:column;gap:9px">' + pts + '</div>' +
          '</div>' +
          '<div style="flex:none;width:clamp(208px,26vw,264px)">' +
            '<img src="assets/shots/' + L + '-' + s.n + '.jpg" alt="Clinky app screen" loading="lazy" draggable="false" style="display:block;width:100%;aspect-ratio:1290/2796;border-radius:28px;box-shadow:0 26px 56px rgba(225,29,72,.22)">' +
          '</div>' +
        '</div>';
      }).join('') +
      '</div></section>';

    var finalCta = '<section style="position:relative;background:linear-gradient(150deg,#FF5167,#E11D48 60%,#C81E45);color:#FFFBFA;padding:clamp(64px,10vh,118px) clamp(20px,5vw,72px);overflow:hidden;text-align:center">' +
      '<div style="position:absolute;color:#fff;font-size:22px;top:18%;left:14%;animation:twinkle 4s ease-in-out infinite;pointer-events:none">✦</div>' +
      '<div style="position:absolute;color:#fff;font-size:15px;bottom:20%;right:16%;animation:twinkle 3.4s ease-in-out infinite .4s;pointer-events:none">✦</div>' +
      '<div style="position:relative;max-width:600px;margin:0 auto">' +
        '<img src="assets/clinky-icon.png" alt="Clinky" style="width:72px;height:72px;border-radius:20px;margin:0 auto 20px;box-shadow:0 14px 34px rgba(120,10,30,.4);display:block">' +
        '<h2 style="font-family:\'Nunito\',sans-serif;font-weight:900;font-size:clamp(28px,4.2vw,50px);line-height:1.04;letter-spacing:-1.2px;margin:0 0 14px;text-wrap:balance">' + esc(t.finalTitle) + '</h2>' +
        '<p style="font-size:17px;color:rgba(255,251,250,.88);margin:0 auto 28px;max-width:30em">' + esc(t.finalSub) + '</p>' +
        '<div id="wl2">' + waitlistForm(true) + '</div>' +
        (state.waitlistDone ? '' : '<p style="font-size:13px;color:rgba(255,251,250,.74);margin:14px 0 0">' + esc(t.heroMicro) + '</p>') +
      '</div>' +
    '</section>';

    return '<div class="page-in">' + hero + proof + card + gallery + how + spots + finalCta + '</div>';
  }

  function renderQuestionSection() {
    var t = tdict();
    return '<section style="background:#FFFBFA;padding:clamp(58px,9vh,104px) clamp(16px,4vw,72px)">' +
      '<div style="max-width:760px;margin:0 auto;text-align:center">' +
        '<div style="font-family:\'Nunito\',sans-serif;font-weight:800;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#FF4F62;margin-bottom:12px">' + esc(t.gamesKicker) + '</div>' +
        '<h2 style="font-family:\'Nunito\',sans-serif;font-weight:900;font-size:clamp(27px,3.8vw,44px);line-height:1.08;letter-spacing:-1px;margin:0 0 12px;text-wrap:balance">' + esc(t.gamesTitle) + '</h2>' +
        '<p style="font-size:16.5px;color:#6b6b76;margin:0 auto;max-width:32em">' + esc(t.gamesSub) + '</p>' +
      '</div>' +
      '<div id="gameTabs" style="display:flex;flex-wrap:wrap;gap:9px;justify-content:center;margin:30px auto 22px;max-width:760px">' + renderGameTabs() + '</div>' +
      '<div style="max-width:430px;margin:0 auto">' +
        '<div data-act="nextq" style="position:relative;cursor:pointer;border-radius:30px;background:#fff;box-shadow:0 24px 56px rgba(225,29,72,.15);padding:26px 26px 24px;overflow:hidden">' +
          '<div style="display:flex;align-items:center;justify-content:center;margin-bottom:14px">' +
            '<div id="qcat" style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border-radius:999px;background:#FFEDEF;color:#E11D48;font-family:\'Nunito\',sans-serif;font-weight:800;font-size:13.5px">' + renderQcat() + '</div>' +
          '</div>' +
          '<div style="position:relative;min-height:120px;display:flex;align-items:center;justify-content:center;margin:8px 0 16px;padding:0 14px">' +
            '<span style="position:absolute;top:-8px;left:-2px;font-family:\'Nunito\',sans-serif;font-weight:900;font-size:40px;line-height:1;color:rgba(255,79,98,.13);pointer-events:none">“</span>' +
            '<p id="qline" style="text-align:center;font-family:\'Nunito\',sans-serif;font-weight:800;font-size:clamp(19px,2.4vw,24px);line-height:1.25;letter-spacing:-.3px;margin:0;text-wrap:pretty">' + renderQline() + '</p>' +
            '<span style="position:absolute;bottom:-20px;right:-2px;font-family:\'Nunito\',sans-serif;font-weight:900;font-size:40px;line-height:1;color:rgba(255,79,98,.13);pointer-events:none">”</span>' +
          '</div>' +
          '<div style="border-top:1px solid #f1e6e9;padding-top:16px">' +
            '<div style="text-align:center;font-size:13px;color:#a99ea6;margin-bottom:15px">' + esc(t.tapSwipe) + '</div>' +
            '<div style="display:flex;align-items:center;justify-content:center;gap:20px">' +
              '<button data-act="nextq" style="display:flex;flex-direction:column;align-items:center;gap:6px;background:transparent;border:0;cursor:pointer">' +
                '<span style="width:54px;height:54px;border-radius:50%;background:#f6eef0;display:flex;align-items:center;justify-content:center">' + icons().skip + '</span>' +
                '<span style="font-size:12.5px;font-weight:600;color:#a99ea6">' + esc(t.dislike) + '</span>' +
              '</button>' +
              '<button data-act="nextq" style="display:flex;flex-direction:column;align-items:center;gap:6px;background:transparent;border:0;cursor:pointer">' +
                '<span style="width:62px;height:62px;border-radius:50%;background:#FF4F62;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(255,79,98,.45)">' + icons().heart + '</span>' +
                '<span style="font-size:13px;font-weight:700;color:#FF4F62">' + esc(t.like) + '</span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<p style="text-align:center;font-size:13.5px;color:#a99ea6;margin:16px 0 0">' + esc(t.cardHint) + '</p>' +
      '</div>' +
    '</section>';
  }
  function renderGameTabs() {
    var L = state.lang, I = icons();
    var tabIcons = [I.never, I.target, I.bubble, I.swap];
    return GAMES.map(function (g, i) {
      return '<button data-act="g' + i + '" style="' + pill(i === state.gameIndex) + '">' + tabIcons[i] + esc(g.title[L]) + '</button>';
    }).join('');
  }
  function renderQcat() {
    var L = state.lang, gi = state.gameIndex;
    return gameIcon(gi, '#E11D48', 17) + esc(GAMES[gi].title[L]);
  }
  function renderQline() {
    var L = state.lang, cg = GAMES[state.gameIndex];
    var qStr = cg.q[state.qIndex % cg.q.length][L];
    return qStr.split('*').map(function (seg, i) {
      return '<span style="color:' + (i % 2 ? '#FF4F62' : '#1c1326') + '">' + esc(seg) + '</span>';
    }).join('');
  }

  // ===== ABOUT =====
  function renderAbout() {
    var t = tdict(), I = icons();
    var pillar = function (ic, ti, de) {
      return '<div style="border-radius:24px;padding:30px;background:#fff;border:1px solid #f3eaed;box-shadow:0 8px 26px rgba(28,19,38,.05)">' +
        '<span style="display:flex;width:54px;height:54px;border-radius:16px;background:#FFE2E6;align-items:center;justify-content:center;margin-bottom:16px">' + ic + '</span>' +
        '<h3 style="font-family:\'Nunito\',sans-serif;font-weight:800;font-size:19px;margin:0 0 8px">' + esc(ti) + '</h3>' +
        '<p style="font-size:14.5px;line-height:1.55;color:#6b6b76;margin:0">' + esc(de) + '</p></div>';
    };
    return '<div class="page-in">' +
      '<section style="background:linear-gradient(168deg,#FF5C6E,#E11D48 70%,#C21540);color:#FFFBFA;padding:clamp(112px,15vh,140px) clamp(20px,5vw,72px) clamp(44px,6vh,64px);text-align:center">' +
        '<img src="assets/clinky-icon.png" alt="Clinky" style="width:80px;height:80px;border-radius:22px;margin:0 auto 22px;box-shadow:0 16px 38px rgba(120,10,30,.4);display:block">' +
        '<h1 style="font-family:\'Nunito\',sans-serif;font-weight:900;font-size:clamp(32px,4.6vw,52px);letter-spacing:-1.2px;margin:0 0 14px">' + esc(t.aboutTitle) + '</h1>' +
        '<p style="font-size:clamp(16px,1.6vw,19px);line-height:1.6;color:rgba(255,251,250,.9);max-width:34em;margin:0 auto">' + esc(t.aboutLede) + '</p>' +
      '</section>' +
      '<section style="background:#FFFBFA;padding:clamp(48px,7vh,84px) clamp(20px,5vw,72px)">' +
        '<div style="max-width:980px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:18px" class="pillars">' +
          pillar(I.people, t.p1t, t.p1d) + pillar(I.cupBig, t.p2t, t.p2d) + pillar(I.game, t.p3t, t.p3d) +
        '</div>' +
        '<div style="max-width:680px;margin:48px auto 0;text-align:center">' +
          '<div style="font-family:\'Nunito\',sans-serif;font-weight:900;font-size:clamp(24px,3.4vw,38px);color:#E11D48;letter-spacing:-.6px;margin-bottom:14px">Tap. Clink. Meet again.</div>' +
          '<p style="font-size:16px;line-height:1.65;color:#6b6b76;margin:0">' + esc(t.aboutMission) + '</p>' +
          '<button data-act="join" style="margin-top:30px;border:0;cursor:pointer;border-radius:15px;padding:15px 28px;font-family:\'Nunito\',sans-serif;font-weight:800;font-size:15.5px;color:#fff;background:#FF4F62;box-shadow:0 10px 26px rgba(255,79,98,.4);transition:transform .2s">' + esc(t.heroCta) + '</button>' +
        '</div>' +
      '</section></div>';
  }

  // ===== SUPPORT =====
  function renderSupport() {
    var t = tdict(), I = icons();
    var body = state.supportDone
      ? '<div style="display:flex;align-items:center;gap:14px;padding:22px 24px;border-radius:18px;background:#FFF0F2;border:1px solid #ffd9de;animation:popIn .5s ease both"><span style="display:inline-flex;flex:none">' + I.checkPink + '</span><span style="font-weight:600;font-size:15.5px;line-height:1.45">' + esc(t.supDone) + '</span></div>'
      : '<form data-form="support" style="display:flex;flex-direction:column;gap:12px">' +
          '<input name="contactName" required placeholder="' + esc(t.supName) + '" style="border:1px solid #ece7ea;border-radius:14px;padding:15px 17px;font-size:15px;background:#fff;outline:none">' +
          '<input name="email" type="email" required placeholder="' + esc(t.supEmailPh) + '" style="border:1px solid #ece7ea;border-radius:14px;padding:15px 17px;font-size:15px;background:#fff;outline:none">' +
          '<textarea name="message" required rows="5" placeholder="' + esc(t.supMsgPh) + '" style="border:1px solid #ece7ea;border-radius:14px;padding:15px 17px;font-size:15px;background:#fff;outline:none;resize:vertical;min-height:120px"></textarea>' +
          '<button type="submit" style="border:0;cursor:pointer;border-radius:14px;padding:16px 24px;font-family:\'Nunito\',sans-serif;font-weight:800;font-size:15.5px;color:#fff;background:#FF4F62;box-shadow:0 10px 26px rgba(255,79,98,.4)">' + esc(t.supSend) + '</button>' +
          '<p style="font-size:12.5px;color:#a99ea6;text-align:center;margin:4px 0 0">' + esc(t.supNote) + '</p>' +
        '</form>';
    var faqHtml = FAQ[state.lang].map(function (f) {
      return '<div style="border-radius:16px;background:#fff;border:1px solid #f3eaed;padding:18px 20px">' +
        '<div style="font-family:\'Nunito\',sans-serif;font-weight:800;font-size:15.5px;margin-bottom:6px">' + esc(f.q) + '</div>' +
        '<div style="font-size:14.5px;line-height:1.55;color:#6b6b76">' + esc(f.a) + '</div></div>';
    }).join('');
    return '<div class="page-in"><section style="background:#FFFBFA;padding:clamp(118px,17vh,160px) clamp(20px,5vw,72px) clamp(56px,9vh,104px)">' +
      '<div style="max-width:560px;margin:0 auto">' +
        '<div style="text-align:center;margin-bottom:30px">' +
          '<span style="display:flex;width:58px;height:58px;border-radius:17px;background:#FFE2E6;align-items:center;justify-content:center;margin:0 auto 18px">' + I.chat + '</span>' +
          '<h1 style="font-family:\'Nunito\',sans-serif;font-weight:900;font-size:clamp(28px,3.8vw,42px);letter-spacing:-.8px;margin:0 0 10px">' + esc(t.supTitle) + '</h1>' +
          '<p style="font-size:16px;color:#6b6b76;margin:0">' + esc(t.supSub) + '</p>' +
        '</div>' + body +
        '<div style="margin-top:46px">' +
          '<h2 style="font-family:\'Nunito\',sans-serif;font-weight:800;font-size:20px;margin:0 0 16px;text-align:center">FAQ</h2>' +
          '<div style="display:flex;flex-direction:column;gap:10px">' + faqHtml + '</div>' +
        '</div>' +
      '</div></section></div>';
  }

  // ===== LEGAL =====
  function renderLegal(which) {
    var t = tdict();
    var title = which === 'privacy' ? t.privTitle : t.termsTitle;
    var src = (which === 'privacy' ? window.PRIVACY : window.TERMS) || {};
    var sections = src[state.lang] || [];
    var body = sections.map(function (sec) {
      var inner = '';
      if (sec.h) inner += '<h2 style="font-family:\'Nunito\',sans-serif;font-weight:800;font-size:19px;margin:0 0 8px;color:#1c1326">' + esc(sec.h) + '</h2>';
      inner += sec.b.map(function (bl) {
        if (bl[0] === 'h3') return '<h3 style="font-family:\'Nunito\',sans-serif;font-weight:700;font-size:16px;margin:18px 0 6px;color:#3a323f">' + esc(bl[1]) + '</h3>';
        if (bl[0] === 'ul') return '<ul style="margin:.5em 0 .9em;padding-left:1.3em">' + bl[1].map(function (li) { return '<li style="font-size:15px;line-height:1.65;color:#5d5660;margin:.35em 0">' + esc(li) + '</li>'; }).join('') + '</ul>';
        return '<p style="font-size:15px;line-height:1.7;color:#5d5660;margin:.6em 0">' + esc(bl[1]) + '</p>';
      }).join('');
      return '<div style="margin-bottom:22px">' + inner + '</div>';
    }).join('');
    return '<div class="page-in"><section style="background:#FFFBFA;padding:clamp(118px,17vh,160px) clamp(20px,5vw,72px) clamp(56px,9vh,104px)">' +
      '<div style="max-width:680px;margin:0 auto">' +
        '<h1 style="font-family:\'Nunito\',sans-serif;font-weight:900;font-size:clamp(28px,3.8vw,42px);letter-spacing:-.8px;margin:0 0 6px">' + esc(title) + '</h1>' +
        '<p style="font-size:13.5px;color:#a99ea6;margin:0 0 30px">' + esc(t.docUpdated) + '</p>' + body +
        '<div style="margin-top:30px;padding:18px 20px;border-radius:16px;background:#FFF6F4;border:1px solid #ffe0e4;font-size:13.5px;color:#8a8190;line-height:1.6">' + esc(t.docContact) + '</div>' +
      '</div></section></div>';
  }

  function renderMain() {
    switch (state.page) {
      case 'about': return renderAbout();
      case 'support': return renderSupport();
      case 'privacy': return renderLegal('privacy');
      case 'terms': return renderLegal('terms');
      default: return renderHome();
    }
  }

  // ===== paint =====
  var $hdr, $main, $ftr;
  function updateHeaderBg() {
    var oh = overHero();
    var base = 'position:fixed;top:0;left:0;right:0;z-index:60;display:flex;align-items:center;gap:12px;padding:12px clamp(14px,3.5vw,40px);transition:background .35s ease,box-shadow .35s ease;';
    var bg = (state.scrolled || !oh)
      ? 'background:rgba(255,251,250,.94);box-shadow:0 6px 24px rgba(28,19,38,.08);backdrop-filter:blur(10px);'
      : 'background:rgba(225,29,72,0);';
    if ($hdr) $hdr.setAttribute('style', base + bg);
  }
  function paintHeader() { $hdr.innerHTML = renderHeader(); updateHeaderBg(); }
  function paint() {
    $hdr.innerHTML = renderHeader();
    $main.innerHTML = renderMain();
    $ftr.innerHTML = renderFooter();
    updateHeaderBg();
    if (state.page === 'home') startAnim(); else stopAnim();
  }

  // ===== model animation =====
  function applyModelAttrs() {
    var mv = document.getElementById('drinkModel');
    if (!mv) return;
    mv.setAttribute('src', modelGlb());
    mv.setAttribute('ios-src', modelUsdz());
    mv.setAttribute('camera-orbit', camOrbit());
    mv.setAttribute('field-of-view', fov());
    mv.setAttribute('rotation-per-second', rotSpeed());
  }
  function spinModel(deg) {
    var mv = document.getElementById('drinkModel');
    if (!mv || !mv.getCameraOrbit) return;
    try {
      var o = mv.getCameraOrbit();
      var thetaDeg = o.theta * 180 / Math.PI + deg;
      var phiDeg = o.phi * 180 / Math.PI;
      mv.cameraOrbit = thetaDeg + 'deg ' + phiDeg + 'deg auto';
    } catch (e) {}
  }
  function burstSparkles() {
    var fx = document.getElementById('fxLayer'); if (!fx) return;
    var r = fx.getBoundingClientRect(), cx = r.width / 2, cy = r.height * 0.46;
    for (var i = 0; i < 6; i++) {
      var s = document.createElement('span'); s.textContent = '✦';
      s.style.cssText = 'position:absolute;left:' + cx + 'px;top:' + cy + 'px;font-size:' + (12 + Math.random() * 9) + 'px;color:#FF4F62;will-change:transform,opacity';
      fx.appendChild(s);
      var a = (Math.PI * 2 * i) / 6 + Math.random() * 0.4, d = 58 + Math.random() * 42;
      (function (el) {
        var an = el.animate([
          { transform: 'translate(-50%,-50%) scale(.3) rotate(0deg)', opacity: 0 },
          { transform: 'translate(-50%,-50%) scale(1) rotate(35deg)', opacity: 1, offset: 0.3 },
          { transform: 'translate(calc(-50% + ' + (Math.cos(a) * d) + 'px), calc(-50% + ' + (Math.sin(a) * d) + 'px)) scale(.35) rotate(90deg)', opacity: 0 }
        ], { duration: 680, easing: 'cubic-bezier(.2,.7,.2,1)' });
        an.onfinish = function () { el.remove(); };
      })(s);
    }
  }
  function puffSteam() {
    var fx = document.getElementById('fxLayer'); if (!fx) return;
    var r = fx.getBoundingClientRect(), cx = r.width / 2, cy = r.height * 0.4;
    for (var i = 0; i < 2; i++) {
      var s = document.createElement('span');
      s.style.cssText = 'position:absolute;left:' + (cx + (i ? 13 : -13)) + 'px;top:' + cy + 'px;width:18px;height:24px;border-radius:50%;background:rgba(255,255,255,.5);filter:blur(5px)';
      fx.appendChild(s);
      (function (el, idx) {
        var an = el.animate([
          { transform: 'translate(-50%,0) scale(.6)', opacity: 0 },
          { transform: 'translate(-50%,-14px) scale(1)', opacity: 0.7, offset: 0.4 },
          { transform: 'translate(-50%,-34px) scale(1.5)', opacity: 0 }
        ], { duration: 560, delay: idx * 130, easing: 'ease-out' });
        an.onfinish = function () { el.remove(); };
      })(s, i);
    }
  }
  function playAnim() {
    var mv = document.getElementById('drinkModel');
    if (!mv) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    mv.style.animation = 'none'; void mv.offsetWidth;
    if (reduce) { mv.style.animation = 'quickPulse .5s ease'; return; }
    var beer = state.sel !== 'coffee';
    mv.style.animation = (beer ? 'capPop .72s' : 'cupCheers .82s') + ' cubic-bezier(.34,1.56,.64,1)';
    try { mv.removeAttribute('auto-rotate'); } catch (e) {}
    if (beer) { spinModel(360); burstSparkles(); } else { spinModel(70); puffSteam(); }
    try { if (navigator.vibrate) navigator.vibrate(10); } catch (e) {}
    clearTimeout(animBack);
    animBack = setTimeout(function () {
      mv.style.animation = 'none';
      try { mv.setAttribute('auto-rotate', ''); } catch (e) {}
    }, 950);
  }
  function startAnim() {
    stopAnim();
    animKickoff = setTimeout(function () { if (state.page === 'home') playAnim(); }, 2400);
    animTimer = setInterval(function () { if (state.page === 'home' && !document.hidden) playAnim(); }, 5200);
  }
  function stopAnim() {
    if (animTimer) { clearInterval(animTimer); animTimer = null; }
    if (animKickoff) { clearTimeout(animKickoff); animKickoff = null; }
  }

  // ===== question card in-place =====
  function animQ() {
    var el = document.getElementById('qline');
    if (el) { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = 'qSwap .42s cubic-bezier(.2,.7,.2,1)'; }
    var c = document.getElementById('qcat');
    if (c) { c.style.animation = 'none'; void c.offsetWidth; c.style.animation = 'catPop .42s cubic-bezier(.2,.7,.2,1)'; }
  }
  function refreshCard() {
    var tabs = document.getElementById('gameTabs');
    if (tabs) tabs.innerHTML = renderGameTabs();
    var c = document.getElementById('qcat'); if (c) c.innerHTML = renderQcat();
    var l = document.getElementById('qline'); if (l) l.innerHTML = renderQline();
    animQ();
  }

  // ===== actions =====
  function setLang(lang) {
    try { localStorage.setItem('clinky_lang', lang); } catch (e) {}
    document.documentElement.lang = lang;
    state.lang = lang;
    paint();
  }
  function setPage(page) {
    state.page = page;
    try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch (e) { window.scrollTo(0, 0); }
    state.scrolled = window.scrollY > 24;
    paint();
  }
  function joinCta() {
    if (state.page !== 'home') { setPage('home'); setTimeout(scrollWaitlist, 80); }
    else scrollWaitlist();
  }
  function scrollWaitlist() {
    var f = document.querySelector('input[type="email"]');
    if (!f) return;
    var y = f.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setTimeout(function () { try { f.focus({ preventScroll: true }); } catch (e) {} }, 500);
  }
  function setDrink(d) {
    if (state.sel === d) return;
    state.sel = d;
    var b = document.getElementById('chipBeer'), c = document.getElementById('chipCoffee');
    if (b) b.setAttribute('style', drinkSeg(d === 'beer'));
    if (c) c.setAttribute('style', drinkSeg(d === 'coffee'));
    applyModelAttrs();
    playAnim();
  }
  function setGame(i) { state.gameIndex = i; state.qIndex = 0; refreshCard(); }
  function nextQuestion() {
    var g = GAMES[state.gameIndex];
    state.qIndex = (state.qIndex + 1) % g.q.length;
    refreshCard();
  }

  function submitWaitlist(form) {
    var email = (form.email.value || '').trim();
    if (!/.+@.+\..+/.test(email)) return;
    if (EO_ACTION) { try { fetch(EO_ACTION, { method: 'POST', mode: 'no-cors', body: new FormData(form) }); } catch (e) {} }
    state.waitlistDone = true;
    var done = waitlistForm(false);
    var w1 = document.getElementById('wl1'); if (w1) w1.innerHTML = done;
    var w2 = document.getElementById('wl2'); if (w2) w2.innerHTML = done;
    document.querySelectorAll('.hero-trust').forEach(function (n) { n.style.display = 'none'; });
  }
  function submitSupport(form) {
    var name = (form.contactName.value || '').trim(),
        email = (form.email.value || '').trim(),
        msg = (form.message.value || '').trim();
    if (!name || !/.+@.+\..+/.test(email) || !msg) return;
    if (SUPPORT_ENDPOINT) {
      try { fetch(SUPPORT_ENDPOINT, { method: 'POST', mode: 'no-cors', body: new FormData(form) }); } catch (e) {}
    } else {
      var subject = 'Clinky support — ' + name;
      var body = 'From: ' + name + ' <' + email + '>\n\n' + msg;
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }
    state.supportDone = true;
    paint();
  }

  // ===== scroll =====
  function onScroll() {
    var s = window.scrollY > 24;
    if (s !== state.scrolled) { state.scrolled = s; paintHeader(); }
    var y = window.scrollY;
    var b1 = document.querySelector('[data-blob="1"]'), b2 = document.querySelector('[data-blob="2"]');
    if (b1) b1.style.transform = 'translateY(' + (y * 0.04) + 'px)';
    if (b2) b2.style.transform = 'translateY(' + (-y * 0.03) + 'px)';
  }

  // ===== events =====
  function onClick(e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var a = el.getAttribute('data-act');
    switch (a) {
      case 'home': case 'about': case 'support': case 'privacy': case 'terms': setPage(a); break;
      case 'en': setLang('en'); break;
      case 'ru': setLang('ru'); break;
      case 'join': joinCta(); break;
      case 'beer': setDrink('beer'); break;
      case 'coffee': setDrink('coffee'); break;
      case 'play': playAnim(); break;
      case 'nextq': nextQuestion(); break;
      default: if (a.charAt(0) === 'g') setGame(parseInt(a.slice(1), 10));
    }
  }
  function onSubmit(e) {
    var form = e.target.closest('form[data-form]');
    if (!form) return;
    e.preventDefault();
    if (form.getAttribute('data-form') === 'waitlist') submitWaitlist(form);
    else submitSupport(form);
  }

  // ===== mount =====
  function mount() {
    var app = document.getElementById('app');
    app.innerHTML = '<header id="hdr"></header><main id="main"></main><footer id="ftr" style="position:relative;background:#241019;color:#FFFBFA;padding:0 clamp(20px,5vw,72px) 36px;overflow:hidden"></footer>';
    $hdr = document.getElementById('hdr');
    $main = document.getElementById('main');
    $ftr = document.getElementById('ftr');

    var lang = 'en';
    try { lang = localStorage.getItem('clinky_lang') || ((navigator.language || 'en').toLowerCase().indexOf('ru') === 0 ? 'ru' : 'en'); } catch (e) {}
    state.lang = lang;
    document.documentElement.lang = lang;

    document.addEventListener('click', onClick);
    document.addEventListener('submit', onSubmit);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', function () { if (state.page === 'home' && !document.hidden) startAnim(); });

    paint();
    onScroll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
