export function format(number, locale = "pt-br", option) {
    return Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}
