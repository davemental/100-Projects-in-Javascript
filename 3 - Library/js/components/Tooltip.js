"use strict";

export const Tooltip = function ($element) {
  const $tooltip = document.createElement("span");
  $tooltip.classList.add("tooltip");

  $element.addEventListener("mouseenter", function () {
    // console.log(this.dataset.tooltip);

    $tooltip.textContent = this.dataset.tooltip;

    const { top, left, height, width } = this.getBoundingClientRect();

    $tooltip.style.top = top + height + 4 + "px";
    $tooltip.style.left = left + width / 2 + "px";
    $tooltip.style.transform = "translate(-50%, 0)";
    document.body.appendChild($tooltip);
  });

  $element.addEventListener("mouseleave", $tooltip.remove.bind($tooltip));
  $element.addEventListener("click", $tooltip.remove.bind($tooltip));
};
