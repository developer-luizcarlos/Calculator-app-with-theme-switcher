export function format(number, locale = "pt-br", options = {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}) {
    return Intl.NumberFormat(locale, options).format(number);
}
