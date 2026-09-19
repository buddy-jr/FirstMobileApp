import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BROWN } from '../Data/menuData';
import { useAuth } from '../Context/AuthContext';

export default function ProfileScreen({ onGoOrders, onGoFavorites }) {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={styles.header}>
        <View style={styles.avatar}><Ionicons name="person" size={30} color="#fff" /></View>
        <View>
          <Text style={{ fontWeight: '700', fontSize: 16 }}>{user?.name}</Text>
          <Text style={{ color: '#888' }}>{user?.email}</Text>
        </View>
      </View>

      <MenuRow icon="receipt-outline" label="My Orders" onPress={onGoOrders} />
      <MenuRow icon="heart-outline" label="Favorites" onPress={onGoFavorites} />
      <MenuRow icon="settings-outline" label="Settings" onPress={() => {}} />
      <MenuRow icon="log-out-outline" label="Log Out" onPress={logout} />
    </View>
  );
}

function MenuRow({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Ionicons name={icon} size={20} color={BROWN} />
      <Text style={{ marginLeft: 12, fontSize: 15 }}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, gap: 14 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: BROWN, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderColor: '#eee' },
});