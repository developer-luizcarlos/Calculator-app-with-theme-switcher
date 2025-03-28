declare const $calcScreen: HTMLInputElement | null;
declare const $calcBtnDelete: HTMLButtonElement | null;
declare const $calcBtnResult: HTMLButtonElement | null;
declare const $calcBtnReset: HTMLButtonElement | null;
declare const $calcBtnNumber: NodeListOf<HTMLButtonElement> | null;
declare const $calcBtnOperation: NodeListOf<HTMLButtonElement> | null;
declare function setCalcScreenValue(value: string): void;
declare function getCalcScreenValue(): string | undefined;
declare function isLastCharNan(): boolean;
declare function addNumberToScreen(item: HTMLButtonElement): void;
declare function addOperationalToScreen(item: HTMLButtonElement): void;
declare function deleteFromCalcScren(): void;
declare function evaluateExpression(): void;
declare function resetCalc(): void;
