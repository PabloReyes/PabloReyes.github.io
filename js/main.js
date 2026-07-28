---
layout: null
---

(() => {
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
