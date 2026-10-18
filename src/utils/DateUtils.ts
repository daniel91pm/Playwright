export class DateUtils {
  /**
   * Suma días a una fecha base y la devuelve en formato DD/MM/YYYY
   */
  static getFormattedFutureDate(daysToAdd: number, baseDate: Date = new Date()): string {
    const targetDate = new Date(baseDate);
    targetDate.setDate(targetDate.getDate() + daysToAdd);

    const day = String(targetDate.getDate()).padStart(2, '0');
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const year = targetDate.getFullYear();

    return `${day}/${month}/${year}`;
  }
}