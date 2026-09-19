export const DRINKS = [
  // Coffee
  { id: '1', name: 'Iced Latte', category: 'Coffee', emoji: '🧊', prices: { Small: 95, Medium: 110, Large: 125 } },
  { id: '2', name: 'Americano', category: 'Coffee', emoji: '☕', prices: { Small: 75, Medium: 85, Large: 95 } },
  { id: '3', name: 'Cappuccino', category: 'Coffee', emoji: '☕', prices: { Small: 90, Medium: 100, Large: 110 } },
  { id: '4', name: 'Caramel Macchiato', category: 'Coffee', emoji: '🍮', prices: { Small: 110, Medium: 120, Large: 130 } },
  { id: '5', name: 'Mocha', category: 'Coffee', emoji: '🍫', prices: { Small: 105, Medium: 115, Large: 125 } },

  // Non-Coffee
  { id: '6', name: 'Matcha Latte', category: 'Non-Coffee', emoji: '🍵', prices: { Small: 100, Medium: 115, Large: 130 } },
  { id: '7', name: 'Hot Chocolate', category: 'Non-Coffee', emoji: '🍫', prices: { Small: 90, Medium: 105, Large: 120 } },
  { id: '8', name: 'Strawberry Milk', category: 'Non-Coffee', emoji: '🍓', prices: { Small: 95, Medium: 110, Large: 125 } },
  { id: '9', name: 'Taro Milk Tea', category: 'Non-Coffee', emoji: '🟣', prices: { Small: 100, Medium: 115, Large: 130 } },

  // Pastries
  { id: '10', name: 'Butter Croissant', category: 'Pastries', emoji: '🥐', prices: { Small: 65, Medium: 65, Large: 65 } },
  { id: '11', name: 'Blueberry Muffin', category: 'Pastries', emoji: '🧁', prices: { Small: 70, Medium: 70, Large: 70 } },
  { id: '12', name: 'Chocolate Cookie', category: 'Pastries', emoji: '🍪', prices: { Small: 55, Medium: 55, Large: 55 } },
  { id: '13', name: 'Cinnamon Roll', category: 'Pastries', emoji: '🍥', prices: { Small: 80, Medium: 80, Large: 80 } },
];

export const CATEGORIES = ['Coffee', 'Non-Coffee', 'Pastries'];

export const SIZES = ['Small', 'Medium', 'Large'];

export const SUGAR_LEVELS = [
  { label: '0%', sub: 'Unsweet' },
  { label: '25%', sub: 'Less Sweet' },
  { label: '50%', sub: 'Regular' },
  { label: '75%', sub: 'Sweet' },
  { label: '100%', sub: 'Very Sweet' },
];

export const BROWN = '#6B3E26';
export const CREAM = '#FBF3E9';