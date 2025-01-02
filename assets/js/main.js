"use strict";
// DOM elements
const $calcScreen = document.querySelector("#calc__screen");
const $calcResetKey = document.querySelector("#calc__resetKey");
const $calcResultKey = document.querySelector("#calc__resultKey");
const $calcNumberKeys = Array.from(
  document.querySelectorAll(".calc__numberKey")
);
const $calcOperationalKeys = Array.from(
  document.querySelectorAll(".calc__operationalKey")
);

// Function
function addNumberToScreen(element) {
  const calcScreenValue = Number($calcScreen.value);
  const value = element.getAttribute("data-value");

  if (calcScreenValue === 0) {
    $calcScreen.value = value;
  } else {
    $calcScreen.value += value;
  }
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
}

/* 
    * verify if the last digit on calc is a special character.

    * Use this same function to disable the result button if the return 
    is true later in another function that will be actived inside the
    both functions.
*/
function isLastCharNan() {
  const calcScreenValue = $calcScreen.value.toString();
  const calcScreenLastChar = calcScreenValue[calcScreenValue.length - 1];

  return isNaN(Number(calcScreenLastChar));
}

function resetCalcScreenValue() {
  $calcScreen.value = "0";
}

// Functions applied
window.addEventListener("load", resetCalcScreenValue);

$calcResetKey.addEventListener("click", resetCalcScreenValue);

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
