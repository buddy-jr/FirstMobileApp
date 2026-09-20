// FirstMobileApp/Components/SplashScreen.js
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BROWN, CREAM } from '../Data/menuData';
import { ShopLogo } from './ItemImage';

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ShopLogo size={90} />
      <Text style={styles.title}>Kapi kam MCO1</Text>
      <Text style={styles.subtitle}>COFFEE SHOP</Text>
      <Text style={styles.tagline}>Good Coffee. Better Days.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BROWN, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 28, fontWeight: '800', marginTop: 10 },
  subtitle: { color: CREAM, fontSize: 12, letterSpacing: 2, marginTop: 4 },
  tagline: { color: CREAM, fontStyle: 'italic', marginTop: 20 },
});