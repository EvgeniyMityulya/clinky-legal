// Clinky legal content (verbatim from the official clinky-legal repo, plain-text).
// Block tuples: ['p', text] paragraph · ['h3', text] subhead · ['ul', [items]] bullet list
// Exposed as window globals so the static site can render Privacy / Terms in-app.
(function () {
  const P = (t) => ['p', t];
  const H3 = (t) => ['h3', t];
  const UL = (items) => ['ul', items];

  window.PRIVACY = {
    en: [
      { h: '1. Who we are', b: [
        P('Clinky ("the app", "we", "us") is an iOS application developed by an individual developer based in Belarus. Clinky is a social meeting and drink tracker: it helps you remember the people you meet, the moments you share, and gives you icebreaker cards for in-person get-togethers.'),
        P('If you have any question about this policy or your data, contact us at support@clinkyapp.com.')
      ]},
      { h: '2. The short version', b: [
        UL([
          'Clinky has no user accounts and no login. You don’t create a profile with us.',
          'Clinky has no first-party server. Your friends, meetings, drinks, streaks, achievements, plans and answered icebreaker cards are stored only on your device (in a local database), not on any server we control.',
          'Three third-party services receive limited data off your device: Adapty (subscriptions), TelemetryDeck (anonymous product analytics) and Sentry (crash reports). What each receives is described below.',
          'We do not track you across other apps or websites, we use no advertising identifier (IDFA), and we do not sell or share your personal information for advertising.'
        ])
      ]},
      { h: '3. Data that stays only on your device', b: [
        P('The core content you create in Clinky never leaves your device through us. It is stored in a local database inside the app’s private container on your iPhone. This includes:'),
        UL([
          'Your friends ("Clinkers"), including names and, for friends you import from Contacts, the contact’s stable identifier (see Section 6).',
          'Your meetings, drinks logged, the place name (a text label you type, never a GPS coordinate) you optionally attach to a meeting, streaks, achievements, planned meetings, and which icebreaker cards you’ve answered.'
        ]),
        P('We have no copy of this data, no ability to read it remotely, and no way to recover it for you. If you delete the app, this data is removed from your device.')
      ]},
      { h: '4. Data processed by third-party services (off-device)', b: [
        P('To run subscriptions, understand how the app is used, and fix crashes, the app sends limited data to three processors. We instruct them to process data only on our behalf.'),
        H3('4.1 Adapty — subscriptions and paywall'),
        P('When you view the Clinky Pro paywall, purchase, or restore a subscription, the Adapty SDK communicates with Adapty’s servers. Adapty processes, by its design: an anonymous Adapty profile identifier, App Store transaction / receipt data, your subscription state, and standard device, locale and storefront information. The Adapty SDK can also access device identifiers such as the IDFV (vendor identifier) and your IP address.'),
        UL([
          'We do not set a customerUserId and do not send your name, email or phone to Adapty — your Adapty profile is anonymous.',
          'The IDFV is a per-vendor device identifier; it is not an advertising identifier and is not used to track you across apps. We do not enable any advertising-attribution integration.',
          'Purpose: check your Pro entitlement, show and A/B-test the paywall, process purchases and restores.',
          'Adapty privacy policy: https://adapty.io/privacy/'
        ]),
        H3('4.2 TelemetryDeck — privacy-first product analytics'),
        P('TelemetryDeck receives aggregate, anonymous usage events (for example: app opened, meeting created, paywall shown), with parameters limited to bucketed counts, types and flags. The app does not send your typed text, friend names, contact identifiers, or any raw IDs in these events. The TelemetryDeck SDK additionally generates its own anonymized, salted-and-hashed identifier (not reversible, not shared across apps) plus device/OS/app-version metadata. TelemetryDeck does not store IP addresses. By the vendor’s own assessment, the data it handles falls outside GDPR/CCPA scope; we nonetheless disclose it here for transparency.'),
        UL([
          'Purpose: understand feature usage so we can improve the app.',
          'Where: TelemetryDeck servers (EU).',
          'TelemetryDeck privacy policy: https://telemetrydeck.com/privacy/'
        ]),
        H3('4.3 Sentry — crash reporting'),
        P('Sentry receives crash and error reports: stack traces, breadcrumbs (such as navigation and lifecycle events), and device / OS / app-version metadata, plus a per-install random identifier. We have configured Sentry to not send personal information by default (sendDefaultPii = false) and to strip user data from events. We do not attach your identity to crash reports.'),
        UL([
          'Purpose: diagnose and fix crashes and stability problems.',
          'Where: Sentry servers (EU).',
          'Sentry privacy policy: https://sentry.io/privacy/'
        ]),
        H3('4.4 Apple'),
        P('Purchases are handled by Apple via the App Store / StoreKit, and are governed by Apple’s privacy policy. Planned meetings you choose to save go into your own Apple Calendar (see Section 6).')
      ]},
      { h: '5. Tracking and advertising', b: [
        P('Clinky does not track you in the App Store sense: there is no IDFA / advertising identifier, no AppTrackingTransparency prompt, no ad networks, and no data brokers. Adapty processes the IDFV (vendor identifier) as disclosed in Section 4.1 — this is a per-vendor device identifier, not an advertising identifier and not a cross-app tracking signal. None of the services above are configured to track you across other apps or websites. We do not sell or share your personal information.')
      ]},
      { h: '6. Permissions the app may request', b: [
        P('Each permission is optional and is used only for the purpose described. iOS will ask before any permission is granted, and you can change or revoke each one at any time in iOS Settings → Clinky.'),
        UL([
          'Contacts (read): Used so you can quickly add friends. The app reads contact name, phone numbers and photo to show you the picker, but only the name (in a shortened "First L." form) and the contact’s identifier are saved into your local friends list. Phone numbers and photos are not stored and never sent off your device. Contacts are never sent to any third party.',
          'Calendar (write-only): Used to add your planned meetings to your own Apple Calendar. The app can only write events (title, notes, time) — it cannot read your calendar. These events live in your Apple Calendar, not on any Clinky server.',
          'Notifications (local only): Used for plan reminders, gentle streak reminders, and live-session reminders. These are scheduled locally on your device. Clinky uses no remote push and registers no push token.'
        ])
      ]},
      { h: '7. Children', b: [
        P('Clinky is rated 17+ in the App Store because it contains references to alcohol — this is a content rating, not a data-processing age. Separately, we do not knowingly process personal data of anyone below the applicable digital-consent age in their country (which is 13 to 16 depending on the jurisdiction, 16 by GDPR default). The app is not directed to children. If you believe a child has used the app, contact us at support@clinkyapp.com and we will help with deletion where applicable. Note that most of the app’s data is on-device only and under your control.')
      ]},
      { h: '8. Legal bases for processing (GDPR)', b: [
        P('If you are in the European Economic Area or UK, we rely on:'),
        UL([
          'Performance of a contract (Art. 6(1)(b)) — to process and restore your Clinky Pro subscription (Adapty / Apple).',
          'Legitimate interests (Art. 6(1)(f)) — to diagnose crashes and keep the app stable (Sentry), balanced against your privacy.',
          'Consent (Art. 6(1)(a)) — for non-essential product analytics (TelemetryDeck). Where the app presents an analytics consent choice, we process analytics only on that basis, and you can withdraw consent at any time (see Section 11). Where you have not consented, non-essential analytics are not collected.'
        ])
      ]},
      { h: '9. Your rights', b: [
        P('If you are in the EEA / UK (GDPR): you have the right to access, rectify, erase, restrict, port, and object to processing, to withdraw consent, and to lodge a complaint with your local data protection authority.'),
        P('If you are in California (CCPA/CPRA): you have the right to know what we collect, to delete and correct it, to opt out of "sale" or "sharing" (we do neither), to limit use of sensitive personal information, and to not be discriminated against for exercising these rights.'),
        P('Important limitation (GDPR Art. 11). Because Clinky has no accounts and your core data is stored only on your device, and because the data shared with our processors is anonymized or pseudonymized (anonymous Adapty profile, hashed TelemetryDeck ID, scrubbed Sentry events), we generally cannot identify a specific individual’s records within that processor data. Where we cannot identify you from the data we hold, we may be unable to act on an access, correction or deletion request for that processor data, and we may ask you for additional information to enable identification, or decline where identification remains impossible. The primary and most effective way to delete your data is on-device: delete a friend, a meeting, or the entire app at any time. For matters within our control, contact us at support@clinkyapp.com. We do not sell or share your personal information.')
      ]},
      { h: '10. Data retention', b: [
        UL([
          'On-device data is kept until you delete it or uninstall the app. We never receive it.',
          'Analytics and crash data are retained only as long as needed for the stated purposes, according to each processor’s default retention settings.',
          'Subscription data is retained by Adapty/Apple for as long as needed to manage your entitlement and as required by their own policies and applicable law.'
        ])
      ]},
      { h: '11. Withdrawing consent / opting out', b: [
        P('You can stop most off-device data sharing by revoking permissions in iOS Settings, by turning off analytics consent in the app (where offered), or by uninstalling the app. To make a request regarding data held by our processors, email support@clinkyapp.com, noting the identification limitation described in Section 9.')
      ]},
      { h: '12. International data transfers and EU representation', b: [
        P('The developer (the data controller) is based in Belarus, which is outside the EEA and is not covered by an EU adequacy decision. This means that personal data of EEA users is processed by a controller located in a third country without adequacy. We address this through the data-minimization described in this policy (no accounts, on-device-only core data, anonymized/pseudonymized processor data) and, where required, appropriate safeguards.'),
        P('Our processors operate servers in the EU and/or the United States. Where data is transferred outside the EEA/UK to a processor, we rely on appropriate safeguards such as the EU–US Data Privacy Framework (where the processor is certified) and Standard Contractual Clauses (SCCs).'),
        P('EU representative (GDPR Art. 27). Clinky is operated by an individual developer and processes only minimal, anonymized or pseudonymized data through the processors described above. We have not appointed a representative in the Union under Article 27; if that changes, we will name our representative here. You can contact us directly about any data matter at support@clinkyapp.com.')
      ]},
      { h: '13. Security', b: [
        P('Your core data stays on your device, protected by iOS. Data sent to our processors is transmitted over encrypted (HTTPS) connections. No method of transmission or storage is 100% secure, but we keep the data we share to a minimum.')
      ]},
      { h: '14. Changes to this policy', b: [
        P('We may update this policy from time to time. We will change the "Last updated" date above and, for significant changes, provide a notice in the app or on the policy page. Continued use after an update means you accept the revised policy.')
      ]},
      { h: '15. Contact', b: [
        P('Questions or requests: support@clinkyapp.com')
      ]}
    ],
    ru: [
      { h: '1. Кто мы', b: [
        P('Clinky («приложение», «мы») — это приложение для iOS, разработанное частным разработчиком, находящимся в Беларуси. Clinky — это социальный трекер встреч и напитков: он помогает помнить людей, с которыми вы встречаетесь, и моменты, которые вы разделили, а также даёт карточки-игры для живого общения.'),
        P('По любым вопросам об этой политике или ваших данных пишите на support@clinkyapp.com.')
      ]},
      { h: '2. Кратко', b: [
        UL([
          'В Clinky нет аккаунтов и нет входа в систему. Вы не создаёте у нас профиль.',
          'У Clinky нет собственного сервера. Ваши друзья, встречи, напитки, серии, достижения, планы и отвеченные карточки-игры хранятся только на вашем устройстве (в локальной базе данных), а не на наших серверах.',
          'Три сторонних сервиса получают ограниченные данные за пределами устройства: Adapty (подписки), TelemetryDeck (анонимная продуктовая аналитика) и Sentry (отчёты о сбоях). Что именно получает каждый — описано ниже.',
          'Мы не отслеживаем вас в других приложениях или на сайтах, не используем рекламный идентификатор (IDFA) и не продаём и не передаём ваши персональные данные для рекламы.'
        ])
      ]},
      { h: '3. Данные, которые остаются только на вашем устройстве', b: [
        P('Основной контент, который вы создаёте в Clinky, никогда не покидает ваше устройство через нас. Он хранится в локальной базе данных в приватном контейнере приложения на вашем iPhone. Сюда входит:'),
        UL([
          'Ваши друзья («Clinkers»), включая имена и — для друзей, импортированных из Контактов — стабильный идентификатор контакта (см. раздел 6).',
          'Ваши встречи, записанные напитки, название места (текстовая метка, которую вы вводите, а не GPS-координата), которое вы по желанию прикрепляете к встрече, серии, достижения, запланированные встречи и отвеченные карточки-игры.'
        ]),
        P('У нас нет копии этих данных, нет возможности читать их удалённо и нет способа восстановить их для вас. При удалении приложения эти данные удаляются с устройства.')
      ]},
      { h: '4. Данные, обрабатываемые сторонними сервисами (вне устройства)', b: [
        P('Для работы подписок, понимания использования приложения и исправления сбоев приложение отправляет ограниченные данные трём обработчикам. Мы поручаем им обрабатывать данные только от нашего имени.'),
        H3('4.1 Adapty — подписки и paywall'),
        P('Когда вы открываете paywall Clinky Pro, покупаете или восстанавливаете подписку, SDK Adapty связывается с серверами Adapty. По своей архитектуре Adapty обрабатывает: анонимный идентификатор профиля Adapty, данные о транзакции / чеке App Store, статус подписки и стандартную информацию об устройстве, локали и магазине. SDK Adapty также может получать идентификаторы устройства, такие как IDFV (идентификатор поставщика), и ваш IP-адрес.'),
        UL([
          'Мы не задаём customerUserId и не передаём в Adapty ваше имя, email или телефон — ваш профиль Adapty анонимен.',
          'IDFV — это идентификатор устройства уровня поставщика; это не рекламный идентификатор, и он не используется для отслеживания вас между приложениями. Мы не подключаем интеграции рекламной атрибуции.',
          'Цель: проверка прав на Pro, показ и A/B-тестирование paywall, обработка покупок и восстановлений.',
          'Политика конфиденциальности Adapty: https://adapty.io/privacy/'
        ]),
        H3('4.2 TelemetryDeck — продуктовая аналитика с приоритетом приватности'),
        P('TelemetryDeck получает агрегированные анонимные события использования (например: приложение открыто, встреча создана, показан paywall), с параметрами, ограниченными сгруппированными счётчиками, типами и флагами. Приложение не отправляет в этих событиях ваш введённый текст, имена друзей, идентификаторы контактов или какие-либо «сырые» ID. SDK TelemetryDeck дополнительно генерирует собственный анонимизированный идентификатор с солью и хешированием (необратимый, не разделяемый между приложениями) плюс метаданные устройства/ОС/версии приложения. TelemetryDeck не хранит IP-адреса. По оценке самого вендора, обрабатываемые им данные выходят за рамки GDPR/CCPA; тем не менее мы раскрываем это здесь для прозрачности.'),
        UL([
          'Цель: понимать использование функций, чтобы улучшать приложение.',
          'Где: серверы TelemetryDeck (ЕС).',
          'Политика конфиденциальности TelemetryDeck: https://telemetrydeck.com/privacy/'
        ]),
        H3('4.3 Sentry — отчёты о сбоях'),
        P('Sentry получает отчёты о сбоях и ошибках: трассировки стека, breadcrumbs (например, навигационные события и события жизненного цикла) и метаданные устройства / ОС / версии приложения, а также случайный идентификатор для каждой установки. Мы настроили Sentry так, чтобы по умолчанию не отправлять персональные данные (sendDefaultPii = false) и удалять пользовательские данные из событий. Мы не привязываем вашу личность к отчётам о сбоях.'),
        UL([
          'Цель: диагностика и исправление сбоев и проблем стабильности.',
          'Где: серверы Sentry (ЕС).',
          'Политика конфиденциальности Sentry: https://sentry.io/privacy/'
        ]),
        H3('4.4 Apple'),
        P('Покупки обрабатываются Apple через App Store / StoreKit и регулируются политикой конфиденциальности Apple. Запланированные встречи, которые вы решаете сохранить, попадают в ваш собственный Apple Calendar (см. раздел 6).')
      ]},
      { h: '5. Отслеживание и реклама', b: [
        P('Clinky не отслеживает вас в понимании App Store: нет IDFA / рекламного идентификатора, нет запроса AppTrackingTransparency, нет рекламных сетей и нет брокеров данных. Adapty обрабатывает IDFV (идентификатор поставщика), как раскрыто в разделе 4.1, — это идентификатор устройства уровня поставщика, а не рекламный идентификатор и не сигнал межприложенческого отслеживания. Ни один из перечисленных сервисов не настроен на отслеживание вас в других приложениях или на сайтах. Мы не продаём и не передаём ваши персональные данные.')
      ]},
      { h: '6. Разрешения, которые может запросить приложение', b: [
        P('Каждое разрешение необязательно и используется только для описанной цели. iOS спросит вас перед предоставлением любого разрешения, и вы можете изменить или отозвать каждое в любой момент в Настройках iOS → Clinky.'),
        UL([
          'Контакты (чтение): Используется, чтобы быстро добавлять друзей. Приложение читает имя контакта, номера телефонов и фото, чтобы показать вам список выбора, но сохраняются только имя (в сокращённом виде «Имя Ф.») и идентификатор контакта в ваш локальный список друзей. Номера телефонов и фото не сохраняются и никогда не покидают ваше устройство. Контакты никогда не передаются третьим лицам.',
          'Календарь (только запись): Используется для добавления ваших запланированных встреч в ваш собственный Apple Calendar. Приложение может только создавать события (заголовок, заметки, время) — оно не может читать ваш календарь. Эти события находятся в вашем Apple Calendar, а не на серверах Clinky.',
          'Уведомления (только локальные): Используются для напоминаний о планах, мягких напоминаний о сериях и напоминаний во время живых сессий. Они планируются локально на вашем устройстве. Clinky не использует удалённые push-уведомления и не регистрирует push-токен.'
        ])
      ]},
      { h: '7. Дети', b: [
        P('Clinky имеет возрастной рейтинг 17+ в App Store, поскольку содержит упоминания алкоголя, — это рейтинг контента, а не возраст обработки данных. Отдельно: мы сознательно не обрабатываем персональные данные лиц младше применимого в их стране возраста цифрового согласия (который составляет от 13 до 16 лет в зависимости от юрисдикции, 16 по умолчанию GDPR). Приложение не предназначено для детей. Если вы считаете, что приложением воспользовался ребёнок, напишите нам на support@clinkyapp.com, и мы поможем с удалением там, где это применимо. Обратите внимание, что большая часть данных приложения хранится только на устройстве и находится под вашим контролем.')
      ]},
      { h: '8. Правовые основания обработки (GDPR)', b: [
        P('Если вы находитесь в Европейской экономической зоне или Великобритании, мы опираемся на:'),
        UL([
          'Исполнение договора (ст. 6(1)(b)) — для обработки и восстановления вашей подписки Clinky Pro (Adapty / Apple).',
          'Законные интересы (ст. 6(1)(f)) — для диагностики сбоев и поддержания стабильности приложения (Sentry), с учётом баланса с вашей приватностью.',
          'Согласие (ст. 6(1)(a)) — для необязательной продуктовой аналитики (TelemetryDeck). Там, где приложение предлагает выбор согласия на аналитику, мы обрабатываем аналитику только на этом основании, и вы можете отозвать согласие в любой момент (см. раздел 11). Если вы не дали согласия, необязательная аналитика не собирается.'
        ])
      ]},
      { h: '9. Ваши права', b: [
        P('Если вы в ЕЭЗ / Великобритании (GDPR): вы имеете право на доступ, исправление, удаление, ограничение, перенос и возражение против обработки, на отзыв согласия, а также на подачу жалобы в местный орган по защите данных.'),
        P('Если вы в Калифорнии (CCPA/CPRA): вы имеете право знать, что мы собираем, удалять и исправлять эти данные, отказаться от «продажи» или «передачи» (мы не делаем ни того, ни другого), ограничивать использование чувствительных персональных данных и не подвергаться дискриминации за реализацию этих прав.'),
        P('Важное ограничение (ст. 11 GDPR). Поскольку в Clinky нет аккаунтов и ваши основные данные хранятся только на устройстве, а данные, передаваемые нашим обработчикам, анонимизированы или псевдонимизированы (анонимный профиль Adapty, хешированный ID TelemetryDeck, очищенные события Sentry), мы, как правило, не можем идентифицировать записи конкретного лица в этих данных обработчиков. Если мы не можем идентифицировать вас по имеющимся у нас данным, мы можем быть не в состоянии выполнить запрос на доступ, исправление или удаление этих данных обработчика, можем запросить у вас дополнительную информацию для идентификации или отказать, если идентификация остаётся невозможной. Основной и наиболее эффективный способ удаления ваших данных — на устройстве: удалите друга, встречу или всё приложение в любой момент. По вопросам в пределах нашего контроля пишите на support@clinkyapp.com. Мы не продаём и не передаём ваши персональные данные.')
      ]},
      { h: '10. Хранение данных', b: [
        UL([
          'Данные на устройстве хранятся до тех пор, пока вы их не удалите или не удалите приложение. Мы их никогда не получаем.',
          'Аналитика и данные о сбоях хранятся только столько, сколько необходимо для заявленных целей, в соответствии с настройками хранения по умолчанию каждого обработчика.',
          'Данные о подписке хранятся Adapty/Apple столько, сколько необходимо для управления вашими правами, а также в соответствии с их политиками и применимым законодательством.'
        ])
      ]},
      { h: '11. Отзыв согласия / отказ', b: [
        P('Вы можете прекратить большую часть передачи данных за пределы устройства, отозвав разрешения в Настройках iOS, отключив согласие на аналитику в приложении (где предлагается) или удалив приложение. Чтобы подать запрос в отношении данных, находящихся у наших обработчиков, напишите на support@clinkyapp.com, учитывая ограничение идентификации, описанное в разделе 9.')
      ]},
      { h: '12. Международная передача данных и представительство в ЕС', b: [
        P('Разработчик (оператор данных) находится в Беларуси, которая расположена за пределами ЕЭЗ и не охвачена решением ЕС об адекватности. Это означает, что персональные данные пользователей ЕЭЗ обрабатываются оператором, находящимся в третьей стране без статуса адекватности. Мы решаем это через минимизацию данных, описанную в этой политике (нет аккаунтов, основные данные только на устройстве, анонимизированные/псевдонимизированные данные обработчиков), и, где требуется, надлежащие гарантии.'),
        P('Наши обработчики используют серверы в ЕС и/или США. Когда данные передаются за пределы ЕЭЗ/Великобритании обработчику, мы опираемся на надлежащие гарантии, такие как EU–US Data Privacy Framework (если обработчик сертифицирован) и Стандартные договорные положения (SCC).'),
        P('Представитель в ЕС (ст. 27 GDPR). Clinky разрабатывается частным разработчиком и обрабатывает лишь минимальные, анонимизированные или псевдонимизированные данные через перечисленных выше обработчиков. Мы не назначили представителя в Союзе согласно статье 27; если это изменится, мы укажем представителя здесь. По любым вопросам о данных вы можете связаться с нами напрямую: support@clinkyapp.com.')
      ]},
      { h: '13. Безопасность', b: [
        P('Ваши основные данные остаются на устройстве, под защитой iOS. Данные, отправляемые нашим обработчикам, передаются по зашифрованным (HTTPS) соединениям. Ни один способ передачи или хранения не является на 100% безопасным, но мы сводим передаваемые данные к минимуму.')
      ]},
      { h: '14. Изменения в политике', b: [
        P('Мы можем время от времени обновлять эту политику. Мы изменим дату «Последнее обновление» выше и, при существенных изменениях, разместим уведомление в приложении или на странице политики. Продолжение использования после обновления означает принятие изменённой политики.')
      ]},
      { h: '15. Контакты', b: [
        P('Вопросы или запросы: support@clinkyapp.com')
      ]}
    ]
  };

  window.TERMS = {
    en: [
      { h: '', b: [ P('These Terms of Use ("Terms") govern your use of the Clinky mobile application ("Clinky", the "App", "we", "us", or "our"). Please read them carefully. By downloading, installing, or using the App, you agree to these Terms.') ]},
      { h: '1. Acceptance of these Terms', b: [
        P('By downloading, installing, accessing, or using Clinky, you confirm that you accept these Terms and that you agree to comply with them. If you do not agree, do not download, install, or use the App.'),
        P('These Terms apply in addition to Apple’s Licensed Application End User License Agreement (LADEULA), available at: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'),
        P('If there is any conflict between these Terms and Apple’s standard LADEULA, the terms more protective of you as a consumer will apply. Apple’s standard EULA alone may also govern your use of the App; these Terms supplement it with Clinky-specific provisions.')
      ]},
      { h: '2. License to Use the App', b: [
        P('We grant you a limited, non-exclusive, non-transferable, revocable license to download and use Clinky on any Apple-branded device that you own or control, solely for your personal, non-commercial use, and in accordance with these Terms and Apple’s App Store Terms of Service.'),
        P('This license does not allow you to:'),
        UL([
          'Resell, redistribute, sublicense, rent, or lease the App;',
          'Reverse engineer, decompile, disassemble, or attempt to derive the source code of the App, except to the extent this restriction is prohibited by applicable law;',
          'Remove, alter, or obscure any proprietary notices;',
          'Use the App in any unlawful manner or for any unlawful purpose.'
        ])
      ]},
      { h: '3. Clinky Pro Subscription', b: [
        P('Clinky offers an optional auto-renewable subscription, Clinky Pro, which unlocks additional features. Subscriptions are sold through Apple’s App Store.'),
        P('Billing through Apple. All payments are processed by Apple and charged to your Apple ID account at confirmation of purchase. We do not collect or process your payment details.'),
        P('Pricing and duration. The subscription name, length of each subscription period, and price are displayed in the App before you confirm a purchase and in the App Store. Available options may include weekly, monthly, annual, and one-time (lifetime) plans, where offered.'),
        P('Free trial (if offered). Where a free trial is offered, its specific length and the plan it applies to are shown on the purchase screen before you confirm. Any unused portion of a free trial period is forfeited when you purchase a subscription, where applicable.'),
        P('Auto-renewal. Auto-renewable subscriptions automatically renew for the same period at the then-current price unless you turn off auto-renewal at least 24 hours before the end of the current period. Your Apple ID account is charged for renewal within 24 hours prior to the end of the current period.'),
        P('Managing and cancelling. You can manage your subscription and turn off auto-renewal in your App Store account settings (Settings → your Apple ID → Subscriptions) at any time after purchase. Cancellation takes effect at the end of the current billing period; you retain access to Clinky Pro until then.'),
        P('Refunds. We do not process payments and therefore cannot issue refunds directly. All purchases are handled by Apple, and refund requests are subject to Apple’s policies. You may request a refund through Apple at https://reportaproblem.apple.com. Nothing in this section limits any mandatory refund or withdrawal rights you may have under the consumer-protection laws of your country of residence.')
      ]},
      { h: '4. Acceptable Use', b: [
        P('You agree to use Clinky only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use of the App by, any third party. You agree not to:'),
        UL([
          'Use the App in violation of any applicable law or regulation;',
          'Interfere with, disrupt, or attempt to gain unauthorized access to the App or related systems;',
          'Use the App to harass, harm, or deceive others;',
          'Misuse any feature of the App in a way that could damage, disable, or impair it.'
        ]),
        P('Clinky helps you track meetings and drinks with friends. You are solely responsible for your own choices, including any decisions related to alcohol consumption. Clinky does not encourage excessive or irresponsible drinking. If you choose to drink, please drink responsibly.')
      ]},
      { h: '5. Your Content and Data', b: [
        P('Clinky is offline-first and stores your content — including your friends ("Clinkers"), meetings, drinks, plans, collectibles, and icebreaker answers — locally on your device. This data belongs to you. We do not host it on our own servers and, except for the limited third-party services described in our Privacy Policy, it does not leave your device.'),
        P('You are responsible for your content and for maintaining your own backups. Because your data is stored locally, deleting the App or your device data may permanently remove your content, and we cannot recover it for you.'),
        P('Your use of the App is also subject to our Privacy Policy, available at: https://clinkyapp.com/privacy.html')
      ]},
      { h: '6. Intellectual Property', b: [
        P('The App and all related content, design, graphics, text, software, and trademarks — including the names "Clinky", "Clinkers", "Clink", and "Pro", the Clinky logo, and the icebreaker question library — are owned by us or our licensors and are protected by intellectual property laws.'),
        P('Except for the limited license granted in Section 2, these Terms do not grant you any right, title, or interest in the App, its content, or our brand. You may not use our trademarks without our prior written permission.')
      ]},
      { h: '7. Disclaimers — No Warranty', b: [
        P('To the maximum extent permitted by applicable law, the App is provided "as is" and "as available", without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.'),
        P('We do not warrant that the App will be uninterrupted, error-free, secure, or free of harmful components, or that any defects will be corrected. You use the App at your own risk.'),
        P('Nothing in these Terms excludes or limits warranties or rights that cannot be excluded or limited under the mandatory law of your country of residence.')
      ]},
      { h: '8. Limitation of Liability', b: [
        P('To the maximum extent permitted by applicable law, in no event will we be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, profits, or goodwill, arising out of or in connection with your use of, or inability to use, the App.'),
        P('To the maximum extent permitted by applicable law, our total aggregate liability arising out of or relating to these Terms or the App will not exceed the amount you paid for the App or for Clinky Pro in the twelve (12) months preceding the event giving rise to the claim.'),
        P('These limitations do not apply to liability that cannot be excluded or limited under applicable law (including liability for death or personal injury caused by negligence, fraud, or gross negligence), and they do not affect any mandatory consumer rights you have under the law of your country of residence.')
      ]},
      { h: '9. Age Requirement (17+)', b: [
        P('Clinky is rated 17+ because it contains references to alcohol. By using the App, you confirm that you are at least 17 years old (or the age of majority in your jurisdiction, if higher). The App is not directed to children. If you are under the applicable age, please do not use the App.')
      ]},
      { h: '10. Termination', b: [
        P('These Terms remain in effect until terminated. Your license terminates automatically if you fail to comply with any of these Terms. You may terminate at any time by deleting the App from your device. Upon termination, you must stop using the App; sections that by their nature should survive (including Sections 5–8, 11, and 12) will survive.')
      ]},
      { h: '11. Governing Law and Consumer Rights', b: [
        P('These Terms are governed by the laws of the Republic of Belarus, where the developer is established, without regard to conflict-of-law principles.'),
        P('However, if you are a consumer, this choice of law does not deprive you of the protection afforded by the mandatory consumer-protection provisions of the law of your country of residence, and you may bring claims in the courts of your country of residence where local law so provides. Nothing in these Terms limits the statutory rights of consumers, including residents of the European Economic Area (EEA) and the United Kingdom.')
      ]},
      { h: '12. Apple-Specific Terms', b: [
        P('These Terms are between you and us only, not with Apple. Apple is not responsible for the App or its content. Apple has no obligation to provide maintenance or support for the App.'),
        P('To the extent permitted by law, Apple has no warranty obligation with respect to the App, and any claims relating to the App (including product liability, legal or regulatory compliance, or consumer-protection claims) are our responsibility, not Apple’s.'),
        P('Apple and Apple’s subsidiaries are third-party beneficiaries of these Terms and, upon your acceptance, will have the right to enforce these Terms against you. You represent that you are not located in a country subject to a U.S. Government embargo or designated as a "terrorist-supporting" country, and that you are not on any U.S. Government list of prohibited or restricted parties.')
      ]},
      { h: '13. Changes to These Terms', b: [
        P('We may update these Terms from time to time. When we do, we will revise the "Last updated" date above. Material changes will take effect when the updated Terms are made available in or through the App. Your continued use of the App after changes take effect constitutes your acceptance of the revised Terms.')
      ]},
      { h: '14. Contact', b: [
        P('If you have any questions about these Terms, contact us at:'),
        P('support@clinkyapp.com')
      ]}
    ],
    ru: [
      { h: '', b: [ P('Настоящие Условия использования («Условия») регулируют использование вами мобильного приложения Clinky («Clinky», «Приложение», «мы», «нас» или «наш»). Пожалуйста, внимательно прочитайте их. Загружая, устанавливая или используя Приложение, вы соглашаетесь с настоящими Условиями.') ]},
      { h: '1. Принятие настоящих Условий', b: [
        P('Загружая, устанавливая, открывая или используя Clinky, вы подтверждаете, что принимаете настоящие Условия и обязуетесь их соблюдать. Если вы не согласны, не загружайте, не устанавливайте и не используйте Приложение.'),
        P('Настоящие Условия применяются в дополнение к Лицензионному соглашению с конечным пользователем лицензированного приложения Apple (LADEULA), доступному по адресу: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'),
        P('При наличии противоречия между настоящими Условиями и стандартным LADEULA Apple применяются положения, более благоприятные для вас как для потребителя. Использование Приложения также может регулироваться исключительно стандартным EULA Apple; настоящие Условия дополняют его положениями, специфичными для Clinky.')
      ]},
      { h: '2. Лицензия на использование Приложения', b: [
        P('Мы предоставляем вам ограниченную, неисключительную, непередаваемую, отзывную лицензию на загрузку и использование Clinky на любом устройстве марки Apple, которым вы владеете или которое контролируете, исключительно для личного некоммерческого использования и в соответствии с настоящими Условиями и Условиями обслуживания App Store.'),
        P('Данная лицензия не позволяет вам:'),
        UL([
          'перепродавать, распространять, сублицензировать, сдавать в аренду или передавать Приложение;',
          'осуществлять обратное проектирование, декомпиляцию, дизассемблирование или пытаться получить исходный код Приложения, за исключением случаев, когда такое ограничение запрещено применимым законодательством;',
          'удалять, изменять или скрывать любые уведомления о правах собственности;',
          'использовать Приложение любым незаконным способом или в любых незаконных целях.'
        ])
      ]},
      { h: '3. Подписка Clinky Pro', b: [
        P('Clinky предлагает опциональную автоматически продлеваемую подписку Clinky Pro, которая открывает доступ к дополнительным функциям. Подписки продаются через App Store от Apple.'),
        P('Оплата через Apple. Все платежи обрабатываются Apple и списываются с вашей учётной записи Apple ID при подтверждении покупки. Мы не собираем и не обрабатываем ваши платёжные данные.'),
        P('Цена и срок. Название подписки, длительность каждого периода подписки и цена отображаются в Приложении перед подтверждением покупки, а также в App Store. Доступные варианты могут включать еженедельный, ежемесячный, годовой и разовый (пожизненный) планы, если они предлагаются.'),
        P('Бесплатный пробный период (если предлагается). Если предлагается бесплатный пробный период, его конкретная длительность и план, к которому он применяется, отображаются на экране покупки до подтверждения. Неиспользованная часть пробного периода аннулируется при покупке подписки, где это применимо.'),
        P('Автоматическое продление. Автоматически продляемые подписки продлеваются на тот же срок по действующей на момент продления цене, если вы не отключите автопродление не менее чем за 24 часа до окончания текущего периода. Списание за продление происходит в течение 24 часов до окончания текущего периода.'),
        P('Управление и отмена. Вы можете управлять подпиской и отключить автопродление в настройках учётной записи App Store (Настройки → ваш Apple ID → Подписки) в любое время после покупки. Отмена вступает в силу в конце текущего расчётного периода; до этого момента доступ к Clinky Pro сохраняется.'),
        P('Возврат средств. Мы не обрабатываем платежи и поэтому не можем напрямую осуществлять возврат средств. Все покупки обрабатываются Apple, и запросы на возврат регулируются политикой Apple. Вы можете запросить возврат через Apple по адресу https://reportaproblem.apple.com. Ничто в настоящем разделе не ограничивает обязательные права на возврат средств или отказ от договора, которые могут принадлежать вам в соответствии с законодательством о защите прав потребителей страны вашего проживания.')
      ]},
      { h: '4. Допустимое использование', b: [
        P('Вы соглашаетесь использовать Clinky только в законных целях и таким образом, который не нарушает права третьих лиц и не ограничивает их возможность пользоваться Приложением. Вы обязуетесь не:'),
        UL([
          'использовать Приложение в нарушение применимого законодательства;',
          'вмешиваться в работу Приложения или связанных систем, нарушать её или пытаться получить несанкционированный доступ;',
          'использовать Приложение для преследования, причинения вреда или обмана других лиц;',
          'злоупотреблять любой функцией Приложения способом, который может повредить его, отключить или нарушить его работу.'
        ]),
        P('Clinky помогает вам отслеживать встречи и напитки с друзьями. Вы несёте полную ответственность за собственный выбор, включая любые решения, связанные с употреблением алкоголя. Clinky не поощряет чрезмерное или безответственное употребление алкоголя. Если вы решите употреблять алкоголь, пожалуйста, делайте это ответственно.')
      ]},
      { h: '5. Ваш контент и данные', b: [
        P('Clinky работает по принципу offline-first и хранит ваш контент — включая ваших друзей («Clinkers»), встречи, напитки, планы, коллекционные предметы и ответы на вопросы из карточек-игр — локально на вашем устройстве. Эти данные принадлежат вам. Мы не размещаем их на собственных серверах, и, за исключением ограниченных сторонних сервисов, описанных в нашей Политике конфиденциальности, они не покидают ваше устройство.'),
        P('Вы несёте ответственность за свой контент и за создание собственных резервных копий. Поскольку ваши данные хранятся локально, удаление Приложения или данных устройства может безвозвратно удалить ваш контент, и мы не сможем его восстановить.'),
        P('Использование вами Приложения также регулируется нашей Политикой конфиденциальности, доступной по адресу: https://clinkyapp.com/privacy-ru.html')
      ]},
      { h: '6. Интеллектуальная собственность', b: [
        P('Приложение и весь связанный с ним контент, дизайн, графика, текст, программное обеспечение и товарные знаки — включая названия «Clinky», «Clinkers», «Clink» и «Pro», логотип Clinky и библиотеку вопросов из карточек-игр — принадлежат нам или нашим лицензиарам и защищены законодательством об интеллектуальной собственности.'),
        P('За исключением ограниченной лицензии, предоставленной в Разделе 2, настоящие Условия не предоставляют вам никаких прав на Приложение, его контент или наш бренд. Вы не вправе использовать наши товарные знаки без нашего предварительного письменного разрешения.')
      ]},
      { h: '7. Отказ от гарантий', b: [
        P('В максимальной степени, разрешённой применимым законодательством, Приложение предоставляется «как есть» и «как доступно», без каких-либо гарантий, явных или подразумеваемых, включая, помимо прочего, подразумеваемые гарантии товарной пригодности, пригодности для определённой цели и ненарушения прав.'),
        P('Мы не гарантируем, что работа Приложения будет бесперебойной, безошибочной, безопасной или свободной от вредоносных компонентов, а также что любые дефекты будут устранены. Вы используете Приложение на свой страх и риск.'),
        P('Ничто в настоящих Условиях не исключает и не ограничивает гарантии или права, которые не могут быть исключены или ограничены в соответствии с императивным законодательством страны вашего проживания.')
      ]},
      { h: '8. Ограничение ответственности', b: [
        P('В максимальной степени, разрешённой применимым законодательством, мы ни при каких обстоятельствах не несём ответственности за любые косвенные, случайные, специальные, последующие или штрафные убытки, а также за любую потерю данных, прибыли или деловой репутации, возникшие в связи с использованием вами Приложения или невозможностью его использования.'),
        P('В максимальной степени, разрешённой применимым законодательством, наша совокупная ответственность, вытекающая из настоящих Условий или Приложения, не превышает суммы, уплаченной вами за Приложение или за Clinky Pro в течение двенадцати (12) месяцев, предшествующих событию, послужившему основанием для требования.'),
        P('Данные ограничения не применяются к ответственности, которая не может быть исключена или ограничена в соответствии с применимым законодательством (включая ответственность за смерть или причинение вреда здоровью вследствие халатности, за мошенничество или грубую неосторожность), и не затрагивают любые обязательные права потребителей, предоставленные вам законодательством страны вашего проживания.')
      ]},
      { h: '9. Возрастное ограничение (17+)', b: [
        P('Clinky имеет рейтинг 17+, поскольку содержит упоминания алкоголя. Используя Приложение, вы подтверждаете, что вам не менее 17 лет (или вы достигли возраста совершеннолетия в вашей юрисдикции, если он выше). Приложение не предназначено для детей. Если вы не достигли применимого возраста, пожалуйста, не используйте Приложение.')
      ]},
      { h: '10. Прекращение действия', b: [
        P('Настоящие Условия действуют до их прекращения. Ваша лицензия прекращается автоматически в случае несоблюдения вами любого из настоящих Условий. Вы можете прекратить действие в любое время, удалив Приложение со своего устройства. После прекращения действия вы обязаны прекратить использование Приложения; положения, которые по своей природе должны сохранять силу (включая Разделы 5–8, 11 и 12), остаются в силе.')
      ]},
      { h: '11. Применимое право и права потребителей', b: [
        P('Настоящие Условия регулируются законодательством Республики Беларусь, где зарегистрирован разработчик, без учёта коллизионных норм.'),
        P('Однако, если вы являетесь потребителем, данный выбор применимого права не лишает вас защиты, предоставляемой императивными нормами законодательства о защите прав потребителей страны вашего проживания, и вы можете предъявлять требования в судах страны вашего проживания, где это предусмотрено местным законодательством. Ничто в настоящих Условиях не ограничивает установленные законом права потребителей, включая жителей Европейской экономической зоны (ЕЭЗ) и Великобритании.')
      ]},
      { h: '12. Особые условия Apple', b: [
        P('Настоящие Условия заключены только между вами и нами, а не с Apple. Apple не несёт ответственности за Приложение или его содержание. Apple не обязана предоставлять обслуживание или поддержку Приложения.'),
        P('В степени, разрешённой законом, Apple не несёт гарантийных обязательств в отношении Приложения, и любые претензии, связанные с Приложением (включая претензии об ответственности за качество продукции, о соответствии законодательным или нормативным требованиям, а также претензии в рамках защиты прав потребителей), являются нашей ответственностью, а не Apple.'),
        P('Apple и дочерние компании Apple являются третьими лицами-выгодоприобретателями по настоящим Условиям и после вашего согласия получают право требовать их исполнения от вас. Вы заявляете, что не находитесь в стране, на которую распространяется эмбарго Правительства США или которая определена как «поддерживающая терроризм», и что вы не включены ни в один из списков запрещённых или ограниченных лиц Правительства США.')
      ]},
      { h: '13. Изменения настоящих Условий', b: [
        P('Мы можем периодически обновлять настоящие Условия. При этом мы изменяем дату «Последнее обновление» выше. Существенные изменения вступают в силу с момента, когда обновлённые Условия становятся доступны в Приложении или через него. Продолжение использования вами Приложения после вступления изменений в силу означает ваше согласие с обновлёнными Условиями.')
      ]},
      { h: '14. Контакты', b: [
        P('Если у вас есть вопросы о настоящих Условиях, свяжитесь с нами по адресу:'),
        P('support@clinkyapp.com')
      ]}
    ]
  };
})();
