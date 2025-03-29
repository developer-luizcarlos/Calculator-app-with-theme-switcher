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
const setCalcScreenValue = (value) => {
    if ($calcScreen) {
        $calcScreen.value = value;
    }
};
const getCalcScreenValue = () => {
    if ($calcScreen) {
        return $calcScreen.value;
    }
};
const isLastCharNan = () => {
    if ($calcScreen) {
        const lastChar = getCalcScreenValue().at(-1);
        return isNaN(parseFloat(lastChar));
    }
    return false;
};
const addNumberToScreen = (item) => {
    let calcValue = getCalcScreenValue();
    if (calcValue) {
        const dataValue = item.getAttribute("data-value");
        const newCalcValue = calcValue === "0" ? dataValue : (calcValue += dataValue);
        setCalcScreenValue(newCalcValue ?? "0");
    }
};
const addOperationalToScreen = (item) => {
    if (isLastCharNan())
        return;
    let calcValue = getCalcScreenValue();
    if (calcValue && !isLastCharNan()) {
        const dataValue = item.getAttribute("data-value");
        setCalcScreenValue((calcValue += dataValue));
    }
};
const deleteFromCalcScren = () => {
    if ($calcScreen) {
        const calcValue = getCalcScreenValue();
        const slicedValue = calcValue?.slice(0, -1);
        const newValue = calcValue === "0" || calcValue.length === 1 ? "0" : slicedValue;
        setCalcScreenValue(newValue);
    }
};
const evaluateExpression = () => {
    if ($calcScreen && getCalcScreenValue() && !isLastCharNan()) {
        const evaluate = new Function(`return ${getCalcScreenValue()}`);
        setCalcScreenValue(format(evaluate()));
    }
};
const keyboardEvents = (e) => {
    const keyPressed = e.key;
    const isKeyNumber = !isNaN(parseFloat(keyPressed));
    const isOperator = keyPressed === "*" ||
        keyPressed === "/" ||
        keyPressed === "+" ||
        keyPressed === "-" ||
        keyPressed === ".";
    const events = {
        keyboardBtnNumber: () => {
            if (!isKeyNumber)
                return;
            if ($calcBtnNumber) {
                $calcBtnNumber.forEach((btn) => {
                    const dataValue = btn.getAttribute("data-value");
                    if (dataValue === keyPressed.toString()) {
                        btn.click();
                    }
                });
            }
        },
        keyboardBtnOperational: () => {
            if (isKeyNumber || !isOperator)
                return;
            if ($calcBtnOperation) {
                $calcBtnOperation.forEach((btn) => {
                    const dataValue = btn.getAttribute("data-value");
                    if (dataValue === keyPressed.toString()) {
                        btn.click();
                    }
                });
            }
        },
        keyboardBtnDelete: () => {
            if (isKeyNumber || isOperator)
                return;
            if ($calcBtnDelete &&
                (keyPressed === "Delete" || keyPressed === "Backspace")) {
                $calcBtnDelete.click();
            }
        },
        keyboardReset: () => {
            if (isKeyNumber || isOperator)
                return;
            if ($calcBtnReset && keyPressed === "Escape") {
                $calcBtnReset.click();
            }
        },
        keyboardBtnResult: () => {
            if (isKeyNumber || isOperator)
                return;
            if ($calcBtnResult && keyPressed === "=") {
                $calcBtnResult.click();
            }
        },
        triggerEvents: function () {
            this.keyboardBtnNumber();
            this.keyboardBtnOperational();
            this.keyboardBtnDelete();
            this.keyboardReset();
            this.keyboardBtnResult();
        },
    };
    return events.triggerEvents();
};
const resetCalc = () => {
    if ($calcScreen) {
        setCalcScreenValue("0");
    }
};
// Functions applied
document.addEventListener("keydown", (e) => {
    keyboardEvents(e);
});
if ($calcBtnNumber) {
    $calcBtnNumber.forEach((btnNumber) => {
        btnNumber.addEventListener("click", () => {
            addNumberToScreen(btnNumber);
        });
    });
}
if ($calcBtnOperation) {
    $calcBtnOperation.forEach((btnOp) => {
        btnOp.addEventListener("click", () => {
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
