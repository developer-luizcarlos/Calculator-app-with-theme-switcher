"use strict";
// Imports
import { format } from "./utils.js";
// DOM elements
const $calcScreen = document.querySelector(".calc__screen");
const $calcBtnDelete = document.querySelector(".calc__btn-delete");
const $calcBtnResult = document.querySelector(".calc__result-key");
const $calcBtnReset = document.querySelector(".calc__reset-key");
const $calcBtnNumber = document.querySelectorAll(".calc__number-key");
const $calcBtnOperation = document.querySelectorAll(".calc__operational-key");
// Functions
function setCalcScreenValue(value) {
    if ($calcScreen) {
        $calcScreen.value = value;
    }
}
function getCalcScreenValue() {
    if ($calcScreen) {
        return $calcScreen.value;
    }
}
function isLastCharNan() {
    if ($calcScreen) {
        const lastChar = getCalcScreenValue().at(-1);
        return isNaN(parseFloat(lastChar));
    }
    return false;
}
function addNumberToScreen(item) {
    let calcValue = getCalcScreenValue();
    if (calcValue) {
        const dataValue = item.getAttribute("data-value");
        const newCalcValue = calcValue === "0" ? dataValue : calcValue += dataValue;
        setCalcScreenValue(newCalcValue ?? "0");
    }
}
function addOperationalToScreen(item) {
    if (isLastCharNan())
        return;
    let calcValue = getCalcScreenValue();
    if (calcValue && !isLastCharNan()) {
        const dataValue = item.getAttribute("data-value");
        setCalcScreenValue(calcValue += dataValue);
    }
}
function deleteFromCalcScren() {
    if ($calcScreen) {
        const calcValue = getCalcScreenValue();
        const slicedValue = calcValue?.slice(0, -1);
        const newValue = calcValue === "0" || calcValue.length === 1 ? "0" : slicedValue;
        setCalcScreenValue(newValue);
    }
}
function evaluateExpression() {
    if ($calcScreen && getCalcScreenValue() && !isLastCharNan()) {
        const evaluate = new Function(`return ${getCalcScreenValue()}`);
        setCalcScreenValue(format(evaluate()));
    }
}
function resetCalc() {
    if ($calcScreen) {
        setCalcScreenValue("0");
    }
}
// Functions applied
if ($calcBtnNumber) {
    $calcBtnNumber.forEach(btnNumber => {
        btnNumber.addEventListener("click", function () {
            addNumberToScreen(btnNumber);
        });
    });
}
if ($calcBtnOperation) {
    $calcBtnOperation.forEach(btnOp => {
        btnOp.addEventListener("click", function () {
            addOperationalToScreen(btnOp);
        });
    });
}
if ($calcBtnDelete) {
    $calcBtnDelete.addEventListener("click", deleteFromCalcScren);
}
if ($calcBtnReset) {
    $calcBtnReset.addEventListener("click", resetCalc);
}
if ($calcBtnResult) {
    $calcBtnResult.addEventListener("click", evaluateExpression);
}
