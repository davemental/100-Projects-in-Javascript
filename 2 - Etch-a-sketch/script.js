const DEFAULT_SIZE = 32;
const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let lightenValue = 10;

const penColorPicker = document.getElementById("penColorPicker");
const backgroundColorPicker = document.getElementById("backgroundColorPicker");

const output = document.getElementById("output");
const sketchPad = document.getElementById("sketch-pad");
const btnColorMode = document.getElementById("colorMode");
const btnRainbowMode = document.getElementById("rainbowMode");
const btnLighten = document.getElementById("lighten");
const btnEraser = document.getElementById("eraser");
const slider = document.getElementById("slider");
const gridLines = document.getElementById("gridLines");
const clear = document.getElementById("clear");
const sizeValue = document.getElementById("sizeValue");

penColorPicker.oninput = (e) => setCurrentColor(e.target.value);
backgroundColorPicker.oninput = (e) => setSketchPadColor(e.target.value);
btnColorMode.onclick = () => setCurrentMode("color");
btnRainbowMode.onclick = () => setCurrentMode("rainbow");
btnLighten.onclick = () => lightenPenColor();
btnEraser.onclick = () => {
  setSketchPadColor(window.getComputedStyle(sketchPad).backgroundColor);
  setCurrentMode("eraser");
};
slider.onchange = (e) => changeSizeValue(e.target.value);
gridLines.onclick = () => showGridLines();
clear.onclick = () => reloadGrid();

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setCurrentSize(size) {
  currentSize = size;
}

function setCurrentMode(newMode) {
  activeButton(newMode);
  currentMode = newMode;
}

function lightenPenColor() {
  lightenValue -= 1;

  if (lightenValue === 1) {
    lightenValue = 9;
  }

  setCurrentMode("lighten");
  btnLighten.innerHTML = `Lighten ${lightenValue}0%`;
}

function showGridLines() {
  let gridElement = sketchPad.getElementsByTagName("div");

  for (let i = 0; i < gridElement.length; i++) {
    gridElement[i].style.border = `1px ridge ${DEFAULT_COLOR}40`;
  }
}

function setSketchPadColor(newColor) {
  sketchColor = newColor;
  sketchPad.style.backgroundColor = newColor;
}

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function changeSizeValue(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} X ${value}`;
}

function reloadGrid() {
  clearGrid();
  createGridElement(currentSize);
}

function clearGrid() {
  sketchPad.innerHTML = "";
}

function createGridElement(size) {
  sketchPad.style.gridTemplateRows = "repeat(" + size + ", 1fr)";
  sketchPad.style.gridTemplateColumns = "repeat(" + size + ", 1fr )";

  for (let i = 1; i <= size ** 2; i++) {
    const element = document.createElement("div");
    element.classList.add("element");
    element.addEventListener("mouseover", changePenColor);
    element.addEventListener("mousedown", changePenColor);
    element.onmousedown = disableDragging;
    sketchPad.appendChild(element);
  }
}

function disableDragging(e) {
  e.preventDefault();
}

function changePenColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;

  if (currentMode === "rainbow") {
    const r = Math.ceil(Math.random() * 255);
    const g = Math.ceil(Math.random() * 255);
    const b = Math.ceil(Math.random() * 255);
    e.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.9)`;
  }

  if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = sketchColor;
  } else if (currentMode === "lighten") {
    e.target.style.backgroundColor = `${currentColor}${lightenValue}0`;
  }
}

function activeButton(mode) {
  if (currentMode === "color") {
    btnColorMode.classList.remove("active");
  } else if (currentMode === "rainbow") {
    btnRainbowMode.classList.remove("active");
  } else if (currentMode === "lighten") {
    btnLighten.classList.remove("active");
  } else if (currentMode === "eraser") {
    btnEraser.classList.remove("active");
  }

  if (mode === "color") {
    btnColorMode.classList.add("active");
  } else if (mode === "rainbow") {
    btnRainbowMode.classList.add("active");
  } else if (mode === "lighten") {
    btnLighten.classList.add("active");
  } else if (mode === "eraser") {
    btnEraser.classList.add("active");
  }
}

window.onload = () => {
  updateSizeValue(DEFAULT_SIZE);
  createGridElement(DEFAULT_SIZE);
  activeButton(DEFAULT_MODE);
};
