// FirstMobileApp/Components/FavoritesScreen.js
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DRINKS, BROWN, CREAM } from '../Data/menuData';
import { useCart } from '../Context/CartContext';
import ItemImage from './ItemImage';

export default function FavoritesScreen({ onSelectDrink }) {
  const { favorites, toggleFavorite } = useCart();
  const favDrinks = DRINKS.filter((d) => favorites.includes(d.id));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.screenTitle}>Favorites</Text>
      <FlatList
        data={favDrinks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ marginTop: 20, color: '#888' }}>
            Tap the heart on any item to keep it here.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.favRow} onPress={() => onSelectDrink(item)}>
            <View style={styles.imageBoxSmall}>
              <ItemImage id={item.id} emoji={item.emoji} size={24} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ fontWeight: '700' }}>{item.name}</Text>
              <Text style={{ color: '#666' }}>₱{item.prices.Small}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Ionicons name="heart" size={20} color={BROWN} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  imageBoxSmall: {
    width: 50, height: 50, backgroundColor: '#fff', borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  favRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: CREAM, borderRadius: 12, padding: 10, marginBottom: 10 },
});