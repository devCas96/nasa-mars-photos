/**
 * Checks if the given string is a valid Earth date in the 'YYYY-MM-DD' format.
 * @param {string} dateString - The date string to validate.
 * @returns {boolean} - True if the date is valid; otherwise, false.
 */
export const isValidEarthDate = (dateString: string): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  const date = new Date(dateString);
  const numericDate = date.getTime();

  if (!dateString.match(regEx)) return false;
  if (!numericDate && numericDate !== 0) return false;

  return date.toISOString().slice(0, 10) === dateString;
};

/**
 * Checks if the given string is a valid Sun date (a positive number).
 * @param {string} date - The date string to validate.
 * @returns {boolean} - True if the date is valid; otherwise, false.
 */
export const isValidSunDate = (date: string): boolean => /^\d+$/.test(date);
