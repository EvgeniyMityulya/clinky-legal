// The /about copy, mirrored from site.js so the prerender says the same thing.
// Edit site.js and this file together, the check below fails if they drift.
export const ABOUT = {
  en: {
    storyTitle: 'Why does this exist?',
    story: [
      'We see our friends a lot, at home and in bars, and there is almost always someone new at the table. The first twenty minutes go on traffic and weather while the evening quietly waits to start.',
      'Clinky came out of a trick we kept using. Someone would pull a random question, read it out loud, and the conversation started on its own. The app does that part now, and it also remembers who we have seen lately, so a rare meet-up does not turn into a year of silence.'
    ],
    whoTitle: 'Who makes it?',
    name: 'Evgeniy Mityulya',
    role: 'iOS Engineer, Founder of @Clinky',
    who: [
      'I built the app for my own table, so an evening starts right away instead of the first awkward twenty minutes. Clinky is mine end to end, the code and the question cards both, so if a card lands badly you know exactly whom to blame \u{1F642}',
      'Write to me directly. If you have an idea, or just a question worth asking, send it over and we will talk.'
    ],
    dataTitle: 'What happens to your data?',
    data: 'There are no accounts and there is no server. Your meet-ups, your friends and your collection stay on your phone, which means I cannot see whom you meet or what you answer. Nothing to leak, because nothing leaves the device.'
  },
  ru: {
    storyTitle: 'Зачем это всё?',
    story: [
      'Мы часто собираемся с друзьями, дома и в барах, и почти всегда за столом оказывается кто-то новый. Первые двадцать минут уходят на пробки и погоду, хотя вечер задумывался совсем не про это.',
      'Clinky вырос из приёма, которым мы пользовались и так. Кто-то вытягивал случайный вопрос, читал его вслух, и разговор запускался сам. Теперь эту часть делает приложение, а заодно помнит, с кем мы виделись недавно, чтобы редкая встреча не превратилась в год тишины.'
    ],
    whoTitle: 'Кто делает?',
    name: 'Евгений Митюля',
    role: 'iOS Инженер, Основатель @Clinky',
    who: [
      'Приложение я сделал для своей компании, чтобы вечер начинался сразу, без неловких первых двадцати минут. Clinky целиком мой, и код, и вопросы на карточках, так что если карточка не зашла, вы точно знаете, кому жаловаться \u{1F642}',
      'Пишите мне напрямую. Если есть идея или просто интересный вопрос, тоже пишите, пообщаемся.'
    ],
    dataTitle: 'Что с вашими данными?',
    data: 'Аккаунтов нет, сервера тоже нет. Встречи, друзья и коллекция лежат на вашем телефоне, поэтому я не вижу, с кем вы встречаетесь и что отвечаете на карточки. Утечь нечему, потому что ничего не уходит с устройства.'
  }
};

// Profiles that prove the author is a real person. Empty until the URLs are known;
// both the page and the Person schema pick them up automatically.
export const AUTHOR_LINKS = [
  { label: 'LinkedIn', handle: 'Евгений Митюля', handleEn: 'Evgeniy Mityulya', href: 'https://www.linkedin.com/in/evgeniy-mityulya/', icon: 'linkedin', color: '#0A66C2' },
  { label: 'Telegram', handle: '@evgeniymityulya', href: 'https://t.me/evgeniymityulya', icon: 'telegram', color: '#26A5E4' },
  { label: 'X', handle: '@Evgeniy_iOS', href: 'https://x.com/Evgeniy_iOS', icon: 'x', color: '#111111' }
];

// Set once a portrait lands in assets/. Both the page and the Person schema
// switch from the placeholder icon to the real image when this is filled in.
export const AUTHOR_PHOTO = '/assets/author.jpg';
