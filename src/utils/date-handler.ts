/**
 * Get the current date and time as a JavaScript Date object.
 *
 * @returns {Date} The current date and time.
 */
export function getCurrentDate(): Date {
  return new Date();
}

/**
 * Format a JavaScript Date object as a string in "YYYY-MM-DD" format.
 *
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export function formatDate(date: Date): string {

  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const day: string = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
