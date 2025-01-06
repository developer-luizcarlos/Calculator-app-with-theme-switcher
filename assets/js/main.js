"use strict";
// DOM elements
const $calcScreen = document.querySelector("#calc__screen");
const $calcDeleteKey = document.querySelector("#calc__delKey");
const $calcResetKey = document.querySelector("#calc__resetKey");
const $calcResultKey = document.querySelector("#calc__resultKey");
const $calcToggleBall = document.querySelector("#calc__toggleBall");
const $calcNumberKeys = Array.from(
  document.querySelectorAll(".calc__numberKey")
);
const $calcOperationalKeys = Array.from(
  document.querySelectorAll(".calc__operationalKey")
);
const $calcRadioSwitcher = Array.from(
  document.querySelectorAll(".calc__radio")
);

// Functions

/*
  It changes the value of the theme selected, apllying
  to the body the new ID calling the determineBodyTheme
  function as well and changing the toggle icon position.
*/
function changeCalcTheme(index) {
  localStorage.setItem("theme", `theme0${index + 1}`);

  determineBodyTheme();
  changeToggleBallPosition();
}

/*
  This function search for a value saved in the localStorage with 
  the name 'theme0${?}', which '?' symbol could be 1, 2 or 3.
  If there's no value saved, the default value will be 'theme01'.
*/
function determineBodyTheme() {
  const savedTheme = localStorage.getItem("theme");
  const themeSelected = savedTheme === null ? "theme01" : savedTheme;

  document.body.setAttribute("id", `${themeSelected}`);
}

function changeToggleBallPosition() {
  const bodyID = document.body.id;

  if (bodyID === "theme01") {
    $calcToggleBall.style.left = "4%";
  } else if (bodyID === "theme02") {
    $calcToggleBall.style.left = "40%";
  } else {
    $calcToggleBall.style.left = "70%";
  }
}

function evaluateExpression() {
  const calcScreenValue = $calcScreen.value;
  const evalExpression = eval(calcScreenValue);
  const notDecimalExpression = evalExpression == Math.round(evalExpression);

  try {
    $calcScreen.value = notDecimalExpression
      ? evalExpression
      : evalExpression.toFixed(5);
  } catch {
    $calcScreen.value = "0";
  }

  disabledButtonResult();
}

function addNumberToScreen(element) {
  const calcScreenValue = Number($calcScreen.value);
  const value = element.getAttribute("data-value");

  if (calcScreenValue === 0) {
    $calcScreen.value = value;
  } else {
    $calcScreen.value += value;
  }

  disabledButtonResult();
}

/*
    if the last digit on calc is a number, a special character will be added to 
    the calc screen
  */
function addSpecialCharToScreen(element) {
  const value = element.getAttribute("data-value");

  if (!isLastCharNan()) {
    $calcScreen.value += value;
  }

  disabledButtonResult();
}

function eraseCharacter() {
  const calcScreenValue = $calcScreen.value;
  const calcScreenLastCharacter = calcScreenValue.substring(
    0,
    calcScreenValue.length - 1
  );
  const newCalcValue = calcScreenLastCharacter;

  const condition =
    calcScreenValue === "0" ||
    calcScreenValue.length <= 1 ||
    /[-]/g.test(calcScreenValue);

  $calcScreen.value = condition ? "0" : newCalcValue;

  disabledButtonResult();
}

/* 
    * verify if the last digit on calc is a special character.

    * This function is being used to disable the result button if the return 
    is true inside the function called disabledButtonResult().

    * This function is also being called inside tha function
    addSpecialCharToScreen(), which adds a operational symbol
    on the calc screen
*/
function isLastCharNan() {
  const calcScreenValue = $calcScreen.value.toString();
  const calcScreenLastChar = calcScreenValue[calcScreenValue.length - 1];

  return isNaN(Number(calcScreenLastChar));
}

function resetCalcScreenValue() {
  $calcScreen.value = "0";
}

/*
    Function that add the disabled attribute to
    the result button when the last character 
    on the calculator screen is a mathematical 
    operation symbol or a special character or 
    even if the last two characters are a division 
    or a product of any number by zero created.
  */
function disabledButtonResult() {
  const twoLastCharIsOperation = /[/*]0$/g.test($calcScreen.value);

  if (isLastCharNan() || twoLastCharIsOperation) {
    $calcResultKey.setAttribute("disabled", "disabled");
  } else if (!isLastCharNan()) {
    $calcResultKey.removeAttribute("disabled");
  }
}

// Functions applied
window.addEventListener("load", resetCalcScreenValue);

window.addEventListener("load", determineBodyTheme);

window.addEventListener("load", changeToggleBallPosition);

$calcResetKey.addEventListener("click", resetCalcScreenValue);

$calcDeleteKey.addEventListener("click", eraseCharacter);

$calcResultKey.addEventListener("click", evaluateExpression);

$calcNumberKeys.forEach((numberKey) => {
  numberKey.addEventListener("click", (e) => {
    addNumberToScreen(e.target);
  });
});

$calcOperationalKeys.forEach((operationalKey) => {
  operationalKey.addEventListener("click", (e) => {
    addSpecialCharToScreen(e.target);
  });
});

$calcRadioSwitcher.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    changeCalcTheme(index);
  });
});
