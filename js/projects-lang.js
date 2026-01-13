(() => {
  const STORAGE_KEY = "projects_lang";
  const DEFAULT_LANG = "es";

  const isValidLang = (lang) => lang === "es" || lang === "en";

  const setLang = (lang) => {
    const nextLang = isValidLang(lang) ? lang : DEFAULT_LANG;
    document.documentElement.setAttribute("data-lang", nextLang);
    if (document.body) document.body.setAttribute("data-lang", nextLang);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLang);
    } catch (_) {}

    document.querySelectorAll(".lang-link").forEach((link) => {
      const active = link.dataset.lang === nextLang;
      link.classList.toggle("active", active);
      link.setAttribute("aria-current", active ? "true" : "false");
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
      const link = event.target.closest(".lang-link");
      if (!link) return;
      if (!isValidLang(link.dataset.lang)) return;
      event.preventDefault();
      setLang(link.dataset.lang);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
