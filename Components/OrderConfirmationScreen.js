// FirstMobileApp/Components/OrderConfirmationScreen.js
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BROWN, CREAM } from '../Data/menuData';

export default function OrderConfirmationScreen({ order, onBackHome, onViewOrders }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="checkmark" size={40} color="#fff" />
      </View>

      <Text style={styles.title}>Pre - Order confirmed</Text>
      <Text style={styles.subtitle}>Show this code at the counter.</Text>

      <View style={styles.codeBox}>
        <Text style={styles.codeLabel}>Pick-up code</Text>
        <Text style={styles.code}>{order?.pickupCode}</Text>
      </View>

      <View style={styles.details}>
        <Row icon="storefront-outline" text={order?.branch} />
        <Row icon="time-outline" text={`${order?.pickupDay} at ${order?.pickupTime}`} />
        <Row icon="card-outline" text={`${order?.payment} · ₱${order?.total}`} />
        <Row icon="person-outline" text={`${order?.name} · ${order?.phone}`} />
      </View>

      <TouchableOpacity style={styles.btn} onPress={onBackHome}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Back to Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnGhost} onPress={onViewOrders}>
        <Text style={{ color: BROWN, fontWeight: '700' }}>View my Pre-orders</Text>
      </TouchableOpacity>
    </View>
  );
}

function Row({ icon, text }) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={16} color={BROWN} />
      <Text style={styles.rowText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  iconCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: BROWN, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginTop: 16 },
  subtitle: { textAlign: 'center', color: '#888', marginTop: 6 },
  codeBox: { backgroundColor: CREAM, borderRadius: 14, paddingVertical: 16, paddingHorizontal: 32, alignItems: 'center', marginTop: 20 },
  codeLabel: { color: '#8a7565', fontSize: 12 },
  code: { fontSize: 30, fontWeight: '800', color: BROWN, letterSpacing: 2, marginTop: 4 },
  details: { alignSelf: 'stretch', marginTop: 24, gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowText: { flex: 1, color: '#555', fontSize: 13 },
  btn: { backgroundColor: BROWN, paddingHorizontal: 30, paddingVertical: 14, borderRadius: 10, marginTop: 28, alignSelf: 'stretch', alignItems: 'center' },
  btnGhost: { paddingVertical: 14, alignItems: 'center', alignSelf: 'stretch' },
});