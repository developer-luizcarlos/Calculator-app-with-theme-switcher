export function format(number: number, locale: string = "pt-br", option?: Intl.NumberFormatOptions): string {
  return Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
}