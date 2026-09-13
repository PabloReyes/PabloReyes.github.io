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
  let stored;
  try { stored = localStorage.getItem("theme"); } catch (error) {}
  if (stored !== "dark" && stored !== "light") stored = null;
  const preference = window.matchMedia("(prefers-color-scheme: dark)");

  const applyTheme = (dark) => {
    toggle.setAttribute("aria-pressed", String(dark));
    if (dark) {
      html.setAttribute("data-theme", "dark");
      if (metaThemeColor) metaThemeColor.setAttribute("content", "#18181b");
    } else {
      html.setAttribute("data-theme", "light");
      if (metaThemeColor) metaThemeColor.setAttribute("content", "#fafaf8");
    }
  };

  applyTheme(stored === "dark" || (!stored && preference.matches));
  toggle.hidden = false;

  preference.addEventListener("change", (event) => {
    if (!stored) applyTheme(event.matches);
  });

  toggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    applyTheme(current !== "dark");
    stored = current === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", stored); } catch (error) {}
  });
})();

/* Progressive enhancement: native anchor links and a collapsible reading index. */
(() => {
  const content = document.querySelector(".post-content");
  const toc = document.querySelector(".article-toc");
  if (!content || !toc) return;

  const headings = [...content.querySelectorAll("h2, h3")];
  if (headings.length < 4) return;

  const list = document.createElement("ol");
  headings.forEach((heading, index) => {
    if (!heading.id) {
      let id = `section-${index + 1}`;
      while (document.getElementById(id)) id += "-section";
      heading.id = id;
    }
    // Allow keyboard readers to continue at the selected section.
    heading.tabIndex = -1;
    const item = document.createElement("li");
    if (heading.tagName === "H3") item.className = "article-toc__subheading";
    const link = document.createElement("a");
    link.href = `#${encodeURIComponent(heading.id)}`;
    link.textContent = heading.textContent;
    link.addEventListener("click", () => heading.focus({ preventScroll: true }));
    item.append(link);
    list.append(item);
  });
  toc.querySelector("nav").append(list);
  toc.open = window.matchMedia("(min-width: 900px)").matches;
  toc.hidden = false;
})();

/* Keep wide tables and code blocks reachable without a mouse. */
document.querySelectorAll(".post-content pre, .post-content table").forEach((block) => {
  block.tabIndex = 0;
});
