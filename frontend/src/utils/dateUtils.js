import { format, addDays, differenceInDays, parseISO } from 'date-fns';
import { HEBREW_DAYS } from './constants';

/**
 * Generate array of dates between start and end
 */
export function generateDateRange(startDate, endDate) {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  const days = differenceInDays(end, start) + 1;
  const dates = [];
  
  for (let i = 0; i < days; i++) {
    dates.push(addDays(start, i));
  }
  
  return dates;
}

/**
 * Format date to YYYY-MM-DD
 */
export function formatDateISO(date) {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Get Hebrew day name
 */
export function getHebrewDayName(date) {
  const dayIndex = date.getDay();
  return HEBREW_DAYS[dayIndex];
}

/**
 * Format date for display (e.g., "20")
 */
export function formatDayNumber(date) {
  return format(date, 'd');
}

/**
 * Format month and year (e.g., "אוקטובר 2025")
 */
export function formatMonthYear(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const hebrewMonths = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];
  return `${hebrewMonths[month]} ${year}`;
}

/**
 * Check if date is today
 */
export function isToday(date) {
  const today = new Date();
  return formatDateISO(date) === formatDateISO(today);
}

/**
 * Check if date is in the past
 */
export function isPast(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/**
 * Check if date is weekend (Friday/Saturday in Israel)
 */
export function isWeekend(date) {
  const day = date.getDay();
  return day === 5 || day === 6; // Friday or Saturday
}

/**
 * Get days remaining until target date
 */
export function getDaysRemaining(targetDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = typeof targetDate === 'string' ? parseISO(targetDate) : targetDate;
  return differenceInDays(target, today);
}