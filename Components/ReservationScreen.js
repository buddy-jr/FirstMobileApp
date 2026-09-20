// FirstMobileApp/Components/ReservationScreen.js
import { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  BRANCHES, PAYMENT_METHODS, getTimeSlots, formatDayLabel, toDayKey, BROWN, CREAM,
} from '../Data/menuData';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import DatePickerCalendar from './DatePickerCalendar';

export default function ReservationScreen({ onPlaced, onBack }) {
  const { cart, subtotal, placeReservation } = useCart();
  const { user } = useAuth();

  const [branchId, setBranchId] = useState(BRANCHES[0].id);
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState(PAYMENT_METHODS[0]);
  const [notes, setNotes] = useState('');

  const branch = BRANCHES.find((b) => b.id === branchId);
  const slots = useMemo(() => (selectedDate ? getTimeSlots(selectedDate) : []), [selectedDate]);

  const pickDate = (date) => {
    setSelectedDate(date);
    const nextSlots = getTimeSlots(date);
    setTime(nextSlots[0] || '');
  };

  const confirm = () => {
    if (!cart.length) return Alert.alert('Cart is empty', 'Add an item before reserving.');
    if (!selectedDate) return Alert.alert('Pick a date', 'Choose a day on the calendar first.');
    if (!time) return Alert.alert('Pick a time', 'No slots left that day — choose another date.');
    if (!name.trim()) return Alert.alert('Name needed', 'Tell us who is picking this up.');
    if (phone.trim().length < 7) return Alert.alert('Phone needed', 'Enter a number we can reach.');

    const order = placeReservation({
      branch: `${branch.name} — ${branch.address}`,
      dayLabel: formatDayLabel(selectedDate),
      dayKey: toDayKey(selectedDate),
      time,
      name: name.trim(),
      phone: phone.trim(),
      payment,
      notes: notes.trim(),
    });
    onPlaced(order);
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pre-Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.banner}>
          <Ionicons name="storefront-outline" size={18} color={BROWN} />
          <Text style={styles.bannerText}>
            Pick-up only. Schedule ahead and collect it at the counter.
          </Text>
        </View>

        <Text style={styles.label}>Branch</Text>
        {BRANCHES.map((b) => {
          const active = b.id === branchId;
          return (
            <TouchableOpacity
              key={b.id}
              onPress={() => setBranchId(b.id)}
              style={[styles.branchCard, active && styles.branchCardActive]}
            >
              <Ionicons
                name={active ? 'radio-button-on' : 'radio-button-off'}
                size={18}
                color={active ? BROWN : '#bbb'}
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontWeight: '700' }}>{b.name}</Text>
                <Text style={{ color: '#777', fontSize: 12 }}>{b.address}</Text>
                <Text style={{ color: '#999', fontSize: 11, marginTop: 2 }}>Open {b.hours}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.label}>Pick-up date</Text>
        <DatePickerCalendar selectedDate={selectedDate} onSelectDate={pickDate} />

        {selectedDate && (
          <>
            <Text style={styles.label}>Pick-up time — {formatDayLabel(selectedDate)}</Text>
            {slots.length === 0 ? (
              <Text style={{ color: '#888' }}>No slots left that day. Choose another date.</Text>
            ) : (
              <View style={styles.wrapRow}>
                {slots.map((s) => {
                  const active = s === time;
                  return (
                    <TouchableOpacity
                      key={s}
                      onPress={() => setTime(s)}
                      style={[styles.timeChip, active && styles.filled]}
                    >
                      <Text style={{ color: active ? '#fff' : '#333', fontSize: 13, fontWeight: '600' }}>{s}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </>
        )}

        <Text style={styles.label}>Who is picking up</Text>
        <TextInput
          placeholder="Full name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Mobile number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Payment</Text>
        <View style={styles.row}>
          {PAYMENT_METHODS.map((p) => {
            const active = p === payment;
            return (
              <TouchableOpacity
                key={p}
                onPress={() => setPayment(p)}
                style={[styles.payChip, active && styles.filled]}
              >
                <Text style={{ color: active ? '#fff' : '#333', fontSize: 12, fontWeight: '600' }}>{p}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Notes for the barista</Text>
        <TextInput
          placeholder="Less ice, extra shot, name on cup..."
          value={notes}
          onChangeText={setNotes}
          multiline
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
        />

        <View style={styles.summary}>
          <Text style={{ fontWeight: '700', marginBottom: 8 }}>Reservation summary</Text>
          <SummaryRow label="Items" value={`${cart.length} item${cart.length === 1 ? '' : 's'}`} />
          <SummaryRow label="Branch" value={branch.name} />
          <SummaryRow
            label="Ready by"
            value={selectedDate && time ? `${formatDayLabel(selectedDate)}, ${time}` : '—'}
          />
          <SummaryRow label="Payment" value={payment} />
          <View style={styles.divider} />
          <SummaryRow label="Total" value={`₱${subtotal}`} bold />
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={confirm}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Confirm reservation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function SummaryRow({ label, value, bold }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={{ color: '#777' }}>{label}</Text>
      <Text style={{ fontWeight: bold ? '700' : '600', fontSize: bold ? 16 : 13, maxWidth: '60%', textAlign: 'right' }}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  banner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: CREAM, borderRadius: 12, padding: 12,
  },
  bannerText: { flex: 1, color: '#6b5546', fontSize: 12 },
  label: { fontWeight: '700', marginTop: 22, marginBottom: 10 },
  row: { flexDirection: 'row', gap: 8 },
  wrapRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  branchCard: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 12, padding: 12, marginBottom: 8,
  },
  branchCardActive: { borderColor: BROWN, backgroundColor: CREAM },
  timeChip: { borderWidth: 1, borderColor: '#ddd', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 },
  payChip: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 20, alignItems: 'center', paddingVertical: 10 },
  filled: { backgroundColor: BROWN, borderColor: BROWN },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, marginBottom: 10 },
  summary: { backgroundColor: CREAM, borderRadius: 12, padding: 14, marginTop: 24 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  divider: { height: 1, backgroundColor: '#e3d7c9', marginVertical: 8 },
  confirmBtn: { backgroundColor: BROWN, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
});