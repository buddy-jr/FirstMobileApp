// FirstMobileApp/Components/OrderHistoryScreen.js
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BROWN, CREAM } from '../Data/menuData';
import { useCart } from '../Context/CartContext';

const statusColor = (status) =>
  status === 'Cancelled' ? '#b00' : status === 'Picked up' ? '#2e7d32' : BROWN;

export default function OrderHistoryScreen({ onBack }) {
  const { orderHistory, cancelReservation } = useCart();

  const confirmCancel = (order) => {
    Alert.alert(
      'Cancel reservation?',
      `${order.pickupCode} · ${order.pickupDay} at ${order.pickupTime}`,
      [
        { text: 'Keep it', style: 'cancel' },
        { text: 'Cancel it', style: 'destructive', onPress: () => cancelReservation(order.orderId) },
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>My Reservations</Text>
      </View>

      <FlatList
        data={orderHistory}
        keyExtractor={(item) => item.orderId}
        ListEmptyComponent={
          <Text style={{ marginTop: 20, color: '#888' }}>
            No reservations yet. Add items to your cart and reserve a pick-up time.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.code}>{item.pickupCode}</Text>
              <Text style={[styles.status, { color: statusColor(item.status) }]}>{item.status}</Text>
            </View>

            <Text style={{ fontWeight: '700', marginTop: 6 }}>
              {item.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}
            </Text>

            <Text style={styles.meta}>{item.branch}</Text>
            <Text style={styles.meta}>
              Ready {item.pickupDay} at {item.pickupTime} · {item.type}
            </Text>
            {!!item.notes && <Text style={styles.meta}>Note: {item.notes}</Text>}

            <View style={styles.cardBottom}>
              <Text style={{ color: BROWN, fontWeight: '700' }}>₱{item.total}</Text>
              {item.status === 'Reserved' && (
                <TouchableOpacity onPress={() => confirmCancel(item)}>
                  <Text style={{ color: '#b00', fontWeight: '600', fontSize: 13 }}>Cancel</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700' },
  card: { backgroundColor: CREAM, borderRadius: 12, padding: 14, marginBottom: 10 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  code: { fontWeight: '800', color: BROWN, letterSpacing: 1 },
  status: { fontWeight: '700', fontSize: 12 },
  meta: { color: '#7a6a5d', fontSize: 12, marginTop: 3 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
});