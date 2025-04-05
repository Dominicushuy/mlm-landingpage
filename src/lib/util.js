import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind's className merging
 * This prevents class conflicts and provides a clean API
 * @param {...string} inputs - Class names to merge
 * @returns {string} - Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as currency
 * @param {number} value - The amount to format
 * @param {string} currency - The currency code (default: VND)
 * @param {string} locale - The locale to use (default: vi-VN)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value, currency = "VND", locale = "vi-VN") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a number with commas for thousands
 * @param {number} value - The number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number
 */
export function formatNumber(value, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Truncates text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text with ellipsis if needed
 */
export function truncateText(text, length = 100) {
  if (!text || text.length <= length) return text;
  return text.slice(0, length) + "...";
}

/**
 * Generates a unique ID
 * @returns {string} A unique ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Creates a debounced function that delays invoking the provided function
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} The debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Formats a date
 * @param {Date|string|number} date - The date to format
 * @param {string} format - The format to use (default: 'dd/MM/yyyy')
 * @returns {string} Formatted date string
 */
export function formatDate(date, format = "dd/MM/yyyy") {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return format.replace("dd", day).replace("MM", month).replace("yyyy", year);
}
