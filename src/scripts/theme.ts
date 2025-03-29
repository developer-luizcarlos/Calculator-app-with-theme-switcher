"use strict";
// DOM elements
const $body: HTMLBodyElement | null = document.querySelector("body");
const $calcInputs: NodeListOf<HTMLInputElement> | null = document.querySelectorAll(".calc__toggle-radio");

// Functions
const applyTheme = () => {
  const theme = getTheme();
  if($body) {
    $body.setAttribute("class", theme);
  }
  updateThumbLeft();
};

const getTheme = (): string => {
  return localStorage.getItem("theme") ?? "theme-1";
};

const saveTheme = (index: number) => {
  const saveTheme = localStorage.setItem("theme", `theme-${index + 1}`);
};

const setTheme = (index: number) => {
  saveTheme(index);
  const theme = getTheme();
  applyTheme();
};

const updateThumbLeft = () => {
  const $calcToggleBall: HTMLSpanElement | null = document.querySelector(".calc__toggle-ball");
  const theme = getTheme();
  let toggleLeft: number = 0;

  switch(theme) {
    case "theme-1":
      toggleLeft = 4;
      break;
    case "theme-2":
      toggleLeft = 40;
      break;
    case "theme-3":
      toggleLeft = 70;
      break;
    default:
      toggleLeft = 4;
      break;
  }

  if($calcToggleBall) {
    $calcToggleBall.style.left = `${toggleLeft}%`;
  }
};

// Functions applied
window.addEventListener("load", applyTheme);

if($calcInputs) {
  $calcInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      setTheme(index);
    });
  });
}