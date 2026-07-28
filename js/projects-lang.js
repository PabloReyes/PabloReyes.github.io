(() => {
  const STORAGE_KEY = "projects_lang";
  const DEFAULT_LANG = "es";

  const isValidLang = (lang) => lang === "es" || lang === "en";

  const setLang = (lang) => {
    const nextLang = isValidLang(lang) ? lang : DEFAULT_LANG;
    document.documentElement.lang = nextLang;
    document.documentElement.setAttribute("data-lang", nextLang);
    if (document.body) document.body.setAttribute("data-lang", nextLang);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLang);
    } catch (_) {}

    document.querySelectorAll(".lang-link").forEach((button) => {
      const active = button.dataset.lang === nextLang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  };

  const init = () => {
    const saved = (() => {
      try {
        return window.localStorage.getItem(STORAGE_KEY);
      } catch (_) {
        return null;
      }
    })();

    setLang(saved || DEFAULT_LANG);

    document.addEventListener("click", (event) => {
      const button = event.target.closest(".lang-link");
      if (!button) return;
      if (!isValidLang(button.dataset.lang)) return;
      setLang(button.dataset.lang);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
