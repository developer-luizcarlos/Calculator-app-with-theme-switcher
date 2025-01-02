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
