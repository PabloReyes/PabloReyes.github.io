---
layout: null
---

$(document).ready(function () {
  if (!$("body").hasClass("projects-page")) return;

  const $modal = $("#imageModal");
  const $modalImg = $("#imageModal .image-modal__img");

  const openModal = (src, alt) => {
    $modalImg.attr("src", src);
    $modalImg.attr("alt", alt || "");
    $modal.addClass("is-open").attr("aria-hidden", "false");
    $("body").css("overflow", "hidden");
  };

  const closeModal = () => {
    $modal.removeClass("is-open").attr("aria-hidden", "true");
    $modalImg.attr("src", "");
    $("body").css("overflow", "");
  };

  $(".main-post-list").on("click", "article.post-entry img", function (e) {
    e.preventDefault();
    e.stopPropagation();
    openModal($(this).attr("src"), $(this).attr("alt"));
  });

  $modal.on("click", function (e) {
    if ($(e.target).is("#imageModal")) closeModal();
  });

  $modal.on("click", ".image-modal__close", function () {
    closeModal();
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $modal.hasClass("is-open")) closeModal();
  });
})
