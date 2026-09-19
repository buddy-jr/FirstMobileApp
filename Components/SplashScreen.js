import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BROWN, CREAM } from '../Data/menuData';

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000); // 2 seconds like the poster says
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 60 }}>☕</Text>
      <Text style={styles.title}>Brew & Bean</Text>
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