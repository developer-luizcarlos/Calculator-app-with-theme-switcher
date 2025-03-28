"use strict";
// Imports
import { format } from "./utils.js";

// DOM elements
const $calcScreen: HTMLInputElement | null =
  document.querySelector(".calc__screen");
const $calcBtnDelete: HTMLButtonElement | null =
  document.querySelector(".calc__btn-delete");
const $calcBtnResult: HTMLButtonElement | null =
  document.querySelector(".calc__result-key");
const $calcBtnReset: HTMLButtonElement | null =
  document.querySelector(".calc__reset-key");
const $calcBtnNumber: NodeListOf<HTMLButtonElement> | null =
  document.querySelectorAll(".calc__number-key");
const $calcBtnOperation: NodeListOf<HTMLButtonElement> | null =
  document.querySelectorAll(".calc__operational-key");

// Functions
const setCalcScreenValue = (value: string): void => {
  if ($calcScreen) {
    $calcScreen.value = value;
  }
};

const getCalcScreenValue = (): string | undefined => {
  if ($calcScreen) {
    return $calcScreen.value;
  }
};

const isLastCharNan = (): boolean => {
  if ($calcScreen) {
    const lastChar = <string>getCalcScreenValue()!.at(-1);
    return isNaN(parseFloat(lastChar));
  }

  return false;
};

const addNumberToScreen = (item: HTMLButtonElement): void => {
  let calcValue = <string>getCalcScreenValue();

  if (calcValue) {
    const dataValue = <string>item.getAttribute("data-value");
    const newCalcValue =
      <string>calcValue === "0" ? dataValue : (calcValue += dataValue);
    setCalcScreenValue(newCalcValue ?? "0");
  }
};

const addOperationalToScreen = (item: HTMLButtonElement): void => {
  if (isLastCharNan()) return;

  let calcValue = <string>getCalcScreenValue();
  if (calcValue && !isLastCharNan()) {
    const dataValue = <string>item.getAttribute("data-value");
    setCalcScreenValue((calcValue += dataValue));
  }
};

const deleteFromCalcScren = (): void => {
  if ($calcScreen) {
    const calcValue = <string>getCalcScreenValue();
    const slicedValue = <string>calcValue?.slice(0, -1);
    const newValue =
      <string>calcValue === "0" || calcValue.length === 1 ? "0" : slicedValue;

    setCalcScreenValue(newValue);
  }
};

const evaluateExpression = (): void => {
  if ($calcScreen && getCalcScreenValue() && !isLastCharNan()) {
    const evaluate = new Function(`return ${getCalcScreenValue()}`);
    setCalcScreenValue(format(evaluate()));
  }
};

const keyboardEvents = (e: KeyboardEvent) => {
  const keyPressed = e.key;
  const isKeyNumber = !isNaN(parseFloat(keyPressed));
  const isOperator =
    keyPressed === "*" ||
    keyPressed === "/" ||
    keyPressed === "+" ||
    keyPressed === "-" ||
    keyPressed === ".";

  const events = {
    keyboardBtnNumber: () => {
      if (!isKeyNumber) return;

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
      if (isKeyNumber || !isOperator) return;

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
      if (isKeyNumber || isOperator) return;

      if (
        $calcBtnDelete &&
        (keyPressed === "Delete" || keyPressed === "Backspace")
      ) {
        $calcBtnDelete.click();
      }
    },

    keyboardReset: () => {
      if (isKeyNumber || isOperator) return;

      if ($calcBtnReset && keyPressed === "Escape") {
        $calcBtnReset.click();
      }
    },

    keyboardBtnResult: () => {
      if (isKeyNumber || isOperator) return;

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

const resetCalc = (): void => {
  if ($calcScreen) {
    setCalcScreenValue("0");
  }
};

// Functions applied
document.addEventListener("keydown", (e: KeyboardEvent) => {
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
