const night = document.querySelector(".night");
const day = document.querySelector(".day");
const main = document.querySelector("main");

// ligth theme if null
if (localStorage.getItem("isDark") === null) {
  localStorage.setItem("isDark", false);
}

function darkTheme() {
  main.setAttribute("style", "background-color: #010e17; ");
  night.setAttribute("style", "display: none;");
  day.setAttribute("style", "display: block; fill: yellow;");
}

function lightTheme() {
  main.setAttribute("style", "background-color: white;");
  day.setAttribute("style", "display: none;");
  night.setAttribute("style", "display: block;");
}

if (localStorage.getItem("isDark") === "true") {
  darkTheme();
} else {
  lightTheme();
}

day.addEventListener("click", () => {
  lightTheme();
  localStorage.setItem("isDark", false);
});

night.addEventListener("click", () => {
  darkTheme();
  localStorage.setItem("isDark", true);
});
