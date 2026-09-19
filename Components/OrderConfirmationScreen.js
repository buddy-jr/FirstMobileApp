import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BROWN } from '../Data/menuData';

export default function OrderConfirmationScreen({ order, onBackHome }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="checkmark" size={40} color="#fff" />
      </View>
      <Text style={styles.title}>Order Placed!</Text>
      <Text style={styles.subtitle}>Thank you for your order.{'\n'}Your coffee is on the way!</Text>
      <Text style={{ marginTop: 10, color: '#888' }}>Total: ₱{order?.total}</Text>

      <TouchableOpacity style={styles.btn} onPress={onBackHome}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  iconCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: BROWN, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginTop: 16 },
  subtitle: { textAlign: 'center', color: '#888', marginTop: 8 },
  btn: { backgroundColor: BROWN, paddingHorizontal: 30, paddingVertical: 14, borderRadius: 10, marginTop: 30 },
});