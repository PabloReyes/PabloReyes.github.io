---
layout: null
---

(() => {
  /* Image modal */
  const modal = document.querySelector("#imageModal");
  if (!(modal instanceof HTMLDialogElement)) return;

  const modalImage = modal.querySelector(".image-modal__img");
  const closeButton = modal.querySelector(".image-modal__close");
  let activeTrigger = null;

  const closeModal = () => {
    if (modal.open) modal.close();
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".project-image-button");
    if (!trigger) return;

    activeTrigger = trigger;
    modalImage.src = trigger.dataset.modalSrc;
    modalImage.alt = trigger.dataset.modalAlt || "";
    modal.showModal();
    document.body.classList.add("modal-open");
    closeButton.focus();
  });

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    const bounds = modal.getBoundingClientRect();
    const insideDialog =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;

    if (!insideDialog) closeModal();
  });

  modal.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    modalImage.removeAttribute("src");
    modalImage.alt = "";
    activeTrigger?.focus();
    activeTrigger = null;
  });
})();

/* Theme toggle */
(() => {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const html = document.documentElement;
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const applyTheme = (dark) => {
    if (dark) {
      html.setAttribute("data-theme", "dark");
      if (metaThemeColor) metaThemeColor.setAttribute("content", "#18181b");
    } else {
      html.setAttribute("data-theme", "light");
      if (metaThemeColor) metaThemeColor.setAttribute("content", "#fafaf8");
    }
  };

  applyTheme(stored === "dark" || (!stored && prefersDark));

  toggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    applyTheme(current !== "dark");
    localStorage.setItem("theme", current === "dark" ? "light" : "dark");
  });
})();
