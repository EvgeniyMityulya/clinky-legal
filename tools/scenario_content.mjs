// Страницы под ситуации, а не под механику игры. Спрос сидит на том, с кем играют,
// поэтому у каждой ситуации своя колода, свой текст и свой FAQ. Общего шаблона тут нет
// намеренно: одинаковые страницы поиск склеивает.
export const SCENARIOS = {
  couples: {
    slug: { en: 'questions/for-couples', ru: 'ru/voprosy/dlya-pary' },
    players: { en: "For two", ru: "Для двоих" },
    h1: { en: "Questions for couples", ru: "Вопросы для пары" },
    tagline: {
      en: "Twenty cards for the two of you, and none of them ask about your favourite colour",
      ru: "Двадцать карточек на двоих, и ни одна не спрашивает про любимый цвет"
    },
    intro: {
      en: "Couples run out of questions faster than they run out of evenings. Not because there is nothing left to say, but because the easy questions are used up and the real ones feel too heavy to start with. These cards sit in between. Each one asks about something that already happened to you, so the answer arrives as a story rather than a word.",
      ru: "У пар вопросы кончаются быстрее, чем вечера. Не потому что нечего сказать, а потому что простые уже спрошены, а настоящие начинать страшно. Эти карточки посередине. Каждая спрашивает про то, что с вами уже было, поэтому в ответ приходит история, а не одно слово."
    },
    how: {
      en: [
        "One of you draws a card and reads it out loud",
        "The other answers first, without softening it",
        "Then the one who read the card answers the same question",
        "Compare the two versions, that is where the evening actually starts"
      ],
      ru: [
        "Один тянет карточку и читает вслух",
        "Второй отвечает первым и не сглаживает",
        "Потом на тот же вопрос отвечает тот, кто читал",
        "Сравните версии, вечер начинается именно здесь"
      ]
    },
    advice: {
      en: [
        { t: "Do not save the hard ones for last", d: "an evening that starts safe usually stays safe, so pull a heavier card while you both still have energy" },
        { t: "Answer before you explain", d: "the first honest sentence is worth more than a paragraph of context around it" },
        { t: "Let one card run long", d: "four cards with real answers beat twenty with polite ones" }
      ],
      ru: [
        { t: "Не оставляйте тяжёлые на конец", d: "вечер, начатый осторожно, обычно таким и остаётся, поэтому тяните серьёзную карточку пока есть силы" },
        { t: "Сначала ответ, потом объяснения", d: "первая честная фраза весит больше абзаца оговорок вокруг неё" },
        { t: "Дайте одной карточке затянуться", d: "четыре карточки с настоящими ответами лучше двадцати с вежливыми" }
      ]
    },
    faq: {
      en: [
        { q: "Do these work for a new relationship?", a: "Most of them do. A few ask about shared history, so if you have only been together a few weeks, skip those and come back to them later." },
        { q: "Is this the same as a compatibility test?", a: "No. Nothing here is scored and there is no result at the end. The point is the conversation, not a verdict about your relationship." },
        { q: "Can we play this over a call?", a: "Yes. Long distance is where these tend to work best, because there is nothing else competing for attention." }
      ],
      ru: [
        { q: "Подойдёт для новых отношений?", a: "Большая часть да. Несколько карточек спрашивают про общее прошлое, поэтому если вы вместе пару недель, отложите их на потом." },
        { q: "Это тест на совместимость?", a: "Нет. Здесь нет баллов и нет результата в конце. Смысл в разговоре, а не в приговоре отношениям." },
        { q: "Можно играть по видеосвязи?", a: "Да, и на расстоянии это работает даже лучше, потому что ничто другое не отвлекает." }
      ]
    },
    cards: {
      en: [
        "Which moment from how we met do you retell to other people most often?",
        "What do I do that you quietly like and have never said out loud?",
        "Which of my habits annoyed you in the first month?",
        "If we swapped phones for a day, what would surprise you most?",
        "Which trip do you remember by details rather than by photos?",
        "What would you bring back from our first few months?",
        "Which of my phrases do you now catch yourself saying?",
        "When exactly did you realise this was serious?",
        "What do perfect couples on the internet get wrong?",
        "Which of our decisions turned out better than we expected?",
        "What have you wanted to ask me and kept postponing?",
        "Which gift from me completely missed?",
        "What would you change about our ordinary evening?",
        "Which of your own traits do you recognise in me?",
        "What goes through your head when I go quiet?",
        "Which argument of ours is embarrassing to remember now?",
        "What do you want that you avoid saying in case it jinxes it?",
        "What do I do when I am upset that you notice before I do?",
        "Which small household thing says more about us than words?",
        "If our future kids watched one day of ours, which day would you pick?"
      ],
      ru: [
        "Какой момент нашего знакомства ты пересказываешь другим чаще всего?",
        "Что я делаю такого, что тебе нравится, но ты никогда не говорил вслух?",
        "Какая моя привычка бесила тебя в первый месяц?",
        "Если бы мы поменялись телефонами на день, что удивило бы тебя больше всего?",
        "Какую поездку ты помнишь деталями, а не фотографиями?",
        "Что бы ты вернул из наших первых месяцев?",
        "Какую мою фразу ты теперь ловишь у себя?",
        "В какой момент ты понял, что это серьёзно?",
        "Что идеальные пары из интернета понимают неправильно?",
        "Какое наше решение оказалось лучше, чем мы ждали?",
        "О чём ты хотел меня спросить и всё откладывал?",
        "Какой мой подарок оказался совсем мимо?",
        "Что ты изменил бы в нашем обычном вечере?",
        "Какую свою черту ты узнаёшь во мне?",
        "Что у тебя в голове, когда я замолкаю?",
        "За какую нашу ссору сейчас неловко?",
        "Чего ты хочешь, но не говоришь, чтобы не спугнуть?",
        "Что я делаю, когда мне плохо, а ты замечаешь это раньше меня?",
        "Какая бытовая мелочь говорит о нас больше слов?",
        "Если бы наши будущие дети посмотрели один наш день, какой бы ты выбрал?"
      ]
    }
  },

  party: {
    slug: { en: 'questions/party', ru: 'ru/voprosy/za-stolom' },
    players: { en: "From four people", ru: "От четырёх человек" },
    h1: { en: "Party game questions", ru: "Вопросы за столом" },
    tagline: {
      en: "Twenty cards for a table that has already run out of news",
      ru: "Двадцать карточек для стола, у которого новости уже кончились"
    },
    intro: {
      en: "Every group has the same twenty minutes: everyone has shared their news, nobody wants to start a topic, and half the table is checking their phone. These cards are for that gap. They ask about the group rather than about the world, so the answers come with names in them and the table argues about who remembers it correctly.",
      ru: "У каждой компании есть одни и те же двадцать минут: новости рассказаны, тему начинать никто не хочет, половина стола сидит в телефоне. Эти карточки для этого провала. Они спрашивают про саму компанию, а не про мир вокруг, поэтому в ответах появляются имена и стол начинает спорить, кто помнит правильно."
    },
    how: {
      en: [
        "Read the card out loud so everyone hears it at once",
        "Whoever has an answer starts, and the rest let them finish",
        "Anyone who disagrees with the version gets one sentence",
        "Then a new card, before the topic turns into a debate"
      ],
      ru: [
        "Читайте карточку вслух, чтобы услышали все сразу",
        "Начинает тот, у кого есть ответ, остальные дают ему договорить",
        "Кто не согласен с версией, получает одну фразу",
        "Потом новая карточка, пока тема не превратилась в спор"
      ]
    },
    advice: {
      en: [
        { t: "Put a minute on the answer", d: "from eight people one story can eat half the evening, and the rest stop trying" },
        { t: "Skip the ones about people who are not there", d: "the table cannot argue with an absent version, and it turns into gossip" },
        { t: "Two cards are enough to start", d: "once the group is talking, put the phone down and let it run" }
      ],
      ru: [
        { t: "Ставьте минуту на ответ", d: "от восьми человек одна история съедает полвечера, и остальные перестают пытаться" },
        { t: "Пропускайте карточки про тех, кого нет за столом", d: "спорить с отсутствующей версией нельзя, и получаются сплетни" },
        { t: "Двух карточек хватит для разгона", d: "как только компания заговорила, убирайте телефон и не мешайте" }
      ]
    },
    faq: {
      en: [
        { q: "How many people does this need?", a: "It works from four. With three it turns into a conversation rather than a game, and above ten you need the timer." },
        { q: "Does it work with people who just met?", a: "Partly. Cards about shared history need a group with some history, so mixed tables should start with the ones about habits and opinions." },
        { q: "Is there anything to set up?", a: "No. Open the page, read cards, that is the whole thing. Eight free cards a day, and the app holds a much larger deck." }
      ],
      ru: [
        { q: "Сколько нужно человек?", a: "Работает от четырёх. На троих это уже разговор, а не игра, а больше десяти нужен таймер." },
        { q: "Подойдёт для тех, кто только познакомился?", a: "Частично. Карточки про общее прошлое требуют этого прошлого, поэтому смешанному столу лучше начать с вопросов про привычки и взгляды." },
        { q: "Нужно что-то настраивать?", a: "Нет. Открыл страницу, читаешь карточки, всё. Восемь карточек в день бесплатно, а в приложении набор гораздо больше." }
      ]
    },
    cards: {
      en: [
        "Who here would give up first if the internet went down for a week?",
        "Which of our stories sounds made up when we tell it to strangers?",
        "What do we do together that we would never do on camera?",
        "Who can be trusted with a password, and who cannot be trusted with the remote?",
        "Which evening do we bring up far more often than it deserves?",
        "Who would actually survive a week in the woods, and who would quit in an hour?",
        "What were we nearly thrown out of, and whose fault was it?",
        "Which habit do all of us have and none of us admit?",
        "Who gets the first call when something goes wrong, and why them?",
        "Which of our traditions do we keep without ever explaining it?",
        "What plan have we been discussing for years without doing?",
        "Who is the worst liar at this table?",
        "Whose purchase still makes the rest of us laugh?",
        "Who gets forgiven for being late, and who never does?",
        "What would be on our group's coat of arms?",
        "Whose advice here actually worked?",
        "Who has changed the most in five years?",
        "Which topic always ends in an argument with us?",
        "What are we still hiding from our parents?",
        "If someone filmed us, who gets cast first and who plays the rest?"
      ],
      ru: [
        "Кто из нас сдастся первым, если интернет отключат на неделю?",
        "Какая наша история звучит выдумкой, когда рассказываешь её незнакомым?",
        "Что мы делаем вместе такого, чего не сделали бы на камеру?",
        "Кому можно доверить пароль, а кому нельзя даже пульт?",
        "Какой вечер мы вспоминаем гораздо чаще, чем он заслужил?",
        "Кто реально выжил бы неделю в лесу, а кто сдался бы через час?",
        "Откуда нас однажды почти выгнали и кто был виноват?",
        "Какая привычка есть у всех нас и никто её не признаёт?",
        "Кому звонят первым, когда что-то случилось, и почему именно ему?",
        "Какую традицию мы держим и никогда не объясняем?",
        "Какой план мы обсуждаем годами и не делаем?",
        "Кто за этим столом врёт хуже всех?",
        "Чья покупка до сих пор смешит остальных?",
        "Кому мы прощаем опоздания, а кому нет?",
        "Что было бы на гербе нашей компании?",
        "Чей совет здесь однажды правда сработал?",
        "Кто изменился сильнее всех за пять лет?",
        "Какая тема у нас всегда заканчивается спором?",
        "Что мы до сих пор скрываем от родителей?",
        "Если бы про нас снимали кино, кого утвердят первым и кто сыграет остальных?"
      ]
    }
  },

  'first-date': {
    slug: { en: 'questions/first-date', ru: 'ru/voprosy/pervoe-svidanie' },
    players: { en: "For two", ru: "Для двоих" },
    h1: { en: "First date questions", ru: "Вопросы на первом свидании" },
    tagline: {
      en: "Twenty cards that get past the interview stage",
      ru: "Двадцать карточек, чтобы уйти от собеседования"
    },
    intro: {
      en: "First dates fail at the same place: work, city, weekend plans, and then a pause nobody knows how to fill. The fix is not being bolder, it is asking about something specific enough to answer. These cards do that. None of them require a confession, and all of them are hard to answer in one word.",
      ru: "Первые свидания ломаются в одном месте: работа, город, планы на выходные, а потом пауза, которую никто не знает чем закрыть. Лечится это не смелостью, а вопросом, на который есть конкретный ответ. Эти карточки такие. Ни одна не требует признаний, и ни на одну нельзя ответить одним словом."
    },
    how: {
      en: [
        "Take turns, one card each, and answer your own card too",
        "Ask one follow-up about a detail from the answer",
        "Skip anything that feels like too much, out loud and without apologising",
        "Stop while it is still going well, that is the whole trick"
      ],
      ru: [
        "По очереди, по одной карточке, и на свою тоже отвечаешь сам",
        "Задай один уточняющий вопрос про деталь из ответа",
        "Пропускай то, что кажется лишним, вслух и без извинений",
        "Заканчивай, пока идёт хорошо, в этом весь фокус"
      ]
    },
    advice: {
      en: [
        { t: "Do not run the list", d: "three cards across an evening is plenty, the rest of the time you are just talking" },
        { t: "Answer first yourself", d: "a question you have already answered stops sounding like an interview" },
        { t: "Follow the detail, not the topic", d: "the interesting part is usually the small thing they mentioned in passing" }
      ],
      ru: [
        { t: "Не гоните список", d: "три карточки за вечер это много, остальное время вы просто разговариваете" },
        { t: "Ответь первым сам", d: "вопрос, на который ты уже ответил, перестаёт звучать как собеседование" },
        { t: "Цепляйся за деталь, а не за тему", d: "интересное обычно в той мелочи, которую упомянули мимоходом" }
      ]
    },
    faq: {
      en: [
        { q: "Is this not too much for a first date?", a: "None of these ask about exes, money or plans together. The heaviest one asks which of your own decisions you consider brave." },
        { q: "What if they refuse to answer?", a: "Then you learned something and you move to the next card. A refusal is not a failed date, it is a boundary, and noticing it early is useful." },
        { q: "Can I use these over text before we meet?", a: "You can, but they are built for a table. In writing the follow-up gets lost, and the follow-up is where the answer actually is." }
      ],
      ru: [
        { q: "Не слишком ли это для первого свидания?", a: "Здесь нет вопросов про бывших, деньги и совместные планы. Самый тяжёлый спрашивает, какое своё решение ты считаешь смелым." },
        { q: "А если человек не хочет отвечать?", a: "Значит вы что-то узнали и переходите к следующей карточке. Отказ это не провал вечера, а граница, и заметить её сразу полезно." },
        { q: "Можно спрашивать это в переписке до встречи?", a: "Можно, но карточки сделаны для стола. В переписке теряется уточняющий вопрос, а именно в нём и оказывается ответ." }
      ]
    },
    cards: {
      en: [
        "What brought you here tonight, besides the app?",
        "Which place in this city do you show people you like?",
        "What are you good at and never mention?",
        "Which of your habits gives you away before you speak?",
        "What can you talk about for an hour with no preparation?",
        "What was your plan for life at sixteen?",
        "What do you choose when you are tired and nobody is watching?",
        "Which of your own decisions do you consider brave?",
        "What puts you off a person quickly?",
        "Which question are you tired of hearing on dates?",
        "Where would you go tomorrow if no visa existed?",
        "What do you remember from childhood in suspicious detail?",
        "What do you cook when you want to impress someone?",
        "What lives in your bag for no reason at all?",
        "Which film do you rewatch and not admit to?",
        "What comes easily to you that others seem to struggle with?",
        "Which of your traits have you finally made peace with?",
        "What tells you an evening went well?",
        "What would you ask me if it did not feel too early?",
        "What would a good second meeting look like?"
      ],
      ru: [
        "Что тебя привело сюда сегодня, кроме приложения?",
        "Какое место в городе ты показываешь тем, кто тебе нравится?",
        "Что ты умеешь хорошо и никогда об этом не говоришь?",
        "Какая твоя привычка выдаёт тебя раньше слов?",
        "О чём ты можешь говорить час без подготовки?",
        "Какой у тебя был план на жизнь в шестнадцать?",
        "Что ты выбираешь, когда устал и никто не смотрит?",
        "Какое своё решение ты считаешь смелым?",
        "Что тебя быстро отталкивает в человеке?",
        "Какой вопрос тебе надоело слышать на свиданиях?",
        "Куда бы ты поехал завтра, если бы виз не существовало?",
        "Что ты помнишь из детства подозрительно подробно?",
        "Что ты готовишь, когда хочешь произвести впечатление?",
        "Что лежит у тебя в сумке без всякой причины?",
        "Какой фильм ты пересматриваешь и не признаёшься?",
        "Что даётся тебе легко, а другим почему-то нет?",
        "С какой своей чертой ты наконец примирился?",
        "По чему ты понимаешь, что вечер прошёл хорошо?",
        "Что бы ты спросил у меня, если бы это не казалось рано?",
        "Как выглядела бы хорошая вторая встреча?"
      ]
    }
  }
};

export const SCENARIO_LABELS = {
  en: { how: "How to play", cards: "The cards", advice: "Advice", faq: "Questions about this set", more: "Other question sets", limit: (n) => `${n} free cards a day, refreshed daily.` },
  ru: { how: "Как играть", cards: "Карточки", advice: "Советы", faq: "Вопросы про этот набор", more: "Другие наборы вопросов", limit: (n) => `Бесплатно ${n} карточек в день, обновляются каждый день.` }
};
