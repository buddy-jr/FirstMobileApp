// FirstMobileApp/Components/CartScreen.js
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BROWN, CREAM } from '../Data/menuData';
import { useCart } from '../Context/CartContext';
import ItemImage from './ItemImage';

export default function CartScreen({ onReserve }) {
  const { cart, updateQty, removeFromCart, subtotal } = useCart();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>My Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.cartId}
        ListEmptyComponent={
          <Text style={{ marginTop: 20, color: '#888' }}>
            Your cart is empty. Add something from the menu to reserve it.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageBox}>
              <ItemImage id={item.id} emoji={item.emoji} size={24} />
            </View>

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ fontWeight: '700' }}>{item.name}</Text>
              <Text style={{ color: '#666', fontSize: 12 }}>
                {item.size} · Sugar {item.sugar}
              </Text>
              <Text style={{ color: BROWN, fontWeight: '700', marginTop: 2 }}>
                ₱{item.price * item.qty}
              </Text>
            </View>

            <View style={styles.qtyRow}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.cartId, -1)}>
                <Ionicons name="remove" size={16} color="#333" />
              </TouchableOpacity>
              <Text style={{ fontWeight: '700' }}>{item.qty}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.cartId, 1)}>
                <Ionicons name="add" size={16} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeFromCart(item.cartId)} style={{ marginLeft: 6 }}>
                <Ionicons name="trash-outline" size={18} color="#b00" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={{ color: '#666' }}>Subtotal</Text>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>₱{subtotal}</Text>
          </View>
          <Text style={styles.pickupNote}>Pick-up only — no delivery.</Text>
          <TouchableOpacity style={styles.reserveBtn} onPress={onReserve}>
            <Ionicons name="calendar-outline" size={16} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: '700', marginLeft: 8 }}>
              Pre - Order Now
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: CREAM, borderRadius: 12, padding: 10, marginBottom: 10 },
  imageBox: {
    width: 50, height: 50, backgroundColor: '#fff', borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 4, backgroundColor: '#fff' },
  footer: { borderTopWidth: 1, borderColor: '#eee', paddingTop: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pickupNote: { color: '#888', fontSize: 12, marginTop: 4 },
  reserveBtn: {
    flexDirection: 'row', backgroundColor: BROWN, padding: 16,
    borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 12,
  },
});