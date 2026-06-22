/* ===================== Clinky landing — behaviour ===================== */
(() => {
  "use strict";

  // ---------- i18n dictionary ----------
  const I18N = {
    en: {
      "meta.title": "Clinky — Friends, drinks & games",
      "meta.desc": "Clinky helps you see friends more often, break the ice with party-game cards, and collect a 3D memento from every clink. Join the waitlist.",
      "nav.join": "Join waitlist",
      "hero.eyebrow": "Coming soon to the App Store",
      "hero.title": "Friends, drinks & games that actually get you talking.",
      "hero.lede": "Clinky helps you meet up more often, break the ice with party-game cards, and collect a 3D memento from every clink.",
      "hero.emailPlaceholder": "your@email.com",
      "hero.cta": "Join the waitlist",
      "hero.microcopy": "No spam. One email when we launch.",
      "hero.done": "🎉 You're on the list! We'll email you the App Store link at launch.",
      "hero.model3d": "Interactive 3D · tap on iPhone for AR",
      "hero.drinkGroup": "Any drink — even alcohol-free",
      "drink.beer": "Beer",
      "drink.coffee": "Coffee",
      "live.kicker": "Live",
      "live.title": "Cards that break any silence",
      "live.sub": "Real questions from the app. Tap through them.",
      "live.next": "Next question",
      "show.kicker": "Inside Clinky",
      "show.title": "One app, five ways to stay close",
      "show.sub": "Tap a tab to look inside.",
      "show.soon": "Screenshot coming soon",
      "feat.streaks.t": "Meeting streaks", "feat.streaks.d": "Keep the run going, week after week.",
      "feat.ach.t": "Achievements", "feat.ach.d": "Unlock badges as your friendships grow.",
      "feat.rem.t": "Smart reminders", "feat.rem.d": "A gentle nudge when it's been too long.",
      "feat.coll.t": "3D collection", "feat.coll.d": "Collect a memento from every clink.",
      "feat.priv.t": "Private & offline", "feat.priv.d": "No accounts. Your data stays on device.",
      "feat.stats.t": "Your stats", "feat.stats.d": "See who you see most — and who's overdue.",
      "final.title": "Be first to clink.",
      "final.sub": "Join the waitlist — we'll send the App Store link the day it's live.",
      "foot.privacy": "Privacy Policy", "foot.terms": "Terms of Use", "foot.contact": "Contact",
    },
    ru: {
      "meta.title": "Clinky — друзья, напитки и игры",
      "meta.desc": "Clinky помогает видеться с друзьями чаще, разговорить компанию карточками-играми и собирать 3D-сувенир за каждую встречу. Встань в очередь.",
      "nav.join": "В очередь",
      "hero.eyebrow": "Скоро в App Store",
      "hero.title": "Друзья, напитки и игры, которые правда разговорят компанию.",
      "hero.lede": "Clinky помогает видеться чаще, разговорить любую компанию карточками-играми и собирать 3D-сувенир за каждую встречу.",
      "hero.emailPlaceholder": "твой@email.com",
      "hero.cta": "Встать в очередь",
      "hero.microcopy": "Без спама. Одно письмо на релизе.",
      "hero.done": "🎉 Ты в очереди! Пришлём ссылку на App Store, как только выйдем.",
      "hero.model3d": "Интерактивное 3D · на iPhone тапни для AR",
      "hero.drinkGroup": "Любой напиток — хоть вообще без алкоголя",
      "drink.beer": "Пиво",
      "drink.coffee": "Кофе",
      "live.kicker": "Live",
      "live.title": "Карточки, что разговорят любую компанию",
      "live.sub": "Реальные вопросы из приложения. Полистай.",
      "live.next": "Следующий вопрос",
      "show.kicker": "Внутри Clinky",
      "show.title": "Одно приложение — пять способов быть ближе",
      "show.sub": "Нажми на вкладку, чтобы заглянуть внутрь.",
      "show.soon": "Скриншот скоро",
      "feat.streaks.t": "Серии встреч", "feat.streaks.d": "Держи серию неделя за неделей.",
      "feat.ach.t": "Достижения", "feat.ach.d": "Открывай значки по мере роста дружбы.",
      "feat.rem.t": "Умные напоминания", "feat.rem.d": "Мягкий пинок, когда давно не виделись.",
      "feat.coll.t": "3D-коллекция", "feat.coll.d": "Собирай сувенир за каждую встречу.",
      "feat.priv.t": "Приватно и офлайн", "feat.priv.d": "Без аккаунтов. Данные остаются на устройстве.",
      "feat.stats.t": "Твоя статистика", "feat.stats.d": "Кого видишь чаще — и с кем пора увидеться.",
      "final.title": "Будь первым, кто чокнется.",
      "final.sub": "Встань в очередь — пришлём ссылку на App Store в день релиза.",
      "foot.privacy": "Политика конфиденциальности", "foot.terms": "Условия использования", "foot.contact": "Связаться",
    },
  };

  // ---------- app tabs (matches the 5 tabs in RootView) ----------
  const TABS = [
    { emoji: "🏠", title: { en: "Home", ru: "Главная" }, desc: {
        en: "Your next meet-up, live sessions and recent clinks — all in one glance.",
        ru: "Ближайшая встреча, Live-сессии и недавние чокинги — всё на одном экране." } },
    { emoji: "👥", title: { en: "Clinkers", ru: "Друзья" }, desc: {
        en: "Every friend in one place. See who you're due to catch up with.",
        ru: "Все друзья в одном месте. Видно, с кем пора увидеться." } },
    { emoji: "🍻", title: { en: "Live", ru: "Live" }, desc: {
        en: "Start a live meet-up, draw ice-breaker cards and log your drinks.",
        ru: "Запусти живую встречу, тяни ice-breaker карточки и отмечай напитки." } },
    { emoji: "📊", title: { en: "Stats", ru: "Аналитика" }, desc: {
        en: "See who you meet most, your streaks and favourite drinks.",
        ru: "Кого видишь чаще, твои серии и любимые напитки." } },
    { emoji: "👤", title: { en: "Profile", ru: "Профиль" }, desc: {
        en: "Achievements, app icon, Clinky Pro and settings.",
        ru: "Достижения, иконка приложения, Clinky Pro и настройки." } },
  ];

  const DRINKS = {
    beer:   { glyph: "🍺", model: "BeerCap" },
    coffee: { glyph: "☕", model: "CoffeeCup" },
  };

  // ---------- state ----------
  let lang = pickLang();
  let games = [];
  let gameIdx = 0;
  let qIdx = 0;
  let tabIdx = 0;

  function pickLang() {
    const saved = localStorage.getItem("clinky_lang");
    if (saved === "en" || saved === "ru") return saved;
    return (navigator.language || "en").toLowerCase().startsWith("ru") ? "ru" : "en";
  }
  const t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;

  // ---------- apply translations ----------
  function applyI18n() {
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      // format: "attr:key"
      el.getAttribute("data-i18n-attr").split(",").forEach((pair) => {
        const [attr, key] = pair.split(":");
        if (attr && key) el.setAttribute(attr.trim(), t(key.trim()));
      });
    });
    // locale-aware legal links
    const p = document.getElementById("footPrivacy");
    const tm = document.getElementById("footTerms");
    if (p) p.setAttribute("href", lang === "ru" ? "privacy-ru.html" : "privacy.html");
    if (tm) tm.setAttribute("href", lang === "ru" ? "terms-ru.html" : "terms.html");
    // active lang button
    document.querySelectorAll(".lang-btn").forEach((b) =>
      b.classList.toggle("is-active", b.dataset.lang === lang));
    renderLive();
    renderTab();
  }

  function setLang(next) {
    lang = next;
    localStorage.setItem("clinky_lang", next);
    applyI18n();
  }

  // ---------- 3D drink toggle ----------
  const model = document.getElementById("drinkModel");
  const fallback = document.getElementById("modelFallback");
  const glyph = document.getElementById("modelGlyph");

  function showFallback(on) { if (fallback) fallback.style.display = on ? "flex" : "none"; }
  if (model) {
    model.addEventListener("load", () => showFallback(false));
    model.addEventListener("error", () => showFallback(true)); // GLB not present yet
  }
  function setDrink(key) {
    const d = DRINKS[key]; if (!d) return;
    if (glyph) glyph.textContent = d.glyph;
    showFallback(true); // until the new GLB loads
    if (model) {
      model.setAttribute("src", `models/${d.model}.glb`);
      model.setAttribute("ios-src", `models/${d.model}.usdz`);
    }
    document.querySelectorAll(".drink-chip").forEach((c) =>
      c.classList.toggle("is-active", c.dataset.drink === key));
  }
  document.querySelectorAll(".drink-chip").forEach((c) =>
    c.addEventListener("click", () => setDrink(c.dataset.drink)));

  // ---------- Live ice-breaker card ----------
  const gameTabsEl = document.getElementById("gameTabs");
  const iceGameEl = document.getElementById("iceGame");
  const iceTextEl = document.getElementById("iceText");
  const iceNextEl = document.getElementById("iceNext");

  function buildGameTabs() {
    if (!gameTabsEl) return;
    gameTabsEl.innerHTML = "";
    games.forEach((g, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "game-tab" + (i === gameIdx ? " is-active" : "");
      b.setAttribute("role", "tab");
      b.dataset.idx = i;
      b.textContent = `${g.emoji} ${g.title[lang]}`;
      b.addEventListener("click", () => { gameIdx = i; qIdx = 0; buildGameTabs(); renderLive(); });
      gameTabsEl.appendChild(b);
    });
  }
  function renderLive() {
    if (!games.length || !iceTextEl) return;
    const g = games[gameIdx];
    if (iceGameEl) iceGameEl.textContent = g.title[lang];
    iceTextEl.textContent = g.questions[qIdx % g.questions.length][lang];
    // refresh tab labels for current lang
    gameTabsEl && gameTabsEl.querySelectorAll(".game-tab").forEach((b, i) => {
      b.textContent = `${games[i].emoji} ${games[i].title[lang]}`;
    });
  }
  function nextQuestion() {
    if (!games.length) return;
    iceTextEl.classList.add("is-fading");
    setTimeout(() => {
      qIdx = (qIdx + 1) % games[gameIdx].questions.length;
      renderLive();
      iceTextEl.classList.remove("is-fading");
    }, 180);
  }
  iceNextEl && iceNextEl.addEventListener("click", nextQuestion);

  fetch("assets/icebreakers.json")
    .then((r) => r.json())
    .then((data) => { games = data.games || []; buildGameTabs(); renderLive(); })
    .catch(() => { if (iceTextEl) iceTextEl.textContent = "🍻"; });

  // ---------- tab showcase ----------
  const phoneTabsEl = document.getElementById("phoneTabs");
  const screenEmoji = document.getElementById("screenEmoji");
  const screenCap = document.getElementById("screenCap");
  const tabTitle = document.getElementById("tabTitle");
  const tabDesc = document.getElementById("tabDesc");

  function buildPhoneTabs() {
    if (!phoneTabsEl) return;
    phoneTabsEl.innerHTML = "";
    TABS.forEach((tb, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ptab" + (i === tabIdx ? " is-active" : "");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", tb.title[lang]);
      b.textContent = tb.emoji;
      b.addEventListener("click", () => { tabIdx = i; buildPhoneTabs(); renderTab(); });
      phoneTabsEl.appendChild(b);
    });
  }
  function renderTab() {
    const tb = TABS[tabIdx];
    if (screenEmoji) screenEmoji.textContent = tb.emoji;
    if (screenCap) screenCap.textContent = tb.title[lang];
    if (tabTitle) tabTitle.textContent = tb.title[lang];
    if (tabDesc) tabDesc.textContent = tb.desc[lang];
    phoneTabsEl && phoneTabsEl.querySelectorAll(".ptab").forEach((b, i) =>
      b.setAttribute("aria-label", TABS[i].title[lang]));
  }
  buildPhoneTabs();

  // ---------- language buttons ----------
  document.querySelectorAll(".lang-btn").forEach((b) =>
    b.addEventListener("click", () => setLang(b.dataset.lang)));

  // ---------- waitlist forms ----------
  // NOTE: no backend yet. Emails are kept locally as a demo until an email
  // service is chosen (MailerLite / Kit / Brevo). To go live, set
  // form.action + method (or a data-endpoint) and POST there.
  function handleWaitlist(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.checkValidity()) { input && input.reportValidity(); return; }
      const email = input.value.trim();
      try {
        const list = JSON.parse(localStorage.getItem("clinky_waitlist") || "[]");
        if (!list.includes(email)) list.push(email);
        localStorage.setItem("clinky_waitlist", JSON.stringify(list));
      } catch (_) {}
      // success UI
      const heroDone = document.getElementById("waitlistDone");
      if (form.id === "waitlist" && heroDone) {
        form.style.display = "none";
        const micro = form.parentElement.querySelector(".microcopy");
        if (micro) micro.style.display = "none";
        heroDone.hidden = false;
      } else {
        let done = form.nextElementSibling;
        form.style.display = "none";
        const msg = document.createElement("p");
        msg.className = "waitlist-done";
        msg.style.margin = "16px auto 0";
        msg.style.maxWidth = "480px";
        msg.textContent = t("hero.done");
        form.parentElement.insertBefore(msg, form.nextSibling);
      }
    });
  }
  document.querySelectorAll(".waitlist").forEach(handleWaitlist);

  // ---------- init ----------
  applyI18n();
})();
