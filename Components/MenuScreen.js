// FirstMobileApp/Components/MenuScreen.js
import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DRINKS, CATEGORIES, CATEGORY_EMOJIS, BROWN, CREAM } from '../Data/menuData';
import { useCart } from '../Context/CartContext';
import ItemImage, { CategoryIcon, ShopLogo } from './ItemImage';

export default function MenuScreen({ onSelectDrink }) {
  const [activeCategory, setActiveCategory] = useState('Coffee');
  const [search, setSearch] = useState('');
  const { favorites, toggleFavorite } = useCart();

  const filteredDrinks = DRINKS.filter(
    (d) =>
      d.category === activeCategory &&
      d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerBar}>
        <ShopLogo size={34} />
        <View>
          <Text style={styles.shopName}>Kapi kam MCO1</Text>
          <Text style={styles.shopSub}>COFFEE SHOP</Text>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#999" />
        <TextInput
          placeholder="Search drinks or food..."
          value={search}
          onChangeText={setSearch}
          style={{ marginLeft: 8, flex: 1 }}
        />
      </View>

      <View style={styles.chipsRow}>
        {CATEGORIES.map((item) => {
          const active = activeCategory === item;
          return (
            <TouchableOpacity
              key={item}
              onPress={() => setActiveCategory(item)}
              style={[styles.chip, active && styles.chipActive]}
              activeOpacity={0.8}
            >
              <CategoryIcon category={item} emoji={CATEGORY_EMOJIS[item]} size={18} />
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filteredDrinks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        ListEmptyComponent={
          <Text style={styles.empty}>Nothing matches that search. Try another name.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.drinkCard}>
            <View style={styles.imageBox}>
              <ItemImage id={item.id} emoji={item.emoji} size={40} />

              <TouchableOpacity
                onPress={() => toggleFavorite(item.id)}
                style={styles.favIcon}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <Ionicons
                  name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
                  size={16}
                  color={favorites.includes(item.id) ? BROWN : '#555'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.drinkName} numberOfLines={1}>{item.name}</Text>
              <View style={styles.drinkRow}>
                <Text style={styles.drinkPrice}>₱{item.prices.Small}</Text>
                <TouchableOpacity style={styles.addBtnSmall} onPress={() => onSelectDrink(item)}>
                  <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 10 },
  shopName: { fontWeight: '700', fontSize: 16 },
  shopSub: { fontSize: 10, color: '#999' },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f2f2',
    marginHorizontal: 16, padding: 10, borderRadius: 12, marginBottom: 12,
  },
  chipsRow: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 12, gap: 8, alignItems: 'center' },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, height: 40, borderRadius: 20,
    backgroundColor: '#f2f2f2', justifyContent: 'center',
  },
  chipActive: { backgroundColor: BROWN },
  chipText: { color: '#555', fontWeight: '600', fontSize: 13 },
  chipTextActive: { color: '#fff' },

  drinkCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 3 },
    }),
  },
  imageBox: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: CREAM,
  },
  favIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 3, shadowOffset: { width: 0, height: 1 } },
      android: { elevation: 2 },
    }),
  },
  cardBody: { padding: 10 },
  drinkName: { fontWeight: '600', marginBottom: 4, fontSize: 14 },
  drinkRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  drinkPrice: { fontWeight: '700', color: BROWN },
  addBtnSmall: { backgroundColor: BROWN, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  empty: { color: '#888', marginTop: 24, textAlign: 'center' },
  
});