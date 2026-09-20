// FirstMobileApp/Components/DatePickerCalendar.js
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getMonthGrid, MAX_BOOKING_DAYS_AHEAD, BROWN } from '../Data/menuData';

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function isSameDay(a, b) {
  return a && b
    && a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

export default function DatePickerCalendar({ selectedDate, onSelectDate }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + MAX_BOOKING_DAYS_AHEAD);

  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const { monthLabel, weeks } = getMonthGrid(viewMonth);

  const canGoBack = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1) > new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoForward = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1) < new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

  const changeMonth = (delta) => {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.monthRow}>
        <TouchableOpacity
          onPress={() => canGoBack && changeMonth(-1)}
          style={[styles.navBtn, !canGoBack && styles.navBtnDisabled]}
          disabled={!canGoBack}
        >
          <Ionicons name="chevron-back" size={18} color={canGoBack ? '#333' : '#ccc'} />
        </TouchableOpacity>

        <Text style={styles.monthLabel}>{monthLabel}</Text>

        <TouchableOpacity
          onPress={() => canGoForward && changeMonth(1)}
          style={[styles.navBtn, !canGoForward && styles.navBtnDisabled]}
          disabled={!canGoForward}
        >
          <Ionicons name="chevron-forward" size={18} color={canGoForward ? '#333' : '#ccc'} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekdayRow}>
        {WEEKDAY_LABELS.map((w, i) => (
          <Text key={i} style={styles.weekdayLabel}>{w}</Text>
        ))}
      </View>

      {weeks.map((week, wi) => (
        <View key={wi} style={styles.weekRow}>
          {week.map((cell, ci) => {
            if (!cell) return <View key={ci} style={styles.dayCell} />;

            const selected = isSameDay(cell.date, selectedDate);

            return (
              <TouchableOpacity
                key={ci}
                style={styles.dayCell}
                disabled={cell.disabled}
                onPress={() => onSelectDate(cell.date)}
              >
                <View style={[styles.dayCircle, selected && styles.dayCircleSelected]}>
                  <Text style={[
                    styles.dayText,
                    cell.disabled && styles.dayTextDisabled,
                    selected && styles.dayTextSelected,
                  ]}>
                    {cell.dayNumber}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderWidth: 1, borderColor: '#eee', borderRadius: 14, padding: 12 },
  monthRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  monthLabel: { fontWeight: '700', fontSize: 15 },
  navBtn: { padding: 6, borderRadius: 8, backgroundColor: '#f2f2f2' },
  navBtnDisabled: { backgroundColor: '#f8f8f8' },
  weekdayRow: { flexDirection: 'row', marginBottom: 4 },
  weekdayLabel: { flex: 1, textAlign: 'center', fontSize: 11, color: '#999', fontWeight: '600' },
  weekRow: { flexDirection: 'row' },
  dayCell: { flex: 1, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  dayCircle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  dayCircleSelected: { backgroundColor: BROWN },
  dayText: { fontSize: 13, color: '#333', fontWeight: '600' },
  dayTextDisabled: { color: '#ddd' },
  dayTextSelected: { color: '#fff' },
});