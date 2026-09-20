// FirstMobileApp/Components/ItemImage.js
import { Image, Text } from 'react-native';
import { DRINK_IMAGES, CATEGORY_IMAGES, LOGO_IMAGE, toSource } from '../Data/images';

export default function ItemImage({ id, emoji, size = 40, style, radius = 10 }) {
  const source = toSource(DRINK_IMAGES[id]);

  if (!source) {
    return <Text style={[{ fontSize: size }, style]}>{emoji}</Text>;
  }

  // Real photo: fill the parent box completely, cropped to fit, corners rounded to match the card.
  return (
    <Image
      source={source}
      style={[{ width: '100%', height: '100%', borderRadius: radius }, style]}
      resizeMode="cover"
    />
  );
}

export function CategoryIcon({ category, emoji, size = 18 }) {
  const source = toSource(CATEGORY_IMAGES[category]);

  if (!source) return <Text style={{ fontSize: size }}>{emoji}</Text>;

  return (
    <Image
      source={source}
      style={{ width: size, height: size, borderRadius: size / 4 }}
      resizeMode="cover"
    />
  );
}

export function ShopLogo({ size = 32, style }) {
  const source = toSource(LOGO_IMAGE);

  if (!source) return <Text style={[{ fontSize: size }, style]}>☕</Text>;

  return (
    <Image
      source={source}
      style={[{ width: size, height: size, borderRadius: size / 2 }, style]}
      resizeMode="cover"
    />
  );
}