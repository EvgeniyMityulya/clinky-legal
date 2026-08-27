// Страницы под ситуации, а не под механику игры. Спрос сидит на том, с кем играют,
// поэтому у каждой ситуации своя колода, свой текст и свой FAQ. Общего шаблона тут нет
// намеренно: одинаковые страницы поиск склеивает.
export const SCENARIOS = {
  couples: {
    icon: { name: 'heart', weight: 'fill' },
    slug: { en: 'questions/for-couples', ru: 'ru/voprosy/dlya-pary' },
    players: { en: "For two", ru: "Для двоих" },
    h1: { en: "Questions for couples", ru: "Вопросы для пары" },
    tagline: {
      en: "Sixty cards for the two of you, and none of them ask about your favourite colour",
      ru: "Шестьдесят карточек на двоих, и ни одна не спрашивает про любимый цвет"
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
    groups: [
      {
        key: 'warmup',
        title: { en: 'Warm-up', ru: 'Разогрев' },
        note: { en: 'Easy ones about the two of you, no confessions required', ru: 'Простые, про вас двоих, без признаний' },
        en: [
          "Which moment from how we met do you retell to other people most often?",
          "What do I do that you quietly like and have never said out loud?",
          "Which of my habits annoyed you in the first month?",
          "What do we do together that other people do not even know about?",
          "Which trip do you remember by details rather than by photos?",
          "Which of my phrases do you now catch yourself saying?",
          "Which small household thing says more about us than words?",
          "What would you change about our ordinary evening?",
          "Which of our meals has become a tradition without us deciding on it?",
          "What do you always notice first when you come home?",
          "Which of us is actually better at planning, and which one thinks they are?",
          "What is the last thing we argued about that turned out to be nothing?",
          "Which song ended up being ours by accident?",
          "What do I always forget that you have stopped reminding me about?",
          "Which of our photos would you put on the wall?",
          "What do we spend money on that any outsider would find strange?",
          "Which of us wakes up in a better mood, and how obvious is it?",
          "What do you do when you want to make my day easier?",
          "Which place in the city has become ours?",
          "What did we get used to so fast that we forgot it was new?"
        ],
        ru: [
          "Какой момент нашего знакомства ты пересказываешь другим чаще всего?",
          "Что я делаю такого, что тебе нравится, но ты никогда не говорил вслух?",
          "Какая моя привычка бесила тебя в первый месяц?",
          "Что мы делаем вместе такого, о чём другие даже не знают?",
          "Какую поездку ты помнишь деталями, а не фотографиями?",
          "Какую мою фразу ты теперь ловишь у себя?",
          "Какая бытовая мелочь говорит о нас больше слов?",
          "Что ты изменил бы в нашем обычном вечере?",
          "Какая наша еда стала традицией, хотя мы так не решали?",
          "Что ты замечаешь первым, когда приходишь домой?",
          "Кто из нас правда лучше планирует, а кто только думает, что лучше?",
          "О чём мы спорили в последний раз и это оказалось ерундой?",
          "Какая песня стала нашей случайно?",
          "О чём я всегда забываю, а ты уже перестал напоминать?",
          "Какую нашу фотографию ты повесил бы на стену?",
          "На что мы тратим деньги так, что со стороны это выглядит странно?",
          "Кто из нас просыпается в лучшем настроении и насколько это заметно?",
          "Что ты делаешь, когда хочешь облегчить мне день?",
          "Какое место в городе стало нашим?",
          "К чему мы привыкли так быстро, что забыли, что это было новым?"
        ]
      },
      {
        key: 'deeper',
        title: { en: 'Deeper', ru: 'Поглубже' },
        note: { en: 'For an evening where you both have the energy for it', ru: 'Для вечера, когда на это есть силы у обоих' },
        en: [
          "When exactly did you realise this was serious?",
          "What would you bring back from our first few months?",
          "What have you wanted to ask me and kept postponing?",
          "Which of our decisions turned out better than we expected?",
          "What goes through your head when I go quiet?",
          "What do you want that you avoid saying in case it jinxes it?",
          "What do I do when I am upset that you notice before I do?",
          "Which of your own traits do you recognise in me?",
          "What do our friends believe about us that we disagree with?",
          "What is the silliest thing we have ever argued about?",
          "What have you given up for this and never mentioned?",
          "When did you last feel proud of me and not say it?",
          "What do you need from me that is hard to ask for?",
          "Which version of our future do you picture most often?",
          "What have we learned to do differently since the beginning?",
          "What do you protect me from without telling me?",
          "Which of my fears do you take more seriously than I do?",
          "What would you want me to remember about this year?",
          "What do you think we are still bad at?",
          "Which promise between us has never been said out loud?"
        ],
        ru: [
          "В какой момент ты понял, что это серьёзно?",
          "Что бы ты вернул из наших первых месяцев?",
          "О чём ты хотел меня спросить и всё откладывал?",
          "Какое наше решение оказалось лучше, чем мы ждали?",
          "Что у тебя в голове, когда я замолкаю?",
          "Чего ты хочешь, но не говоришь, чтобы не спугнуть?",
          "Что я делаю, когда мне плохо, а ты замечаешь это раньше меня?",
          "Какую свою черту ты узнаёшь во мне?",
          "Что наши друзья думают о нас, а мы с этим не согласны?",
          "Какая самая глупая причина для ссоры у нас была?",
          "От чего ты отказался ради этого и никогда не говорил?",
          "Когда ты последний раз гордился мной и не сказал?",
          "Что тебе нужно от меня, но просить об этом тяжело?",
          "Какой вариант нашего будущего ты представляешь чаще всего?",
          "Что мы научились делать иначе, чем в начале?",
          "От чего ты меня оберегаешь, не говоря мне?",
          "Какой мой страх ты принимаешь серьёзнее, чем я сам?",
          "Что ты хотел бы, чтобы я запомнил про этот год?",
          "В чём, по-твоему, мы до сих пор плохи?",
          "Какое обещание между нами никогда не произносилось вслух?"
        ]
      },
      {
        key: 'funny',
        title: { en: 'Funny', ru: 'Смешные' },
        note: { en: 'When you want the evening light', ru: 'Когда вечер хочется полегче' },
        en: [
          "Which gift or surprise from me did you like the most?",
          "Which of us would survive longer alone in the flat?",
          "What would our reality show be called?",
          "Which of my searches would embarrass me the most if read out?",
          "Who would win if we swapped chores for a month?",
          "What do I do in my sleep that you have never told me about?",
          "Which of us is the reason we own something completely useless?",
          "What would you never let me choose again?",
          "Which of our arguments would look funniest on video?",
          "What is my most predictable reaction?",
          "Who would be a worse tourist guide in our own city?",
          "What food have I ruined so memorably that we still mention it?",
          "Which of us would be first to break under a lie detector?",
          "What would you put on a warning label about me?",
          "Which of us would be more useless in a zombie film?",
          "What is the pettiest thing I keep score of?",
          "Who packs worse, and what proves it?",
          "Which of our habits would confuse a stranger watching us?",
          "What do I always say right before doing something questionable?",
          "Which of us would be more offended by the other's impression of them?"
        ],
        ru: [
          "Какой мой подарок или сюрприз тебе понравился больше всего?",
          "Кто из нас дольше протянул бы один в квартире?",
          "Как называлось бы наше реалити-шоу?",
          "Какой мой поисковый запрос смутил бы меня сильнее всего, если прочитать вслух?",
          "Кто победил бы, если бы мы поменялись обязанностями на месяц?",
          "Что я делаю во сне такого, о чём ты мне не рассказывал?",
          "Из-за кого из нас у нас есть совершенно бесполезная вещь?",
          "Что ты больше никогда не дал бы мне выбирать?",
          "Какая наша ссора смешнее всего выглядела бы на видео?",
          "Какая моя реакция самая предсказуемая?",
          "Кто из нас был бы худшим гидом по нашему же городу?",
          "Какое блюдо я испортил так памятно, что мы до сих пор это вспоминаем?",
          "Кто из нас первым сломался бы на детекторе лжи?",
          "Что ты написал бы на предупреждающей этикетке обо мне?",
          "Кто из нас был бы бесполезнее в фильме про зомби?",
          "Какую мелочь я записываю себе в обиды?",
          "Кто хуже собирает чемодан и что это доказывает?",
          "Какая наша привычка сбила бы с толку незнакомца, который за нами наблюдает?",
          "Что я всегда говорю прямо перед тем, как сделать что-то сомнительное?",
          "Кого из нас сильнее обидела бы пародия на него от второго?"
        ]
      }
    ]
  },

  party: {
    icon: { name: 'users-three', weight: 'fill' },
    slug: { en: 'questions/party', ru: 'ru/voprosy/za-stolom' },
    players: { en: "From four people", ru: "От четырёх человек" },
    h1: { en: "Party game questions", ru: "Вопросы за столом" },
    tagline: {
      en: "Sixty cards for a table that has already run out of news, split by mood",
      ru: "Шестьдесят карточек для стола, у которого новости уже кончились, разбиты по настроению"
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
        { q: "Is there anything to set up?", a: "No. Open the page, read cards, that is the whole thing. All sixty are here for free, and the app holds a much larger deck with new ones each day." }
      ],
      ru: [
        { q: "Сколько нужно человек?", a: "Работает от четырёх. На троих это уже разговор, а не игра, а больше десяти нужен таймер." },
        { q: "Подойдёт для тех, кто только познакомился?", a: "Частично. Карточки про общее прошлое требуют этого прошлого, поэтому смешанному столу лучше начать с вопросов про привычки и взгляды." },
        { q: "Нужно что-то настраивать?", a: "Нет. Открыл страницу, читаешь карточки, всё. Все шестьдесят доступны бесплатно, а в приложении набор гораздо больше и обновляется каждый день." }
      ]
    },
    // Три группы вместо одного списка: по запросам-спискам выигрывает тот,
    // у кого колода длиннее и разбита по настроению.
    groups: [
      {
        key: 'warmup',
        title: { en: 'Warm-up', ru: 'Разогрев' },
        note: { en: 'Safe openers for a table that has just sat down', ru: 'Безопасный вход для стола, который только сел' },
        en: [
          "Who here would give up first if the internet went down for a week?",
          "Who can be trusted with a password, and who cannot be trusted with the remote?",
          "Which of our traditions do we keep without ever explaining it?",
          "What plan have we been discussing for years without doing?",
          "Who gets the first call when something goes wrong, and why them?",
          "Who gets forgiven for being late, and who never does?",
          "Which of us would actually survive a week in the woods?",
          "Who at this table gives the best directions, and who should never navigate?",
          "Which one of us is always cold, and which one opens windows in winter?",
          "Who would you trust to order food for the whole table?",
          "Which of us packs three days before a trip, and who packs at night?",
          "Who here has the worst taste in music and the strongest opinions about it?",
          "Which of us reads the group chat and never answers?",
          "Who would win an argument about something neither of them understands?",
          "Which of us is the reason we are always late somewhere?",
          "Who takes the most photos and never sends any of them?",
          "Which one of us plans the evening, and who just shows up?",
          "Who at this table can fall asleep anywhere?",
          "Which of us would notice first if someone changed the furniture?",
          "Who would survive one day with the others' morning routine?"
        ],
        ru: [
          "Кто из нас сдастся первым, если интернет отключат на неделю?",
          "Кому можно доверить пароль, а кому нельзя даже пульт?",
          "Какую традицию мы держим и никогда не объясняем?",
          "Какой план мы обсуждаем годами и не делаем?",
          "Кому звонят первым, когда что-то случилось, и почему именно ему?",
          "Кому мы прощаем опоздания, а кому нет?",
          "Кто из нас реально выжил бы неделю в лесу?",
          "Кто за этим столом объясняет дорогу лучше всех, а кому нельзя доверить навигатор?",
          "Кому из нас всегда холодно, а кто открывает окна зимой?",
          "Кому мы доверили бы заказать еду на всех?",
          "Кто собирает чемодан за три дня, а кто ночью перед выездом?",
          "У кого здесь худший музыкальный вкус и самые твёрдые убеждения на этот счёт?",
          "Кто из нас читает общий чат и не отвечает?",
          "Кто победит в споре о том, чего оба не понимают?",
          "Из-за кого из нас мы вечно куда-то опаздываем?",
          "Кто делает больше всех фотографий и ни одной не отправляет?",
          "Кто из нас планирует вечер, а кто просто приходит?",
          "Кто за этим столом засыпает в любом месте?",
          "Кто первым заметит, если переставить мебель?",
          "Кто продержался бы один день с утренними привычками остальных?"
        ]
      },
      {
        key: 'deeper',
        title: { en: 'Deeper', ru: 'Поглубже' },
        note: { en: 'For a table that already knows each other well', ru: 'Для стола, где все давно знакомы' },
        en: [
          "Which evening do we bring up far more often than it deserves?",
          "Which habit do all of us have and none of us admit?",
          "Who has changed the most in five years?",
          "Which topic always ends in an argument with us?",
          "What are we still hiding from our parents?",
          "Whose advice here actually worked?",
          "What do we forgive each other for without ever saying it out loud?",
          "Which of us has the hardest time asking for help?",
          "What did we all believe five years ago and quietly dropped?",
          "Who here has changed our minds about something important?",
          "What do we avoid talking about at this table?",
          "Which of us worries the most about the others?",
          "What would each of us do with a year off?",
          "Who has held on to a dream the rest of us stopped taking seriously?",
          "Which of us is hardest on themselves?",
          "What has this group talked someone out of, and was that right?",
          "Who noticed first when someone here was going through something?",
          "What do we keep doing together purely out of habit?",
          "Which of us finds it hardest to say no?",
          "What would we miss about each other if we all moved away?"
        ],
        ru: [
          "Какой вечер мы вспоминаем гораздо чаще, чем он заслужил?",
          "Какая привычка есть у всех нас и никто её не признаёт?",
          "Кто изменился сильнее всех за пять лет?",
          "Какая тема у нас всегда заканчивается спором?",
          "Что мы до сих пор скрываем от родителей?",
          "Чей совет здесь однажды правда сработал?",
          "Что мы прощаем друг другу, но никогда не говорим вслух?",
          "Кому из нас тяжелее всех просить о помощи?",
          "Во что мы все верили пять лет назад и тихо перестали?",
          "Кто здесь однажды изменил наше мнение о чём-то важном?",
          "О чём мы избегаем говорить за этим столом?",
          "Кто из нас волнуется за остальных больше всех?",
          "Что каждый из нас сделал бы с годом свободного времени?",
          "Кто держится за мечту, которую остальные перестали принимать серьёзно?",
          "Кто из нас строже всех к себе?",
          "От чего эта компания однажды кого-то отговорила и правильно ли?",
          "Кто первым заметил, что кому-то здесь тяжело?",
          "Что мы продолжаем делать вместе просто по привычке?",
          "Кому из нас сложнее всех сказать нет?",
          "По чему мы скучали бы друг по другу, если бы все разъехались?"
        ]
      },
      {
        key: 'funny',
        title: { en: 'Funny', ru: 'Смешные' },
        note: { en: 'When the table needs noise rather than confessions', ru: 'Когда столу нужен шум, а не признания' },
        en: [
          "Which of our stories sounds made up when we tell it to strangers?",
          "What do we do together that we would never do on camera?",
          "What were we nearly thrown out of?",
          "Whose purchase still makes the rest of us laugh?",
          "If our group had an emblem, what would be on it?",
          "Which famous person do all of us actually like?",
          "Who would play each of us in a film, and who would be offended?",
          "What is the worst decision this table has ever made together?",
          "Which of us would be voted out first on a reality show?",
          "What nickname did someone here never manage to shake off?",
          "Who would be the first suspect if something went missing?",
          "Which of us gives the worst gifts, and what proves it?",
          "What would our group be famous for on the internet?",
          "Who tells the same story more than twice a year?",
          "Which of us would panic first in a horror film?",
          "What would happen if we all ran a restaurant together?",
          "Who here would be the most dramatic patient?",
          "Which of us would be worst at keeping a surprise party secret?",
          "What is the most useless skill someone at this table is proud of?",
          "Who would be the last to notice a stranger sitting with us?"
        ],
        ru: [
          "Какая наша история звучит выдумкой, когда рассказываешь её незнакомым?",
          "Что мы делаем вместе такого, чего не сделали бы на камеру?",
          "Откуда нас однажды почти выгнали?",
          "Чья покупка до сих пор смешит остальных?",
          "Если бы у нашей компании была эмблема, как бы она выглядела?",
          "Кто из известных людей нравится всем нам?",
          "Кто сыграл бы каждого из нас в кино и кто бы обиделся?",
          "Какое худшее решение этот стол принял сообща?",
          "Кого из нас выгнали бы первым из реалити-шоу?",
          "Какое прозвище кто-то здесь так и не смог с себя стряхнуть?",
          "Кто был бы первым подозреваемым, если бы что-то пропало?",
          "Кто из нас дарит худшие подарки и что это доказывает?",
          "Чем наша компания прославилась бы в интернете?",
          "Кто рассказывает одну и ту же историю чаще двух раз в год?",
          "Кто из нас первым запаникует в ужастике?",
          "Что было бы, если бы мы все вместе открыли ресторан?",
          "Кто здесь был бы самым драматичным пациентом?",
          "Кому из нас хуже всех далось бы сохранить сюрприз в тайне?",
          "Каким самым бесполезным умением гордится кто-то за этим столом?",
          "Кто последним заметит, что с нами сидит незнакомый человек?"
        ]
      }
    ]
  },

  drinks: {
    icon: { name: 'coffee', weight: 'fill' },
    slug: { en: 'questions/drinks', ru: 'ru/voprosy/za-bokalom' },
    players: { en: 'From two people', ru: 'От двух человек' },
    h1: { en: 'Questions to ask over drinks', ru: 'Вопросы за бокалом' },
    tagline: {
      en: 'Sixty cards for a long table and a slow evening',
      ru: 'Шестьдесят карточек для долгого стола и неспешного вечера'
    },
    intro: {
      en: 'An evening with drinks has its own pace. Nobody is going anywhere, the phones are face down, and conversation stops being an exchange of news. These cards fit that pace: none of them can be answered in a word, and none of them ask anyone to drink for a wrong answer. There are no forfeits here, only questions that hold a table for an hour.',
      ru: 'У вечера с напитками свой темп. Никто никуда не спешит, телефоны лежат экраном вниз, и разговор перестаёт быть обменом новостями. Эти карточки под такой темп. Ни на одну нельзя ответить одним словом, и ни одна не заставляет пить за неправильный ответ. Штрафов здесь нет, есть вопросы, которые держат стол час.'
    },
    how: {
      en: [
        'Read a card out loud and answer it yourself first',
        'Everyone else answers in turn, without skipping',
        'One follow-up per answer, then the next card',
        'Anyone can pass on a card, out loud and without explaining'
      ],
      ru: [
        'Читай карточку вслух и первым отвечай сам',
        'Остальные отвечают по очереди, никого не пропуская',
        'Один уточняющий вопрос на ответ, дальше новая карточка',
        'Любой может пропустить карточку, вслух и без объяснений'
      ]
    },
    advice: {
      en: [
        { t: 'Slow is the point', d: 'a card every ten minutes beats ten cards in a row, the evening is long' },
        { t: 'Nobody drinks on a wrong answer', d: 'the moment answers get punished, people start answering safely, and the game dies' },
        { t: 'Water on the table', d: 'a long evening works better when it is not only one kind of glass' }
      ],
      ru: [
        { t: 'Медленно и есть смысл', d: 'одна карточка в десять минут лучше десяти подряд, вечер длинный' },
        { t: 'Никто не пьёт за неправильный ответ', d: 'как только за ответы наказывают, все начинают отвечать безопасно, и игра умирает' },
        { t: 'Вода на столе', d: 'долгий вечер идёт лучше, когда на столе не только один вид бокалов' }
      ]
    },
    faq: {
      en: [
        { q: 'Is this a drinking game?', a: 'No. There are no rules about drinking, no forfeits and no penalties. It is a set of questions for an evening where drinks happen to be on the table.' },
        { q: 'Does it work without alcohol?', a: 'Completely. Nothing in the set depends on what is in the glass, and the app itself logs any drink, tea and coffee included.' },
        { q: 'How many people does it need?', a: 'Two is enough, and it holds up to about eight. Above that put a minute on each answer, or one story will eat the evening.' }
      ],
      ru: [
        { q: 'Это игра на выпивание?', a: 'Нет. Здесь нет правил про алкоголь, нет штрафов и наказаний. Это набор вопросов для вечера, где напитки просто стоят на столе.' },
        { q: 'Работает без алкоголя?', a: 'Полностью. Ничего в наборе не зависит от того, что в бокале, а само приложение считает любые напитки, включая чай и кофе.' },
        { q: 'Сколько нужно человек?', a: 'Двоих достаточно, и держится примерно до восьми. Больше — ставьте минуту на ответ, иначе одна история съест вечер.' }
      ]
    },
    groups: [
      {
        key: 'warmup',
        title: { en: 'First glass', ru: 'Первый бокал' },
        note: { en: 'While everyone is still settling in', ru: 'Пока все только рассаживаются' },
        en: [
          'What was the last thing that made you laugh out loud alone?',
          'Which evening this year turned out better than planned?',
          'What do you always order first, and why that?',
          'Which place would you take everyone at this table to?',
          'What did you almost cancel today and came anyway?',
          'Which day this month would you happily repeat?',
          'What do you do on the way home when the evening was good?',
          'Which of your habits appears only at a table like this?',
          'What is the best thing you ate this week?',
          'Which conversation are you still thinking about?',
          'What did you learn recently that surprised you?',
          'Which of your plans this year actually happened?',
          'What sound reminds you of a good evening?',
          'Where did you last go for the first time?',
          'What do you always say yes to?',
          'Which season do your best memories belong to?',
          'What do you carry with you everywhere without needing it?',
          'Which small thing improved your week?',
          'What did you postpone so long it became funny?',
          'Which of us here can you always call late?'
        ],
        ru: [
          'Что последним рассмешило тебя, когда ты был один?',
          'Какой вечер в этом году вышел лучше, чем планировался?',
          'Что ты всегда заказываешь первым и почему именно это?',
          'Куда ты сводил бы всех, кто сидит за этим столом?',
          'Что ты сегодня почти отменил и всё-таки пришёл?',
          'Какой день этого месяца ты охотно повторил бы?',
          'Что ты делаешь по дороге домой, когда вечер был хороший?',
          'Какая твоя привычка появляется только за таким столом?',
          'Что самое вкусное ты ел на этой неделе?',
          'О каком разговоре ты до сих пор думаешь?',
          'Что ты недавно узнал и удивился?',
          'Какой твой план в этом году правда случился?',
          'Какой звук напоминает тебе хороший вечер?',
          'Куда ты последний раз попал впервые?',
          'На что ты всегда соглашаешься?',
          'К какому времени года относятся твои лучшие воспоминания?',
          'Что ты носишь с собой везде, хотя оно не нужно?',
          'Какая мелочь улучшила твою неделю?',
          'Что ты откладывал так долго, что стало смешно?',
          'Кому из нас здесь ты всегда можешь позвонить поздно?'
        ]
      },
      {
        key: 'deeper',
        title: { en: 'Later in the evening', ru: 'Ближе к ночи' },
        note: { en: 'When the table has settled and nobody is rushing', ru: 'Когда стол успокоился и никто не спешит' },
        en: [
          'What do you think about on the way home?',
          'Which choice of yours would you defend to anyone?',
          'What has changed about what you want from a year?',
          'Which friendship here surprised you by lasting?',
          'What do you know now that you would tell yourself at twenty?',
          'What are you quietly proud of?',
          'Which conversation changed something for you?',
          'What do you avoid thinking about when the day is busy?',
          'Which of your plans are you no longer sure you want?',
          'What did you stop apologising for?',
          'Who at this table knows a version of you nobody else does?',
          'What have you been putting off out of fear rather than time?',
          'Which loss taught you something you use now?',
          'What would make next year better without changing anything big?',
          'What do you need more of and rarely ask for?',
          'Which part of yourself did you inherit and only noticed later?',
          'What do you forgive easily, and what never?',
          'Which door would you knock on if there were no consequences?',
          'What kind of old person do you want to be?',
          'What would you like this table to remember about tonight?'
        ],
        ru: [
          'О чём ты думаешь по дороге домой?',
          'Какой свой выбор ты защищал бы перед любым?',
          'Что изменилось в том, чего ты ждёшь от года?',
          'Какая дружба здесь удивила тебя тем, что продержалась?',
          'Что ты знаешь сейчас и сказал бы себе в двадцать?',
          'Чем ты тихо гордишься?',
          'Какой разговор что-то в тебе изменил?',
          'О чём ты не думаешь, когда день загружен?',
          'В каких своих планах ты уже не уверен, что хочешь их?',
          'За что ты перестал извиняться?',
          'Кто за этим столом знает твою версию, которую не знает никто?',
          'Что ты откладываешь из страха, а не из-за времени?',
          'Какая потеря научила тебя тому, чем ты пользуешься сейчас?',
          'Что сделало бы следующий год лучше без больших перемен?',
          'Чего тебе нужно больше, а просишь ты редко?',
          'Какую свою часть ты унаследовал и заметил это только потом?',
          'Что ты прощаешь легко, а что никогда?',
          'В какую дверь ты постучал бы, если бы не было последствий?',
          'Каким стариком ты хочешь быть?',
          'Что ты хотел бы, чтобы этот стол запомнил про сегодня?'
        ]
      },
      {
        key: 'funny',
        title: { en: 'Loud ones', ru: 'Шумные' },
        note: { en: 'When the table needs noise, not confessions', ru: 'Когда столу нужен шум, а не признания' },
        en: [
          'What is the worst toast you have ever heard?',
          'Which of us would lose a bet the fastest?',
          'What is your most questionable talent?',
          'Which story about you gets exaggerated every time it is told?',
          'What would you be arrested for in a comedy?',
          'Which of us should never be given the aux cable?',
          'What is the strangest thing you have won?',
          'Which food combination do you defend against everyone?',
          'What is the worst advice you ever followed?',
          'Which of us would fold first in a staring contest?',
          'What did you break and blame on someone else?',
          'Which household object have you fought with?',
          'What would your worst business idea be?',
          'Which of us would be the first out of a group project?',
          'What do you do that would look mad on camera?',
          'Which of your plans failed most spectacularly?',
          'What is the most unnecessary thing you argued about online?',
          'Which of us tells the longest stories, and how long is long?',
          'What is your most useless piece of general knowledge?',
          'Which of us would panic first if the lights went out here?'
        ],
        ru: [
          'Какой худший тост ты слышал?',
          'Кто из нас проиграл бы спор быстрее всех?',
          'Какой у тебя самый сомнительный талант?',
          'Какая история про тебя обрастает деталями каждый раз?',
          'За что тебя задержали бы в комедии?',
          'Кому из нас нельзя давать провод от музыки?',
          'Что самое странное ты выигрывал?',
          'Какое сочетание еды ты защищаешь от всех?',
          'Какой худший совет ты выполнил?',
          'Кто из нас первым сдался бы в игре в переглядки?',
          'Что ты разбил и свалил на другого?',
          'С каким бытовым предметом ты воевал?',
          'Какая была бы твоя худшая бизнес-идея?',
          'Кого из нас первым выгнали бы из групповой работы?',
          'Что ты делаешь такого, что на камере выглядело бы дико?',
          'Какой твой план провалился эффектнее всех?',
          'О чём самом ненужном ты спорил в интернете?',
          'Кто из нас рассказывает самые длинные истории и насколько длинные?',
          'Какой твой самый бесполезный общий факт?',
          'Кто из нас первым запаникует, если здесь выключат свет?'
        ]
      }
    ]
  },

  'first-date': {
    icon: { name: 'hand-heart', weight: 'fill' },
    slug: { en: 'questions/first-date', ru: 'ru/voprosy/pervoe-svidanie' },
    players: { en: "For two", ru: "Для двоих" },
    h1: { en: "First date questions", ru: "Вопросы на первом свидании" },
    tagline: {
      en: "Sixty cards that get past the interview stage",
      ru: "Шестьдесят карточек, чтобы уйти от собеседования"
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
    groups: [
      {
        key: 'warmup',
        title: { en: 'Warm-up', ru: 'Разогрев' },
        note: { en: 'The first twenty minutes, before anything heavier', ru: 'Первые двадцать минут, до чего-то серьёзнее' },
        en: [
          "What is the best thing that happened to you this week?",
          "Which place in this city never gets old for you?",
          "What are you good at and never mention?",
          "What can you talk about for an hour with no preparation?",
          "What do you cook best?",
          "What lives in your bag for no reason at all?",
          "Which film do you rewatch the most?",
          "What did you spend far too much time on last month?",
          "Which everyday thing do you enjoy more than you should?",
          "What is the last thing you looked up out of pure curiosity?",
          "Where do you go when you need twenty minutes to yourself?",
          "What do you order when you cannot decide?",
          "Which season suits you best, and why that one?",
          "What is the most useless thing you know a lot about?",
          "Which app do you open without meaning to?",
          "What did you plan for this week and quietly skip?",
          "Which sound do you find weirdly satisfying?",
          "What do you always keep in the fridge?",
          "Which city would you live in for a month, just to try?",
          "What is your idea of a well spent Sunday?"
        ],
        ru: [
          "Что хорошее случилось с тобой на этой неделе?",
          "Какое место в городе тебе никогда не надоедает?",
          "Что ты умеешь хорошо и никогда об этом не говоришь?",
          "О чём ты можешь говорить час без подготовки?",
          "Что ты умеешь готовить лучше всего?",
          "Что лежит у тебя в сумке без всякой причины?",
          "Какой фильм ты пересматриваешь чаще всего?",
          "На что ты потратил слишком много времени в прошлом месяце?",
          "Какая обычная вещь радует тебя сильнее, чем должна?",
          "Что ты последним искал в интернете просто из любопытства?",
          "Куда ты уходишь, когда нужно двадцать минут в одиночестве?",
          "Что ты заказываешь, когда не можешь выбрать?",
          "Какое время года тебе идёт и почему именно оно?",
          "О чём совершенно бесполезном ты знаешь много?",
          "Какое приложение ты открываешь не задумываясь?",
          "Что ты планировал на эту неделю и тихо пропустил?",
          "Какой звук кажется тебе странно приятным?",
          "Что у тебя всегда есть в холодильнике?",
          "В каком городе ты пожил бы месяц просто попробовать?",
          "Как для тебя выглядит хорошо проведённое воскресенье?"
        ]
      },
      {
        key: 'deeper',
        title: { en: 'Deeper', ru: 'Поглубже' },
        note: { en: 'Still safe, but they need a real answer', ru: 'Всё ещё безопасные, но требуют настоящего ответа' },
        en: [
          "What was your plan for life at sixteen?",
          "Which of your own decisions do you consider brave?",
          "What do people rarely ask you about, though you would happily talk about it?",
          "What is your favourite memory from childhood?",
          "What comes easily to you that others seem to struggle with?",
          "Which of your traits have you finally made peace with?",
          "What tells you an evening went well?",
          "What would you like to know about me?",
          "What are you working on that has nothing to do with money?",
          "Which advice did you ignore and later wish you had not?",
          "What changed your mind in the last few years?",
          "What do you want more of in the next year?",
          "Which risk turned out to be worth it?",
          "What do you find hard to say out loud, in general?",
          "Who taught you something you still use daily?",
          "What do you want people to notice about you first?",
          "Which habit are you actually proud of?",
          "What did you get wrong about adult life?",
          "What are you curious about right now?",
          "What would a good year look like for you?"
        ],
        ru: [
          "Какой у тебя был план на жизнь в шестнадцать?",
          "Какое своё решение ты считаешь смелым?",
          "О чём тебя редко спрашивают, а ты бы охотно рассказал?",
          "Какое воспоминание из детства ты любишь больше всего?",
          "Что даётся тебе легко, а другим почему-то нет?",
          "С какой своей чертой ты наконец примирился?",
          "По чему ты понимаешь, что вечер прошёл хорошо?",
          "Что тебе интересно узнать обо мне?",
          "Чем ты занимаешься такого, что не связано с деньгами?",
          "Какой совет ты не послушал и потом жалел?",
          "Что изменило твоё мнение за последние годы?",
          "Чего ты хочешь больше в следующем году?",
          "Какой риск оказался оправданным?",
          "Что тебе вообще тяжело говорить вслух?",
          "Кто научил тебя тому, чем ты пользуешься каждый день?",
          "Что ты хочешь, чтобы в тебе замечали первым?",
          "Какой своей привычкой ты правда гордишься?",
          "В чём ты ошибался насчёт взрослой жизни?",
          "Что тебе любопытно прямо сейчас?",
          "Как для тебя выглядел бы хороший год?"
        ]
      },
      {
        key: 'funny',
        title: { en: 'Funny', ru: 'Смешные' },
        note: { en: 'To break a pause without making it heavier', ru: 'Чтобы разбить паузу и не утяжелить вечер' },
        en: [
          "Which of your habits gives you away before you speak?",
          "What do you remember from childhood in suspicious detail?",
          "Where would you go tomorrow if no visa existed?",
          "What would a good second meeting look like?",
          "What is the worst haircut you have ever had?",
          "Which trend did you follow and now deny?",
          "What is the most ridiculous thing you own?",
          "Which fictional character would find you insufferable?",
          "What would your autobiography be called?",
          "What is the pettiest reason you have judged someone?",
          "Which skill do you fake convincingly?",
          "What would you be terrible at professionally?",
          "Which compliment do you never know how to take?",
          "What is the most useless purchase you defend?",
          "Which small thing annoys you far more than it should?",
          "What would people be surprised to learn you enjoy?",
          "Which lie do you tell to get out of plans?",
          "What is your most irrational fear?",
          "Which animal would you be, according to your friends?",
          "What would you take on stage if you had to perform tonight?"
        ],
        ru: [
          "Какая твоя привычка выдаёт тебя раньше слов?",
          "Что ты помнишь из детства подозрительно подробно?",
          "Куда бы ты поехал завтра, если бы виз не существовало?",
          "Как выглядела бы хорошая вторая встреча?",
          "Какая была твоя худшая стрижка?",
          "За каким трендом ты следовал, а теперь отрицаешь?",
          "Какая самая нелепая вещь есть у тебя дома?",
          "Какому вымышленному персонажу ты был бы невыносим?",
          "Как называлась бы твоя автобиография?",
          "По какой мелочи ты однажды осудил человека?",
          "Какое умение ты убедительно подделываешь?",
          "В какой профессии ты был бы ужасен?",
          "Какой комплимент ты никогда не знаешь как принять?",
          "Какую бесполезную покупку ты защищаешь?",
          "Какая мелочь раздражает тебя гораздо сильнее, чем должна?",
          "Что удивило бы людей, если узнать, что тебе это нравится?",
          "Каким предлогом ты отменяешь планы?",
          "Какой у тебя самый нерациональный страх?",
          "Каким животным ты был бы по мнению друзей?",
          "С чем ты вышел бы на сцену, если бы пришлось выступать сегодня?"
        ]
      }
    ]
  }
};

export const SCENARIO_LABELS = {
  en: { how: "How to play", cards: "The cards", advice: "Advice", faq: "Questions about this set", more: "Other question sets", limit: (n) => `${n} free cards a day, refreshed daily.` },
  ru: { how: "Как играть", cards: "Карточки", advice: "Советы", faq: "Вопросы про этот набор", more: "Другие наборы вопросов", limit: (n) => `Бесплатно ${n} карточек в день, обновляются каждый день.` }
};
