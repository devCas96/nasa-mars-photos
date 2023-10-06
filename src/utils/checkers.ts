/**
 * Checks if the given string is a valid Earth date in the 'YYYY-MM-DD' format.
 * @param {string} dateString - The date string to validate.
 * @returns {boolean} - True if the date is valid; otherwise, false.
 */
export const isValidEarthDate = (dateString: string): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false;
  return d.toISOString().slice(0, 10) === dateString;
};

/**
 * Checks if the given string is a valid Sun date (a positive number).
 * @param {string} date - The date string to validate.
 * @returns {boolean} - True if the date is valid; otherwise, false.
 */
export const isValidSunDate = (date: string): boolean => /^\d+$/.test(date);
