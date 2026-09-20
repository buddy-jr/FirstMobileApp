// FirstMobileApp/Data/images.js
//
// HOW TO USE YOUR OWN PICTURES
//
// 1. Make these folders inside FirstMobileApp:
//        assets/drinks/
//        assets/categories/
// 2. Drop your .png / .jpg files inside (square images look best, ~300x300).
// 3. Uncomment the matching line below and fix the filename.
//
// Anything left commented out keeps showing the emoji, so the app never
// crashes while you're still collecting images.
//
// Remote images work too — just use a string instead of require():
//        '1': 'https://example.com/iced-latte.png',

export const DRINK_IMAGES = {
  // Coffee
   '1': require('../assets/drinks/iced-latte.jpg'),
   '2': require('../assets/drinks/American.jpg'),
   '3': require('../assets/drinks/Cappuccino.jpg'),
   '4': require('../assets/drinks/Caramel-Macchiato.jpg'),
   '5': require('../assets/drinks/Mocha.jpg'),

  // Non-Coffee
   '6': require('../assets/drinks/Matcha-latte.jpg'),
   '7': require('../assets/drinks/hot-chocolate.jpg'),
   '8': require('../assets/drinks/strawberry.jpg'),
   '9': require('../assets/drinks/taro.jpg'),

  // Pastries
   '10': require('../assets/drinks/croissant.jpg'),
   '11': require('../assets/drinks/blueberry.jpg'),
   '12': require('../assets/drinks/cookie.jpg'),
   '13': require('../assets/drinks/Cinnamon.jpg'),
};

export const CATEGORY_IMAGES = {
  // Coffee: require('../assets/categories/coffee.png'),
  // 'Non-Coffee': require('../assets/categories/non-coffee.png'),
  // Pastries: require('../assets/categories/pastries.png'),
};

// Logo in the header bar, splash and login screens (optional)
export const LOGO_IMAGE = require('../assets/logo.png');

// Turns require(...) results, URL strings and null into something <Image /> understands.
export function toSource(value) {
  if (!value) return null;
  if (typeof value === 'string') return { uri: value };
  return value;


}

