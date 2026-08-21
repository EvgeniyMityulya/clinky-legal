/* ============================================================
   Clinky — landing logic. Clean/minimal (homify structure +
   Sheepy softness + Clinky brand: cream bg, coral accent).
   Vanilla, no framework. 3D hero rendered by assets/hero3d.js (three.js).
   ============================================================ */
(function () {
  'use strict';

  var WAITLIST_ENDPOINT = 'https://script.google.com/macros/s/AKfycby4gv-C4NlkexGgz-lbDvD7xm0RU5BxsCVe2eLvof-DYLDNN_ZGKafpijywAQQZEh6IYw/exec'; // Google Apps Script -> Sheet
  var GEO = {};   // {code, tz} — country from Cloudflare's own trace endpoint, no third party involved
  var RU_LOCALES = { RU: 1, BY: 1, KZ: 1, KG: 1, UA: 1, MD: 1, AM: 1, AZ: 1, GE: 1, TJ: 1, TM: 1, UZ: 1 };
  try { GEO.tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { GEO.tz = ''; }
  try {
    fetch('/cdn-cgi/trace').then(function (r) { return r.text(); }).then(function (t) {
      var m = /(?:^|\n)loc=([A-Z]{2})/.exec(t);
      if (m) { GEO.code = m[1]; applyGeoLang(); }
    }).catch(function () {});
  } catch (e) {}
  var SUPPORT_ENDPOINT = WAITLIST_ENDPOINT;   // same Apps Script web app; routed by type=support
  var CONTACT_EMAIL = 'support@clinkyapp.com';
  var C = '#FF4F62';

  var state = {
    lang: 'en', page: 'home', scrolled: false, sel: 'beer', menuOpen: false, playSlug: 'never-have-i-ever', playIndex: 0,
    gameIndex: 0, qIndex: 0, waitlistDone: false, waitlistDup: false, waitlistLoading: false, supportDone: false
  };
  var animTimer = null, animBack = null, animKickoff = null, qdrag = null;

  var DICT = {
    en: {
      navHome: 'Home', navAbout: 'About', navSupport: 'Support', navPrivacy: 'Privacy', navTerms: 'Terms', navGames: 'Games', navJoin: 'Try it first!',
      heroEyebrow: 'Coming soon to the App Store',
      heroTitle: 'Turn hangouts into a game',
      heroLede: 'An easy reason to meet more often! Party-game cards for any table and a 3D drink for every clink',
      heroCta: 'Try it first!', heroMicro: 'No spam. One email the day we launch.', trust1: 'No sign-up', trust2: 'No spam', trust3: 'iOS 17+',
      heroModel: 'Tap the drink to spin it',
      counterKicker: 'Live counter', counterLabel: 'clinks from friends around the world. Clink with us!',
      heroDone: "You're on the list. We'll send the App Store link the moment Clinky goes live.",
      heroDup: "This email is already on the list! We'll be in touch on launch day.",
      heroSending: 'One sec, adding you…',
      emailPh: 'Your email', beer: 'Beer', coffee: 'Coffee',
      gamesKicker: 'Try it right now', gamesTitle: 'Questions that open anyone up',
      gamesSub: 'These are real cards from the app. Pick a game and swipe through',
      gamesAll: 'See how to play', navPickGame: 'Pick a game', tapSwipe: 'Tap or swipe the card', dislike: 'Back', like: 'Next', cardHint: 'Swipe right for the next card, left to go back',
      problemKicker: 'Sound familiar?', problemTitle: 'Getting everyone together can be a real quest!',
      problemBody: 'Either everyone is busy and the meet-up drifts to "someday", or you finally gather and the conversation stalls. A light reminder and a couple of games make it all way more fun!',
      problemTurn: 'Clinky helps you meet up more often and have the kind of time you want to repeat!',
      discoverKicker: 'Inside the app', discoverTitle: 'Everything for your hangouts in one place', discoverSub: 'No accounts, no clutter, just your people and your moments.',
      finalTitle: 'Round up your friends and clink first!', finalSub: "Drop your email and we'll let you know on launch day!",
      gamesPageTitle: 'Games for any table',
      gamesPageSub: 'Pick a game, then read the rules and play a few cards right here.',
      howTitle: 'How to play', stepLabel: 'Step',
      playTitle: 'Play {game} online', playSub: 'Tap for a new card. No sign-up, nothing to install.',
      playNext: 'Next card', playLeft: '{n} cards left today', playHint: 'Free cards reset every day',
      playLoading: 'Shuffling the deck…', playCta: 'Play online', playOther: 'Other games to play', playRules: 'Rules for all four games',
      playDoneTitle: 'That is today\u2019s deck',
      playDoneBody: 'Come back tomorrow for more, or get the full deck in the app when it lands on the App Store.', gamesFaqTitle: 'Questions about the games',
      aboutTitle: 'About Clinky',
      aboutPillarsTitle: 'What the app does',
      aboutStoryTitle: 'Why does this exist?',
      aboutStory1: 'We see our friends a lot, at home and in bars, and there is almost always someone new at the table. The first twenty minutes go on traffic and weather while the evening quietly waits to start.',
      aboutStory2: 'Clinky came out of a trick we kept using. Someone would pull a random question, read it out loud, and the conversation started on its own. The app does that part now, and it also remembers who we have seen lately, so a rare meet-up does not turn into a year of silence.',
      aboutWhoTitle: 'Who makes it?',
      aboutWhoName: 'Evgeniy Mityulya',
      aboutWhoRole: 'iOS Engineer, Founder of @Clinky',
      aboutWho1: 'I built the app for my own table, so an evening starts right away instead of the first awkward twenty minutes. Clinky is mine end to end, the code and the question cards both, so if a card lands badly you know exactly whom to blame \uD83D\uDE42',
      aboutWho2: 'Write to me directly. If you have an idea, or just a question worth asking, send it over and we will talk.',
      aboutDataTitle: 'What happens to your data?',
      aboutData1: 'There are no accounts and there is no server. Your meet-ups, your friends and your collection stay on your phone, which means I cannot see whom you meet or what you answer. Nothing to leak, because nothing leaves the device.',
      aboutDataLink: 'Read the privacy policy',
      slogan: "Bring your friends, we'll bring the fun!",
      aboutLede: 'An iOS app for the friendships you never want to drift. Track who you meet, play party-game cards together, and keep a little 3D memento from every get-together.',
      aboutMission: "We built Clinky because the best moments happen face to face — and they're easy to let slip. Clinky is a gentle nudge to see your people more often, and a game to make every meet-up worth remembering.",
      p1t: "Don't lose touch", p1d: "Remember who you saw, when, and who you haven't met in a while.",
      p2t: 'Clink with anything', p2d: "Coffee, tea, a glass of wine or a beer. What matters is you're together!",
      p3t: 'Party games', p3d: 'Icebreaker cards that get any table talking in seconds.',
      supTitle: 'Support', supSub: 'Found a bug or have an idea? Write to us — we read everything.',
      supName: 'Name', supEmailPh: 'Email', supMsgPh: 'Description',
      supSend: 'Send message', supNote: 'We usually reply within a day.',
      supDone: 'Thanks! We got your message and will reply soon.',
      privTitle: 'Privacy Policy', termsTitle: 'Terms of Use', docUpdated: 'Last updated: June 30, 2026',
      docContact: 'Questions about this document? Email us at support@clinkyapp.com and we will help.',
      docContactCta: 'Contact support',
      footNote: 'Track meet-ups, play party-game cards and collect 3D mementos.',
      footComingSoon: 'Coming to the App Store', footProduct: 'Product', footLegalReach: 'Legal & contact', footEmail: 'Email us',
      footRights: 'For people who value real meet-ups.'
    },
    ru: {
      navHome: 'Главная', navAbout: 'О нас', navSupport: 'Поддержка', navPrivacy: 'Приватность', navTerms: 'Условия', navGames: 'Игры', navJoin: 'Хочу первым!',
      heroEyebrow: 'Скоро в App Store',
      heroTitle: 'Преврати встречи в игру',
      heroLede: 'Лёгкий повод видеться чаще! Карточки-игры для любой компании и 3D-напиток за каждый «чок»',
      heroCta: 'Хочу первым!', heroMicro: 'Без спама. Одно письмо в день релиза.', trust1: 'Без регистрации', trust2: 'Без спама', trust3: 'iOS 17+',
      heroModel: 'Нажми на напиток, чтобы покрутить',
      counterKicker: 'Онлайн счётчик', counterLabel: 'чоков от друзей по всему миру. Чокнись с нами!',
      heroDone: 'Ты в очереди! Пришлём ссылку на App Store, как только Clinky выйдет.',
      heroDup: 'Эта почта уже в списке! Напишем в день релиза.',
      heroSending: 'Секундочку, добавляем…',
      emailPh: 'Твоя почта', beer: 'Пиво', coffee: 'Кофе',
      gamesKicker: 'Попробуй прямо сейчас', gamesTitle: 'Эти вопросы раскроют любого',
      gamesSub: 'Это реальные карточки из приложения. Выбери игру и листай',
      gamesAll: 'Как в это играть', navPickGame: 'Выбери игру', tapSwipe: 'Тап или свайп по карточке', dislike: 'Назад', like: 'Дальше', cardHint: 'Вправо дальше, влево назад',
      problemKicker: 'Знакомо?', problemTitle: 'Собраться компанией бывает та ещё задачка!',
      problemBody: 'То никак не собраться, то собрались, а поговорить не о чем. С лёгким напоминанием и парой игр всё идёт куда веселее!',
      problemTurn: 'Clinky помогает видеться чаще и проводить время так, что хочется повторить!',
      discoverKicker: 'Внутри приложения', discoverTitle: 'Всё для встреч в одном месте', discoverSub: 'Без аккаунтов и лишнего, только твои люди и моменты.',
      finalTitle: 'Собери друзей и чокнись первым!', finalSub: 'Оставь почту, и мы напишем тебе в день релиза!',
      gamesPageTitle: 'Игры для компании',
      gamesPageSub: 'Выбери игру, а внутри правила и карточки, в которые можно сыграть прямо тут.',
      howTitle: 'Как играть', stepLabel: 'Шаг',
      playTitle: 'Играть в {game} онлайн', playSub: 'Жми, чтобы вытянуть новую карточку. Без регистрации и без установки.',
      playNext: 'Дальше', playLeft: 'осталось карточек сегодня: {n}', playHint: 'Бесплатные карточки обновляются каждый день',
      playLoading: 'Тасуем колоду…', playCta: 'Играть онлайн', playOther: 'Другие игры', playRules: 'Правила всех четырёх игр',
      playDoneTitle: 'На сегодня колода закончилась',
      playDoneBody: 'Возвращайся завтра за новыми или забери всю колоду в приложении, когда оно выйдет в App Store.', gamesFaqTitle: 'Вопросы про игры',
      aboutTitle: 'О Clinky',
      aboutPillarsTitle: 'Что умеет приложение',
      aboutStoryTitle: 'Зачем это всё?',
      aboutStory1: 'Мы часто собираемся с друзьями, дома и в барах, и почти всегда за столом оказывается кто-то новый. Первые двадцать минут уходят на пробки и погоду, хотя вечер задумывался совсем не про это.',
      aboutStory2: 'Clinky вырос из приёма, которым мы пользовались и так. Кто-то вытягивал случайный вопрос, читал его вслух, и разговор запускался сам. Теперь эту часть делает приложение, а заодно помнит, с кем мы виделись недавно, чтобы редкая встреча не превратилась в год тишины.',
      aboutWhoTitle: 'Кто делает?',
      aboutWhoName: 'Евгений Митюля',
      aboutWhoRole: 'iOS Инженер, Основатель @Clinky',
      aboutWho1: 'Приложение я сделал для своей компании, чтобы вечер начинался сразу, без неловких первых двадцати минут. Clinky целиком мой, и код, и вопросы на карточках, так что если карточка не зашла, вы точно знаете, кому жаловаться \uD83D\uDE42',
      aboutWho2: 'Пишите мне напрямую. Если есть идея или просто интересный вопрос, тоже пишите, пообщаемся.',
      aboutDataTitle: 'Что с вашими данными?',
      aboutData1: 'Аккаунтов нет, сервера тоже нет. Встречи, друзья и коллекция лежат на вашем телефоне, поэтому я не вижу, с кем вы встречаетесь и что отвечаете на карточки. Утечь нечему, потому что ничего не уходит с устройства.',
      aboutDataLink: 'Читать политику приватности',
      slogan: 'Друзья — с тебя, веселье — с нас!',
      aboutLede: 'iOS-приложение для дружбы, которую не хочется терять. Отмечай встречи, играй вместе в карточки-игры и забирай маленький 3D-сувенир с каждой посиделки.',
      aboutMission: 'Мы сделали Clinky, потому что лучшие моменты случаются вживую — и их так легко упустить. Clinky мягко напоминает видеться чаще и превращает каждую встречу в игру, которую хочется запомнить.',
      p1t: 'Не теряй друзей', p1d: 'Помни, кого и когда видел и с кем давно не пересекался.',
      p2t: 'Чокнись чем угодно', p2d: 'Кофе, чай, бокал вина или пиво. Главное, что вы вместе!',
      p3t: 'Игры для компании', p3d: 'Карточки-игры, которые разговорят любой стол за секунды.',
      supTitle: 'Поддержка', supSub: 'Нашёл баг или есть идея? Напиши нам — мы читаем всё.',
      supName: 'Имя', supEmailPh: 'Почта', supMsgPh: 'Описание',
      supSend: 'Отправить', supNote: 'Обычно отвечаем в течение дня.',
      supDone: 'Спасибо! Мы получили твоё сообщение и скоро ответим.',
      privTitle: 'Политика конфиденциальности', termsTitle: 'Условия использования', docUpdated: 'Последнее обновление: 30 июня 2026 г.',
      docContact: 'Вопросы по документу? Напиши на support@clinkyapp.com — поможем.',
      docContactCta: 'Написать в поддержку',
      footNote: 'Отмечай встречи, играй в карточки-игры и собирай 3D-сувениры.',
      footComingSoon: 'Скоро в App Store', footProduct: 'Продукт', footLegalReach: 'Документы и связь', footEmail: 'Написать нам',
      footRights: 'Для тех, кто ценит живые встречи.'
    }
  };

  var GAME_IDS = ['never_have_i', 'roulette', 'tell_a_moment', 'would_you_rather'];
  var AUTHOR_LINKS = [{"label":"LinkedIn","handle":"Евгений Митюля","handleEn":"Evgeniy Mityulya","href":"https://www.linkedin.com/in/evgeniy-mityulya/","icon":"linkedin","color":"#0A66C2"},{"label":"Telegram","handle":"@evgeniymityulya","href":"https://t.me/evgeniymityulya","icon":"telegram","color":"#26A5E4"},{"label":"X","handle":"@Evgeniy_iOS","href":"https://x.com/Evgeniy_iOS","icon":"x","color":"#111111"}];
  var AUTHOR_PHOTO = '/assets/author.jpg?v=d82bd078';
  var GAMES = [
    { title: { en: 'Never have I ever', ru: 'Я никогда не' }, how: {
      en: ['Read the card out loud, exactly as written', 'Whoever has done it owns up to the table', 'And tells the story behind that card'],
      ru: ['Читаешь карточку вслух, ровно как написано', 'Кто это делал, тот признаётся всей компании', 'И сразу рассказывает историю за карточкой']
    }, q: [
      { en: "Never have I ever flirted for a discount or a free drink", ru: 'Я никогда не флиртовал ради скидки или бесплатного напитка' },
      { en: "Never have I ever liked someone's old photo and panic-unliked it a second later", ru: 'Я никогда не лайкал старое фото человека и тут же в панике убирал лайк' },
      { en: "Never have I ever texted an ex at 3 a.m.", ru: 'Я никогда не писал бывшим в три часа ночи' },
      { en: "Never have I ever screenshotted a chat to dissect it with a friend", ru: 'Я никогда не делал скриншот переписки, чтобы разобрать её с другом' },
      { en: "Never have I ever googled someone before meeting them and then acted surprised to hear it all", ru: 'Я никогда не гуглил человека перед встречей и делал вид, что узнаю всё впервые' }
    ]},
    { title: { en: 'Roulette', ru: 'Рулетка' }, how: {
      en: ['The card picks two people from the table', 'The first answers the question about the second', 'Then the second adds their side of it'],
      ru: ['Карточка сама выбирает двоих из компании', 'Первый отвечает на вопрос про второго', 'Второй добавляет свою версию той истории']
    }, q: [
      { en: "*Alex*, tell us the moment with *Sam* when you knew you'd be real friends", ru: '*Аня*, расскажи случай с *Максом*, после которого ты поняла, что вы точно подружитесь' },
      { en: "*Alex*, when did *Sam* last genuinely surprise you?", ru: '*Аня*, когда *Макс* последний раз тебя по-настоящему удивил?' },
      { en: "*Alex*, what kind of adventure would you take *Sam* on, and why?", ru: '*Аня*, в какое приключение ты бы взяла *Макса* напарником и почему?' },
      { en: "*Alex*, what's a piece of advice from *Sam* you still think about?", ru: '*Аня*, какой совет *Макса* ты до сих пор вспоминаешь?' },
      { en: "*Alex*, what does *Sam* do that instantly lifts your mood?", ru: '*Аня*, что *Макс* делает такого, что сразу поднимает тебе настроение?' }
    ]},
    { title: { en: 'Tell a moment', ru: 'Расскажи момент' }, how: {
      en: ['Ask one person rather than the whole table', 'Let the silence sit for a few seconds', 'Follow up on one detail from the answer'],
      ru: ['Спрашиваешь одного человека, а не весь стол', 'Даёшь тишине повисеть пару секунд', 'Уточняешь одну деталь из его ответа']
    }, q: [
      { en: "Tell us about a decision that changed your whole year", ru: 'Расскажи о решении, которое изменило твой год' },
      { en: "Tell us about a book or film that stuck with you for ages", ru: 'Расскажи о книге или фильме, который застрял в голове надолго' },
      { en: "Tell us about a time a stranger made your day", ru: 'Расскажи случай, когда незнакомец сделал твой день' },
      { en: "Tell us about the most spontaneous trip you've ever taken", ru: 'Расскажи о самой спонтанной поездке в твоей жизни' },
      { en: "Tell us about something you got by accident that became a favorite", ru: 'Расскажи о вещи, которая досталась случайно, а стала любимой' }
    ]},
    { title: { en: 'Would you rather', ru: 'Что выберешь' }, how: {
      en: ['Read both options out loud, without hints', 'Everyone picks a side before explaining', 'Then each side defends its own choice'],
      ru: ['Читаешь оба варианта вслух, без подсказок', 'Все выбирают сторону до объяснений', 'Потом каждая сторона защищает свою']
    }, q: [
      { en: "Would you rather have a perfect memory for faces or for names?", ru: 'Что выберешь, идеальную память на лица или на имена?' },
      { en: "Would you rather recall the taste of any dish or the tune of any song?", ru: 'Что выберешь, помнить вкус любого блюда или мелодию любой песни?' },
      { en: "Would you rather remember every dream or feel fully rested after 4 hours of sleep?", ru: 'Что выберешь, помнить каждый свой сон или высыпаться за 4 часа?' },
      { en: "Would you rather speak every language or talk to every animal?", ru: 'Что выберешь, говорить на всех языках или со всеми животными?' },
      { en: "Would you rather teleport but only home, or fly but very slowly?", ru: 'Что выберешь, телепортироваться только домой или летать, но очень медленно?' }
    ]}
  ];

  var FAQ_GAMES = {
    en: [
      { q: "Is there a limit on how many cards I can draw?", a: "On the free plan you get three new cards a day across all four games together. Pro removes the limit, and cards you already drew stay readable either way." },
      { q: "Can I switch games in the middle of an evening?", a: "Any time. Switching does not reset anything, and the cards you already played stay marked as played." },
      { q: "Does it work with no internet?", a: "Fully. Cards, meet-ups and your collection live on the device, so bad signal in a bar changes nothing." },
      { q: "Are the questions we played saved?", a: "Every card you draw is saved to that meet-up, so you can look back at what you talked about. The ones you liked are collected as favourites." },
      { q: "Do the same cards come round again?", a: "Not inside one evening. And a card you did not like can be hidden so it stops appearing." },
      { q: "How many people do you need?", a: "Three games work from two people. Roulette needs three, because its cards ask one person about another." }
    ],
    ru: [
      { q: "Есть лимит на количество карточек?", a: "На бесплатном тарифе три новых карточки в день на все четыре игры вместе. Pro снимает лимит, а уже вытянутые карточки остаются доступными в любом случае." },
      { q: "Можно менять игру посреди вечера?", a: "В любой момент. Переключение ничего не сбрасывает, а карточки, в которые уже играли, остаются отмеченными." },
      { q: "Работает без интернета?", a: "Полностью. Карточки, встречи и коллекция лежат на устройстве, так что плохая связь в баре ничего не меняет." },
      { q: "Сохраняются ли вопросы, которые мы прошли?", a: "Каждая вытянутая карточка сохраняется к этой встрече, так что можно вернуться и посмотреть, о чём говорили. Понравившиеся собираются в избранных." },
      { q: "Карточки повторяются?", a: "Внутри одного вечера нет. А карточку, которая не понравилась, можно скрыть, и она перестанет попадаться." },
      { q: "Сколько нужно человек?", a: "Три игры работают от двух человек. «Рулетке» нужны трое, потому что её карточки спрашивают одного про другого." }
    ]
  };

  var FAQ = {
    en: [
      { q: "When does Clinky launch?", a: "Soon. Join the waitlist and we'll email you the App Store link the day it's live." },
      { q: "Is it free?", a: "Yes, Clinky is free to start. An optional Clinky Pro will unlock a few extras." },
      { q: "Does the app work without drinking?", a: "Completely. A clink can be coffee, tea or water, and every question game plays the same way. Nothing in the app requires alcohol." },
      { q: "Does Clinky work offline?", a: "Yes, the whole app does. Cards, meet-ups and your collection live on the device, so bad signal in a bar changes nothing and there is no server to be down." },
      { q: "What about my data?", a: "Clinky is offline-first with no accounts. Your data stays on your device and we never see it." },
      { q: "Which devices are supported?", a: "iPhone on iOS 17 and later." }
    ],
    ru: [
      { q: "Когда выйдет Clinky?", a: "Скоро. Встань в очередь, пришлём ссылку на App Store в день релиза." },
      { q: "Это бесплатно?", a: "Да, Clinky бесплатен на старте. Опциональный Clinky Pro откроет пару дополнений." },
      { q: "А без алкоголя приложение работает?", a: "Полностью. Чокнуться можно кофе, чаем или водой, и все игры с вопросами идут точно так же. Ничто в приложении не требует алкоголя." },
      { q: "Clinky работает офлайн?", a: "Да, целиком. Карточки, встречи и коллекция лежат на устройстве, так что плохая связь в баре ничего не меняет, и падать нечему." },
      { q: "А что с моими данными?", a: "Clinky работает офлайн и без аккаунтов. Данные остаются на твоём устройстве, мы их не видим." },
      { q: "Какие устройства поддерживаются?", a: "iPhone на iOS 17 и новее." }
    ]
  };

  // ===== helpers =====
  function faqAccordion(items) {
    return '<div class="faq-acc">' + items.map(function (f) {
      return '<details><summary>' + esc(f.q) + '</summary>' +
        '<div class="faq-body">' + esc(f.a) + '</div></details>';
    }).join('') + '</div>';
  }
  function faqAccordion(items) {
    return '<div class="faq-acc">' + items.map(function (f) {
      return '<details><summary>' + esc(f.q) + '</summary>' +
        '<div class="faq-body">' + esc(f.a) + '</div></details>';
    }).join('') + '</div>';
  }
  function faqAccordion(items) {
    return '<div class="faq-acc">' + items.map(function (f) {
      return '<details><summary>' + esc(f.q) + '</summary>' +
        '<div class="faq-body">' + esc(f.a) + '</div></details>';
    }).join('') + '</div>';
  }
  function buzz(ms) {
    try {
      if (!navigator.vibrate) return;
      var ua = navigator.userActivation;
      if (ua && !ua.hasBeenActive) return;
      navigator.vibrate(ms);
    } catch (e) {}
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function tdict() {
    var raw = DICT[state.lang], t = {};
    for (var k in raw) t[k] = typeof raw[k] === 'string' ? raw[k].replace(/\.+$/, '') : raw[k];
    return t;
  }
  var BRAND_ICONS = {"linkedin":"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z","telegram":"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z","x":"M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"};
  var ICON_PATHS = {"arrow-left|bold":"<path d=\"M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z\"/>","arrow-right|bold":"<path d=\"M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z\"/>","arrows-left-right|bold":"<path d=\"M216.49,184.49l-32,32a12,12,0,0,1-17-17L179,188H48a12,12,0,0,1,0-24H179l-11.52-11.51a12,12,0,0,1,17-17l32,32A12,12,0,0,1,216.49,184.49Zm-145-64a12,12,0,0,0,17-17L77,92H208a12,12,0,0,0,0-24H77L88.49,56.49a12,12,0,0,0-17-17l-32,32a12,12,0,0,0,0,17Z\"/>","beer-bottle|fill":"<path d=\"M245.66,42.34l-32-32a8,8,0,0,0-11.32,11.32l1.48,1.47L148.65,64.51l-38.22,7.65a8.05,8.05,0,0,0-4.09,2.18L23,157.66a24,24,0,0,0,0,33.94L64.4,233a24,24,0,0,0,33.94,0l83.32-83.31a8,8,0,0,0,2.18-4.09l7.65-38.22,41.38-55.17,1.47,1.48a8,8,0,0,0,11.32-11.32ZM81.37,224a7.94,7.94,0,0,1-5.65-2.34L34.34,180.28a8,8,0,0,1,0-11.31L40,163.31,92.69,216,87,221.66A8,8,0,0,1,81.37,224ZM177.6,99.2a7.92,7.92,0,0,0-1.44,3.23l-7.53,37.63L160,148.69,107.31,96l8.63-8.63,37.63-7.53a7.92,7.92,0,0,0,3.23-1.44l58.45-43.84,6.19,6.19Z\"/>","bell|fill":"<path d=\"M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z\"/>","briefcase|fill":"<path d=\"M152,112a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,112Zm80-40V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56H80V48a24,24,0,0,1,24-24h48a24,24,0,0,1,24,24v8h40A16,16,0,0,1,232,72ZM96,56h64V48a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8Zm120,57.61V72H40v41.61A184,184,0,0,0,128,136,184,184,0,0,0,216,113.61Z\"/>","chart-bar|fill":"<path d=\"M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16h8V136a8,8,0,0,1,8-8H72a8,8,0,0,1,8,8v64H96V88a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V200h16V40a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V200h8A8,8,0,0,1,232,208Z\"/>","chat-circle|bold":"<path d=\"M128,20A108,108,0,0,0,31.85,177.23L21,209.66A20,20,0,0,0,46.34,235l32.43-10.81A108,108,0,1,0,128,20Zm0,192a84,84,0,0,1-42.06-11.27,12,12,0,0,0-6-1.62,12.1,12.1,0,0,0-3.8.62l-29.79,9.93,9.93-29.79a12,12,0,0,0-1-9.81A84,84,0,1,1,128,212Z\"/>","chat-teardrop-dots|fill":"<path d=\"M132,24A100.11,100.11,0,0,0,32,124v84a16,16,0,0,0,16,16h84a100,100,0,0,0,0-200ZM88,140a12,12,0,1,1,12-12A12,12,0,0,1,88,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,132,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,176,140Z\"/>","check-circle|fill":"<path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z\"/>","check|bold":"<path d=\"M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z\"/>","clock|fill":"<path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z\"/>","coffee|fill":"<path d=\"M208,80H32a8,8,0,0,0-8,8v48a96.3,96.3,0,0,0,32.54,72H32a8,8,0,0,0,0,16H208a8,8,0,0,0,0-16H183.46a96.59,96.59,0,0,0,27-40.09A40,40,0,0,0,248,128v-8A40,40,0,0,0,208,80Zm24,48a24,24,0,0,1-17.2,23,95.78,95.78,0,0,0,1.2-15V97.38A24,24,0,0,1,232,120ZM112,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm32,0V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0ZM80,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Z\"/>","cube|fill":"<path d=\"M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,120,47.65,76,128,32l80.35,44Zm8,99.64V133.83l80-43.78v85.76Z\"/>","envelope|regular":"<path d=\"M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z\"/>","eye-slash|bold":"<path d=\"M56.88,31.93A12,12,0,1,0,39.12,48.07l16,17.65C20.67,88.66,5.72,121.58,5,123.13a12.08,12.08,0,0,0,0,9.75c.37.82,9.13,20.26,28.49,39.61C59.37,198.34,92,212,128,212a131.34,131.34,0,0,0,51-10l20.09,22.1a12,12,0,0,0,17.76-16.14ZM128,188c-29.59,0-55.47-10.73-76.91-31.88A130.69,130.69,0,0,1,29.52,128c5.27-9.31,18.79-29.9,42-44.29l90.09,99.11A109.33,109.33,0,0,1,128,188Zm123-55.12c-.36.81-9,20-28,39.16a12,12,0,1,1-17-16.9A130.48,130.48,0,0,0,226.48,128a130.36,130.36,0,0,0-21.57-28.12C183.46,78.73,157.59,68,128,68c-3.35,0-6.7.14-10,.42a12,12,0,1,1-2-23.91c3.93-.34,8-.51,12-.51,36,0,68.63,13.67,94.49,39.52,19.35,19.35,28.11,38.8,28.48,39.61A12.08,12.08,0,0,1,251,132.88Z\"/>","flame|fill":"<path d=\"M173.79,51.48a221.25,221.25,0,0,0-41.67-34.34,8,8,0,0,0-8.24,0A221.25,221.25,0,0,0,82.21,51.48C54.59,80.48,40,112.47,40,144a88,88,0,0,0,176,0C216,112.47,201.41,80.48,173.79,51.48ZM96,184c0-27.67,22.53-47.28,32-54.3,9.48,7,32,26.63,32,54.3a32,32,0,0,1-64,0Z\"/>","game-controller|fill":"<path d=\"M247.44,173.75a.68.68,0,0,0,0-.14L231.05,89.44c0-.06,0-.12,0-.18A60.08,60.08,0,0,0,172,40H83.89a59.88,59.88,0,0,0-59,49.52L8.58,173.61a.68.68,0,0,0,0,.14,36,36,0,0,0,60.9,31.71l.35-.37L109.52,160h37l39.71,45.09c.11.13.23.25.35.37A36.08,36.08,0,0,0,212,216a36,36,0,0,0,35.43-42.25ZM104,112H96v8a8,8,0,0,1-16,0v-8H72a8,8,0,0,1,0-16h8V88a8,8,0,0,1,16,0v8h8a8,8,0,0,1,0,16Zm40-8a8,8,0,0,1,8-8h24a8,8,0,0,1,0,16H152A8,8,0,0,1,144,104Zm84.37,87.47a19.84,19.84,0,0,1-12.9,8.23A20.09,20.09,0,0,1,198,194.31L167.8,160H172a60,60,0,0,0,51-28.38l8.74,45A19.82,19.82,0,0,1,228.37,191.47Z\"/>","heart|fill":"<path d=\"M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z\"/>","list|bold":"<path d=\"M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM40,76H216a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24ZM216,180H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z\"/>","lock-simple|fill":"<path d=\"M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96Z\"/>","paper-plane-tilt|fill":"<path d=\"M231.4,44.34s0,.1,0,.15l-58.2,191.94a15.88,15.88,0,0,1-14,11.51q-.69.06-1.38.06a15.86,15.86,0,0,1-14.42-9.15L107,164.15a4,4,0,0,1,.77-4.58l57.92-57.92a8,8,0,0,0-11.31-11.31L96.43,148.26a4,4,0,0,1-4.58.77L17.08,112.64a16,16,0,0,1,2.49-29.8l191.94-58.2.15,0A16,16,0,0,1,231.4,44.34Z\"/>","shield-check|fill":"<path d=\"M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm-34.32,69.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z\"/>","target|bold":"<path d=\"M229.26,90.4a108,108,0,0,1-177.63,114A108,108,0,0,1,195.41,43.63l20.1-20.11a12,12,0,0,1,17,17l-96,96a12,12,0,1,1-17-17l24-24a36,36,0,1,0,19.76,39.65,12,12,0,0,1,23.53,4.74,60,60,0,1,1-25.73-62L178.3,60.74a84,84,0,1,0,28.46,38,12,12,0,1,1,22.5-8.35Z\"/>","trophy|fill":"<path d=\"M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z\"/>","user-circle|fill":"<path d=\"M172,120a44,44,0,1,1-44-44A44.05,44.05,0,0,1,172,120Zm60,8A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88.09,88.09,0,0,0-91.47-87.93C77.43,41.89,39.87,81.12,40,128.25a87.65,87.65,0,0,0,22.24,58.16A79.71,79.71,0,0,1,84,165.1a4,4,0,0,1,4.83.32,59.83,59.83,0,0,0,78.28,0,4,4,0,0,1,4.83-.32,79.71,79.71,0,0,1,21.79,21.31A87.62,87.62,0,0,0,216,128Z\"/>","users-three|fill":"<path d=\"M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z\"/>","x|bold":"<path d=\"M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z\"/>"};
  function brandIcon(name, size, color) {
    var d = BRAND_ICONS[name];
    if (!d) return '';
    var s = size || 18;
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="' + (color || 'currentColor') + '" aria-hidden="true" focusable="false" style="flex:none;display:inline-block;vertical-align:middle"><path d="' + d + '"/></svg>';
  }
  function ph(name, size, color, weight) {
    var w = (weight || '').replace('ph-', '') || 'regular';
    var d = ICON_PATHS[name + '|' + w] || ICON_PATHS[name + '|regular'] || ICON_PATHS[name + '|fill'] || '';
    var s = size || 22;
    return '<svg viewBox="0 0 256 256" width="' + s + '" height="' + s + '" fill="' + (color || 'currentColor') + '" aria-hidden="true" focusable="false" style="flex:none;display:inline-block;vertical-align:middle">' + d + '</svg>';
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
    return '<svg class="spark' + (o.cls ? ' ' + o.cls : '') + '" width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" fill="' + (o.c || C) + '" aria-hidden="true" ' +
      'style="position:absolute;' + o.pos + ';opacity:' + (o.op == null ? 0.6 : o.op) + ';pointer-events:none;' +
      'filter:drop-shadow(0 0 5px ' + (o.glow || 'rgba(255,79,98,.4)') + ');animation:' + (o.anim || 'twinkle 4s ease-in-out infinite') + '">' +
      '<path d="M12 1.2C12.7 10.4 13.4 11 22.8 12C13.4 13 12.7 13.6 12 22.8C11.3 13.6 10.6 13 1.2 12C10.6 11 11.3 10.4 12 1.2Z"/></svg>';
  }
  // slogan: keep each clause unbreakable so it wraps right after the comma (or stays on one line)
  function sloganHTML(s) {
    var i = s.indexOf(', ');
    if (i < 0) return esc(s);
    return '<span style="white-space:nowrap">' + esc(s.slice(0, i + 1)) + '</span> <span style="white-space:nowrap">' + esc(s.slice(i + 2)) + '</span>';
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
  function h1sec(s) { return '<h1 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(27px,3.8vw,44px);line-height:1.08;letter-spacing:-1px;margin:0 0 12px;color:#1c1326;text-wrap:balance">' + esc(s) + '</h1>'; }
  function h2sec(s) { return '<h2 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(27px,3.8vw,44px);line-height:1.08;letter-spacing:-1px;margin:0 0 12px;color:#1c1326;text-wrap:balance">' + esc(s) + '</h2>'; }
  function subsec(s) {
    var body = esc(s).replace(/\.\s+(?=\S)/g, '.<br class="lede-br">');
    return '<p style="font-size:16.5px;color:#6b6b76;margin:0 auto;max-width:34em">' + body + '</p>';
  }
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
  function navCls(active) { return 'navpill' + (active ? ' is-on' : ''); }
  function gamesDropdown() {
    var t = tdict(), onGames = state.page === 'games' || state.page === 'play';
    return '<span class="nav-drop">' +
      '<button data-act="games" class="' + navCls(onGames) + '" aria-haspopup="true" style="' + navPill(onGames) + '">' + esc(t.navGames) + '</button>' +
      '<span class="nav-drop-panel">' +
        '<span class="nav-drop-title">' + esc(t.navPickGame) + '</span>' +
        GAMES.map(function (g, i) {
          var href = playHrefFor(i, state.lang), on = state.page === 'play' && state.gameIndex === i;
          if (!href) return '';
          return '<a href="' + href + '" class="nav-drop-item' + (on ? ' is-on' : '') + '">' +
            '<span class="nav-drop-ico">' + gameIcon(i, on ? '#fff' : '#FF4F62', 16) + '</span>' + esc(g.title[state.lang]) + '</a>';
        }).join('') +
      '</span>' +
    '</span>';
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
    return active ? b + 'background:#FF4F62;color:#fff;border-color:#FF4F62;' : b + 'background:transparent;color:#7a7280;';
  }
  function drinkToggle() {
    var t = tdict();
    var btn = 'position:relative;z-index:1;width:128px;border:0;background:transparent;cursor:pointer;padding:15px 0;font-family:Nunito,sans-serif;font-weight:800;font-size:16.5px;transition:color .25s;display:inline-flex;align-items:center;justify-content:center;gap:8px;';
    var thumbX = state.sel === 'coffee' ? '128px' : '0';
    return '<div style="display:flex;justify-content:center;margin:18px 0 0">' +
      '<div class="drink-toggle" style="position:relative;display:inline-flex;padding:5px;border-radius:999px;background:#fff;border:1px solid #e9e6ec;box-shadow:0 12px 28px -12px rgba(28,19,38,.24)">' +
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
      '<button id="hdrLogo" data-act="home" style="display:flex;align-items:center;gap:10px;background:transparent;border:0;cursor:pointer;padding:0;flex:1 1 0;min-width:0;justify-content:flex-start;transition:opacity .3s ease;' + (state.scrolled || state.page !== 'home' ? '' : 'opacity:0;pointer-events:none') + '">' +
        '<img src="/assets/clinky-icon.png" alt="Clinky" style="width:36px;height:36px;border-radius:11px;box-shadow:0 5px 14px -5px rgba(225,29,72,.6)">' +
        '<span style="font-family:Nunito,sans-serif;font-weight:900;font-size:22px;letter-spacing:-.5px;color:#1c1326">Clinky</span>' +
      '</button>' +
      '<nav class="nav-mid" style="display:flex;align-items:center;gap:4px;flex:0 1 auto;min-width:0;justify-content:center">' +
        '<button data-act="home" class="' + navCls(p === 'home') + '" style="' + navPill(p === 'home') + '">' + esc(t.navHome) + '</button>' +
        gamesDropdown() +
        '<button data-act="about" class="' + navCls(p === 'about') + '" style="' + navPill(p === 'about') + '">' + esc(t.navAbout) + '</button>' +
        '<button data-act="support" class="' + navCls(p === 'support') + '" style="' + navPill(p === 'support') + '">' + esc(t.navSupport) + '</button>' +
        '<span class="nav-legal" style="' + navDiv + '"></span>' +
        '<button data-act="privacy" class="nav-legal ' + navCls(p === 'privacy') + '" style="' + navPill(p === 'privacy') + '">' + esc(t.navPrivacy) + '</button>' +
        '<button data-act="terms" class="nav-legal ' + navCls(p === 'terms') + '" style="' + navPill(p === 'terms') + '">' + esc(t.navTerms) + '</button>' +
      '</nav>' +
      '<div style="display:flex;align-items:center;gap:10px;flex:1 1 0;min-width:0;justify-content:flex-end">' +
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
        ['home', 'games', 'about', 'support', 'privacy', 'terms'].map(function (pg) {
          var label = { home: t.navHome, games: t.navGames, about: t.navAbout, support: t.navSupport, privacy: t.navPrivacy, terms: t.navTerms }[pg];
          var on = p === pg;
          var row = '<button data-act="' + pg + '" style="text-align:left;border:0;cursor:pointer;border-radius:12px;padding:13px 16px;font-family:Nunito,sans-serif;font-weight:800;font-size:16px;background:' + (on ? '#FF4F62' : 'transparent') + ';color:' + (on ? '#fff' : '#1c1326') + '">' + esc(label) + '</button>';
          if (pg !== 'games') return row;
          return row + '<span class="nav-sub">' + GAMES.map(function (g, i) {
            var href = playHrefFor(i, state.lang), sel = state.page === 'play' && state.gameIndex === i;
            if (!href) return '';
            return '<a href="' + href + '" class="nav-drop-item' + (sel ? ' is-on' : '') + '" style="font-size:14.5px">' +
              '<span class="nav-drop-ico">' + gameIcon(i, sel ? '#fff' : '#FF4F62', 15) + '</span>' + esc(g.title[state.lang]) + '</a>';
          }).join('') + '</span>';
        }).join('') +
      '</div>' : '');
  }

  function renderFooter() {
    var t = tdict(), I = icons();
    var lnk = 'background:transparent;border:0;cursor:pointer;font-size:14.5px;color:#6b6b76;padding:0;font-family:DM Sans,sans-serif';
    var head = 'font-family:Nunito,sans-serif;font-weight:800;font-size:12.5px;letter-spacing:1px;text-transform:uppercase;color:#7a7280;margin-bottom:2px';
    return '' +
      '<div style="max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:34px" class="pillars">' +
        '<div style="max-width:300px">' +
          '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">' +
            '<img src="/assets/clinky-icon.png" alt="Clinky" style="width:36px;height:36px;border-radius:11px">' +
            '<span style="font-family:Nunito,sans-serif;font-weight:900;font-size:22px;color:#1c1326">Clinky</span>' +
          '</div>' +
          '<p style="font-family:Nunito,sans-serif;font-weight:800;font-size:15px;color:#1c1326;margin:0 0 8px">' + esc(t.slogan) + '</p>' +
          '<p style="font-size:13.5px;color:#7a7280;margin:0 0 18px;line-height:1.55">' + esc(t.footNote) + '</p>' +
          '<div style="display:inline-flex;align-items:center;gap:6px;padding:9px 16px;border-radius:12px;background:#fff;border:1px solid #e9e6ec;font-size:13.5px;font-weight:700;color:#3a323f">' + esc(t.footComingSoon) + I.apple + '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">' +
          '<div style="' + head + '">' + esc(t.footProduct) + '</div>' +
          '<button data-act="home" style="' + lnk + '">' + esc(t.navHome) + '</button>' +
          '<button data-act="games" style="' + lnk + '">' + esc(t.navGames) + '</button>' +
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
        '<span style="font-size:12.5px;color:#7a7280">© 2026 Clinky · ' + esc(t.footRights) + '</span>' +
        '<div style="display:flex;gap:6px">' +
          '<button data-act="en" style="' + langSegDark(state.lang === 'en') + '">EN</button>' +
          '<button data-act="ru" style="' + langSegDark(state.lang === 'ru') + '">RU</button>' +
        '</div>' +
      '</div>';
  }

  // ===== waitlist form =====
  function waitlistForm(onColor, left) {
    var t = tdict();
    if (state.waitlistLoading) {
      return '<div style="display:inline-flex;align-items:center;gap:13px;padding:17px 22px;border-radius:18px;background:' + (onColor ? 'rgba(255,255,255,.92)' : '#ffffff') + ';border:1.5px solid ' + (onColor ? 'transparent' : '#ffc9d0') + ';box-shadow:0 10px 26px -16px rgba(255,79,98,.28);max-width:32em;text-align:left;animation:popIn .4s ease both">' +
        '<span style="width:20px;height:20px;border-radius:50%;border:2.5px solid #FFE2E6;border-top-color:#FF4F62;animation:spin .7s linear infinite;flex:none"></span>' +
        '<span style="font-weight:600;font-size:15px;line-height:1.45;color:#1c1326">' + esc(t.heroSending) + '</span></div>';
    }
    if (state.waitlistDone) {
      return '<div style="display:inline-flex;align-items:center;gap:13px;padding:17px 22px;border-radius:18px;background:' + (onColor ? 'rgba(255,255,255,.92)' : '#ffffff') + ';border:1.5px solid ' + (onColor ? 'transparent' : '#ffc9d0') + ';box-shadow:0 10px 26px -16px rgba(255,79,98,.28);max-width:32em;text-align:left;animation:popIn .5s ease both">' +
        '<span style="display:inline-flex;flex:none">' + icons().checkPink + '</span><span style="font-weight:600;font-size:15px;line-height:1.45;color:#1c1326">' + esc(state.waitlistDup ? t.heroDup : t.heroDone) + '</span></div>';
    }
    var btn = onColor
      ? 'color:#FF4F62;background:#fff;box-shadow:0 16px 30px -12px rgba(0,0,0,.35)'
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
      sparkle({ s: 14, pos: 'top:40%;right:46%', op: 0.42, c: '#FF8A97', glow: 'rgba(255,138,151,.28)', anim: 'twinkle 3.2s ease-in-out .7s infinite', cls: 'spark-mid' }) +
      sparkle({ s: 20, pos: 'bottom:30%;right:40%', op: 0.45, c: C, glow: 'rgba(255,79,98,.28)', anim: 'twinkle 5s ease-in-out .55s infinite', cls: 'spark-mid' }) +
      '<div class="hero-grid" style="position:relative;max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:clamp(24px,5vw,64px)">' +
        '<div class="hero-left" style="flex:1.06;min-width:0;text-align:left">' +
          '<div class="hero-icon" style="display:flex;justify-content:center;max-width:32em;margin:0 0 16px">' +
            '<img src="/assets/clinky-icon.png" alt="Clinky" fetchpriority="high" width="72" height="72" style="width:72px;height:72px;border-radius:20px;box-shadow:0 16px 32px -12px rgba(225,29,72,.5)">' +
          '</div>' +
          '<div class="hero-eyebrow" style="display:flex;justify-content:center;max-width:32em;margin:0 0 18px">' +
            '<span style="display:inline-flex;align-items:center;gap:9px;padding:10px 20px;border-radius:999px;background:linear-gradient(135deg,#FF6373,#FF4F62);color:#fff;font-family:Nunito,sans-serif;font-weight:800;font-size:14.5px;box-shadow:0 14px 30px -10px rgba(225,29,72,.6);animation:eyebrowPulse 2.6s ease-in-out infinite">' +
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
        '<div data-act="play" class="hero-stage" style="position:relative;aspect-ratio:1/0.62;perspective:1000px;cursor:pointer">' +
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
        '<p style="font-size:13.5px;color:#7a7280;text-align:center;margin:10px 0 0">' + esc(t.heroModel) + '</p>' +
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
    function bshot(n) { return '/assets/shots/en-' + n + '.jpg'; } // TODO swap to assets/bento/* finals
    var capImg = '/assets/bento/drink.png';
    function L2(ru, en) { return L === 'ru' ? ru : en; }
    var FC = {
      ic:  { ic: 'game-controller', t: L2('Карточки-игры', 'Icebreakers'), d: L2('Реальные карточки, что разговорят любой стол за секунды. «Я никогда не», «Рулетка», «Расскажи момент» и «Что бы ты выбрал», всего четыре игры.', 'Real cards that get any table talking in seconds. "Never Have I Ever", "Roulette", "Tell a Moment" and "Would You Rather", four games in all.') },
      col: { ic: 'cube', t: L2('3D-коллекция', '3D collection'), d: L2('Каждый «чок» добавляет в коллекцию 3D-напиток своего вида. Чем больше встреч, тем полнее коллекция!', 'Each clink adds a 3D drink, unique to its kind. The more you meet, the fuller it gets!') },
      str: { ic: 'flame', t: L2('Серии встреч', 'Meeting streaks'), d: L2('Держи серию встреч с близкими', 'Keep your streak going with the people close to you') },
      ach: { ic: 'trophy', t: L2('Достижения', 'Achievements'), d: L2('Награды за встречи, серии и новые знакомства. Есть и секретные!', 'Badges for meet-ups, streaks and new friends. Some are secret!') },
      an:  { ic: 'chart-bar', t: L2('Аналитика', 'Analytics'), d: L2('Графики и факты о твоих друзьях, напитках и встречах', 'Clear charts of your friends, drinks and meet-ups') },
      rem: { ic: 'bell', t: L2('Умные напоминания', 'Smart reminders'), d: L2('Мягко подскажем, чтобы ты никого не забыл', 'A gentle nudge so you never forget a friend') }
    };
    // Unified bento header: icon BESIDE title (one row), description below.
    // descMw optionally narrows ONLY the description so it wraps earlier (keeps title row full).
    function bHead(f, mw, descMw) {
      return '<div class="bento-head" style="position:relative;z-index:4;max-width:' + (mw || '100%') + '">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
          '<span style="display:inline-flex;width:42px;height:42px;border-radius:13px;background:#FFE2E6;align-items:center;justify-content:center;flex:none">' + ph(f.ic, 21, C, 'ph-fill') + '</span>' +
          '<h3 style="font-family:Nunito,sans-serif;font-weight:800;font-size:18px;margin:0;color:#1c1326">' + esc(f.t) + '</h3>' +
        '</div>' +
        '<p class="bento-desc" style="font-size:13.5px;line-height:1.5;color:#6b6b76;margin:0' + (descMw ? ';max-width:' + descMw : '') + '">' + esc(f.d) + '</p>' +
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
      return '<img class="ibd-card" src="/assets/bento/ib-' + th + '-' + L + '.png" loading="lazy" alt="" draggable="false" style="position:absolute;left:0;top:0;width:100%;transform-origin:center;user-select:none;-webkit-user-drag:none">';
    }).join('');
    var cellIce = '<div class="bento-card" style="grid-column:1/3;grid-row:1/3;position:relative;overflow:hidden;padding:26px">' +
        bHead(FC.ic, '84%') +
        '<div id="ibDeck" class="bento-media" style="position:absolute;left:50%;bottom:46px;width:300px;height:258px;transform:translateX(-50%);cursor:grab;touch-action:pan-y">' + ibDeckImgs + '</div>' +
      '</div>';
    var cellCol = '<div class="bento-card" style="grid-column:3/5;grid-row:1/2;position:relative;overflow:visible;padding:26px;z-index:3">' +
        bHead(FC.col, '60%') +
        '<img src="' + capImg + '" alt="" class="bento-media" style="position:absolute;right:-34px;top:22px;width:236px;filter:drop-shadow(7px 9px 6px rgba(28,19,38,.30)) drop-shadow(13px 17px 16px rgba(28,19,38,.13));z-index:2">' +
      '</div>';
    var cellStr = '<div class="bento-card" style="grid-column:3/4;grid-row:2/3;position:relative;overflow:hidden;padding:20px">' +
        bHead(FC.str, '100%') +
        '<img src="/assets/bento/streak-' + L + '.png?v=3" alt="" loading="lazy" class="bento-media" style="position:absolute;left:50%;bottom:14px;width:212px;transform:translateX(-50%);filter:drop-shadow(0 5px 6px rgba(28,19,38,.20)) drop-shadow(0 13px 16px rgba(28,19,38,.10));z-index:1">' +
      '</div>';
    var cellAch = '<div class="bento-card" style="grid-column:4/5;grid-row:2/3;position:relative;overflow:visible;padding:20px;z-index:2">' +
        bHead(FC.ach, '100%') +
        '<img src="/assets/bento/ach-' + L + '.png?v=5" loading="lazy" alt="" class="bento-media" style="position:absolute;right:-18px;bottom:44px;width:262px;transform:rotate(-4deg);filter:drop-shadow(0 5px 6px rgba(28,19,38,.18)) drop-shadow(0 13px 16px rgba(28,19,38,.09));z-index:1">' +
      '</div>';
    var cellAn = '<div class="bento-card" style="grid-column:1/3;grid-row:3/4;position:relative;overflow:visible;padding:26px;z-index:2">' +
        bHead(FC.an, '100%', '185px') +
        '<img src="/assets/bento/donut-' + L + '.png" loading="lazy" alt="" class="bento-media" style="position:absolute;left:30px;bottom:-30px;width:226px;transform:rotate(-3deg);filter:drop-shadow(0 5px 6px rgba(28,19,38,.18)) drop-shadow(0 13px 16px rgba(28,19,38,.09));z-index:2">' +
        '<img src="/assets/bento/chart-' + L + '.png" loading="lazy" alt="" class="bento-media" style="position:absolute;right:-12px;bottom:-14px;width:300px;transform:rotate(2deg);filter:drop-shadow(0 5px 6px rgba(28,19,38,.16)) drop-shadow(0 13px 16px rgba(28,19,38,.08));z-index:3">' +
      '</div>';
    var cellRem = '<div class="bento-card" style="grid-column:3/5;grid-row:3/4;position:relative;overflow:hidden;padding:24px">' +
        bHead(FC.rem, '100%') +
        '<img src="/assets/bento/notif-' + L + '.png" alt="" loading="lazy" class="bento-media" style="position:absolute;left:50%;top:108px;width:510px;transform:translateX(-50%);filter:drop-shadow(0 0 7px rgba(28,19,38,.18)) drop-shadow(0 7px 16px rgba(28,19,38,.11));z-index:1">' +
      '</div>';
    var discover = '<section style="padding:clamp(50px,8vh,96px) clamp(20px,5vw,72px)"><div style="max-width:1080px;margin:0 auto">' +
      '<div style="text-align:center;margin-bottom:clamp(30px,5vh,46px)">' + kicker(t.discoverKicker) + h2sec(t.discoverTitle) + subsec(t.discoverSub) + '</div>' +
      '<div class="bento">' + cellIce + cellCol + cellStr + cellAch + cellAn + cellRem + '</div>' +
    '</div></section>';

    // ---- interactive question mini-game ----
    var card = renderQuestionSection();

    // ---- final CTA (contained coral block) ----
    var finalCta = renderFinalCta();

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

  function renderFinalCta() {
    var t = tdict();
    return '<section style="padding:clamp(20px,3vh,40px) clamp(20px,5vw,72px) clamp(60px,9vh,100px)">' +
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
          '<img src="/assets/clinky-icon.png" alt="Clinky" style="width:68px;height:68px;border-radius:20px;margin:0 auto 18px;box-shadow:0 16px 32px -12px rgba(225,29,72,.55);display:block">' +
          '<h2 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(28px,4.2vw,46px);line-height:1.05;letter-spacing:-1px;margin:0 0 12px;color:#1c1326">' + esc(t.finalTitle) + '</h2>' +
          '<p style="font-size:16.5px;color:#6b6b76;margin:0 auto 26px;max-width:30em">' + esc(t.finalSub) + '</p>' +
          '<div id="wl2">' + waitlistForm() + '</div>' +
          (state.waitlistDone ? '' : '<p style="font-size:13px;color:#7a7280;margin:14px 0 0">' + esc(t.heroMicro) + '</p>') +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function renderQuestionSection(opts) {
    var t = tdict();
    var tight = opts && opts.hideHeading;
    return '<section style="padding:' + (tight ? 'clamp(18px,3vh,30px)' : 'clamp(50px,8vh,96px)') + ' clamp(16px,4vw,72px) clamp(50px,8vh,96px)">' +
      ((opts && opts.hideHeading) ? '' : '<div style="max-width:760px;margin:0 auto;text-align:center">' + kicker(t.gamesKicker) + h2sec(t.gamesTitle) + subsec(t.gamesSub) + '</div>') +
      '<div id="gameTabs" style="display:flex;flex-wrap:wrap;gap:9px;justify-content:center;margin:28px auto 10px;max-width:760px">' + renderGameTabs() + '</div>' +
      '<div style="max-width:430px;margin:0 auto">' +
        '<div id="qcard" style="position:relative;cursor:grab;border-radius:30px;background:#fff;box-shadow:0 26px 56px -26px rgba(225,29,72,.4);border:1px solid #e9e6ec;padding:26px 26px 24px;overflow:hidden;touch-action:pan-y;will-change:transform;user-select:none">' +
          '<div style="display:flex;align-items:center;justify-content:center;margin-bottom:14px">' +
            '<div id="qcat" style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border-radius:999px;background:#FFEDEF;color:#FF4F62;font-family:Nunito,sans-serif;font-weight:800;font-size:13.5px">' + renderQcat() + '</div>' +
          '</div>' +
          '<div style="position:relative;min-height:120px;display:flex;align-items:center;justify-content:center;margin:8px 0 16px;padding:0 14px">' +
            '<span style="position:absolute;top:-8px;left:-2px;font-family:Nunito,sans-serif;font-weight:900;font-size:40px;line-height:1;color:rgba(255,79,98,.13);pointer-events:none">“</span>' +
            '<p id="qline" style="text-align:center;font-family:Nunito,sans-serif;font-weight:800;font-size:clamp(19px,2.4vw,24px);line-height:1.25;letter-spacing:-.3px;margin:0;text-wrap:pretty">' + renderQline() + '</p>' +
            '<span style="position:absolute;bottom:-20px;right:-2px;font-family:Nunito,sans-serif;font-weight:900;font-size:40px;line-height:1;color:rgba(255,79,98,.13);pointer-events:none">”</span>' +
          '</div>' +
          '<div style="border-top:1px solid #e9e6ec;padding-top:16px">' +
            '<div id="qcount" style="text-align:center;font-size:11.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#FF4F62;margin-bottom:5px">' + esc(renderQcount()) + '</div>' +
            '<div style="text-align:center;font-size:12.5px;color:#7a7280;margin-bottom:15px">' + esc(t.tapSwipe) + '</div>' +
            '<div style="display:flex;align-items:center;justify-content:center;gap:20px">' +
              '<button data-act="prevq" aria-label="' + esc(t.dislike) + '" style="display:flex;flex-direction:column;align-items:center;gap:6px;background:transparent;border:0;cursor:pointer">' +
                '<span style="width:54px;height:54px;border-radius:50%;background:#f6eef0;display:flex;align-items:center;justify-content:center">' + ph('arrow-left', 22, '#b9b0b6', 'ph-bold') + '</span>' +
                '<span style="font-size:12.5px;font-weight:600;color:#7a7280">' + esc(t.dislike) + '</span>' +
              '</button>' +
              '<button data-act="nextq" aria-label="' + esc(t.like) + '" style="display:flex;flex-direction:column;align-items:center;gap:6px;background:transparent;border:0;cursor:pointer">' +
                '<span style="width:62px;height:62px;border-radius:50%;background:#FF4F62;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 24px -8px rgba(255,79,98,.8)">' + ph('arrow-right', 26, '#fff', 'ph-bold') + '</span>' +
                '<span style="font-size:13px;font-weight:700;color:#FF4F62">' + esc(t.like) + '</span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<p style="text-align:center;font-size:13px;color:#7a7280;margin:16px 0 0">' + esc(t.cardHint) + '</p>' +
        ((opts && opts.hideHeading) ? '' : '') +
        '<p style="text-align:center;margin:16px 0 0;display:flex;gap:18px;justify-content:center;flex-wrap:wrap">' +
          '<a id="playLink" href="' + (playHrefFor(state.gameIndex, state.lang) || '/games') + '" style="font-family:DM Sans,sans-serif;font-size:14.5px;font-weight:700;color:#FF4F62;text-decoration:none">' + esc(t.playCta) + ' →</a>' +
          ((opts && opts.hideHeading) ? '' : '<button data-act="games" style="background:transparent;border:0;cursor:pointer;font-family:DM Sans,sans-serif;font-size:14.5px;font-weight:700;color:#6b6b76">' + esc(t.gamesAll) + '</button>') +
        '</p>' +
      '</div>' +
    '</section>';
  }
  function renderHowStrip() {
    var t = tdict(), L = state.lang, steps = (GAMES[state.gameIndex].how || {})[L] || [];
    if (!steps.length) return '';
    return '<div id="howStrip" style="max-width:960px;margin:0 auto;display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">' +
      steps.map(function (line, i) {
        return '<div class="soft-card" style="padding:18px 20px 20px;text-align:left">' +
          '<div style="display:flex;align-items:center;gap:9px;margin-bottom:10px">' +
            '<span style="flex:none;width:26px;height:26px;border-radius:50%;background:#FF4F62;color:#fff;font-family:Nunito,sans-serif;font-weight:900;font-size:12.5px;display:flex;align-items:center;justify-content:center">' + (i + 1) + '</span>' +
            '<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:#FF4F62">' + esc(t.stepLabel) + '</span>' +
          '</div>' +
          '<p style="margin:0;min-height:2.9em;font-size:15.5px;line-height:1.45;color:#6b6b76;text-wrap:balance">' + esc(line) + '</p>' +
        '</div>';
      }).join('') +
    '</div>';
  }

  function renderGameTabs() {
    var L = state.lang;
    return GAMES.map(function (g, i) {
      var active = i === state.gameIndex;
      return '<button data-act="g' + i + '" style="' + pill(active) + '">' + gameIcon(i, active ? '#fff' : '#6b6b76', 18) + esc(g.title[L]) + '</button>';
    }).join('');
  }
  function renderQcat() { return gameIcon(state.gameIndex, '#FF4F62', 17) + esc(GAMES[state.gameIndex].title[state.lang]); }
  function renderQline() {
    var L = state.lang, cg = GAMES[state.gameIndex];
    var qStr = cg.q[state.qIndex % cg.q.length][L];
    return qStr.split('*').map(function (seg, i) { return '<span style="color:' + (i % 2 ? '#FF4F62' : '#1c1326') + '">' + esc(seg) + '</span>'; }).join('');
  }

  function gamesHub() {
    var L = contentLabels();
    if (!L) ensureGameContent(function () { paint(); });
    return '<section style="padding:0 clamp(20px,5vw,72px) clamp(26px,4vh,44px)">' +
      '<div class="hub-grid">' +
        GAMES.map(function (g, i) {
          var href = playHrefFor(i, state.lang);
          if (!href) return '';
          var c = gameContent(GAME_IDS[i]);
          return '<a href="' + href + '" class="soft-card hub-card">' +
            '<span class="hub-head">' +
              '<span class="hub-ico">' + gameIcon(i, '#FF4F62', 20) + '</span>' +
              '<span class="hub-title">' + esc(g.title[state.lang]) + '</span>' +
            '</span>' +
            (c ? '<span class="hub-line">' + esc(c.tagline[state.lang]) + '</span>' : '') +
            '<span class="hub-foot">' +
              '<span class="hub-cta">' + esc((L && L.playCta) || 'Play') + '</span>' +
              (c ? '<span class="hub-meta">' + ph('users-three', 18, '#FF4F62', 'ph-fill') + '<span>' + esc(playersLine(c.min)) + '</span></span>' : '') +
            '</span>' +
          '</a>';
        }).join('') +
      '</div>' +
    '</section>';
  }
  function renderGames() {
    var t = tdict();
    return '<div class="page-in">' +
      '<section style="padding:clamp(116px,16vh,158px) clamp(20px,5vw,72px) clamp(24px,4vh,34px)">' +
        '<div style="max-width:760px;margin:0 auto;text-align:center">' +
          '<span style="display:flex;width:56px;height:56px;border-radius:17px;background:#FFE2E6;align-items:center;justify-content:center;margin:0 auto 18px">' + icons().game + '</span>' +
          h1sec(t.gamesPageTitle) + subsec(t.gamesPageSub) +
        '</div>' +
      '</section>' +
      gamesHub() +
      '<section style="padding:clamp(10px,2vh,26px) clamp(20px,5vw,72px) clamp(30px,5vh,56px)">' +
        '<div style="max-width:720px;margin:0 auto">' +
          '<h2 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(22px,2.8vw,30px);letter-spacing:-.6px;margin:0 0 18px;text-align:center;color:#1c1326">' + esc(t.gamesFaqTitle) + '</h2>' +
          faqAccordion(FAQ_GAMES[state.lang]) +
        '</div>' +
      '</section>' +
      renderFinalCta() +
    '</div>';
  }

  // ===== PLAY (web deck with a daily limit) =====
  var DECK_KEY = 'clinky.web.deck';
  function deckState() {
    var today = new Date().toISOString().slice(0, 10);
    try {
      var raw = JSON.parse(localStorage.getItem(DECK_KEY) || '{}');
      if (raw.day !== today) return { day: today, used: 0, seen: [] };
      return { day: today, used: raw.used || 0, seen: raw.seen || [] };
    } catch (e) { return { day: today, used: 0, seen: [] }; }
  }
  function saveDeck(st) { try { localStorage.setItem(DECK_KEY, JSON.stringify(st)); } catch (e) {} }
  function deckLimit() { return (window.CLINKY_WEB_DECK && window.CLINKY_WEB_DECK.limit) || 8; }
  function deckCards() {
    var d = window.CLINKY_WEB_DECK;
    if (!d) return [];
    var meta = PLAY_SLUGS[state.playSlug] || {};
    var g = d.games[meta.id || 'never_have_i'] || {};
    var list = g[state.lang] || [];
    if (!g.names) return list;
    var n = g.names[state.lang] || g.names.en || ['A', 'B'];
    return list.map(function (q) { return q.replace(/\{A\}/g, '*' + n[0] + '*').replace(/\{B\}/g, '*' + n[1] + '*'); });
  }
  var _deckLoading = false;
  function ensureDeck(cb) {
    if (window.CLINKY_WEB_DECK) { cb(); return; }
    if (_deckLoading) return;
    _deckLoading = true;
    var sc = document.createElement('script');
    sc.src = '/assets/web-deck.js?v=16fe4469';
    sc.onload = function () { _deckLoading = false; cb(); };
    sc.onerror = function () { _deckLoading = false; };
    document.head.appendChild(sc);
  }

  var _gcLoading = false;
  function ensureGameContent(cb) {
    if (window.CLINKY_GAME_CONTENT) return;
    if (_gcLoading) return;
    _gcLoading = true;
    var sc = document.createElement('script');
    sc.src = '/assets/game-content.js?v=59c4872d';
    sc.onload = function () { _gcLoading = false; cb(); };
    sc.onerror = function () { _gcLoading = false; };
    document.head.appendChild(sc);
  }
  function gameContent(id) {
    var g = window.CLINKY_GAME_CONTENT;
    return g && g.content[id] ? g.content[id] : null;
  }
  function contentLabels() {
    var g = window.CLINKY_GAME_CONTENT;
    return g ? g.labels[state.lang] : null;
  }
  function sectionWrap(title, inner, tight) {
    return '<section style="padding:' + (tight ? '0' : 'clamp(8px,1.6vh,18px)') + ' clamp(20px,5vw,72px) clamp(22px,3.6vh,40px)">' +
      '<div style="max-width:760px;margin:0 auto">' +
        (title ? '<h2 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(21px,2.6vw,28px);letter-spacing:-.5px;margin:0 0 16px;color:#1c1326">' + esc(title) + '</h2>' : '') +
        inner +
      '</div>' +
    '</section>';
  }
  function numberedList(items) {
    return '<ol style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;counter-reset:r">' +
      items.map(function (item, i) {
        var body = typeof item === 'string'
          ? esc(item)
          : '<strong style="font-weight:800;color:#1c1326">' + esc(item.t) + '</strong>, ' + esc(item.d);
        return '<li class="soft-card" style="display:flex;gap:14px;align-items:flex-start;padding:15px 18px">' +
          '<span style="flex:none;width:26px;height:26px;border-radius:50%;background:#FFE2E6;color:#FF4F62;font-family:Nunito,sans-serif;font-weight:900;font-size:13.5px;display:flex;align-items:center;justify-content:center">' + (i + 1) + '</span>' +
          '<span style="font-size:15px;line-height:1.55;color:#3a323f">' + body + '</span>' +
        '</li>';
      }).join('') +
    '</ol>';
  }
  function playersLine(min) {
    return state.lang === 'ru' ? 'От ' + min + '+ игроков' : min + '+ players';
  }
  function fitStrip(c) {
    var L = contentLabels();
    var rows = [
      [ph('users-three', 19, '#FF4F62', 'ph-fill'), L.fitPlayers, playersLine(c.min)],
      [ph('clock', 19, '#FF4F62', 'ph-fill'), L.fitBest, c.best[state.lang]]
    ];
    return '<div class="fit-grid">' +
      rows.map(function (r) {
        return '<div class="soft-card fit-card">' +
          '<span class="fit-ico">' + r[0] + '</span>' +
          '<span>' +
            '<span class="fit-label">' + esc(r[1]) + '</span>' +
            '<span class="fit-value">' + esc(r[2]).replace(/,\s/, ',<br>') + '</span>' +
          '</span>' +
        '</div>';
      }).join('') +
    '</div>';
  }
  function exampleList(gi) {
    var deck = window.CLINKY_WEB_DECK, out = [];
    if (deck && deck.games) {
      var entry = deck.games[GAME_IDS[gi]], pack = entry && entry[state.lang];
      if (pack && pack.length) out = pack.slice(0, 6).map(function (line) { return plainCard(line, entry); });
    }
    if (!out.length) out = (GAMES[gi].q || []).slice(0, 5).map(function (q) { return plainCard(q[state.lang]); });
    return '<div style="display:flex;flex-direction:column;gap:10px">' +
      out.map(function (line) {
        return '<div class="soft-card ex-card" style="padding:16px 20px;font-family:Nunito,sans-serif;font-weight:700;font-size:15.5px;line-height:1.5;color:#1c1326">' + accented(line) + '</div>';
      }).join('') +
    '</div>';
  }
  function plainCard(line, entry) {
    var names = (entry && entry.names && entry.names[state.lang]) || ['Alex', 'Sam'];
    return String(line).replace(/\{A\}/g, '*' + names[0] + '*').replace(/\{B\}/g, '*' + names[1] + '*');
  }
  function accented(line) {
    return String(line).split(/\*/).map(function (part, i) {
      return i % 2 ? '<span style="color:#FF4F62">' + esc(part) + '</span>' : esc(part);
    }).join('');
  }
  function renderPlayCard() {
    var t = tdict(), cards = deckCards(), st = deckState(), limit = deckLimit();
    var meta = PLAY_SLUGS[state.playSlug] || {};
    var gi = typeof meta.game === 'number' ? meta.game : 0;
    if (!cards.length) {
      return '<div style="max-width:430px;margin:0 auto;text-align:center;padding:40px 0;color:#7a7280;font-size:14px">' + esc(t.playLoading) + '</div>';
    }
    if (st.used >= limit) {
      return '<div style="max-width:430px;margin:0 auto">' +
        '<div style="position:relative;border-radius:30px;background:#fff;box-shadow:0 26px 56px -26px rgba(225,29,72,.4);border:1px solid #e9e6ec;padding:38px 30px 32px;text-align:center">' +
          '<div style="display:flex;align-items:center;justify-content:center;margin-bottom:16px">' +
            '<span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border-radius:999px;background:#FFEDEF;color:#FF4F62;font-family:Nunito,sans-serif;font-weight:800;font-size:13px">' + gameIcon(gi, '#FF4F62', 17) + esc(GAMES[gi].title[state.lang]) + '</span>' +
          '</div>' +
          '<p style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(19px,2.4vw,23px);line-height:1.25;letter-spacing:-.3px;margin:0 0 10px;color:#1c1326">' + esc(t.playDoneTitle) + '</p>' +
          '<p style="font-size:15px;line-height:1.55;color:#6b6b76;margin:0 auto 22px;max-width:24em">' + esc(t.playDoneBody) + '</p>' +
          coralBtn(t.heroCta, 'join') +
        '</div>' +
      '</div>';
    }
    var idx = state.playIndex % cards.length;
    return '<div style="max-width:430px;margin:0 auto">' +
      '<div style="position:relative;border-radius:30px;background:#fff;box-shadow:0 26px 56px -26px rgba(225,29,72,.4);border:1px solid #e9e6ec;padding:26px 26px 24px;overflow:hidden">' +
        '<div style="display:flex;align-items:center;justify-content:center;margin-bottom:14px">' +
          '<span style="display:inline-flex;align-items:center;gap:8px;padding:7px 15px;border-radius:999px;background:#FFEDEF;color:#FF4F62;font-family:Nunito,sans-serif;font-weight:800;font-size:13px">' + gameIcon(gi, '#FF4F62', 17) + esc(GAMES[gi].title[state.lang]) + '</span>' +
        '</div>' +
        '<div style="position:relative;min-height:132px;display:flex;align-items:center;justify-content:center;margin:8px 0 16px;padding:0 14px">' +
          '<span style="position:absolute;top:-8px;left:-2px;font-family:Nunito,sans-serif;font-weight:900;font-size:40px;line-height:1;color:rgba(255,79,98,.13);pointer-events:none">\u201C</span>' +
          '<p id="playLine" class="play-line" style="text-align:center;font-family:Nunito,sans-serif;font-weight:800;font-size:clamp(19px,2.4vw,24px);line-height:1.25;letter-spacing:-.3px;margin:0;color:#1c1326">' + accented(cards[idx]) + '</p>' +
          '<span style="position:absolute;bottom:-20px;right:-2px;font-family:Nunito,sans-serif;font-weight:900;font-size:40px;line-height:1;color:rgba(255,79,98,.13);pointer-events:none">\u201D</span>' +
        '</div>' +
        '<div style="border-top:1px solid #e9e6ec;padding-top:16px">' +
          '<div style="text-align:center;font-size:11.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#FF4F62;margin-bottom:5px">' + esc(t.playLeft.replace('{n}', String(Math.max(0, limit - st.used)))) + '</div>' +
          '<div style="text-align:center;font-size:12.5px;color:#7a7280;margin-bottom:15px">' + esc(t.playHint) + '</div>' +
          '<div style="display:flex;align-items:center;justify-content:center">' +
            '<button data-act="playnext" aria-label="' + esc(t.playNext) + '" style="display:flex;flex-direction:column;align-items:center;gap:6px;background:transparent;border:0;cursor:pointer">' +
              '<span style="width:62px;height:62px;border-radius:50%;background:#FF4F62;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 24px -8px rgba(255,79,98,.8)">' + ph('arrow-right', 24, '#fff', 'ph-bold') + '</span>' +
              '<span style="font-size:13px;font-weight:700;color:#FF4F62">' + esc(t.playNext) + '</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  var GAME_TITLE_CASE = {
    ru: { never_have_i: '«Я никогда не»', roulette: '«Рулетку»', tell_a_moment: '«Расскажи момент»', would_you_rather: '«Что выберешь»' },
    en: { never_have_i: 'Never Have I Ever', roulette: 'Roulette', tell_a_moment: 'Questions to Ask Friends', would_you_rather: 'Would You Rather' }
  };
  function renderPlay() {
    var t = tdict(), meta = PLAY_SLUGS[state.playSlug] || {};
    var gi = typeof meta.game === 'number' ? meta.game : 0;
    if (state.gameIndex !== gi) state.gameIndex = gi;
    var gameTitle = (GAME_TITLE_CASE[state.lang] || {})[meta.id] || GAMES[gi].title[state.lang];
    ensureDeck(function () { var m = document.getElementById('playMount'); if (m) m.innerHTML = renderPlayCard(); });
    return '<div class="page-in">' +
      '<section style="padding:clamp(116px,16vh,158px) clamp(20px,5vw,72px) clamp(20px,3vh,30px)">' +
        '<div class="play-head" style="margin:0 auto;text-align:center">' +
          '<span style="display:flex;width:56px;height:56px;border-radius:17px;background:#FFE2E6;align-items:center;justify-content:center;margin:0 auto 18px">' + gameIcon(gi, '#FF4F62', 26) + '</span>' +
          '<h1 class="play-h1">' + esc(t.playTitle.replace('{game}', gameTitle)) + '</h1>' + subsec(t.playSub) +
        '</div>' +
      '</section>' +
      '<section style="padding:0 clamp(20px,5vw,72px) clamp(24px,4vh,40px)">' +
        '<div style="display:flex;flex-wrap:wrap;gap:9px;justify-content:center;margin:0 auto 22px;max-width:760px">' +
          GAMES.map(function (g, i) {
            var active = i === gi;
            return '<button data-act="p' + i + '" style="' + pill(active) + '">' + gameIcon(i, active ? '#fff' : '#6b6b76', 18) + esc(g.title[state.lang]) + '</button>';
          }).join('') +
        '</div>' +
        '<div id="playMount">' + renderPlayCard() + '</div>' +
      '</section>' +
      playEditorial(gi, meta.id) +
      '<section style="padding:0 clamp(20px,5vw,72px) clamp(24px,4vh,40px)">' +
        '<p style="max-width:720px;margin:0 auto;text-align:center"><button data-act="games" style="background:transparent;border:0;cursor:pointer;font-family:DM Sans,sans-serif;font-size:14.5px;font-weight:700;color:#6b6b76">' + esc(t.playRules) + ' →</button></p>' +
      '</section>' +
      renderFinalCta() +
    '</div>';
  }
  function playEditorial(gi, id) {
    var t = tdict(), c = gameContent(id), L = contentLabels();
    if (!c || !L) {
      ensureGameContent(function () { paint(); });
      return '<section style="padding:clamp(10px,2vh,20px) clamp(20px,5vw,72px) clamp(20px,4vh,40px)">' +
        '<div style="max-width:720px;margin:0 auto">' +
          '<h2 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(22px,2.8vw,30px);letter-spacing:-.6px;margin:0 0 14px;color:#1c1326">' + esc(t.howTitle) + '</h2>' +
          '<div id="howWrap">' + renderHowStrip() + '</div>' +
        '</div>' +
      '</section>';
    }
    var lang = state.lang;
    var intro = '<p class="lead-p">' + esc(c.intro[lang]) + '</p>';
    return sectionWrap(L.about, fitStrip(c) + intro) +
      sectionWrap(L.rules, numberedList(c.rules[lang])) +
      sectionWrap(L.examples, exampleList(gi)) +
      sectionWrap(L.variants, numberedList(c.variants[lang])) +
      sectionWrap(L.advice, numberedList(c.advice[lang])) +
      sectionWrap(L.faq, faqAccordion(c.faq[lang]));
  }

  // ===== ABOUT =====
  function renderAbout() {
    var t = tdict(), I = icons();
    var pillar = function (ic, ti, de) {
      return '<div class="soft-card" style="padding:26px;text-align:left">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">' +
          '<span style="display:flex;width:48px;height:48px;border-radius:14px;background:#FFE2E6;align-items:center;justify-content:center;flex:none">' + ic + '</span>' +
          '<h3 style="font-family:Nunito,sans-serif;font-weight:800;font-size:18px;margin:0;color:#1c1326">' + esc(ti) + '</h3>' +
        '</div>' +
        '<p style="font-size:14.5px;line-height:1.55;color:#6b6b76;margin:0">' + esc(de) + '</p></div>';
    };
    return '<div class="page-in">' +
      '<section style="position:relative;padding:clamp(118px,15vh,150px) clamp(20px,5vw,72px) clamp(36px,5vh,56px);text-align:center;overflow:hidden">' +
        sparkle({ s: 20, pos: 'top:24%;left:16%', op: 0.45, c: '#FF4F62', glow: 'rgba(255,79,98,.3)' }) +
        sparkle({ s: 14, pos: 'top:30%;right:18%', op: 0.4, c: '#FF8A97', glow: 'rgba(255,138,151,.3)', anim: 'twinkle 3.4s ease-in-out .4s infinite' }) +
        '<img src="/assets/clinky-icon.png" alt="Clinky" style="width:78px;height:78px;border-radius:22px;margin:0 auto 22px;box-shadow:0 18px 34px -14px rgba(225,29,72,.6);display:block">' +
        '<h1 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(32px,4.6vw,52px);letter-spacing:-1.2px;margin:0 0 14px;color:#1c1326">' + esc(t.aboutTitle) + '</h1>' +
        '<p style="font-size:clamp(16px,1.6vw,19px);line-height:1.6;color:#6b6b76;max-width:34em;margin:0 auto">' + esc(t.aboutLede) + '</p>' +
      '</section>' +
      '<section style="padding:clamp(20px,3vh,40px) clamp(20px,5vw,72px) clamp(56px,8vh,90px)">' +
        '<h2 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(21px,2.6vw,28px);letter-spacing:-.5px;margin:0 auto clamp(18px,2.6vh,26px);max-width:980px;color:#1c1326">' + esc(t.aboutPillarsTitle) + '</h2>' +
        '<div style="max-width:980px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:18px" class="pillars">' +
          pillar(I.people, t.p1t, t.p1d) + pillar(I.cupBig, t.p2t, t.p2d) + pillar(I.game, t.p3t, t.p3d) +
        '</div>' +
      '</section>' +
      aboutStory() +
      '<section style="padding:0 clamp(20px,5vw,72px) clamp(56px,8vh,90px)">' +
        '<div style="max-width:680px;margin:0 auto;text-align:center">' +
          '<div style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(24px,3.4vw,38px);color:#FF4F62;letter-spacing:-.6px;margin-bottom:24px">' + sloganHTML(t.slogan) + '</div>' +
          coralBtn(t.heroCta, 'join') +
        '</div>' +
      '</section></div>';
  }
  function aboutStory() {
    var t = tdict();
    var para = function (text) {
      return '<p style="font-size:16px;line-height:1.72;color:#3a323f;margin:0 0 14px">' + esc(text) + '</p>';
    };
    var head = function (text) {
      return '<h2 style="font-family:Nunito,sans-serif;font-weight:900;font-size:clamp(21px,2.6vw,28px);letter-spacing:-.5px;margin:0 0 16px;color:#1c1326">' + esc(text) + '</h2>';
    };
    return '<section style="padding:0 clamp(20px,5vw,72px) clamp(26px,4vh,44px)">' +
      '<div style="max-width:760px;margin:0 auto">' +
        head(t.aboutStoryTitle) + para(t.aboutStory1) + para(t.aboutStory2) +
        '<div style="height:clamp(20px,3vh,34px)"></div>' +
        head(t.aboutWhoTitle) +
        '<div class="soft-card" style="padding:22px 24px;display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap">' +
          (AUTHOR_PHOTO
            ? '<img src="' + AUTHOR_PHOTO + '" alt="' + esc(t.aboutWhoName) + '" width="72" height="72" loading="lazy" decoding="async" style="flex:none;width:72px;height:72px;border-radius:50%;object-fit:cover;box-shadow:0 10px 22px -12px rgba(28,19,38,.45)">'
            : '<span style="flex:none;width:52px;height:52px;border-radius:50%;background:#FFE2E6;display:flex;align-items:center;justify-content:center">' + ph('user-circle', 30, '#FF4F62', 'ph-fill') + '</span>') +
          '<span style="flex:1 1 260px;min-width:0">' +
            '<span style="display:block;font-family:Nunito,sans-serif;font-weight:900;font-size:18px;color:#1c1326">' + esc(t.aboutWhoName) + '</span>' +
            '<span style="display:block;font-size:14px;color:#7a7280;margin-bottom:12px">' + esc(t.aboutWhoRole) + '</span>' +
            '<span style="display:block;font-size:15px;line-height:1.65;color:#3a323f;margin-bottom:10px">' + esc(t.aboutWho1) + '</span>' +
            '<span style="display:block;font-size:15px;line-height:1.65;color:#3a323f">' + esc(t.aboutWho2) + '</span>' +
            '<span style="display:flex;gap:12px;flex-wrap:wrap;margin-top:14px">' + authorLinks() + '</span>' +
          '</span>' +
        '</div>' +
        '<div style="height:clamp(20px,3vh,34px)"></div>' +
        head(t.aboutDataTitle) + para(t.aboutData1) +
        '<p style="margin:0"><button data-act="privacy" style="background:transparent;border:0;cursor:pointer;padding:0;font-family:DM Sans,sans-serif;font-size:15px;font-weight:700;color:#FF4F62">' + esc(t.aboutDataLink) + ' →</button></p>' +
      '</div>' +
    '</section>';
  }
  function authorLinks() {
    var out = [];
    for (var i = 0; i < AUTHOR_LINKS.length; i++) {
      var l = AUTHOR_LINKS[i];
      var mark = brandIcon(l.icon, 18, l.color || '#FF4F62') || ph(l.icon, 18, '#FF4F62', 'ph-fill');
      var text = (state.lang === 'en' && l.handleEn) ? l.handleEn : (l.handle || l.label);
      out.push('<a href="' + l.href + '" rel="me noopener" target="_blank" aria-label="' + esc(text) + ', ' + esc(l.label) + '" class="author-link">' + mark + esc(text) + '</a>');
    }
    return out.join('');
  }

  // ===== SUPPORT =====
  function renderSupport() {
    var t = tdict(), I = icons();
    var body = state.supportDone
      ? '<div style="display:flex;align-items:center;gap:14px;padding:22px 24px;border-radius:18px;background:#ffffff;border:1.5px solid #ffc9d0;box-shadow:0 12px 28px -16px rgba(255,79,98,.28);animation:popIn .5s ease both"><span style="display:inline-flex;flex:none">' + I.checkPink + '</span><span style="font-weight:600;font-size:15.5px;line-height:1.45;color:#1c1326">' + esc(t.supDone) + '</span></div>'
      : '<form data-form="support" style="display:flex;flex-direction:column;gap:12px">' +
          '<input type="text" name="hp" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
          '<input name="contactName" required placeholder="' + esc(t.supName) + '" style="border:1px solid #e9e6ec;border-radius:14px;padding:15px 17px;font-size:15px;background:#fff;outline:none">' +
          '<input name="email" type="email" required placeholder="' + esc(t.supEmailPh) + '" style="border:1px solid #e9e6ec;border-radius:14px;padding:15px 17px;font-size:15px;background:#fff;outline:none">' +
          '<textarea name="message" required rows="5" placeholder="' + esc(t.supMsgPh) + '" style="border:1px solid #e9e6ec;border-radius:14px;padding:15px 17px;font-size:15px;background:#fff;outline:none;resize:vertical;min-height:120px"></textarea>' +
          '<button type="submit" style="border:0;cursor:pointer;border-radius:14px;padding:16px 24px;font-family:Nunito,sans-serif;font-weight:800;font-size:15.5px;color:#fff;background:#FF4F62;box-shadow:0 12px 26px -10px rgba(255,79,98,.7)">' + esc(t.supSend) + '</button>' +
          '<p style="font-size:12.5px;color:#7a7280;text-align:center;margin:4px 0 0">' + esc(t.supNote) + '</p>' +
        '</form>';
    var faqHtml = faqAccordion(FAQ[state.lang]);
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
  var _legalLoading = false;
  function ensureLegalContent(cb) {
    if (window.PRIVACY && window.TERMS) { cb(); return; }
    if (_legalLoading) return;
    _legalLoading = true;
    var sc = document.createElement('script');
    sc.src = '/assets/legal-content.min.js';
    sc.onload = function () { _legalLoading = false; cb(); };
    sc.onerror = function () { _legalLoading = false; };
    document.head.appendChild(sc);
  }

  function renderLegal(which) {
    var t = tdict();
    var title = which === 'privacy' ? t.privTitle : t.termsTitle;
    var src = (which === 'privacy' ? window.PRIVACY : window.TERMS) || {};
    if (!src[state.lang]) { ensureLegalContent(function () { paint(); }); }
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
        '<p style="font-size:13.5px;color:#7a7280;margin:0 0 30px">' + esc(t.docUpdated) + '</p>' + body +
        '<div style="margin-top:30px;text-align:center">' + coralBtn(t.docContactCta, 'support') + '</div>' +
      '</div></section></div>';
  }

  function renderMain() {
    switch (state.page) {
      case 'play': return renderPlay();
      case 'games': return renderGames();
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
    buzz(8);
    var r = fx.getBoundingClientRect(), cx = r.width / 2, cy = r.height * 0.46;

    // "ping" shockwave ring popping out from the centre
    var pulse = document.createElement('span');
    pulse.style.cssText = 'position:absolute;left:' + cx + 'px;top:' + cy + 'px;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;border:3px solid rgba(255,79,98,.75);box-shadow:0 0 12px rgba(255,79,98,.45);will-change:transform,opacity';
    fx.appendChild(pulse);
    pulse.animate([
      { transform: 'scale(.15)', opacity: 0.95 },
      { transform: 'scale(1.9)', opacity: 0 }
    ], { duration: 520, easing: 'cubic-bezier(.2,.7,.2,1)' }).onfinish = function () { pulse.remove(); };

    // particles shooting from the centre outward with a springy overshoot (cartoon "poink")
    var N = 11;
    for (var i = 0; i < N; i++) {
      var a = (Math.PI * 2 * i) / N + (Math.random() - 0.5) * 0.4;
      var white = i % 2 === 0;                                 // alternate white + coral so it pops on any drink
      var col = white ? '#fff' : '#FF4F62';
      var glow = white ? 'rgba(255,79,98,.6)' : 'rgba(255,255,255,.85)';
      var s = document.createElement('span'); s.textContent = '✦';
      s.style.cssText = 'position:absolute;left:' + cx + 'px;top:' + cy + 'px;font-size:' + (13 + Math.random() * 9) + 'px;color:' + col + ';text-shadow:0 0 7px ' + glow + ';will-change:transform,opacity';
      fx.appendChild(s);
      var d = 62 + Math.random() * 44;
      (function (el, ang, dist) {
        el.animate([
          { transform: 'translate(-50%,-50%) scale(0) rotate(0deg)', opacity: 0, offset: 0 },
          { transform: 'translate(calc(-50% + ' + (Math.cos(ang) * dist * 0.6) + 'px), calc(-50% + ' + (Math.sin(ang) * dist * 0.6) + 'px)) scale(1.3) rotate(60deg)', opacity: 1, offset: 0.45 },
          { transform: 'translate(calc(-50% + ' + (Math.cos(ang) * dist) + 'px), calc(-50% + ' + (Math.sin(ang) * dist) + 'px)) scale(.25) rotate(130deg)', opacity: 0, offset: 1 }
        ], { duration: 780, easing: 'cubic-bezier(.34,1.56,.5,1)' }).onfinish = function () { el.remove(); };
      })(s, a, d);
    }
  }
  function plusOne() {
    var card = document.querySelector('[data-act="plusone"]');
    var fx = document.getElementById('fxLayer');
    if (!card || !fx) return;
    var fr = fx.getBoundingClientRect(), cr = card.getBoundingClientRect();
    var x = cr.left + cr.width / 2 - fr.left, y = cr.top - fr.top;
    buzz(8);
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
    burstSparkles();
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
    var hw = document.getElementById('howWrap'); if (hw) hw.innerHTML = renderHowStrip();
    var pl = document.getElementById('playLink');
    if (pl) pl.setAttribute('href', playHrefFor(state.gameIndex, state.lang) || '/games');
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
    document.documentElement.lang = lang; state.lang = lang;
    try {
      var tgt = pathFor(state.page, lang);
      if (location.pathname.replace(/\.html$/, '') !== tgt) history.pushState(null, '', tgt);
    } catch (e) {}
    paint();
  }
  // Country fallback: switch to RU for Russian-speaking countries — only if the visitor hasn't
  // chosen a language and the browser wasn't already Russian. Not persisted (re-checked each visit).
  function applyGeoLang() {
    try {
      if (localStorage.getItem('clinky_lang')) return;
      if (!state || state.lang === 'ru') return;
      if (!RU_LOCALES[(GEO.code || '').toUpperCase()]) return;
      if (!document.getElementById('main')) return;   // app not mounted yet
      state.lang = 'ru'; document.documentElement.lang = 'ru'; paint();
    } catch (e) {}
  }
  var PAGES = { home: 1, games: 1, play: 1, about: 1, support: 1, privacy: 1, terms: 1 };
  var PLAY_SLUGS = {
    'never-have-i-ever': { id: 'never_have_i', lang: 'en', game: 0 },
    'ya-nikogda-ne': { id: 'never_have_i', lang: 'ru', game: 0 },
    'roulette': { id: 'roulette', lang: 'en', game: 1 },
    'ruletka': { id: 'roulette', lang: 'ru', game: 1 },
    'questions-to-ask-friends': { id: 'tell_a_moment', lang: 'en', game: 2 },
    'voprosy-druzyam': { id: 'tell_a_moment', lang: 'ru', game: 2 },
    'would-you-rather': { id: 'would_you_rather', lang: 'en', game: 3 },
    'chto-vyberesh': { id: 'would_you_rather', lang: 'ru', game: 3 }
  };
  // clean path routing (no hash): / , /about , /support , /privacy , /terms (+ -ru entry variants)
  function pathSegment() {
    var seg = (location.pathname || '/').replace(/^\/+|\/+$/g, '').replace(/\.html$/, '').toLowerCase();
    if (seg === 'ru') return '';                            // /ru/ -> home
    if (seg.indexOf('ru/') === 0) return seg.slice(3);      // /ru/games -> games
    if (seg.slice(-3) === '-ru') return seg.slice(0, -3);   // legacy /privacy-ru -> privacy
    return seg;
  }
  function isRuPath() {
    var seg = (location.pathname || '/').replace(/^\/+|\/+$/g, '').replace(/\.html$/, '').toLowerCase();
    return seg === 'ru' || seg.indexOf('ru/') === 0 || seg.slice(-3) === '-ru';
  }
  function pageFromPath() {
    var seg = pathSegment();
    if (seg.indexOf('play/') === 0) {
      var slug = seg.slice(5);
      if (PLAY_SLUGS[slug]) { state.playSlug = slug; return 'play'; }
    }
    return PAGES[seg] ? seg : 'home';
  }
  function playHrefFor(gameIndex, lang) {
    var slug = playSlugFor(GAME_IDS[gameIndex], lang);
    if (!slug) return null;
    return (lang === 'ru' ? '/ru/play/' : '/play/') + slug;
  }
  function playSlugFor(gameId, lang) {
    for (var k in PLAY_SLUGS) {
      if (PLAY_SLUGS[k].id === gameId && PLAY_SLUGS[k].lang === lang) return k;
    }
    return null;
  }
  function pathFor(page, lang) {
    if (page === 'play') {
      var cur = PLAY_SLUGS[state.playSlug] || { id: 'never_have_i' };
      var slug = playSlugFor(cur.id, lang) || state.playSlug;
      return (lang === 'ru' ? '/ru/play/' : '/play/') + slug;
    }
    var tail = page === 'home' ? '' : page;
    return lang === 'ru' ? '/ru/' + tail : '/' + tail;
  }
  var DOC_TITLES = {"/":"Clinky — Party Question Games for Friends","/games":"Party Question Games for Friends — Clinky","/about":"About Clinky — An App for Friendships Worth Keeping","/support":"Clinky Support — Report a Bug or Send an Idea","/privacy":"Privacy Policy — Clinky","/terms":"Terms of Use — Clinky","/privacy-ru":"Политика конфиденциальности — Clinky","/terms-ru":"Условия использования — Clinky","/ru/":"Clinky — игры с вопросами для компании друзей","/ru/games":"Игры для компании: вопросы для вечера с друзьями — Clinky","/ru/about":"О Clinky — приложение, чтобы не терять друзей","/ru/support":"Поддержка Clinky — вопросы и связь с командой","/ru/privacy":"Политика конфиденциальности — Clinky","/ru/terms":"Условия использования — Clinky","/play/never-have-i-ever":"Never Have I Ever Online — Free Cards, No Sign-Up","/ru/play/ya-nikogda-ne":"Играть в «Я никогда не» онлайн — карточки бесплатно","/play/roulette":"Roulette Question Game Online — Free, No Sign-Up","/ru/play/ruletka":"Игра «Рулетка» онлайн — вопросы про друзей, бесплатно","/play/questions-to-ask-friends":"Questions to Ask Friends — Free Card Game Online","/ru/play/voprosy-druzyam":"Вопросы друзьям онлайн — карточки для разговора, бесплатно","/play/would-you-rather":"Would You Rather Online — Free Cards, No Sign-Up","/ru/play/chto-vyberesh":"Играть в «Что выберешь» онлайн — карточки бесплатно","/404":"Page Not Found — Clinky"};
  function syncDocTitle() {
    var k = location.pathname.replace(/\.html$/, '').replace(/(.)\/$/, '$1');
    var v = DOC_TITLES[k] || DOC_TITLES[k + '/'];
    if (v) document.title = v;
  }
  var _pageKey = '';
  function pageKey(page) { return page === 'play' ? 'play:' + state.playSlug : page; }
  function setPage(page) {
    var leaving = document.querySelector('#app .page-in');
    if (leaving && pageKey(page) !== _pageKey && !prefersReducedMotion()) {
      leaving.classList.add('page-out');
      setTimeout(function () { commitPage(page); }, 120);
      return;
    }
    commitPage(page);
  }
  function prefersReducedMotion() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
  }
  function commitPage(page) {
    state.page = page;
    _pageKey = pageKey(page);
    try {
      var tgt = pathFor(page, state.lang);
      if (location.pathname.replace(/\.html$/, '') !== tgt) history.pushState(null, '', tgt);
    } catch (e) {}
    try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch (e2) { window.scrollTo(0, 0); }
    state.scrolled = window.scrollY > 24; paint(); syncDocTitle();
  }
  function closeMenu(instant) {
    var el = document.querySelector('.nav-menu');
    if (!el || instant) { state.menuOpen = false; paintHeader(); return; }
    el.classList.add('is-closing');
    setTimeout(function () { state.menuOpen = false; paintHeader(); }, 180);
  }
  function joinCta() { if (state.page !== 'home') { setPage('home'); setTimeout(scrollWaitlist, 80); } else scrollWaitlist(); }
  function scrollWaitlist() {
    var f = document.querySelector('input[type="email"]'); if (!f) return;
    var y = f.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setTimeout(function () { try { f.focus({ preventScroll: true }); } catch (e) {} }, 500);
  }
  function setDrink(d) {
    if (window.ClinkyHeroBoot) window.ClinkyHeroBoot();
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

  // read ?utm_source, remember it for the whole session, and fire a one-time visit beacon per channel
  function captureSource() {
    var src = '';
    try { src = (new URLSearchParams(location.search).get('utm_source') || '').toLowerCase().trim().slice(0, 40); } catch (e) {}
    try {
      if (src) sessionStorage.setItem('clinky_src', src);
      else src = sessionStorage.getItem('clinky_src') || '';
    } catch (e) {}
    try {
      if (src && !sessionStorage.getItem('clinky_src_hit')) {
        sessionStorage.setItem('clinky_src_hit', '1');
        var vp = new URLSearchParams(); vp.set('type', 'visit'); vp.set('source', src);
        fetch(WAITLIST_ENDPOINT, { method: 'POST', body: vp, keepalive: true }).catch(function () {});
      }
    } catch (e) {}
    return src;
  }
  function submitWaitlist(form) {
    var email = (form.email.value || '').trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    var params = new URLSearchParams();
    params.set('email', email);
    params.set('hp', (form.hp && form.hp.value) || '');
    params.set('country', GEO.code || '');
    params.set('city', GEO.tz || '');
    params.set('tz', GEO.tz || '');
    params.set('lang', state.lang || navigator.language || '');
    params.set('drink', state.sel || '');
    params.set('referrer', document.referrer || '');
    params.set('source', state.source || '');
    // Show a loading state first; reveal the final result only once the server answers (no flicker).
    state.waitlistLoading = true; state.waitlistDone = false; state.waitlistDup = false;
    paintWaitlistDone();
    var settled = false;
    function finish(dup) {
      if (settled) return; settled = true;
      state.waitlistLoading = false; state.waitlistDone = true; state.waitlistDup = !!dup;
      paintWaitlistDone();
    }
    try {
      fetch(WAITLIST_ENDPOINT, { method: 'POST', body: params })
        .then(function (r) { return r.json(); })
        .then(function (d) { finish(d && d.dup); })
        .catch(function () { finish(false); });
    } catch (e) { finish(false); }
    setTimeout(function () { finish(false); }, 6000);   // safety: never hang on the spinner
  }
  function paintWaitlistDone() {
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
      case 'home': case 'games': case 'about': case 'support': case 'privacy': case 'terms': if (state.menuOpen) closeMenu(true); setPage(a); break;
      case 'menu': {
        if (state.menuOpen) closeMenu();
        else { state.menuOpen = true; paintHeader(); }
        break;
      }
      case 'en': setLang('en'); break;
      case 'ru': setLang('ru'); break;
      case 'join': joinCta(); break;
      case 'beer': setDrink('beer'); break;
      case 'coffee': setDrink('coffee'); break;
      case 'play': if (window.ClinkyHeroBoot) window.ClinkyHeroBoot(); playAnim(); bumpClink(); resetAnim(); break;
      case 'plusone': plusOne(); break;
      case 'p0': case 'p1': case 'p2': case 'p3': {
        var pgi = parseInt(a.slice(1), 10);
        var pslug = playSlugFor(GAME_IDS[pgi], state.lang);
        if (pslug) { state.playSlug = pslug; state.gameIndex = pgi; state.playIndex = 0; setPage('play'); }
        break;
      }
      case 'playnext': {
        var st = deckState(), lim = deckLimit();
        if (st.used < lim) {
          st.used += 1; saveDeck(st);
          state.playIndex = (state.playIndex + 1) % Math.max(1, deckCards().length);
          var m = document.getElementById('playMount');
          if (m) {
            m.innerHTML = renderPlayCard();
            var line = document.getElementById('playLine');
            if (line) { line.style.animation = 'qSwap .34s cubic-bezier(0.16,1,0.3,1)'; }
          }
        }
        break;
      }
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
    try {   // deterministic locale entry for /privacy-ru and ?lang= (used by App Store Connect URLs)
      var qlang = (new URLSearchParams(location.search).get('lang') || '').toLowerCase();
      if (qlang === 'ru' || qlang === 'en') lang = qlang;
      else if (isRuPath()) lang = 'ru';
    } catch (e) {}
    state.lang = lang; document.documentElement.lang = lang;
    try { state.source = captureSource(); } catch (e) {}
    state.page = pageFromPath();
    try {   // ?demo=support / ?demo=waitlist — preview the success banner without submitting
      var demo = new URLSearchParams(location.search).get('demo');
      if (demo === 'support') { state.page = 'support'; state.supportDone = true; }
      else if (demo === 'waitlist') { state.waitlistDone = true; }
    } catch (e) {}
    window.addEventListener('popstate', function () { var p = pageFromPath(); state.page = p; try { window.scrollTo(0, 0); } catch (e) {} state.scrolled = window.scrollY > 24; paint(); });

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
    applyGeoLang();   // in case geo already resolved before mount
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
