// Per-game editorial content. Hand-written source, rendered into both the
// prerendered shells and the client-side play pages.
export const GAME_CONTENT = {
  never_have_i: {
    tagline: {
      en: 'Confessions that always drag a story out behind them',
      ru: 'Признания, за которыми всегда идёт история'
    },
    players: { en: 'Three people or more, best from five', ru: 'От трёх человек, живее всего от пяти' },
    best: {
      en: 'For a table that has already warmed up and is ready to admit things',
      ru: 'Для компании, которая уже разогрелась и готова признаваться'
    },
    intro: {
      en: [
        'Someone reads a card out loud and everyone who has done it owns up. That part takes five seconds. The good part comes next, because every confession has a story behind it and the table always asks for it.',
        'We wrote the cards so that the answer leaves a hole you want to poke. That is why you will not find "never have I ever been abroad" in the set. Small, recognisable, slightly embarrassing things work far better than big ones.'
      ],
      ru: [
        'Кто-то читает карточку вслух, и все, кто это делал, признаются. На это уходит пять секунд. Интересное начинается сразу после, потому что за каждым признанием есть история, и её всегда просят рассказать.',
        'Мы писали карточки так, чтобы после ответа хотелось спросить «а как это вообще получилось». Поэтому в наборе нет «я никогда не был за границей». Мелкие и очень узнаваемые вещи работают куда лучше громких.'
      ]
    },
    rules: {
      en: [
        'Read the card out loud, exactly as written, without softening it',
        'Everyone who has done it owns up, a raised hand counts',
        'Whoever admitted it first tells the table how it happened',
        'The next person clockwise reads the next card',
        'Anyone can pass once, and nobody gets talked into anything'
      ],
      ru: [
        'Читаешь карточку вслух, ровно как написано, ничего не смягчая',
        'Все, кто это делал, признаются, поднятой руки достаточно',
        'Кто признался первым, рассказывает столу, как это вышло',
        'Следующую карточку читает сосед по кругу',
        'Пропустить можно один раз, и никого не уговаривают'
      ]
    },
    variants: {
      en: [
        { t: 'Without drinking', d: 'Count points instead of sips. One confession, one point. By the end of the night the person with the most points has clearly lived the most, and that is funny on its own.' },
        { t: 'For two', d: 'Read the cards in turn and both answer every one. With two people it stops being a game and turns into a proper conversation, which is usually better.' },
        { t: 'For a big group', d: 'From eight people, split the table in half and read each card for both halves at once. Nobody sits waiting ten minutes for a turn.' },
        { t: 'Over a video call', d: 'One person keeps the cards and reads them, everyone else answers in gallery order. Otherwise four people talk at the same time and you hear none of them.' }
      ],
      ru: [
        { t: 'Без алкоголя', d: 'Считайте очки вместо глотков. Признался, забрал очко. К концу вечера у кого-то их будет больше всех, и это смешно само по себе.' },
        { t: 'Вдвоём', d: 'Читайте карточки по очереди и отвечайте оба на каждую. Вдвоём это перестаёт быть игрой и становится разговором, а так обычно интереснее.' },
        { t: 'Большой компанией', d: 'От восьми человек делите стол на две половины и читайте карточку сразу для обеих. Никто не ждёт своей очереди десять минут.' },
        { t: 'По видеосвязи', d: 'Один человек держит карточки и читает, остальные отвечают по порядку в галерее. Иначе говорят разом четверо, и не слышно никого.' }
      ]
    },
    tips: {
      en: [
        'Do not explain the card before reading it. Half the laugh is in how differently everyone reads the same line',
        'If the whole table owns up, ask who had it worst instead of who did it',
        'Leave the quiet one alone. Two cards later they usually start talking on their own'
      ],
      ru: [
        'Не объясняй карточку заранее. Половина смеха в том, что все поняли одну строчку по-разному',
        'Если признались все, спрашивай не «кто», а «у кого было хуже»',
        'Не давите на того, кто молчит. Через пару карточек он заговорит сам'
      ]
    },
    faq: {
      en: [
        { q: 'How many people do you need?', a: 'Three is enough, five or more is better. The more people at the table, the more often someone owns up, and the confession is what starts the stories.' },
        { q: 'Does it need drinking?', a: 'No. The set is written so it works over tea. Count points for confessions, or skip scoring and just tell the stories.' },
        { q: 'Will it work with people who barely know each other?', a: 'Start with the harmless cards and move to personal ones once people stop glancing at each other. The web deck opens with the softer questions for that reason.' },
        { q: 'Can I play in the browser?', a: 'Yes, right on this page. Eight cards a day are free here. The app holds a far bigger set and remembers what you have already asked.' }
      ],
      ru: [
        { q: 'Сколько человек нужно', a: 'Трёх достаточно, от пяти веселее. Чем больше людей, тем чаще кто-то признаётся, а признание и запускает истории.' },
        { q: 'Нужен ли алкоголь', a: 'Нет. Набор написан так, чтобы работал и на чае. Считайте очки за признания или вообще не считайте, а просто рассказывайте.' },
        { q: 'Подойдёт ли для малознакомой компании', a: 'Начните с безобидных карточек, а к личным переходите, когда люди перестанут коситься друг на друга. Веб-набор поэтому и открывается мягкими вопросами.' },
        { q: 'Можно играть в браузере', a: 'Да, прямо на этой странице. Восемь карточек в день бесплатно. В приложении набор гораздо больше, и оно помнит, что вы уже спрашивали.' }
      ]
    }
  },

  roulette: {
    tagline: {
      en: 'The card picks two of you and asks one about the other',
      ru: 'Карточка сама выбирает двоих и спрашивает одного про другого'
    },
    players: { en: 'Three people or more, four is the sweet spot', ru: 'От трёх человек, идеально от четырёх' },
    best: {
      en: 'For friends who already have history together',
      ru: 'Для компании, у которой уже есть общая история'
    },
    intro: {
      en: [
        'Most question games ask about you. This one asks about the person sitting next to you. The card names two players and the first one answers a question about the second.',
        'It gets good when the two versions do not match. One remembers the evening as an adventure, the other as a disaster, and the table listens to both and decides who to believe.'
      ],
      ru: [
        'Обычные игры с вопросами спрашивают про тебя. Эта спрашивает про того, кто сидит рядом. Карточка называет двоих, и первый отвечает на вопрос про второго.',
        'Смешно становится, когда версии расходятся. Один помнит вечер как приключение, второй как провал, а стол слушает обе версии и решает, кому верить.'
      ]
    },
    rules: {
      en: [
        'Enter everyone who is playing and let the card pick the pair',
        'The first person answers the question about the second, out loud and without dodging',
        'The second adds their own version of the same story',
        'The table gets one follow-up question, not five',
        'Then the card picks a new pair and it starts again'
      ],
      ru: [
        'Впиши всех, кто играет, и карточка сама выберет пару',
        'Первый отвечает на вопрос про второго, вслух и без отговорок',
        'Второй добавляет свою версию той же истории',
        'Стол задаёт один уточняющий вопрос, а не пять',
        'Дальше карточка выбирает новую пару и всё повторяется'
      ]
    },
    variants: {
      en: [
        { t: 'Without drinking', d: 'Nothing to replace here. The game runs on stories, so the only cost of a bad answer is the table refusing to accept it.' },
        { t: 'For two', d: 'With two people every card is about the two of you. Take turns reading and both answer, and you end up with an evening of comparing memories.' },
        { t: 'For a big group', d: 'From eight people put a minute on the clock for each answer. Without it, one story eats half the evening.' },
        { t: 'For a new group', d: 'If people met recently, start with the first-impression questions. They are safe, and they give everyone something to laugh about straight away.' }
      ],
      ru: [
        { t: 'Без алкоголя', d: 'Тут и заменять нечего. Игра держится на историях, и единственная расплата за слабый ответ в том, что стол его не примет.' },
        { t: 'Вдвоём', d: 'Вдвоём каждая карточка про вас двоих. Читайте по очереди и отвечайте оба, и вечер уйдёт на сравнение воспоминаний.' },
        { t: 'Большой компанией', d: 'От восьми человек ставьте минуту на ответ. Без таймера одна история съест полвечера.' },
        { t: 'Для новой компании', d: 'Если люди познакомились недавно, начните с вопросов про первое впечатление. Они безопасные и сразу дают повод посмеяться.' }
      ]
    },
    tips: {
      en: [
        'Read the names the way the card wrote them. Swapping who answers whom kills the point',
        'The second version matters more than the first. Ask for it even when everyone is already laughing',
        'If a pair comes up twice in a row, keep it. The second question about the same two people is usually the sharper one'
      ],
      ru: [
        'Читай имена так, как их выдала карточка. Если поменять, кто про кого отвечает, весь смысл теряется',
        'Вторая версия важнее первой. Проси её, даже когда все уже смеются',
        'Если пара выпала два раза подряд, не меняй. Второй вопрос про тех же двоих обычно острее'
      ]
    },
    faq: {
      en: [
        { q: 'What if people do not know each other well?', a: 'Then stay on the first-impression cards. Questions about a shared past need a shared past, so save those for the group that has one.' },
        { q: 'Who picks the pair?', a: 'The card does. That is the whole trick. Nobody can aim a question at a specific person, so nothing feels targeted.' },
        { q: 'Does it work for two?', a: 'Yes, and differently. Every card becomes a question about the two of you, which turns the game into a long conversation rather than a round.' },
        { q: 'Can I play in the browser?', a: 'Yes. This page uses two stand-in names so you can see how the cards read. The app pulls real names from your own friend list.' }
      ],
      ru: [
        { q: 'А если люди плохо знакомы', a: 'Тогда оставайтесь на вопросах про первое впечатление. Для вопросов про общее прошлое нужно само общее прошлое, так что их лучше отложить.' },
        { q: 'Кто выбирает пару', a: 'Карточка. В этом весь фокус. Никто не может направить вопрос в конкретного человека, поэтому ничего не выглядит наездом.' },
        { q: 'Работает ли вдвоём', a: 'Да, только иначе. Каждая карточка становится вопросом про вас двоих, и игра превращается в долгий разговор.' },
        { q: 'Можно играть в браузере', a: 'Да. На этой странице стоят два условных имени, чтобы было видно, как читаются карточки. В приложении подставляются имена из твоего списка друзей.' }
      ]
    }
  },

  tell_a_moment: {
    tagline: {
      en: 'Questions people answer with a story instead of one word',
      ru: 'Вопросы, на которые отвечают историей, а не одним словом'
    },
    players: { en: 'Two people or more', ru: 'От двух человек' },
    best: {
      en: 'For a slow evening when you actually want to talk',
      ru: 'Для тихого вечера, когда хочется поговорить'
    },
    intro: {
      en: [
        'This one is not a race. A single question can hold the table for twenty minutes, and that is the point rather than a problem.',
        'Every card asks for a moment. Not an opinion, not a favourite, a moment with a time and a place in it. That small difference is why the answers stop sounding like small talk.'
      ],
      ru: [
        'Это игра не на скорость. Один вопрос может занять двадцать минут, и это не сбой, а смысл.',
        'Каждая карточка просит момент. Не мнение и не любимое что-то, а случай, у которого есть время и место. Из-за этой мелочи ответы перестают быть светской болтовнёй.'
      ]
    },
    rules: {
      en: [
        'Ask one person rather than throwing the card at the table',
        'Let the silence sit for a few seconds, the first answer is rarely the real one',
        'Follow up on one detail from what they said',
        'When the story ends, pass the cards to whoever answered',
        'Nobody has to answer, and nobody has to explain why not'
      ],
      ru: [
        'Спрашивай одного человека, а не бросай карточку на весь стол',
        'Дай тишине повисеть пару секунд, первый ответ редко настоящий',
        'Уточни одну деталь из того, что он рассказал',
        'Когда история закончилась, отдай карточки тому, кто отвечал',
        'Отвечать не обязательно, и объяснять отказ тоже не нужно'
      ]
    },
    variants: {
      en: [
        { t: 'Without drinking', d: 'Nothing changes. This is the game we hand to people who want a long evening and a clear head.' },
        { t: 'For two', d: 'The set works best with two. One question, two answers, and an hour disappears somewhere between them.' },
        { t: 'For a big group', d: 'From six people, answer in pairs. Two people take the same card, everyone else listens, and it stays a conversation instead of a queue.' },
        { t: 'On a walk', d: 'Cards read fine out loud with no table. One question per block works surprisingly well.' }
      ],
      ru: [
        { t: 'Без алкоголя', d: 'Ничего не меняется. Эту игру мы и даём тем, кто хочет долгий вечер и свежую голову.' },
        { t: 'Вдвоём', d: 'Набор лучше всего работает на двоих. Один вопрос, два ответа, и час куда-то уходит между ними.' },
        { t: 'Большой компанией', d: 'От шести человек отвечайте парами. Двое берут одну карточку, остальные слушают, и это остаётся разговором, а не очередью.' },
        { t: 'На прогулке', d: 'Карточки нормально читаются вслух и без стола. Один вопрос на квартал заходит на удивление хорошо.' }
      ]
    },
    tips: {
      en: [
        'Ask the follow-up. One question about a detail turns a short answer into the actual story',
        'Do not answer your own card first. People copy the length of the first answer',
        'If a question lands flat, drop it and move on without discussing why'
      ],
      ru: [
        'Задавай уточняющий вопрос. Один вопрос про деталь превращает короткий ответ в настоящую историю',
        'Не отвечай на свою карточку первым. Люди повторяют длину первого ответа',
        'Если вопрос не зашёл, брось его и иди дальше, не обсуждая почему'
      ]
    },
    faq: {
      en: [
        { q: 'Is this good for two people?', a: 'It is the best of the four for two. The cards ask for stories, and two people can follow a story without waiting for a turn.' },
        { q: 'What if someone gives a one-word answer?', a: 'Ask about one detail of it. That is usually all it takes, and it is why the follow-up is written into the rules.' },
        { q: 'Are the questions personal?', a: 'They ask for moments, not secrets. Nothing in the set forces anyone to confess anything, so it works with parents and colleagues too.' },
        { q: 'Can I play in the browser?', a: 'Yes, eight cards a day on this page. The app keeps the full set and does not repeat what it has already asked you.' }
      ],
      ru: [
        { q: 'Подходит ли для двоих', a: 'Из четырёх игр эта лучшая для двоих. Карточки просят истории, а двое могут идти за историей, не ожидая очереди.' },
        { q: 'Что делать, если ответили одним словом', a: 'Спроси про одну деталь ответа. Обычно этого хватает, поэтому уточняющий вопрос и вписан в правила.' },
        { q: 'Вопросы личные', a: 'Они просят момент, а не секрет. Ничто в наборе не заставляет признаваться, поэтому игра идёт и с родителями, и с коллегами.' },
        { q: 'Можно играть в браузере', a: 'Да, восемь карточек в день на этой странице. В приложении полный набор, и оно не повторяет то, что уже спрашивало.' }
      ]
    }
  },

  would_you_rather: {
    tagline: {
      en: 'Two options, and both of them cost you something',
      ru: 'Два варианта, и оба чем-то неудобны'
    },
    players: { en: 'Two people or more, four and up is livelier', ru: 'От двух человек, от четырёх живее' },
    best: {
      en: 'When the table needs waking up in under a minute',
      ru: 'Когда стол надо расшевелить за минуту'
    },
    intro: {
      en: [
        'An argument without a subject. Both options are bad in their own way, so whichever you pick you end up defending it.',
        'The trick is in the writing. If one option is obviously better the card is dead, so every pair in the set takes something away from you either way.'
      ],
      ru: [
        'Спор без темы. Оба варианта плохи по-своему, поэтому какой ни выбери, придётся его защищать.',
        'Весь фокус в формулировке. Если один вариант очевидно лучше, карточка мертва, поэтому в каждой паре у тебя что-то отбирают в обоих случаях.'
      ]
    },
    rules: {
      en: [
        'Read both options out loud without hinting which one you like',
        'Everyone picks a side before anyone explains anything',
        'Then each side says why, one sentence at a time',
        'The bigger side has to convince one person to switch',
        'Nobody wins, and that is fine, the next card is already waiting'
      ],
      ru: [
        'Читай оба варианта вслух и не намекай, какой нравится тебе',
        'Все выбирают сторону до того, как кто-то начнёт объяснять',
        'Потом каждая сторона говорит почему, по одному предложению',
        'Большая сторона должна перетянуть к себе хотя бы одного',
        'Победителя нет, и это нормально, следующая карточка уже ждёт'
      ]
    },
    variants: {
      en: [
        { t: 'Without drinking', d: 'The game never needed it. Count who switched sides most often instead, that person is the one to watch.' },
        { t: 'For two', d: 'Take opposite sides on purpose, even the one you do not believe in. Defending a position you dislike is the funniest part of the game.' },
        { t: 'For a big group', d: 'Split the room physically, one option to the left, the other to the right. From ten people this reads faster than going around the table.' },
        { t: 'With kids at the table', d: 'The set has no adult content, so the questions work at a family dinner. Younger players usually pick faster and argue harder.' }
      ],
      ru: [
        { t: 'Без алкоголя', d: 'Он тут и не нужен был. Считайте, кто чаще менял сторону, за этим человеком и стоит следить.' },
        { t: 'Вдвоём', d: 'Занимайте противоположные стороны специально, даже ту, в которую не верите. Защищать позицию, которая тебе не нравится, самое смешное в игре.' },
        { t: 'Большой компанией', d: 'Разделите комнату физически, один вариант налево, второй направо. От десяти человек так быстрее, чем обходить стол.' },
        { t: 'Когда за столом дети', d: 'В наборе нет взрослого содержания, так что вопросы годятся и для семейного ужина. Младшие обычно выбирают быстрее и спорят злее.' }
      ]
    },
    tips: {
      en: [
        'Make everyone choose before the talking starts. Once one person explains, the rest drift to that side',
        'Ban "both" and "neither". The card only works if you have to give something up',
        'Keep the pace up. Two minutes per card is plenty, and this is the game you use to warm the table before a longer one'
      ],
      ru: [
        'Пусть все выберут до начала разговора. Как только кто-то объяснит, остальные сползут на его сторону',
        'Запрети «оба» и «ни то, ни другое». Карточка работает только если чем-то приходится жертвовать',
        'Держи темп. Двух минут на карточку хватает, и именно этой игрой удобно разогревать стол перед долгой'
      ]
    },
    faq: {
      en: [
        { q: 'Why not make one option clearly better?', a: 'Because then there is nothing to argue about. Every pair in the set is written so both sides cost you something.' },
        { q: 'How long does a round take?', a: 'About a minute or two per card. It is the fastest of the four games, which makes it the one to open the evening with.' },
        { q: 'Is it safe for a mixed table?', a: 'Yes. The questions are about choices rather than confessions, so nobody has to reveal anything about themselves.' },
        { q: 'Can I play in the browser?', a: 'Yes, eight cards a day here. The app has the full set plus the other three games in the same place.' }
      ],
      ru: [
        { q: 'Почему не сделать один вариант явно лучше', a: 'Потому что тогда спорить не о чем. Каждая пара в наборе написана так, что обе стороны чем-то стоят.' },
        { q: 'Сколько идёт круг', a: 'Минута или две на карточку. Это самая быстрая из четырёх игр, поэтому ей удобно открывать вечер.' },
        { q: 'Подходит ли для смешанной компании', a: 'Да. Вопросы про выбор, а не про признания, поэтому никому не нужно раскрывать что-то о себе.' },
        { q: 'Можно играть в браузере', a: 'Да, восемь карточек в день здесь. В приложении полный набор и остальные три игры рядом.' }
      ]
    }
  }
};

export const CONTENT_LABELS = {
  en: {
    about: 'What the game is', rules: 'Rules', variants: 'Ways to play',
    tips: 'How to run it well', examples: 'Cards from the set',
    fitPlayers: 'Players', fitBest: 'Works best', faq: 'Questions about this game'
  },
  ru: {
    about: 'Что за игра', rules: 'Правила', variants: 'Как ещё играть',
    tips: 'Как вести, чтобы не заглохло', examples: 'Карточки из набора',
    fitPlayers: 'Сколько человек', fitBest: 'Лучше всего', faq: 'Вопросы про эту игру'
  }
};
