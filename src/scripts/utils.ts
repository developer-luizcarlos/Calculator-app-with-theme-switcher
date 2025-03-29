export function format(
  number: number,
  locale: string = "pt-br",
  options: Intl.NumberFormatOptions = {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
): string {
  return Intl.NumberFormat(locale, options).format(number);
}
