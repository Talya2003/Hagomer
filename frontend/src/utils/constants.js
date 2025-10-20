// Calendar dates
export const START_DATE = import.meta.env.VITE_START_DATE || '2025-10-20';
export const END_DATE = import.meta.env.VITE_END_DATE || '2026-02-20';
export const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'טבלת הגומר';

// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Colors
export const COLORS = {
  gold: '#D4AF37',
  goldLight: '#FFD700',
  goldDark: '#B8860B',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#f3f4f6',
};

// Hebrew days of the week
export const HEBREW_DAYS = [
  'יום ראשון',
  'יום שני',
  'יום שלישי',
  'יום רביעי',
  'יום חמישי',
  'יום שישי',
  'שבת'
];

// Hebrew months (Gregorian)
export const HEBREW_MONTHS_GREGORIAN = [
  'ינואר',
  'פברואר',
  'מרץ',
  'אפריל',
  'מאי',
  'יוני',
  'יולי',
  'אוגוסט',
  'ספטמבר',
  'אוקטובר',
  'נובמבר',
  'דצמבר'
];