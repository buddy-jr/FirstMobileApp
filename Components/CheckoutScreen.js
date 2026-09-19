import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { BROWN } from '../Data/menuData';
import { useCart } from '../Context/CartContext';

export default function CheckoutScreen({ onPlaced }) {
  const { subtotal, placeOrder } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('Cash on Delivery');

  const handlePlaceOrder = () => {
    const order = placeOrder({ name, phone, address, payment });
    onPlaced(order);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>Checkout</Text>

      <Text style={styles.label}>Delivery Address</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.input} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />

      <Text style={styles.label}>Payment Method</Text>
      {['Cash on Delivery', 'Card (Coming Soon)'].map((method) => (
        <TouchableOpacity key={method} style={styles.paymentRow} onPress={() => setPayment(method)}>
          <View style={[styles.radio, payment === method && { backgroundColor: BROWN }]} />
          <Text>{method}</Text>
        </TouchableOpacity>
      ))}

      <View style={{ flex: 1 }} />
      <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 10 }}>Total: ₱{subtotal}</Text>
      <TouchableOpacity style={styles.placeBtn} onPress={handlePlaceOrder}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  label: { fontWeight: '700', marginTop: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 10 },
  paymentRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: '#999', marginRight: 10 },
  placeBtn: { backgroundColor: BROWN, padding: 16, borderRadius: 12, alignItems: 'center' },
});