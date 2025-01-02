"use strict";
// DOM elements
const $calcScreen = document.querySelector("#calc__screen");
const $calcDeleteKey = document.querySelector("#calc__delKey");
const $calcResetKey = document.querySelector("#calc__resetKey");
const $calcResultKey = document.querySelector("#calc__resultKey");
const $calcNumberKeys = Array.from(
  document.querySelectorAll(".calc__numberKey")
);
const $calcOperationalKeys = Array.from(
  document.querySelectorAll(".calc__operationalKey")
);

// Function
function evaluateExpression() {
  try {
    $calcScreen.value = eval($calcScreen.value);
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

function addSpecialCharToScreen(element) {
  const calcScreenValue = Number($calcScreen.value);
  const value = element.getAttribute("data-value");

  const calcLastCharIsNan = isLastCharNan();

  /*
    if the last digit on calc is a number and the unique value on
    calc screen isn't zero, a special character will be added to 
    the calc screen
  */
  if (!calcLastCharIsNan && calcScreenValue !== 0) {
    $calcScreen.value += value;
  }

  disabledButtonResult();
}

function eraseCharacter() {
  const calcScreenValue = $calcScreen.value;
  const newCalcValue = calcScreenValue.substring(0, calcScreenValue.length - 1);

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
