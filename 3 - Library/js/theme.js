"use strict";

const $themeBtn = document.querySelector("[data-theme-btn]");

/** Toggle theme function */
function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

/** Initialize stored theme */
const storedTheme = localStorage.getItem("theme");

const systemThemeIsDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

const initialTheme = storedTheme ?? (systemThemeIsDark ? "dark" : "light");
document.documentElement.setAttribute("data-theme", initialTheme);

/** Attach function to button */
$themeBtn?.addEventListener("click", function () {
  toggleTheme();
});
