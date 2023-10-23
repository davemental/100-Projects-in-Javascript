"use strict";

/**
 *  Initialize the theme
 */
const storedTheme = localStorage.getItem("theme");

const systemThemeIsDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

const initialTheme = storedTheme ?? (systemThemeIsDark ? "dark" : "light");

document.documentElement.setAttribute("data-theme", initialTheme);

/**
 *  Toggles the theme between light and dark
 *  Manages the theme setting in the DOM and Local storage
 */

const toggleTheme = function () {
  const /** {string} */ currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";

  const /** {string} */ newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};

/**
 *  Attach toggleTheme to them button click event
 */
window.addEventListener("DOMContentLoaded", function () {
  const /** {HTMLElement} */ $themeBtn =
      document.querySelector("[data-theme-btn]");

  if ($themeBtn) {
    $themeBtn.addEventListener("click", toggleTheme);
  }
});
