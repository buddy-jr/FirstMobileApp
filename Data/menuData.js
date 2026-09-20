// FirstMobileApp/Data/menuData.js
export const DRINKS = [
  // Coffee
  { id: '1', name: 'Iced Latte', category: 'Coffee', prices: { Small: 95, Medium: 110, Large: 125 } },
  { id: '2', name: 'Americano', category: 'Coffee', prices: { Small: 75, Medium: 85, Large: 95 } },
  { id: '3', name: 'Cappuccino', category: 'Coffee', prices: { Small: 90, Medium: 100, Large: 110 } },
  { id: '4', name: 'Caramel Macchiato', category: 'Coffee', prices: { Small: 110, Medium: 120, Large: 130 } },
  { id: '5', name: 'Mocha', category: 'Coffee', prices: { Small: 105, Medium: 115, Large: 125 } },

  // Non-Coffee
  { id: '6', name: 'Matcha Latte', category: 'Non-Coffee', prices: { Small: 100, Medium: 115, Large: 130 } },
  { id: '7', name: 'Hot Chocolate', category: 'Non-Coffee', prices: { Small: 90, Medium: 105, Large: 120 } },
  { id: '8', name: 'Strawberry Milk', category: 'Non-Coffee', prices: { Small: 95, Medium: 110, Large: 125 } },
  { id: '9', name: 'Taro Milk Tea', category: 'Non-Coffee', prices: { Small: 100, Medium: 115, Large: 130 } },

  // Pastries
  { id: '10', name: 'Butter Croissant', category: 'Pastries', prices: { Small: 65, Medium: 65, Large: 65 } },
  { id: '11', name: 'Blueberry Muffin', category: 'Pastries', prices: { Small: 70, Medium: 70, Large: 70 } },
  { id: '12', name: 'Chocolate Cookie', category: 'Pastries', prices: { Small: 55, Medium: 55, Large: 55 } },
  { id: '13', name: 'Cinnamon Roll', category: 'Pastries', prices: { Small: 80, Medium: 80, Large: 80 } },
];

export const CATEGORIES = ['Coffee', 'Non-Coffee', 'Pastries'];

// Emoji shown on the chips until you register a picture in Data/images.js
export const CATEGORY_EMOJIS = {
  Coffee: '☕',
  'Non-Coffee': '🧋',
  Pastries: '🥐',
};

export const SIZES = ['Small', 'Medium', 'Large'];

export const SUGAR_LEVELS = [
  { label: '0%', sub: 'Unsweet' },
  { label: '25%', sub: 'Less Sweet' },
  { label: '50%', sub: 'Regular' },
  { label: '75%', sub: 'Sweet' },
  { label: '100%', sub: 'Very Sweet' },
];

// ----- Pick-up reservation (no delivery) -----------------------------------

export const BRANCHES = [
  { id: 'b1', name: 'Kapi kam MCO1 — Main', address: 'Nijaga St., Calbayog City', hours: '7:00 AM – 9:00 PM' },
  { id: 'b2', name: 'Kapi kam MCO1 — Plaza', address: 'Magsaysay Blvd., Calbayog City', hours: '8:00 AM – 8:00 PM' },
  { id: 'b3', name: 'Kapi kam MCO1 — Campus', address: 'Beside the university gate', hours: '7:30 AM – 7:00 PM' },
];

export const PAYMENT_METHODS = ['Pay at counter', 'GCash(comming soon)', 'Maya(comming soon)'];

// How many days ahead a customer is allowed to schedule a reservation.
export const MAX_BOOKING_DAYS_AHEAD = 30;

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

export function toDayKey(date) {
  return date.toDateString();
}

export function formatDayLabel(date) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (sameDay(date, today)) return `Today, ${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
  if (sameDay(date, tomorrow)) return `Tomorrow, ${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

/**
 * Builds a month grid (Sun–Sat) for the calendar picker.
 * Returns { monthLabel, weeks } where weeks is an array of 7-cell rows;
 * each cell is either null (padding) or { date, dayNumber, disabled }.
 */
export function getMonthGrid(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + MAX_BOOKING_DAYS_AHEAD);

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const disabled = date < today || date > maxDate;
    cells.push({ date, dayNumber: d, disabled });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return {
    monthLabel: firstOfMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
    weeks,
  };
}

/**
 * 30-minute pick-up slots from 7:00 AM to 8:30 PM for the given date.
 * If the date is today, slots less than 20 minutes away are hidden so the
 * staff still has time to prepare the order.
 */
export function getTimeSlots(date) {
  const today = new Date();
  const isToday = sameDay(date, today);
  const earliest = new Date();
  earliest.setMinutes(earliest.getMinutes() + 20);

  const slots = [];
  for (let h = 7; h <= 20; h++) {
    for (const m of [0, 30]) {
      const tooSoon =
        isToday &&
        (h < earliest.getHours() ||
          (h === earliest.getHours() && m < earliest.getMinutes()));
      if (tooSoon) continue;

      const hour12 = h % 12 === 0 ? 12 : h % 12;
      slots.push(`${hour12}:${m === 0 ? '00' : '30'} ${h < 12 ? 'AM' : 'PM'}`);
    }
  }
  return slots;
}

export const BROWN = '#6B3E26';
export const CREAM = '#FBF3E9';