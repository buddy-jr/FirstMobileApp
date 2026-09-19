import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BROWN, CREAM } from '../Data/menuData';
import { useCart } from '../Context/CartContext';

export default function CartScreen({ onCheckout }) {
  const { cart, subtotal, updateQty, removeFromCart } = useCart();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.screenTitle}>My Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.cartId}
        ListEmptyComponent={<Text style={{ marginTop: 20 }}>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={styles.cartCard}>
            <View style={styles.imagePlaceholderSmall}><Text style={{ fontSize: 24 }}>☕</Text></View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: '700' }}>{item.name}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.cartId)}>
                  <Ionicons name="close" size={18} color="#999" />
                </TouchableOpacity>
              </View>
              <Text style={{ color: '#888', fontSize: 12 }}>{item.size} · {item.sugar} Sugar</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                <Text style={{ fontWeight: '700' }}>₱{item.price * item.qty}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <TouchableOpacity onPress={() => updateQty(item.cartId, -1)} style={styles.qtyBtnSmall}><Ionicons name="remove" size={14} /></TouchableOpacity>
                  <Text>{item.qty}</Text>
                  <TouchableOpacity onPress={() => updateQty(item.cartId, 1)} style={styles.qtyBtnSmall}><Ionicons name="add" size={14} /></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
      {cart.length > 0 && (
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}><Text>Subtotal</Text><Text>₱{subtotal}</Text></View>
          <View style={styles.summaryRow}><Text>Delivery Fee</Text><Text>₱0</Text></View>
          <View style={[styles.summaryRow, { marginTop: 8 }]}>
            <Text style={{ fontWeight: '700', fontSize: 16 }}>Total</Text>
            <Text style={{ fontWeight: '700', fontSize: 16 }}>₱{subtotal}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckout}>
  <Text style={{ color: '#fff', fontWeight: '700' }}>Checkout →</Text>
</TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  cartCard: { flexDirection: 'row', backgroundColor: CREAM, borderRadius: 12, padding: 10, marginBottom: 10 },
  imagePlaceholderSmall: { width: 50, height: 50, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  qtyBtnSmall: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 4 },
  summaryBox: { borderTopWidth: 1, borderColor: '#eee', paddingTop: 12, marginTop: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  checkoutBtn: { backgroundColor: BROWN, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
});