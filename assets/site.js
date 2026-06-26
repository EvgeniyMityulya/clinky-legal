/* ============================================================
   Clinky — landing logic. Clean/minimal (homify structure +
   Sheepy softness + Clinky brand: cream bg, coral accent).
   Vanilla, no framework. 3D hero rendered by assets/hero3d.js (three.js).
   ============================================================ */
(function () {
  'use strict';

  var WAITLIST_ENDPOINT = 'https://script.google.com/macros/s/AKfycby4gv-C4NlkexGgz-lbDvD7xm0RU5BxsCVe2eLvof-DYLDNN_ZGKafpijywAQQZEh6IYw/exec'; // Google Apps Script -> Sheet
  var GEO = {};   // {country, city}, best-effort from a free IP lookup
  try { fetch('https://ipwho.is/').then(function (r) { return r.json(); }).then(function (d) { if (d && d.success !== false) { GEO.country = d.country || ''; GEO.city = d.city || ''; } }).catch(function () {}); } catch (e) {}
  var SUPPORT_ENDPOINT = WAITLIST_ENDPOINT;   // same Apps Script web app; routed by type=support
  var CONTACT_EMAIL = 'support@clinkyapp.com';
  var C = '#FF4F62';

  var state = {
    lang: 'en', page: 'home', scrolled: false, sel: 'beer', menuOpen: false,
    gameIndex: 0, qIndex: 0, waitlistDone: false, supportDone: false
  };
  var animTimer = null, animBack = null, animKickoff = null, qdrag = null;

  var DICT = {
    en: {
      navHome: 'Home', navAbout: 'About', navSupport: 'Support', navPrivacy: 'Privacy', navTerms: 'Terms', navJoin: 'Try it first!',
      heroEyebrow: 'Coming soon to the App Store',
      heroTitle: 'Turn hangouts into a game',
      heroLede: 'An easy reason to meet more often! Party-game cards for any table and a 3D drink for every clink',
      heroCta: 'Try it first!', heroMicro: 'No spam. One email the day we launch.', trust1: 'No sign-up', trust2: 'No spam', trust3: 'iOS 17+',
      heroModel: 'Tap the drink to spin it',
      counterKicker: 'Live counter', counterLabel: 'clinks from friends around the world. Clink with us!',
      heroDone: "You're on the list. We'll send the App Store link the moment Clinky goes live.",
      emailPh: 'Your email', beer: 'Beer', coffee: 'Coffee',
      gamesKicker: 'Try it right now', gamesTitle: 'Questions that open anyone up',
      gamesSub: 'These are real cards from the app. Pick a game and swipe through',
      tapSwipe: 'Tap or swipe the card', dislike: 'Back', like: 'Next', cardHint: 'Swipe right for the next card, left to go back',
      problemKicker: 'Sound familiar?', problemTitle: 'Getting everyone together can be a real quest!',
      problemBody: 'Either everyone is busy and the meet-up drifts to "someday", or you finally gather and the conversation stalls. A light reminder and a couple of games make it all way more fun!',
      problemTurn: 'Clinky helps you meet up more often and have the kind of time you want to repeat!',
      discoverKicker: 'Inside the app', discoverTitle: 'Everything for your hangouts in one place', discoverSub: 'No accounts, no clutter, just your people and your moments.',
      finalTitle: 'Round up your friends and clink first!', finalSub: "Drop your email and we'll let you know on launch day!",
      aboutTitle: 'About Clinky',
      slogan: "Bring your friends, we'll bring the fun!",
      aboutLede: 'An iOS app for the friendships you never want to drift. Track who you meet, play party-game cards together, and keep a little 3D memento from every get-together.',
      aboutMission: "We built Clinky because the best moments happen face to face — and they're easy to let slip. Clinky is a gentle nudge to see your people more often, and a game to make every meet-up worth remembering.",
      p1t: "Don't lose touch", p1d: "Remember who you saw, when, and who you haven't met in a while.",
      p2t: 'Clink with anything', p2d: "Coffee, tea, a glass of wine or a beer. What matters is you're together!",
      p3t: 'Party games', p3d: 'Icebreaker cards that get any table talking in seconds.',
      supTitle: 'Support', supSub: 'Found a bug or have an idea? Write to us — we read everything.',
      supName: 'Your name', supEmailPh: 'you@email.com', supMsgPh: 'Tell us what happened or what you have in mind…',
      supSend: 'Send message', supNote: 'We usually reply within a day.',
      supDone: "Thanks! We got your message and will get back soon. A confirmation just landed in your inbox.",
      privTitle: 'Privacy Policy', termsTitle: 'Terms of Use', docUpdated: 'Last updated: June 22, 2026',
      docContact: 'Questions about this document? Email us at support@clinkyapp.com and we will help.',
      footNote: 'A social tracker for the people, drinks and moments worth remembering.',
      footComingSoon: 'Coming to the App Store', footProduct: 'Product', footLegalReach: 'Legal & contact', footEmail: 'Email us',
      footRights: 'Made for people who would rather meet up.'
    },
    ru: {
      navHome: 'Главная', navAbout: 'О нас', navSupport: 'Поддержка', navPrivacy: 'Приватность', navTerms: 'Условия', navJoin: 'Хочу первым!',
      heroEyebrow: 'Скоро в App Store',
      heroTitle: 'Преврати встречи в игру',
      heroLede: 'Лёгкий повод видеться чаще! Карточки-игры для любой компании и 3D-напиток за каждый «чок»',
      heroCta: 'Хочу первым!', heroMicro: 'Без спама. Одно письмо в день релиза.', trust1: 'Без регистрации', trust2: 'Без спама', trust3: 'iOS 17+',
      heroModel: 'Нажми на напиток, чтобы покрутить',
      counterKicker: 'Онлайн счётчик', counterLabel: 'чоков от друзей по всему миру. Чокнись с нами!',
      heroDone: 'Ты в очереди. Пришлём ссылку на App Store, как только Clinky выйдет.',
      emailPh: 'Твоя почта', beer: 'Пиво', coffee: 'Кофе',
      gamesKicker: 'Попробуй прямо сейчас', gamesTitle: 'Эти вопросы раскроют любого',
      gamesSub: 'Это реальные карточки из приложения. Выбери игру и листай',
      tapSwipe: 'Тап или свайп по карточке', dislike: 'Назад', like: 'Дальше', cardHint: 'Вправо дальше, влево назад',
      problemKicker: 'Знакомо?', problemTitle: 'Собраться компанией бывает та ещё задачка!',
      problemBody: 'То никак не собраться, то собрались, а поговорить не о чем. С лёгким напоминанием и парой игр всё идёт куда веселее!',
      problemTurn: 'Clinky помогает видеться чаще и проводить время так, что хочется повторить!',
      discoverKicker: 'Внутри приложения', discoverTitle: 'Всё для встреч в одном месте', discoverSub: 'Без аккаунтов и лишнего, только твои люди и моменты.',
      finalTitle: 'Собери друзей и чокнись первым!', finalSub: 'Оставь почту, и мы напишем тебе в день релиза!',
      aboutTitle: 'О Clinky',
      slogan: 'Друзья — с тебя, веселье — с нас!',
      aboutLede: 'iOS-приложение для дружбы, которую не хочется терять. Отмечай встречи, играй вместе в карточки-игры и забирай маленький 3D-сувенир с каждой посиделки.',
      aboutMission: 'Мы сделали Clinky, потому что лучшие моменты случаются вживую — и их так легко упустить. Clinky мягко напоминает видеться чаще и превращает каждую встречу в игру, которую хочется запомнить.',
      p1t: 'Не теряй друзей', p1d: 'Помни, кого и когда видел и с кем давно не пересекался.',
      p2t: 'Чокнись чем угодно', p2d: 'Кофе, чай, бокал вина или пиво. Главное, что вы вместе!',
      p3t: 'Игры для компании', p3d: 'Карточки-игры, которые разговорят любой стол за секунды.',
      supTitle: 'Поддержка', supSub: 'Нашёл баг или есть идея? Напиши нам — мы читаем всё.',
      supName: 'Как тебя зовут', supEmailPh: 'ты@почта.com', supMsgPh: 'Расскажи, что случилось или что задумал…',
      supSend: 'Отправить', supNote: 'Обычно отвечаем в течение дня.',
      supDone: 'Спасибо! Сообщение получили и скоро ответим. Подтверждение уже улетело тебе на почту.',
      privTitle: 'Политика конфиденциальности', termsTitle: 'Условия использования', docUpdated: 'Последнее обновление: 22 июня 2026 г.',
      docContact: 'Вопросы по документу? Напиши на support@clinkyapp.com — поможем.',
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
  // inline SVGs (Phosphor font glyphs rendered non-proportional). Square viewBox → never cropped.
  function appleMark(size, color) {
    var s = size || 16;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="' + (color || 'currentColor') + '" aria-hidden="true" style="display:inline-block;flex:none;vertical-align:middle">' +
      '<path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"/></svg>';
  }
  // App Store mark — Phosphor app-store-logo BOLD (founder wanted it bolder; fill makes it a round badge)
  function appStoreMark(size, color) {
    var s = size || 16;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 256 256" fill="' + (color || 'currentColor') + '" aria-hidden="true" style="display:inline-block;flex:none;vertical-align:middle">' +
      '<path d="M244,160a12,12,0,0,1-12,12H200.67l17.66,29.89a12,12,0,1,1-20.66,12.21L140.9,118a12,12,0,0,1,20.66-12.2L186.48,148H232A12,12,0,0,1,244,160ZM133.15,148H97.39L162.33,38.11A12,12,0,1,0,141.67,25.9L128,49,114.33,25.9A12,12,0,1,0,93.67,38.11l20.39,34.51L69.52,148H24a12,12,0,0,0,0,24H133.15a12,12,0,0,0,0-24ZM58.83,189.67a12,12,0,0,0-16.43,4.22l-4.73,8A12,12,0,1,0,58.33,214.1l4.73-8A12,12,0,0,0,58.83,189.67Z"></path></svg>';
  }
  function sparkle(o) {
    var sz = Math.round((o.s || 16) * 1.5);
    return '<svg class="spark" width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" fill="' + (o.c || C) + '" aria-hidden="true" ' +
      'style="position:absolute;' + o.pos + ';opacity:' + (o.op == null ? 0.6 : o.op) + ';pointer-events:none;' +
      'filter:drop-shadow(0 0 5px ' + (o.glow || 'rgba(255,79,98,.4)') + ');animation:' + (o.anim || 'twinkle 4s ease-in-out infinite') + '">' +
      '<path d="M12 1.2C12.7 10.4 13.4 11 22.8 12C13.4 13 12.7 13.6 12 22.8C11.3 13.6 10.6 13 1.2 12C10.6 11 11.3 10.4 12 1.2Z"/></svg>';
  }
  // one reusable capsule badge (icon-in-circle + label), used everywhere
  function chip(iconName, label, sm) {
    return '<span style="display:inline-flex;align-items:center;gap:' + (sm ? '7px' : '9px') + ';padding:' + (sm ? '6px 14px 6px 6px' : '9px 18px 9px 9px') + ';border-radius:999px;background:#fff;border:1px solid #e9e6ec;box-shadow:0 8px 20px -10px rgba(28,19,38,.2);font-weight:700;font-size:' + (sm ? '13px' : '14px') + ';color:#3a323f">' +
      '<span class="chip-ic"' + (sm ? ' style="width:26px;height:26px"' : '') + '>' + (iconName === 'apple-logo' ? appleMark(sm ? 14 : 16, C) : ph(iconName, sm ? 15 : 17, C, 'ph-fill')) + '</span>' + esc(label) + '</span>';
  }
  // hero trust chip — equal medium width, icon pinned left, label centered (no width jumping)
  function heroChip(iconName, label) {
    return '<span style="display:inline-flex;align-items:center;gap:8px;padding:7px 18px 7px 7px;border-radius:999px;background:#fff;border:1px solid #e9e6ec;box-shadow:0 8px 20px -12px rgba(255,79,98,.3);font-weight:700;font-size:13px;color:#3a323f;white-space:nowrap">' +
      '<span class="chip-ic" style="width:26px;height:26px;flex:none">' + (iconName === 'apple-logo' ? appleMark(14, C) : ph(iconName, 14, C, 'ph-fill')) + '</span>' +
      esc(label) + '</span>';
  }
  function kicker(s) { return '<div style="font-family:Nunito,sans-serif;font-weight:800;font-size:12.5px;letter-spacing:2px;text-transform:uppercase;color:#FF4F62;margin-bottom:12px">' + esc(s) + '</div>'; }
  function h2sec(s) { return '<h2 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(27px,3.8vw,44px);line-height:1.08;letter-spacing:-1px;margin:0 0 12px;color:#1c1326;text-wrap:balance">' + esc(s) + '</h2>'; }
  function subsec(s) { return '<p style="font-size:16.5px;color:#6b6b76;margin:0 auto;max-width:34em">' + esc(s) + '</p>'; }
  function coralBtn(label, act, extra) {
    return '<button data-act="' + act + '" style="border:0;cursor:pointer;border-radius:15px;padding:15px 28px;font-family:Nunito,sans-serif;font-weight:800;font-size:15.5px;color:#fff;background:#FF4F62;box-shadow:0 12px 28px -10px rgba(255,79,98,.6);transition:transform .2s,box-shadow .2s;' + (extra || '') + '">' + esc(label) + '</button>';
  }
  function renderQcount() {
    var len = GAMES[state.gameIndex].q.length;
    var n = (state.qIndex % len) + 1;
    return state.lang === 'ru' ? ('вопрос ' + n + ' из ' + len) : ('question ' + n + ' of ' + len);
  }

  // segmented / pill styles
  function navPill(active) {
    var b = 'border:0;cursor:pointer;border-radius:999px;padding:8px 15px;font-weight:700;font-size:14px;white-space:nowrap;transition:all .22s;font-family:DM Sans,sans-serif;';
    return active ? b + 'background:#FF4F62;color:#fff;box-shadow:0 6px 16px -6px rgba(255,79,98,.6);' : b + 'background:transparent;color:#6b6b76;';
  }
  function pill(active) {
    var b = 'border:0;cursor:pointer;border-radius:999px;padding:10px 16px;font-weight:700;font-size:14.5px;transition:all .22s;display:inline-flex;align-items:center;gap:7px;';
    return active ? b + 'background:#FF4F62;color:#fff;box-shadow:0 8px 20px -8px rgba(255,79,98,.7);' : b + 'background:#fff;color:#6b6b76;border:1px solid #e9e6ec;';
  }
  function langSeg(active) {
    var b = 'border:0;cursor:pointer;border-radius:999px;padding:6px 13px;font-weight:800;font-size:13px;transition:all .25s;';
    return active ? b + 'background:#FF4F62;color:#fff;box-shadow:0 6px 14px -6px rgba(255,79,98,.7);' : b + 'background:transparent;color:#6b6b76;';
  }
  function langSegDark(active) {
    var b = 'border:1px solid #e9e6ec;cursor:pointer;border-radius:8px;padding:5px 11px;font-weight:700;font-size:12.5px;transition:all .2s;';
    return active ? b + 'background:#FF4F62;color:#fff;border-color:#FF4F62;' : b + 'background:transparent;color:#8a8190;';
  }
  function drinkToggle() {
    var t = tdict();
    var btn = 'position:relative;z-index:1;width:128px;border:0;background:transparent;cursor:pointer;padding:15px 0;font-family:Nunito,sans-serif;font-weight:800;font-size:16.5px;transition:color .25s;display:inline-flex;align-items:center;justify-content:center;gap:8px;';
    var thumbX = state.sel === 'coffee' ? '128px' : '0';
    return '<div style="display:flex;justify-content:center;margin:18px 0 0">' +
      '<div style="position:relative;display:inline-flex;padding:5px;border-radius:999px;background:#fff;border:1px solid #e9e6ec;box-shadow:0 12px 28px -12px rgba(28,19,38,.24)">' +
        '<div id="drinkThumb" style="position:absolute;top:5px;bottom:5px;left:5px;width:128px;border-radius:999px;background:#FF4F62;box-shadow:0 10px 20px -6px rgba(255,79,98,.7);transition:transform .36s cubic-bezier(.34,1.4,.5,1);transform:translateX(' + thumbX + ')"></div>' +
        '<button id="chipBeer" data-act="beer" style="' + btn + 'color:' + (state.sel === 'beer' ? '#fff' : '#6b6b76') + '"><span style="display:inline-flex;transform:rotate(-45deg)">' + ph('beer-bottle', 18, state.sel === 'beer' ? '#fff' : '#b9b0b6', 'ph-fill') + '</span>' + esc(t.beer) + '</button>' +
        '<button id="chipCoffee" data-act="coffee" style="' + btn + 'color:' + (state.sel === 'coffee' ? '#fff' : '#6b6b76') + '">' + ph('coffee', 18, state.sel === 'coffee' ? '#fff' : '#b9b0b6', 'ph-fill') + esc(t.coffee) + '</button>' +
      '</div></div>';
  }
  function gameIcon(i, color, s) {
    var names = ['eye-slash', 'target', 'chat-circle', 'arrows-left-right'];
    return ph(names[i] || names[3], s || 18, color, 'ph-bold');
  }
  function icons() {
    return {
      people: ph('users-three', 26, C, 'ph-fill'), cupBig: ph('coffee', 26, C, 'ph-fill'),
      game: ph('game-controller', 26, C, 'ph-fill'), chat: ph('chat-teardrop-dots', 30, C, 'ph-fill'),
      flame: ph('flame', 24, C, 'ph-fill'), cube: ph('cube', 24, C, 'ph-fill'), chart: ph('chart-bar', 24, C, 'ph-fill'),
      lock: ph('lock-simple', 24, C, 'ph-fill'), bell: ph('bell', 24, C, 'ph-fill'),
      mail: ph('envelope', 18, 'currentColor'), apple: appStoreMark(16, 'currentColor'),
      check: ph('check-circle', 24, '#fff', 'ph-fill'), checkPink: ph('check-circle', 24, '#FF4F62', 'ph-fill'),
      skip: ph('x', 22, '#b9b0b6', 'ph-bold'), heart: ph('heart', 26, '#fff', 'ph-fill'),
      never: gameIcon(0, '#6b6b76', 18), target: gameIcon(1, '#6b6b76', 18), bubble: gameIcon(2, '#6b6b76', 18), swap: gameIcon(3, '#6b6b76', 18)
    };
  }
  function pchk() { return ph('check', 15, '#FF4F62', 'ph-bold'); }

  // 3D hero is rendered by assets/hero3d.js (three.js). site.js only drives it via window.ClinkyHero.
  function hero() { return window.ClinkyHero; }

  // ===== global clink counter — rolling odometer (digits fall from above), shared via abacus free API =====
  var CLINK_BASE = 'https://abacus.jasoncameron.dev', CLINK_NS = 'clinky-clinks-prod', CLINK_KEY = 'total';
  var CLINK_LOOPS = 2, CLINK_REST = CLINK_LOOPS * 10;   // ribbon: 0-9 repeated, rest digit lives in the last loop
  var CLINK_CELL = 1.2;                                  // cell height in em (>1 so tall glyphs aren't clipped)
  var clinkValue = null, clinkCols = 0, clinkBusy = false, clinkTimer = null, clinkRevealed = false, clinkObs = null, clinkPoll = null;
  function clinkEl() { return document.getElementById('clinkNum'); }
  function clinkColsFor(v) { return Math.max(1, String(Math.max(0, Math.round(v))).length); }
  function clinkBuild(cols) {
    var el = clinkEl(); if (!el) return;
    var ch = CLINK_CELL + 'em', html = '';
    for (var pos = 0; pos < cols; pos++) {
      var pfr = cols - 1 - pos;
      if (pos > 0 && pfr % 3 === 2) html += '<span class="odo-sep">,</span>';
      var cells = '';
      for (var k = 0; k <= CLINK_REST + 9; k++) cells += '<span class="odo-cell" style="height:' + ch + '">' + (k % 10) + '</span>';
      html += '<span class="odo-col" style="height:' + ch + '"><span class="odo-strip" style="transform:translateY(0)">' + cells + '</span></span>';
    }
    el.innerHTML = html; clinkCols = cols;
  }
  function clinkRoll(value, fromTop) {
    var el = clinkEl(); if (!el) return;
    var s = String(Math.max(0, Math.round(value))), cols = s.length;
    if (cols !== clinkCols) clinkBuild(cols);
    var strips = el.querySelectorAll('.odo-strip');
    // duration scales a bit with digit count so big numbers still read; gentle ease-in start (not abrupt)
    var dur = fromTop ? (1.1 + cols * 0.16) : 0.95, stag = fromTop ? 210 : 70, ease = 'cubic-bezier(.42,.06,.22,1)';
    for (var pos = 0; pos < cols; pos++) {
      var strip = strips[pos]; if (!strip) continue;
      var d = +s[pos], idx = CLINK_REST + d;
      if (fromTop) { strip.style.transition = 'none'; strip.style.transform = 'translateY(0)'; void strip.offsetWidth; }   // start at the top (shows 0), then drop
      strip.style.transition = 'transform ' + dur + 's ' + ease + ' ' + (pos * stag) + 'ms';   // left→right cascade
      strip.style.transform = 'translateY(-' + (idx * CLINK_CELL).toFixed(3) + 'em)';
    }
    return dur * 1000 + (cols - 1) * stag;   // total animation time
  }
  function clinkPrime(v) { clinkBuild(clinkColsFor(v)); }   // reserve correct width, strips at top (showing 0)
  function clinkMaybeReveal() { if (clinkRevealed && clinkValue != null) clinkRoll(clinkValue, true); }
  function bindClinkReveal() {
    var el = clinkEl(); if (!el) return;
    clinkRevealed = false;
    if (typeof IntersectionObserver !== 'function') { clinkRevealed = true; clinkMaybeReveal(); return; }
    if (clinkObs) clinkObs.disconnect();
    clinkObs = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { clinkRevealed = true; clinkMaybeReveal(); clinkObs.disconnect(); } });
    }, { threshold: 0.4 });
    clinkObs.observe(el);
  }
  function clinkDebugValue() {   // ?clink=123456 → test the odometer at any width (not sent to server)
    try { var q = new URLSearchParams(location.search).get('clink'); if (q != null && /^\d+$/.test(q)) return parseInt(q, 10); } catch (e) {}
    return null;
  }
  function loadClinkCount() {
    clinkBuild(2);   // placeholder width at "00" (top), rolled in on reveal
    bindClinkReveal();
    var dbg = clinkDebugValue();
    if (dbg != null) { clinkValue = dbg; clinkPrime(dbg); clinkMaybeReveal(); return; }   // debug override, skip server
    if (typeof fetch !== 'function') return;
    fetch(CLINK_BASE + '/get/' + CLINK_NS + '/' + CLINK_KEY)
      .then(function (r) { return r.json(); })
      .then(function (d) { if (typeof d.value === 'number') { clinkValue = d.value; if (!clinkRevealed) clinkPrime(d.value); clinkMaybeReveal(); } })
      .catch(function () {});
    startClinkPoll();
  }
  // Poll the shared total so other people's clinks roll in live for everyone online.
  function startClinkPoll() {
    stopClinkPoll();
    if (clinkDebugValue() != null || typeof fetch !== 'function') return;
    clinkPoll = setInterval(function () {
      if (document.hidden || clinkBusy) return;     // skip when tab hidden or a roll is in progress
      fetch(CLINK_BASE + '/get/' + CLINK_NS + '/' + CLINK_KEY)
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (typeof d.value !== 'number' || d.value === clinkValue) return;
          clinkValue = d.value;
          if (clinkRevealed && !clinkBusy) clinkRoll(d.value, false);
          else if (!clinkRevealed) clinkPrime(d.value);
        })
        .catch(function () {});
    }, 10000);
  }
  function stopClinkPoll() { if (clinkPoll) { clearInterval(clinkPoll); clinkPoll = null; } }
  function bumpClink() {
    if (clinkBusy || clinkValue == null) return;   // ignore taps until the roll finishes (no spam / double-count)
    clinkBusy = true;
    clinkValue += 1;
    var t = clinkRoll(clinkValue, false);          // roll the digit(s) up one notch
    if (clinkTimer) clearTimeout(clinkTimer);
    clinkTimer = setTimeout(function () { clinkBusy = false; }, (t || 1000) + 100);
    if (clinkDebugValue() != null) return;         // in debug mode don't touch the server
    if (typeof fetch !== 'function') return;
    fetch(CLINK_BASE + '/hit/' + CLINK_NS + '/' + CLINK_KEY)
      .then(function (r) { return r.json(); })
      .then(function (d) { if (typeof d.value === 'number' && d.value !== clinkValue) { clinkValue = d.value; clinkRoll(d.value, false); } })
      .catch(function () {});
  }

  // ===== header / footer =====
  function renderHeader() {
    var t = tdict(), p = state.page;
    var seg = 'display:flex;padding:4px;border-radius:999px;flex:none;background:rgba(28,19,38,.05);border:1px solid rgba(28,19,38,.08)';
    var join = 'border:0;cursor:pointer;border-radius:999px;padding:9px 18px;font-weight:800;font-size:14px;font-family:Nunito,sans-serif;white-space:nowrap;transition:transform .2s;background:#FF4F62;color:#fff;box-shadow:0 8px 18px -8px rgba(255,79,98,.7)';
    var navDiv = 'width:1px;height:20px;background:rgba(28,19,38,.12);margin:0 6px;flex:none';
    return '' +
      '<button id="hdrLogo" data-act="home" style="display:flex;align-items:center;gap:10px;background:transparent;border:0;cursor:pointer;padding:0;flex:none;transition:opacity .3s ease;' + (state.scrolled || state.page !== 'home' ? '' : 'opacity:0;pointer-events:none') + '">' +
        '<img src="assets/clinky-icon.png" alt="Clinky" style="width:36px;height:36px;border-radius:11px;box-shadow:0 5px 14px -5px rgba(225,29,72,.6)">' +
        '<span style="font-family:Nunito,sans-serif;font-weight:900;font-size:22px;letter-spacing:-.5px;color:#1c1326">Clinky</span>' +
      '</button>' +
      '<nav class="nav-mid" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:4px">' +
        '<button data-act="home" style="' + navPill(p === 'home') + '">' + esc(t.navHome) + '</button>' +
        '<button data-act="about" style="' + navPill(p === 'about') + '">' + esc(t.navAbout) + '</button>' +
        '<button data-act="support" style="' + navPill(p === 'support') + '">' + esc(t.navSupport) + '</button>' +
        '<span class="nav-legal" style="' + navDiv + '"></span>' +
        '<button data-act="privacy" class="nav-legal" style="' + navPill(p === 'privacy') + '">' + esc(t.navPrivacy) + '</button>' +
        '<button data-act="terms" class="nav-legal" style="' + navPill(p === 'terms') + '">' + esc(t.navTerms) + '</button>' +
      '</nav>' +
      '<div style="display:flex;align-items:center;gap:10px;flex:none;margin-left:auto">' +
        '<button data-act="join" class="join-cta" style="' + join + '">' + esc(t.navJoin) + '</button>' +
        '<div style="' + seg + '">' +
          '<button data-act="en" style="' + langSeg(state.lang === 'en') + '">EN</button>' +
          '<button data-act="ru" style="' + langSeg(state.lang === 'ru') + '">RU</button>' +
        '</div>' +
        '<button data-act="menu" class="nav-burger" aria-label="Menu" style="display:none;align-items:center;justify-content:center;width:42px;height:42px;border-radius:13px;border:1px solid rgba(28,19,38,.1);background:#fff;cursor:pointer;flex:none">' +
          ph(state.menuOpen ? 'x' : 'list', 22, '#1c1326', 'ph-bold') +
        '</button>' +
      '</div>' +
      (state.menuOpen ? '<div class="nav-menu" style="position:absolute;top:calc(100% + 8px);right:clamp(14px,3.5vw,40px);left:clamp(14px,3.5vw,40px);background:#fff;border:1px solid #ece7ec;border-radius:18px;box-shadow:0 18px 40px -18px rgba(28,19,38,.3);padding:8px;display:flex;flex-direction:column;gap:2px;z-index:70;animation:popIn .2s ease both">' +
        ['home', 'about', 'support', 'privacy', 'terms'].map(function (pg) {
          var label = { home: t.navHome, about: t.navAbout, support: t.navSupport, privacy: t.navPrivacy, terms: t.navTerms }[pg];
          var on = p === pg;
          return '<button data-act="' + pg + '" style="text-align:left;border:0;cursor:pointer;border-radius:12px;padding:13px 16px;font-family:Nunito,sans-serif;font-weight:800;font-size:16px;background:' + (on ? '#FF4F62' : 'transparent') + ';color:' + (on ? '#fff' : '#1c1326') + '">' + esc(label) + '</button>';
        }).join('') +
      '</div>' : '');
  }

  function renderFooter() {
    var t = tdict(), I = icons();
    var lnk = 'background:transparent;border:0;cursor:pointer;font-size:14.5px;color:#6b6b76;padding:0;font-family:DM Sans,sans-serif';
    var head = 'font-family:Nunito,sans-serif;font-weight:800;font-size:12.5px;letter-spacing:1px;text-transform:uppercase;color:#a99ea6;margin-bottom:2px';
    return '' +
      '<div style="max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:34px" class="pillars">' +
        '<div style="max-width:300px">' +
          '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">' +
            '<img src="assets/clinky-icon.png" alt="Clinky" style="width:36px;height:36px;border-radius:11px">' +
            '<span style="font-family:Nunito,sans-serif;font-weight:900;font-size:22px;color:#1c1326">Clinky</span>' +
          '</div>' +
          '<p style="font-family:Nunito,sans-serif;font-weight:800;font-size:15px;color:#1c1326;margin:0 0 8px">' + esc(t.slogan) + '</p>' +
          '<p style="font-size:13.5px;color:#8a8190;margin:0 0 18px;line-height:1.55">' + esc(t.footNote) + '</p>' +
          '<div style="display:inline-flex;align-items:center;gap:6px;padding:9px 16px;border-radius:12px;background:#fff;border:1px solid #e9e6ec;font-size:13.5px;font-weight:700;color:#3a323f">' + esc(t.footComingSoon) + I.apple + '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">' +
          '<div style="' + head + '">' + esc(t.footProduct) + '</div>' +
          '<button data-act="home" style="' + lnk + '">' + esc(t.navHome) + '</button>' +
          '<button data-act="about" style="' + lnk + '">' + esc(t.navAbout) + '</button>' +
          '<button data-act="support" style="' + lnk + '">' + esc(t.navSupport) + '</button>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">' +
          '<div style="' + head + '">' + esc(t.footLegalReach) + '</div>' +
          '<button data-act="privacy" style="' + lnk + '">' + esc(t.navPrivacy) + '</button>' +
          '<button data-act="terms" style="' + lnk + '">' + esc(t.navTerms) + '</button>' +
          '<a href="mailto:' + CONTACT_EMAIL + '" style="display:inline-flex;align-items:center;gap:7px;font-size:14.5px;color:#6b6b76">' + I.mail + esc(t.footEmail) + '</a>' +
        '</div>' +
      '</div>' +
      '<div style="max-width:1080px;margin:32px auto 0;padding-top:20px;border-top:1px solid #e9e6ec;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap">' +
        '<span style="font-size:12.5px;color:#a99ea6">© 2026 Clinky · ' + esc(t.footRights) + '</span>' +
        '<div style="display:flex;gap:6px">' +
          '<button data-act="en" style="' + langSegDark(state.lang === 'en') + '">EN</button>' +
          '<button data-act="ru" style="' + langSegDark(state.lang === 'ru') + '">RU</button>' +
        '</div>' +
      '</div>';
  }

  // ===== waitlist form =====
  function waitlistForm(onColor, left) {
    var t = tdict();
    if (state.waitlistDone) {
      return '<div style="display:inline-flex;align-items:center;gap:13px;padding:17px 22px;border-radius:18px;background:' + (onColor ? 'rgba(255,255,255,.92)' : '#FFF0F2') + ';border:1px solid ' + (onColor ? 'transparent' : '#ffd9de') + ';max-width:32em;text-align:left;animation:popIn .5s ease both">' +
        '<span style="display:inline-flex;flex:none">' + icons().checkPink + '</span><span style="font-weight:600;font-size:15px;line-height:1.45;color:#3a323f">' + esc(t.heroDone) + '</span></div>';
    }
    var btn = onColor
      ? 'color:#E11D48;background:#fff;box-shadow:0 16px 30px -12px rgba(0,0,0,.35)'
      : 'color:#fff;background:#FF4F62;box-shadow:0 14px 30px -10px rgba(255,79,98,.75)';
    return '<form data-form="waitlist" style="display:flex;gap:11px;max-width:32em;margin:' + (left ? '0' : '0 auto') + ';flex-wrap:wrap">' +
        '<input name="email" type="email" required placeholder="' + esc(t.emailPh) + '" style="flex:1;min-width:220px;border:1px solid ' + (onColor ? 'transparent' : '#efe1e4') + ';border-radius:16px;padding:18px 22px;font-size:16.5px;background:#fff;color:#1c1326;outline:none;box-shadow:0 10px 28px -16px rgba(28,19,38,.32)">' +
        '<input type="text" name="hp" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none">' +
        '<button type="submit" class="cta-btn" style="border:0;cursor:pointer;border-radius:16px;padding:18px 32px;font-family:Nunito,sans-serif;font-weight:800;font-size:16.5px;transition:transform .2s,box-shadow .2s;white-space:nowrap;' + btn + '">' + esc(t.heroCta) + '</button>' +
      '</form>';
  }

  // ===== HOME =====
  function renderHome() {
    var t = tdict(), I = icons(), L = state.lang;

    // ---- hero (two-column: text left, 3D right) ----
    var hero = '<section style="position:relative;padding:clamp(80px,9vh,112px) clamp(20px,5vw,72px) clamp(40px,6vh,68px);overflow:hidden">' +
      sparkle({ s: 30, pos: 'top:15%;left:8%', op: 0.7, c: C, glow: 'rgba(255,79,98,.35)', anim: 'twinkle 4s ease-in-out infinite' }) +
      sparkle({ s: 23, pos: 'top:18%;right:10%', op: 0.62, c: C, glow: 'rgba(255,79,98,.3)', anim: 'twinkle 3.4s ease-in-out .3s infinite' }) +
      sparkle({ s: 13, pos: 'top:11%;right:30%', op: 0.5, c: '#FF8A97', glow: 'rgba(255,138,151,.3)', anim: 'twinkle 4.4s ease-in-out .9s infinite' }) +
      sparkle({ s: 16, pos: 'bottom:14%;left:5%', op: 0.5, c: C, glow: 'rgba(255,79,98,.3)', anim: 'twinkle 3.8s ease-in-out .5s infinite' }) +
      sparkle({ s: 27, pos: 'bottom:12%;right:7%', op: 0.55, c: C, glow: 'rgba(255,79,98,.3)', anim: 'twinkle 4.6s ease-in-out .2s infinite' }) +
      sparkle({ s: 14, pos: 'top:40%;right:46%', op: 0.42, c: '#FF8A97', glow: 'rgba(255,138,151,.28)', anim: 'twinkle 3.2s ease-in-out .7s infinite' }) +
      sparkle({ s: 20, pos: 'bottom:30%;right:40%', op: 0.45, c: C, glow: 'rgba(255,79,98,.28)', anim: 'twinkle 5s ease-in-out .55s infinite' }) +
      '<div class="hero-grid" style="position:relative;max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:clamp(24px,5vw,64px)">' +
        '<div class="hero-left" style="flex:1.06;min-width:0;text-align:left">' +
          '<div class="hero-icon" style="display:flex;justify-content:center;max-width:32em;margin:0 0 16px">' +
            '<img src="assets/clinky-icon.png" alt="Clinky" fetchpriority="high" width="72" height="72" style="width:72px;height:72px;border-radius:20px;box-shadow:0 16px 32px -12px rgba(225,29,72,.5)">' +
          '</div>' +
          '<div class="hero-eyebrow" style="display:flex;justify-content:center;max-width:32em;margin:0 0 18px">' +
            '<span style="display:inline-flex;align-items:center;gap:9px;padding:10px 20px;border-radius:999px;background:linear-gradient(135deg,#FF6373,#E11D48);color:#fff;font-family:Nunito,sans-serif;font-weight:800;font-size:14.5px;box-shadow:0 14px 30px -10px rgba(225,29,72,.6);animation:eyebrowPulse 2.6s ease-in-out infinite">' +
              '<span style="position:relative;width:9px;height:9px;display:inline-flex;flex:none">' +
                '<span style="position:absolute;inset:0;border-radius:50%;background:#fff;animation:liveRing 1.7s ease-out infinite"></span>' +
                '<span style="position:absolute;inset:0;border-radius:50%;background:#fff;animation:liveBlink 1.7s ease-in-out infinite"></span>' +
              '</span>' + esc(t.heroEyebrow) + appStoreMark(17, '#fff') + '</span>' +
          '</div>' +
          '<h1 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(34px,4.6vw,56px);line-height:1.04;letter-spacing:-1.4px;margin:0 0 12px;color:#1c1326;text-wrap:balance">' + esc(t.heroTitle) + (L === 'ru' ? ' с ' : ' with ') + '<span style="color:#FF4F62">Clinky</span></h1>' +
          '<p style="font-size:clamp(16px,1.5vw,18.5px);line-height:1.5;color:#6b6b76;max-width:30em;margin:0 0 20px">' + esc(t.heroLede) + '</p>' +
          '<div id="wl1">' + waitlistForm(false, true) + '</div>' +
          (state.waitlistDone ? '' :
            '<div class="hero-trust" style="display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin:16px 0 0">' +
              heroChip('user-circle', t.trust1) + heroChip('shield-check', t.trust2) + heroChip('apple-logo', t.trust3) +
            '</div>') +
        '</div>' +
      '<div class="hero-right" style="flex:1;min-width:0;position:relative;max-width:520px;margin:0 auto">' +
        '<div data-act="play" style="position:relative;aspect-ratio:1/0.62;perspective:1000px;cursor:pointer">' +
          '<div style="position:absolute;inset:2% 4% 0;border-radius:50%;background:radial-gradient(ellipse 60% 56% at 50% 47%,rgba(255,79,98,.4),rgba(255,138,151,.16) 46%,transparent 72%);animation:glowPulse 6s ease-in-out infinite;pointer-events:none"></div>' +
          '<div id="heroMount" style="position:absolute;inset:0;z-index:1"></div>' +
          '<div id="mvLoader" aria-hidden="true" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:2;transition:opacity .3s ease">' +
            '<div style="position:relative;width:64px;height:64px">' +
              '<svg width="64" height="64" viewBox="0 0 64 64" style="transform:rotate(-90deg)">' +
                '<circle cx="32" cy="32" r="26" fill="none" stroke="#FFE2E6" stroke-width="5"></circle>' +
                '<circle id="mvProgArc" cx="32" cy="32" r="26" fill="none" stroke="#FF4F62" stroke-width="5" stroke-linecap="round" stroke-dasharray="163.36" stroke-dashoffset="163.36" style="transition:stroke-dashoffset .25s ease"></circle>' +
              '</svg>' +
              '<span id="mvPct" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Nunito,sans-serif;font-weight:800;font-size:13px;color:#FF4F62">0%</span>' +
            '</div>' +
          '</div>' +
          '<div id="fxLayer" aria-hidden="true" style="position:absolute;inset:0;pointer-events:none;overflow:visible;z-index:6"></div>' +
          '<div class="float-card" style="top:16%;left:-2%;animation:bobA 7s ease-in-out infinite"><div class="float-inner"><span class="chip-ic">' + ph('flame', 17, C, 'ph-fill') + '</span>' + esc(L === 'ru' ? '5 недель подряд' : '5-week streak') + '</div></div>' +
          '<div class="float-card" data-act="plusone" style="bottom:16%;right:-2%;cursor:pointer;pointer-events:auto;animation:bobB 8s ease-in-out infinite"><div class="float-inner"><span class="chip-ic">' + ph('cube', 17, C, 'ph-fill') + '</span>' + esc(L === 'ru' ? '+1 в коллекцию' : '+1 collectible') + '</div></div>' +
        '</div>' +
        '<p style="font-size:13.5px;color:#a99ea6;text-align:center;margin:10px 0 0">' + esc(t.heroModel) + '</p>' +
        drinkToggle() +
      '</div>' +
      '</div>' +
    '</section>';

    // ---- problem hook (emotional, problem → turn) ----
    var problem = '<section style="position:relative;padding:clamp(56px,9vh,108px) clamp(20px,5vw,72px);overflow:hidden">' +
      sparkle({ s: 18, pos: 'top:20%;left:13%', op: 0.4, c: '#FF8A97', glow: 'rgba(255,138,151,.28)', anim: 'twinkle 4.6s ease-in-out infinite' }) +
      sparkle({ s: 14, pos: 'bottom:22%;right:15%', op: 0.4, c: C, glow: 'rgba(255,79,98,.26)', anim: 'twinkle 4s ease-in-out .6s infinite' }) +
      '<div style="position:relative;max-width:680px;margin:0 auto;text-align:center">' +
        kicker(t.problemKicker) +
        h2sec(t.problemTitle) +
        '<p style="font-size:clamp(16px,1.6vw,18.5px);line-height:1.6;color:#6b6b76;margin:0 auto 22px;max-width:30em">' + esc(t.problemBody) + '</p>' +
        '<p style="font-family:Nunito,sans-serif;font-weight:800;font-size:clamp(18px,2vw,22px);line-height:1.35;color:#FF4F62;margin:0 auto;max-width:26em">' + esc(t.problemTurn) + '</p>' +
      '</div>' +
    '</section>';

    // ---- feature bento (Sheepy-style tilted compositions) ----
    function bshot(n) { return 'assets/shots/en-' + n + '.jpg'; } // TODO swap to assets/bento/* finals
    var capImg = 'assets/bento/drink.png';
    function L2(ru, en) { return L === 'ru' ? ru : en; }
    var FC = {
      ic:  { ic: 'game-controller', t: L2('Карточки-игры', 'Icebreakers'), d: L2('Реальные карточки, что разговорят любой стол за секунды', 'Real cards that get any table talking in seconds') },
      col: { ic: 'cube', t: L2('3D-коллекция', '3D collection'), d: L2('Коллекционный напиток за каждый «чок»', 'A collectible drink for every clink') },
      str: { ic: 'flame', t: L2('Серии встреч', 'Meeting streaks'), d: L2('Держи серию встреч с близкими', 'Keep your streak going with the people close to you') },
      ach: { ic: 'trophy', t: L2('Достижения', 'Achievements'), d: L2('Десятки наград, включая тайные', 'Dozens of badges, some of them secret') },
      an:  { ic: 'chart-bar', t: L2('Аналитика встреч', 'Analytics'), d: L2('Графики и факты о твоих друзьях, напитках и встречах', 'Clear charts of your friends, drinks and meet-ups') },
      rem: { ic: 'bell', t: L2('Умные напоминания', 'Smart reminders'), d: L2('Мягко подскажем, чтобы ты никого не забыл', 'A gentle nudge so you never forget a friend') }
    };
    // Unified bento header: icon BESIDE title (one row), description below.
    function bHead(f, mw) {
      return '<div class="bento-head" style="position:relative;z-index:4;max-width:' + (mw || '100%') + '">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
          '<span style="display:inline-flex;width:42px;height:42px;border-radius:13px;background:#FFE2E6;align-items:center;justify-content:center;flex:none">' + ph(f.ic, 21, C, 'ph-fill') + '</span>' +
          '<h3 style="font-family:Nunito,sans-serif;font-weight:800;font-size:18px;margin:0;color:#1c1326">' + esc(f.t) + '</h3>' +
        '</div>' +
        '<p style="font-size:13.5px;line-height:1.5;color:#6b6b76;margin:0">' + esc(f.d) + '</p>' +
      '</div>';
    }
    function scr(src, css) {
      return '<img src="' + src + '" loading="lazy" alt="" style="position:absolute;border-radius:22px;border:3px solid #fff;box-shadow:0 26px 54px -22px rgba(28,19,38,.32);object-fit:cover;' + css + '">';
    }
    function badge(icon, bg, css) {
      return '<span style="position:absolute;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:' + bg + ';border:3px solid #fff;box-shadow:0 16px 28px -10px rgba(28,19,38,.42);' + css + '">' + ph(icon, 22, '#fff', 'ph-fill') + '</span>';
    }
    function donut(pct, css) {
      var r = 30, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
      return '<div style="position:absolute;width:84px;height:84px;border-radius:50%;background:#fff;box-shadow:0 18px 34px -14px rgba(28,19,38,.34);display:flex;align-items:center;justify-content:center;' + css + '">' +
        '<svg width="72" height="72" viewBox="0 0 72 72" style="transform:rotate(-90deg)">' +
          '<circle cx="36" cy="36" r="' + r + '" fill="none" stroke="#FFE2E6" stroke-width="9"></circle>' +
          '<circle cx="36" cy="36" r="' + r + '" fill="none" stroke="#FF4F62" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"></circle>' +
        '</svg>' +
        '<span style="position:absolute;font-family:Nunito,sans-serif;font-weight:900;font-size:15px;color:#1c1326">' + pct + '%</span>' +
      '</div>';
    }
    var ibThemes = ['nhi', 'rou', 'tam', 'wyr'];
    var ibDeckImgs = ibThemes.map(function (th) {
      return '<img class="ibd-card" src="assets/bento/ib-' + th + '-' + L + '.png" loading="lazy" alt="" draggable="false" style="position:absolute;left:0;top:0;width:100%;transform-origin:center;user-select:none;-webkit-user-drag:none">';
    }).join('');
    var cellIce = '<div class="bento-card" style="grid-column:1/3;grid-row:1/3;position:relative;overflow:hidden;padding:26px">' +
        bHead(FC.ic, '54%') +
        '<div id="ibDeck" class="bento-media" style="position:absolute;left:50%;bottom:46px;width:300px;height:258px;transform:translateX(-50%);cursor:grab;touch-action:pan-y">' + ibDeckImgs + '</div>' +
      '</div>';
    var cellCol = '<div class="bento-card" style="grid-column:3/5;grid-row:1/2;position:relative;overflow:visible;padding:26px;z-index:3">' +
        bHead(FC.col, '60%') +
        '<img src="' + capImg + '" alt="" class="bento-media" style="position:absolute;right:-34px;top:22px;width:236px;filter:drop-shadow(7px 9px 6px rgba(28,19,38,.30)) drop-shadow(13px 17px 16px rgba(28,19,38,.13));z-index:2">' +
      '</div>';
    var cellStr = '<div class="bento-card" style="grid-column:3/4;grid-row:2/3;position:relative;overflow:hidden;padding:20px">' +
        bHead(FC.str, '100%') +
        '<img src="assets/bento/streak-' + L + '.png?v=3" alt="" loading="lazy" class="bento-media" style="position:absolute;left:50%;bottom:14px;width:212px;transform:translateX(-50%);filter:drop-shadow(0 5px 6px rgba(28,19,38,.20)) drop-shadow(0 13px 16px rgba(28,19,38,.10));z-index:1">' +
      '</div>';
    var cellAch = '<div class="bento-card" style="grid-column:4/5;grid-row:2/3;position:relative;overflow:visible;padding:20px;z-index:2">' +
        bHead(FC.ach, '100%') +
        '<img src="assets/bento/ach-' + L + '.png?v=5" loading="lazy" alt="" class="bento-media" style="position:absolute;right:-18px;bottom:44px;width:262px;transform:rotate(-4deg);filter:drop-shadow(0 5px 6px rgba(28,19,38,.18)) drop-shadow(0 13px 16px rgba(28,19,38,.09));z-index:1">' +
      '</div>';
    var cellAn = '<div class="bento-card" style="grid-column:1/3;grid-row:3/4;position:relative;overflow:visible;padding:26px;z-index:2">' +
        bHead(FC.an, '58%') +
        '<img src="assets/bento/donut-' + L + '.png" loading="lazy" alt="" class="bento-media" style="position:absolute;left:30px;bottom:-30px;width:226px;transform:rotate(-3deg);filter:drop-shadow(0 5px 6px rgba(28,19,38,.18)) drop-shadow(0 13px 16px rgba(28,19,38,.09));z-index:2">' +
        '<img src="assets/bento/chart-' + L + '.png" loading="lazy" alt="" class="bento-media" style="position:absolute;right:-12px;bottom:-14px;width:300px;transform:rotate(2deg);filter:drop-shadow(0 5px 6px rgba(28,19,38,.16)) drop-shadow(0 13px 16px rgba(28,19,38,.08));z-index:3">' +
      '</div>';
    var cellRem = '<div class="bento-card" style="grid-column:3/5;grid-row:3/4;position:relative;overflow:hidden;padding:24px">' +
        bHead(FC.rem, '100%') +
        '<img src="assets/bento/notif-' + L + '.png" alt="" loading="lazy" class="bento-media" style="position:absolute;left:50%;top:108px;width:510px;transform:translateX(-50%);filter:drop-shadow(0 0 7px rgba(28,19,38,.18)) drop-shadow(0 7px 16px rgba(28,19,38,.11));z-index:1">' +
      '</div>';
    var discover = '<section style="padding:clamp(50px,8vh,96px) clamp(20px,5vw,72px)"><div style="max-width:1080px;margin:0 auto">' +
      '<div style="text-align:center;margin-bottom:clamp(30px,5vh,46px)">' + kicker(t.discoverKicker) + h2sec(t.discoverTitle) + subsec(t.discoverSub) + '</div>' +
      '<div class="bento">' + cellIce + cellCol + cellStr + cellAch + cellAn + cellRem + '</div>' +
    '</div></section>';

    // ---- interactive question mini-game ----
    var card = renderQuestionSection();

    // ---- final CTA (contained coral block) ----
    var finalCta = '<section style="padding:clamp(20px,3vh,40px) clamp(20px,5vw,72px) clamp(60px,9vh,100px)">' +
      '<div style="position:relative;max-width:920px;margin:0 auto;border-radius:36px;overflow:hidden;background:#fff;border:1px solid #e9e6ec;padding:clamp(44px,6vw,76px) clamp(24px,5vw,56px);text-align:center;box-shadow:0 30px 60px -34px rgba(255,79,98,.45)">' +
        sparkle({ s: 28, pos: 'top:14%;left:12%', op: 0.55, c: C, glow: 'rgba(255,79,98,.3)', anim: 'twinkle 4s ease-in-out infinite' }) +
        sparkle({ s: 15, pos: 'top:24%;left:22%', op: 0.45, c: C, glow: 'rgba(255,79,98,.3)', anim: 'twinkle 5s ease-in-out .6s infinite' }) +
        sparkle({ s: 14, pos: 'top:18%;right:23%', op: 0.45, c: '#FF8A97', glow: 'rgba(255,138,151,.3)', anim: 'twinkle 3.4s ease-in-out .4s infinite' }) +
        sparkle({ s: 24, pos: 'bottom:18%;right:12%', op: 0.55, c: C, glow: 'rgba(255,79,98,.3)', anim: 'twinkle 4.6s ease-in-out .2s infinite' }) +
        sparkle({ s: 14, pos: 'bottom:26%;left:16%', op: 0.4, c: C, glow: 'rgba(255,79,98,.25)', anim: 'twinkle 3.8s ease-in-out .8s infinite' }) +
        sparkle({ s: 18, pos: 'bottom:12%;right:30%', op: 0.5, c: C, glow: 'rgba(255,79,98,.3)', anim: 'twinkle 5.2s ease-in-out .3s infinite' }) +
        sparkle({ s: 20, pos: 'top:40%;left:8%', op: 0.5, c: C, glow: 'rgba(255,79,98,.3)', anim: 'twinkle 4.4s ease-in-out .9s infinite' }) +
        sparkle({ s: 16, pos: 'top:46%;right:9%', op: 0.45, c: '#FF8A97', glow: 'rgba(255,138,151,.3)', anim: 'twinkle 3.6s ease-in-out .5s infinite' }) +
        '<div style="position:relative;max-width:540px;margin:0 auto">' +
          '<img src="assets/clinky-icon.png" alt="Clinky" style="width:68px;height:68px;border-radius:20px;margin:0 auto 18px;box-shadow:0 16px 32px -12px rgba(225,29,72,.55);display:block">' +
          '<h2 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(28px,4.2vw,46px);line-height:1.05;letter-spacing:-1px;margin:0 0 12px;color:#1c1326">' + esc(t.finalTitle) + '</h2>' +
          '<p style="font-size:16.5px;color:#6b6b76;margin:0 auto 26px;max-width:30em">' + esc(t.finalSub) + '</p>' +
          '<div id="wl2">' + waitlistForm() + '</div>' +
          (state.waitlistDone ? '' : '<p style="font-size:13px;color:#a99ea6;margin:14px 0 0">' + esc(t.heroMicro) + '</p>') +
        '</div>' +
      '</div>' +
    '</section>';

    // ---- global clink counter (premium odometer) ----
    var counter = '<section style="padding:clamp(6px,1.5vh,18px) clamp(20px,5vw,72px) clamp(14px,3vh,28px)">' +
      '<div style="max-width:560px;margin:0 auto;text-align:center">' +
        kicker(t.counterKicker) +
        '<div id="clinkNum" class="odo" style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(56px,9vw,104px);line-height:1;color:#FF4F62;margin:2px 0 10px">' + '</div>' +
        subsec(t.counterLabel) +
      '</div>' +
    '</section>';

    return '<div class="page-in">' + hero + counter + problem + discover + card + finalCta + '</div>';
  }

  function renderQuestionSection() {
    var t = tdict();
    return '<section style="padding:clamp(50px,8vh,96px) clamp(16px,4vw,72px)">' +
      '<div style="max-width:760px;margin:0 auto;text-align:center">' + kicker(t.gamesKicker) + h2sec(t.gamesTitle) + subsec(t.gamesSub) + '</div>' +
      '<div id="gameTabs" style="display:flex;flex-wrap:wrap;gap:9px;justify-content:center;margin:28px auto 22px;max-width:760px">' + renderGameTabs() + '</div>' +
      '<div style="max-width:430px;margin:0 auto">' +
        '<div id="qcard" style="position:relative;cursor:grab;border-radius:30px;background:#fff;box-shadow:0 26px 56px -26px rgba(225,29,72,.4);border:1px solid #e9e6ec;padding:26px 26px 24px;overflow:hidden;touch-action:pan-y;will-change:transform;user-select:none">' +
          '<div style="display:flex;align-items:center;justify-content:center;margin-bottom:14px">' +
            '<div id="qcat" style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border-radius:999px;background:#FFEDEF;color:#E11D48;font-family:Nunito,sans-serif;font-weight:800;font-size:13.5px">' + renderQcat() + '</div>' +
          '</div>' +
          '<div style="position:relative;min-height:120px;display:flex;align-items:center;justify-content:center;margin:8px 0 16px;padding:0 14px">' +
            '<span style="position:absolute;top:-8px;left:-2px;font-family:Nunito,sans-serif;font-weight:900;font-size:40px;line-height:1;color:rgba(255,79,98,.13);pointer-events:none">“</span>' +
            '<p id="qline" style="text-align:center;font-family:Nunito,sans-serif;font-weight:800;font-size:clamp(19px,2.4vw,24px);line-height:1.25;letter-spacing:-.3px;margin:0;text-wrap:pretty">' + renderQline() + '</p>' +
            '<span style="position:absolute;bottom:-20px;right:-2px;font-family:Nunito,sans-serif;font-weight:900;font-size:40px;line-height:1;color:rgba(255,79,98,.13);pointer-events:none">”</span>' +
          '</div>' +
          '<div style="border-top:1px solid #e9e6ec;padding-top:16px">' +
            '<div id="qcount" style="text-align:center;font-size:11.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#E11D48;margin-bottom:5px">' + esc(renderQcount()) + '</div>' +
            '<div style="text-align:center;font-size:12.5px;color:#a99ea6;margin-bottom:15px">' + esc(t.tapSwipe) + '</div>' +
            '<div style="display:flex;align-items:center;justify-content:center;gap:20px">' +
              '<button data-act="prevq" aria-label="' + esc(t.dislike) + '" style="display:flex;flex-direction:column;align-items:center;gap:6px;background:transparent;border:0;cursor:pointer">' +
                '<span style="width:54px;height:54px;border-radius:50%;background:#f6eef0;display:flex;align-items:center;justify-content:center">' + ph('arrow-left', 22, '#b9b0b6', 'ph-bold') + '</span>' +
                '<span style="font-size:12.5px;font-weight:600;color:#a99ea6">' + esc(t.dislike) + '</span>' +
              '</button>' +
              '<button data-act="nextq" aria-label="' + esc(t.like) + '" style="display:flex;flex-direction:column;align-items:center;gap:6px;background:transparent;border:0;cursor:pointer">' +
                '<span style="width:62px;height:62px;border-radius:50%;background:#FF4F62;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 24px -8px rgba(255,79,98,.8)">' + ph('arrow-right', 26, '#fff', 'ph-bold') + '</span>' +
                '<span style="font-size:13px;font-weight:700;color:#FF4F62">' + esc(t.like) + '</span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<p style="text-align:center;font-size:13px;color:#a99ea6;margin:16px 0 0">' + esc(t.cardHint) + '</p>' +
      '</div>' +
    '</section>';
  }
  function renderGameTabs() {
    var L = state.lang;
    return GAMES.map(function (g, i) {
      var active = i === state.gameIndex;
      return '<button data-act="g' + i + '" style="' + pill(active) + '">' + gameIcon(i, active ? '#fff' : '#6b6b76', 18) + esc(g.title[L]) + '</button>';
    }).join('');
  }
  function renderQcat() { return gameIcon(state.gameIndex, '#E11D48', 17) + esc(GAMES[state.gameIndex].title[state.lang]); }
  function renderQline() {
    var L = state.lang, cg = GAMES[state.gameIndex];
    var qStr = cg.q[state.qIndex % cg.q.length][L];
    return qStr.split('*').map(function (seg, i) { return '<span style="color:' + (i % 2 ? '#FF4F62' : '#1c1326') + '">' + esc(seg) + '</span>'; }).join('');
  }

  // ===== ABOUT =====
  function renderAbout() {
    var t = tdict(), I = icons();
    var pillar = function (ic, ti, de) {
      return '<div class="soft-card" style="padding:28px 26px">' +
        '<span style="display:flex;width:52px;height:52px;border-radius:15px;background:#FFE2E6;align-items:center;justify-content:center;margin-bottom:16px">' + ic + '</span>' +
        '<h3 style="font-family:Nunito,sans-serif;font-weight:800;font-size:18px;margin:0 0 7px;color:#1c1326">' + esc(ti) + '</h3>' +
        '<p style="font-size:14.5px;line-height:1.55;color:#6b6b76;margin:0">' + esc(de) + '</p></div>';
    };
    return '<div class="page-in">' +
      '<section style="position:relative;padding:clamp(118px,15vh,150px) clamp(20px,5vw,72px) clamp(36px,5vh,56px);text-align:center;overflow:hidden">' +
        sparkle({ s: 20, pos: 'top:24%;left:16%', op: 0.45, c: '#FF4F62', glow: 'rgba(255,79,98,.3)' }) +
        sparkle({ s: 14, pos: 'top:30%;right:18%', op: 0.4, c: '#FF8A97', glow: 'rgba(255,138,151,.3)', anim: 'twinkle 3.4s ease-in-out .4s infinite' }) +
        '<img src="assets/clinky-icon.png" alt="Clinky" style="width:78px;height:78px;border-radius:22px;margin:0 auto 22px;box-shadow:0 18px 34px -14px rgba(225,29,72,.6);display:block">' +
        '<h1 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(32px,4.6vw,52px);letter-spacing:-1.2px;margin:0 0 14px;color:#1c1326">' + esc(t.aboutTitle) + '</h1>' +
        '<p style="font-size:clamp(16px,1.6vw,19px);line-height:1.6;color:#6b6b76;max-width:34em;margin:0 auto">' + esc(t.aboutLede) + '</p>' +
      '</section>' +
      '<section style="padding:clamp(20px,3vh,40px) clamp(20px,5vw,72px) clamp(56px,8vh,90px)">' +
        '<div style="max-width:980px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:18px" class="pillars">' +
          pillar(I.people, t.p1t, t.p1d) + pillar(I.cupBig, t.p2t, t.p2d) + pillar(I.game, t.p3t, t.p3d) +
        '</div>' +
        '<div style="max-width:680px;margin:48px auto 0;text-align:center">' +
          '<div style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(24px,3.4vw,38px);color:#E11D48;letter-spacing:-.6px;margin-bottom:24px">' + esc(t.slogan) + '</div>' +
          coralBtn(t.heroCta, 'join') +
        '</div>' +
      '</section></div>';
  }

  // ===== SUPPORT =====
  function renderSupport() {
    var t = tdict(), I = icons();
    var body = state.supportDone
      ? '<div style="display:flex;align-items:center;gap:14px;padding:22px 24px;border-radius:18px;background:#FFF0F2;border:1px solid #ffd9de;animation:popIn .5s ease both"><span style="display:inline-flex;flex:none">' + I.checkPink + '</span><span style="font-weight:600;font-size:15.5px;line-height:1.45;color:#3a323f">' + esc(t.supDone) + '</span></div>'
      : '<form data-form="support" style="display:flex;flex-direction:column;gap:12px">' +
          '<input type="text" name="hp" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
          '<input name="contactName" required placeholder="' + esc(t.supName) + '" style="border:1px solid #e9e6ec;border-radius:14px;padding:15px 17px;font-size:15px;background:#fff;outline:none">' +
          '<input name="email" type="email" required placeholder="' + esc(t.supEmailPh) + '" style="border:1px solid #e9e6ec;border-radius:14px;padding:15px 17px;font-size:15px;background:#fff;outline:none">' +
          '<textarea name="message" required rows="5" placeholder="' + esc(t.supMsgPh) + '" style="border:1px solid #e9e6ec;border-radius:14px;padding:15px 17px;font-size:15px;background:#fff;outline:none;resize:vertical;min-height:120px"></textarea>' +
          '<button type="submit" style="border:0;cursor:pointer;border-radius:14px;padding:16px 24px;font-family:Nunito,sans-serif;font-weight:800;font-size:15.5px;color:#fff;background:#FF4F62;box-shadow:0 12px 26px -10px rgba(255,79,98,.7)">' + esc(t.supSend) + '</button>' +
          '<p style="font-size:12.5px;color:#a99ea6;text-align:center;margin:4px 0 0">' + esc(t.supNote) + '</p>' +
        '</form>';
    var faqHtml = FAQ[state.lang].map(function (f) {
      return '<div class="soft-card" style="padding:18px 20px">' +
        '<div style="font-family:Nunito,sans-serif;font-weight:800;font-size:15.5px;margin-bottom:6px;color:#1c1326">' + esc(f.q) + '</div>' +
        '<div style="font-size:14.5px;line-height:1.55;color:#6b6b76">' + esc(f.a) + '</div></div>';
    }).join('');
    return '<div class="page-in"><section style="padding:clamp(116px,16vh,158px) clamp(20px,5vw,72px) clamp(56px,9vh,100px)">' +
      '<div style="max-width:560px;margin:0 auto">' +
        '<div style="text-align:center;margin-bottom:30px">' +
          '<span style="display:flex;width:56px;height:56px;border-radius:17px;background:#FFE2E6;align-items:center;justify-content:center;margin:0 auto 18px">' + I.chat + '</span>' +
          '<h1 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(28px,3.8vw,42px);letter-spacing:-.8px;margin:0 0 10px;color:#1c1326">' + esc(t.supTitle) + '</h1>' +
          '<p style="font-size:16px;color:#6b6b76;margin:0">' + esc(t.supSub) + '</p>' +
        '</div>' + body +
        '<div style="margin-top:46px">' +
          '<h2 style="font-family:Nunito,sans-serif;font-weight:800;font-size:20px;margin:0 0 16px;text-align:center;color:#1c1326">FAQ</h2>' +
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
      if (sec.h) inner += '<h2 style="font-family:Nunito,sans-serif;font-weight:800;font-size:19px;margin:0 0 8px;color:#1c1326">' + esc(sec.h) + '</h2>';
      inner += sec.b.map(function (bl) {
        if (bl[0] === 'h3') return '<h3 style="font-family:Nunito,sans-serif;font-weight:700;font-size:16px;margin:18px 0 6px;color:#3a323f">' + esc(bl[1]) + '</h3>';
        if (bl[0] === 'ul') return '<ul style="margin:.5em 0 .9em;padding-left:1.3em">' + bl[1].map(function (li) { return '<li style="font-size:15px;line-height:1.65;color:#5d5660;margin:.35em 0">' + esc(li) + '</li>'; }).join('') + '</ul>';
        return '<p style="font-size:15px;line-height:1.7;color:#5d5660;margin:.6em 0">' + esc(bl[1]) + '</p>';
      }).join('');
      return '<div style="margin-bottom:22px">' + inner + '</div>';
    }).join('');
    return '<div class="page-in"><section style="padding:clamp(116px,16vh,158px) clamp(20px,5vw,72px) clamp(56px,9vh,100px)">' +
      '<div style="max-width:680px;margin:0 auto">' +
        '<h1 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(28px,3.8vw,42px);letter-spacing:-.8px;margin:0 0 6px;color:#1c1326">' + esc(title) + '</h1>' +
        '<p style="font-size:13.5px;color:#a99ea6;margin:0 0 30px">' + esc(t.docUpdated) + '</p>' + body +
        '<div style="margin-top:30px;padding:18px 20px;border-radius:16px;background:#fff;border:1px solid #e9e6ec;font-size:13.5px;color:#8a8190;line-height:1.6">' + esc(t.docContact) + '</div>' +
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
    var base = 'position:fixed;top:0;left:0;right:0;z-index:60;display:flex;align-items:center;gap:12px;padding:12px clamp(14px,3.5vw,40px);transition:background .35s ease,box-shadow .35s ease;';
    var bg = state.scrolled ? 'background:rgba(255,255,255,.9);box-shadow:0 6px 24px -10px rgba(28,19,38,.16);backdrop-filter:blur(12px);' : 'background:transparent;';
    if ($hdr) $hdr.setAttribute('style', base + bg);
    // header logo hidden at the top of Home (the hero already shows the big icon); fades in on scroll
    var logo = document.getElementById('hdrLogo');
    if (logo) { var show = state.scrolled || state.page !== 'home'; logo.style.opacity = show ? '1' : '0'; logo.style.pointerEvents = show ? 'auto' : 'none'; }
  }
  function paintHeader() { $hdr.innerHTML = renderHeader(); updateHeaderBg(); }
  function paint() {
    $hdr.innerHTML = renderHeader();
    $main.innerHTML = renderMain();
    $ftr.innerHTML = renderFooter();
    updateHeaderBg();
    if (state.page === 'home') { if (hero()) hero().setDrink(state.sel); startAnim(); loadClinkCount(); bindHeroParallax(); bindIcebreakerDeck(); } else { stopAnim(); stopClinkPoll(); }
  }

  // ===== hero fx overlays (sparkles / steam / +1) — the 3D model itself is driven by hero3d.js =====
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
  function plusOne() {
    var card = document.querySelector('[data-act="plusone"]');
    var fx = document.getElementById('fxLayer');
    if (!card || !fx) return;
    var fr = fx.getBoundingClientRect(), cr = card.getBoundingClientRect();
    var x = cr.left + cr.width / 2 - fr.left, y = cr.top - fr.top;
    try { if (navigator.vibrate) navigator.vibrate(8); } catch (e) {}
    var s = document.createElement('span');
    s.textContent = '+1';
    s.style.cssText = 'position:absolute;left:' + x + 'px;top:' + y + 'px;transform:translate(-50%,-50%);font-family:Nunito,sans-serif;font-weight:900;font-size:' + (20 + Math.random() * 8) + 'px;color:#FF4F62;text-shadow:0 4px 12px rgba(255,79,98,.4);will-change:transform,opacity';
    fx.appendChild(s);
    var dx = (Math.random() - 0.5) * 36;
    var an = s.animate([
      { transform: 'translate(-50%,-50%) scale(.5)', opacity: 0 },
      { transform: 'translate(calc(-50% + ' + (dx * 0.4) + 'px),-90%) scale(1.1)', opacity: 1, offset: 0.3 },
      { transform: 'translate(calc(-50% + ' + dx + 'px),-220%) scale(.8)', opacity: 0 }
    ], { duration: 900, easing: 'cubic-bezier(.2,.7,.2,1)' });
    an.onfinish = function () { s.remove(); };
    var chip = card.querySelector('.chip-ic');
    if (chip) { chip.style.animation = 'none'; void chip.offsetWidth; chip.style.animation = 'quickPulse .4s ease'; }
  }
  function puffSteam() {
    var fx = document.getElementById('fxLayer'); if (!fx) return;
    var r = fx.getBoundingClientRect(), cx = r.width / 2, cy = r.height * 0.4;
    for (var i = 0; i < 2; i++) {
      var s = document.createElement('span');
      s.style.cssText = 'position:absolute;left:' + (cx + (i ? 13 : -13)) + 'px;top:' + cy + 'px;width:18px;height:24px;border-radius:50%;background:rgba(180,150,150,.45);filter:blur(5px)';
      fx.appendChild(s);
      (function (el, idx) {
        var an = el.animate([
          { transform: 'translate(-50%,0) scale(.6)', opacity: 0 },
          { transform: 'translate(-50%,-14px) scale(1)', opacity: 0.6, offset: 0.4 },
          { transform: 'translate(-50%,-34px) scale(1.5)', opacity: 0 }
        ], { duration: 560, delay: idx * 130, easing: 'ease-out' });
        an.onfinish = function () { el.remove(); };
      })(s, i);
    }
  }
  function playAnim() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    if (state.sel === 'coffee') puffSteam(); else burstSparkles();
    if (hero()) hero().play();
  }
  // float badges turn TOWARD the scene centre (strongest when cursor is centred → focus on the 3D; flat at edges),
  // with a black shadow cast OUTWARD from the centre (light feels central) + a little cursor-follow for life.
  // Parallax lives on .float-inner; the idle bob stays on the outer .float-card → no conflict, smooth return.
  var _ibActive = null;
  function _ibWin() {
    if (window.__ibWinBound) return; window.__ibWinBound = true;
    window.addEventListener('pointermove', function (e) { if (_ibActive) _ibActive.move(e); });
    window.addEventListener('pointerup', function (e) { if (_ibActive) _ibActive.up(e); });
    window.addEventListener('pointercancel', function (e) { if (_ibActive) _ibActive.up(e); });
    window.addEventListener('blur', function () { if (_ibActive) _ibActive.up(); });
  }
  function bindIcebreakerDeck() {
    var deck = document.getElementById('ibDeck'); if (!deck || deck._wired) return; deck._wired = true;
    var order = [].slice.call(deck.querySelectorAll('.ibd-card')); if (!order.length) return;
    var EASE = 'transform .5s cubic-bezier(.22,.61,.36,1), opacity .4s ease', busy = false, sx = 0, dx = 0, drag = false;
    function applySlot(c, slot) {
      c.style.transform = 'translate(' + (slot * 16) + 'px,' + (slot * 6) + 'px) rotate(' + (slot * 2.6) + 'deg) scale(' + (1 - slot * 0.035) + ')';
      c.style.zIndex = String(100 - slot);
      c.style.opacity = '1';
      c.style.filter = slot === 0 ? 'drop-shadow(0 5px 6px rgba(28,19,38,.20)) drop-shadow(0 13px 16px rgba(28,19,38,.10))' : 'drop-shadow(0 4px 7px rgba(28,19,38,.10))';
    }
    function render(withT) { order.forEach(function (c, s) { c.style.transition = withT ? EASE : 'none'; applySlot(c, s); }); }
    render(false);
    function next(dir) {
      if (busy) return; busy = true;
      var leaving = order[0]; order.push(order.shift());
      render(true);                       // remaining cards glide up to their new slots
      leaving.style.transition = EASE; leaving.style.zIndex = '200';
      leaving.style.transform = 'translateX(' + (dir * 165) + '%) rotate(' + (dir * 13) + 'deg) scale(.95)'; leaving.style.opacity = '0';
      setTimeout(function () {
        leaving.style.transition = 'none';
        applySlot(leaving, order.indexOf(leaving));   // snap transform to back slot while invisible
        leaving.style.opacity = '0';
        void deck.offsetWidth;
        leaving.style.transition = 'opacity .4s ease';
        leaving.style.opacity = '1';                  // fade in softly at the back (no abrupt pop)
        busy = false;
      }, 440);
    }
    function move(e) { if (!drag) return; dx = e.clientX - sx; var f = order[0]; if (f) { f.style.transition = 'none'; f.style.transform = 'translateX(' + dx + 'px) rotate(' + (dx * 0.05) + 'deg)'; } }
    function up() {
      if (!drag) return; drag = false; deck.style.cursor = 'grab';
      if (Math.abs(dx) > 45) next(dx < 0 ? -1 : 1);      // swipe either way -> next, exits in drag direction
      else if (Math.abs(dx) < 9) next(1);                // tap -> next
      else { var f = order[0]; if (f) { f.style.transition = EASE; applySlot(f, 0); } }   // tiny drag -> snap back
    }
    deck.addEventListener('pointerdown', function (e) { if (busy) return; drag = true; sx = e.clientX; dx = 0; deck.style.cursor = 'grabbing'; });
    _ibActive = { move: move, up: up };   // release/move handled at window level so dragging off-screen never hangs
    _ibWin();
  }
  function bindHeroParallax() {
    var play = document.querySelector('[data-act="play"]'); if (!play || play._px) return; play._px = true;
    var inners = [].slice.call(play.querySelectorAll('.float-inner'));
    function measure() {
      var pc = play.getBoundingClientRect();
      inners.forEach(function (el) {
        var cr = el.getBoundingClientRect();
        var vx = (pc.left + pc.width / 2) - (cr.left + cr.width / 2), vy = (pc.top + pc.height / 2) - (cr.top + cr.height / 2);
        var len = Math.hypot(vx, vy) || 1; el._dir = [vx / len, vy / len];   // unit vector from badge → centre
      });
    }
    play.addEventListener('pointermove', function (e) {
      if (!inners[0] || !inners[0]._dir) measure();
      var r = play.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      var p = Math.max(0, 1 - 2 * Math.hypot(nx, ny));   // 1 at centre → 0 at edges
      inners.forEach(function (el) {
        var dx = el._dir[0], dy = el._dir[1];
        var rotY = dx * 20 * p + nx * 12;                 // face centre (scaled by p) + a touch of cursor-follow
        var rotX = -dy * 16 * p - ny * 10;
        el.style.transform = 'perspective(700px) translate(' + (dx * 11 * p).toFixed(1) + 'px,' + (dy * 8 * p).toFixed(1) + 'px) rotateY(' + rotY.toFixed(1) + 'deg) rotateX(' + rotX.toFixed(1) + 'deg)';
        el.style.boxShadow = (-dx * 24 * p).toFixed(1) + 'px ' + (12 - dy * 22 * p).toFixed(1) + 'px 36px -8px rgba(0,0,0,' + (0.14 + 0.16 * p).toFixed(2) + ')';   // shadow OUTWARD from centre
      });
    });
    play.addEventListener('pointerleave', function () {
      inners.forEach(function (el) { el.style.transform = ''; el.style.boxShadow = ''; });   // smooth transition back; bob keeps running on the outer layer
    });
  }
  // Idle 3D nudge: one gentle play ~1s after the screen appears, then only every 20s of inactivity.
  var AUTO_FIRST = 1000, AUTO_EVERY = 20000;
  function scheduleAnim() {
    if (animTimer) clearTimeout(animTimer);
    animTimer = setTimeout(function () {
      if (state.page === 'home' && !document.hidden) playAnim();
      scheduleAnim();   // re-arm the next idle nudge
    }, AUTO_EVERY);
  }
  function startAnim() {
    stopAnim();
    animKickoff = setTimeout(function () { playAnim(); scheduleAnim(); }, AUTO_FIRST);
  }
  function resetAnim() {   // user tapped -> push the next idle nudge a full cycle away (no back-to-back)
    if (animKickoff) { clearTimeout(animKickoff); animKickoff = null; }
    scheduleAnim();
  }
  function stopAnim() {
    if (animTimer) { clearTimeout(animTimer); animTimer = null; }
    if (animKickoff) { clearTimeout(animKickoff); animKickoff = null; }
  }

  // ===== question card in-place + swipe =====
  function animQ() {
    var el = document.getElementById('qline');
    if (el) { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = 'qSwap .42s cubic-bezier(.2,.7,.2,1)'; }
    var c = document.getElementById('qcat');
    if (c) { c.style.animation = 'none'; void c.offsetWidth; c.style.animation = 'catPop .42s cubic-bezier(.2,.7,.2,1)'; }
  }
  function refreshCard() {
    var tabs = document.getElementById('gameTabs'); if (tabs) tabs.innerHTML = renderGameTabs();
    var c = document.getElementById('qcat'); if (c) c.innerHTML = renderQcat();
    var l = document.getElementById('qline'); if (l) l.innerHTML = renderQline();
    var n = document.getElementById('qcount'); if (n) n.innerHTML = esc(renderQcount());
    animQ();
  }
  function qcardEl() { return document.getElementById('qcard'); }
  function springBack(card) { card.style.transition = 'transform .3s cubic-bezier(.2,.7,.2,1),opacity .3s'; card.style.transform = ''; card.style.opacity = ''; }
  function qFlyout(dir) {
    var card = qcardEl(); if (!card) return;
    card.style.transition = 'transform .26s ease-in,opacity .26s ease-in';
    card.style.transform = 'translateX(' + (dir * 520) + 'px) rotate(' + (dir * 11) + 'deg)';
    card.style.opacity = '0';
    setTimeout(function () {
      if (dir > 0) nextQuestion(); else prevQuestion();
      card.style.transition = 'none';
      card.style.transform = 'translateX(' + (-dir * 40) + 'px)'; card.style.opacity = '0';
      void card.offsetWidth;
      springBack(card);
    }, 260);
  }
  function onPointerDown(e) {
    var card = qcardEl(); if (!card || !e.target.closest('#qcard')) return;
    if (e.target.closest('button')) return;
    qdrag = { x: e.clientX, moved: false };
    card.style.transition = 'none';
  }
  function onPointerMove(e) {
    if (!qdrag) return; var card = qcardEl(); if (!card) return;
    var dx = e.clientX - qdrag.x;
    if (Math.abs(dx) > 4) qdrag.moved = true;
    card.style.transform = 'translateX(' + dx + 'px) rotate(' + (dx * 0.03) + 'deg)';
    card.style.opacity = String(1 - Math.min(Math.abs(dx) / 700, 0.25));
  }
  function onPointerUp(e) {
    if (!qdrag) return; var card = qcardEl(); var dx = e.clientX - qdrag.x; var moved = qdrag.moved; qdrag = null;
    if (!card) return;
    if (moved && Math.abs(dx) > 60) qFlyout(dx > 0 ? 1 : -1);
    else if (!moved) qFlyout(1);
    else springBack(card);
  }

  // ===== actions =====
  function setLang(lang) {
    try { localStorage.setItem('clinky_lang', lang); } catch (e) {}
    document.documentElement.lang = lang; state.lang = lang; paint();
  }
  var PAGES = { home: 1, about: 1, support: 1, privacy: 1, terms: 1 };
  function pageFromHash() { var h = (location.hash || '').replace(/^#\/?/, '').toLowerCase(); return PAGES[h] ? h : 'home'; }
  function setPage(page) {
    state.page = page;
    var h = page === 'home' ? '' : '#' + page;
    try { if ((location.hash || '') !== h) history.replaceState(null, '', h || (location.pathname + location.search)); } catch (e) {}
    try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch (e2) { window.scrollTo(0, 0); }
    state.scrolled = window.scrollY > 24; paint();
  }
  function joinCta() { if (state.page !== 'home') { setPage('home'); setTimeout(scrollWaitlist, 80); } else scrollWaitlist(); }
  function scrollWaitlist() {
    var f = document.querySelector('input[type="email"]'); if (!f) return;
    var y = f.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setTimeout(function () { try { f.focus({ preventScroll: true }); } catch (e) {} }, 500);
  }
  function setDrink(d) {
    if (state.sel === d) return;
    state.sel = d;
    var thumb = document.getElementById('drinkThumb');
    if (thumb) thumb.style.transform = d === 'coffee' ? 'translateX(128px)' : 'translateX(0)';
    var b = document.getElementById('chipBeer'), c = document.getElementById('chipCoffee');
    if (b) { b.style.color = d === 'beer' ? '#fff' : '#6b6b76'; var bi = b.querySelector('i'); if (bi) bi.style.color = d === 'beer' ? '#fff' : '#b9b0b6'; }
    if (c) { c.style.color = d === 'coffee' ? '#fff' : '#6b6b76'; var ci = c.querySelector('i'); if (ci) ci.style.color = d === 'coffee' ? '#fff' : '#b9b0b6'; }
    if (hero()) hero().setDrink(d);     // swap model + per-drink scene config in the three.js hero
  }
  function setGame(i) { state.gameIndex = i; state.qIndex = 0; refreshCard(); }
  function nextQuestion() { state.qIndex = (state.qIndex + 1) % GAMES[state.gameIndex].q.length; refreshCard(); }
  function prevQuestion() { var len = GAMES[state.gameIndex].q.length; state.qIndex = (state.qIndex - 1 + len) % len; refreshCard(); }

  function submitWaitlist(form) {
    var email = (form.email.value || '').trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    try {
      var params = new URLSearchParams();
      params.set('email', email);
      params.set('hp', (form.hp && form.hp.value) || '');
      params.set('country', GEO.country || '');
      params.set('city', GEO.city || '');
      params.set('lang', state.lang || navigator.language || '');
      params.set('drink', state.sel || '');
      params.set('referrer', document.referrer || '');
      fetch(WAITLIST_ENDPOINT, { method: 'POST', mode: 'no-cors', body: params });
    } catch (e) {}
    state.waitlistDone = true;
    var done = waitlistForm();
    var w1 = document.getElementById('wl1'); if (w1) w1.innerHTML = done;
    var w2 = document.getElementById('wl2'); if (w2) w2.innerHTML = done;
    document.querySelectorAll('.hero-trust').forEach(function (n) { n.style.display = 'none'; });
  }
  function submitSupport(form) {
    var name = (form.contactName.value || '').trim(), email = (form.email.value || '').trim(), msg = (form.message.value || '').trim();
    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !msg) return;
    try {
      var params = new URLSearchParams();
      params.set('type', 'support');
      params.set('name', name);
      params.set('email', email);
      params.set('message', msg);
      params.set('hp', (form.hp && form.hp.value) || '');
      params.set('lang', state.lang || navigator.language || '');
      params.set('referrer', document.referrer || '');
      fetch(SUPPORT_ENDPOINT, { method: 'POST', mode: 'no-cors', body: params });
    } catch (e) {}
    state.supportDone = true; paint();
  }

  function onScroll() {
    var s = window.scrollY > 24;
    if (s !== state.scrolled) { state.scrolled = s; updateHeaderBg(); }
  }
  function onClick(e) {
    var el = e.target.closest('[data-act]'); if (!el) return;
    var a = el.getAttribute('data-act');
    switch (a) {
      case 'home': case 'about': case 'support': case 'privacy': case 'terms': state.menuOpen = false; setPage(a); break;
      case 'menu': state.menuOpen = !state.menuOpen; paintHeader(); break;
      case 'en': setLang('en'); break;
      case 'ru': setLang('ru'); break;
      case 'join': joinCta(); break;
      case 'beer': setDrink('beer'); break;
      case 'coffee': setDrink('coffee'); break;
      case 'play': playAnim(); bumpClink(); resetAnim(); break;
      case 'plusone': plusOne(); break;
      case 'nextq': qFlyout(1); break;
      case 'prevq': qFlyout(-1); break;
      default: if (a.charAt(0) === 'g') setGame(parseInt(a.slice(1), 10));
    }
  }
  function onSubmit(e) {
    var form = e.target.closest('form[data-form]'); if (!form) return;
    e.preventDefault();
    if (form.getAttribute('data-form') === 'waitlist') submitWaitlist(form); else submitSupport(form);
  }

  function mount() {
    var app = document.getElementById('app');
    app.innerHTML = '<header id="hdr"></header><main id="main"></main><footer id="ftr" style="background:#fff;border-top:1px solid #e9e6ec;padding:clamp(44px,6vh,64px) clamp(20px,5vw,72px) 40px"></footer>';
    $hdr = document.getElementById('hdr'); $main = document.getElementById('main'); $ftr = document.getElementById('ftr');

    var lang = 'en';
    try { lang = localStorage.getItem('clinky_lang') || ((navigator.language || 'en').toLowerCase().indexOf('ru') === 0 ? 'ru' : 'en'); } catch (e) {}
    state.lang = lang; document.documentElement.lang = lang;
    state.page = pageFromHash();
    window.addEventListener('hashchange', function () { var p = pageFromHash(); if (p !== state.page) setPage(p); });

    document.addEventListener('click', onClick);
    document.addEventListener('submit', onSubmit);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', function () { if (qdrag) { var c = qcardEl(); qdrag = null; if (c) springBack(c); } });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', function () { if (state.page === 'home' && !document.hidden) scheduleAnim(); });

    paint();
    onScroll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
