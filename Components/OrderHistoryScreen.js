import { View, Text, FlatList, StyleSheet } from 'react-native';
import { BROWN, CREAM } from '../Data/menuData';
import { useCart } from '../Context/CartContext';

export default function OrderHistoryScreen() {
  const { orderHistory } = useCart();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orderHistory}
        keyExtractor={(item) => item.orderId}
        ListEmptyComponent={<Text style={{ marginTop: 20 }}>No orders yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ color: '#888', fontSize: 12 }}>{item.date}</Text>
            <Text style={{ fontWeight: '700', marginTop: 4 }}>
              {item.items.map((i) => i.name).join(' + ')}
            </Text>
            <Text style={{ color: BROWN, fontWeight: '700', marginTop: 4 }}>₱{item.total}</Text>
            <Text style={{ color: 'green', marginTop: 4 }}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: CREAM, borderRadius: 12, padding: 14, marginBottom: 10 },
});