
/**
 * Storage utilities for OtakuVerse
 */

// Create namespace to avoid global scope pollution
window.utils = window.utils || {};

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to save
 */
window.utils.saveToStorage = (key, data) => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.error('Error saving to localStorage', err);
  }
};

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @return {any} - Parsed data or defaultValue
 */
window.utils.getFromStorage = (key, defaultValue = null) => {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) return defaultValue;
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Error reading from localStorage', err);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - Storage key
 */
window.utils.removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Error removing from localStorage', err);
  }
};

/**
 * Check if a key exists in localStorage
 * @param {string} key - Storage key
 * @return {boolean} - Whether key exists
 */
window.utils.hasStorageItem = (key) => {
  try {
    return localStorage.getItem(key) !== null;
  } catch (err) {
    console.error('Error checking localStorage', err);
    return false;
  }
};
