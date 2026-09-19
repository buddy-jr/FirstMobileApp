import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SIZES, SUGAR_LEVELS, BROWN, CREAM } from '../Data/menuData';
import { useCart } from '../Context/CartContext';

export default function CustomizeScreen({ drink, onDone }) {
  const [size, setSize] = useState('Small');
  const [sugarIndex, setSugarIndex] = useState(2);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const price = drink.prices[size];
  const total = price * qty;

  const handleAdd = () => {
    addToCart(drink, size, SUGAR_LEVELS[sugarIndex].label, qty);
    onDone();
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onDone}><Ionicons name="chevron-back" size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.screenTitle}>Customize Drink</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={{ padding: 16 }}>
        <View style={styles.imagePlaceholderLarge}><Text style={{ fontSize: 60 }}>☕</Text></View>
        <Text style={styles.bigName}>{drink.name}</Text>
        <Text style={styles.bigPrice}>₱{price}</Text>

        <Text style={styles.label}>Size</Text>
        <View style={styles.row}>
          {SIZES.map((s) => (
            <TouchableOpacity key={s} onPress={() => setSize(s)} style={[styles.sizeOption, size === s && styles.sizeOptionActive]}>
              <Text style={{ color: size === s ? '#fff' : '#333', fontWeight: '600' }}>{s}</Text>
              <Text style={{ color: size === s ? '#fff' : '#666', fontSize: 12 }}>₱{drink.prices[s]}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Sugar Level</Text>
        <View style={styles.row}>
          {SUGAR_LEVELS.map((s, i) => (
            <TouchableOpacity key={s.label} onPress={() => setSugarIndex(i)} style={[styles.sugarOption, sugarIndex === i && styles.sugarOptionActive]}>
              <Text style={{ color: sugarIndex === i ? '#fff' : '#333', fontWeight: '700' }}>{s.label}</Text>
              <Text style={{ color: sugarIndex === i ? '#eee' : '#999', fontSize: 10 }}>{s.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Quantity</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(Math.max(1, qty - 1))}>
            <Ionicons name="remove" size={18} color="#333" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(qty + 1)}>
            <Ionicons name="add" size={18} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBar}>
          <View>
            <Text style={{ color: '#666', fontSize: 12 }}>Total Price</Text>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>₱{total}</Text>
          </View>
          <TouchableOpacity style={styles.addToCartBtn} onPress={handleAdd}>
            <Ionicons name="cart" size={16} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: '700', marginLeft: 6 }}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  screenTitle: { fontSize: 18, fontWeight: '700' },
  imagePlaceholderLarge: { height: 160, backgroundColor: CREAM, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  bigName: { fontSize: 22, fontWeight: '700' },
  bigPrice: { fontSize: 18, color: BROWN, fontWeight: '700', marginBottom: 10 },
  label: { fontWeight: '700', marginTop: 20, marginBottom: 10 },
  row: { flexDirection: 'row', gap: 10 },
  sizeOption: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, alignItems: 'center', paddingVertical: 10 },
  sizeOptionActive: { backgroundColor: BROWN, borderColor: BROWN },
  sugarOption: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 30, alignItems: 'center', paddingVertical: 10 },
  sugarOptionActive: { backgroundColor: BROWN, borderColor: BROWN },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  qtyBtn: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8 },
  qtyText: { fontSize: 18, fontWeight: '700' },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 },
  addToCartBtn: { flexDirection: 'row', backgroundColor: BROWN, paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
});