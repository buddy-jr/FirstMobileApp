import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DRINKS, CATEGORIES, BROWN, CREAM } from '../Data/menuData';
import { useCart } from '../Context/CartContext';

const categoryEmojis = {
  Coffee: '☕',
  'Non-Coffee': '🧋',
  Pastries: '🥐',
};

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
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <Text style={{ fontSize: 28 }}>☕</Text>
        <View>
          <Text style={styles.shopName}>Brew & Bean</Text>
          <Text style={styles.shopSub}>COFFEE SHOP</Text>
        </View>
      </View>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#999" />
        <TextInput
          placeholder="Search drinks or food..."
          value={search}
          onChangeText={setSearch}
          style={{ marginLeft: 8, flex: 1 }}
        />
      </View>

      {/* Category Chips — fixed height, no tall box */}
      <View style={styles.chipsRow}>
        {CATEGORIES.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setActiveCategory(item)}
            style={[styles.chip, activeCategory === item && styles.chipActive]}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.chipText,
                activeCategory === item && styles.chipTextActive,
              ]}
            >
              {categoryEmojis[item]} {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Drinks / Items List */}
      <FlatList
        data={filteredDrinks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.drinkCard}>
            <TouchableOpacity
              onPress={() => toggleFavorite(item.id)}
              style={styles.favIcon}
            >
              <Ionicons
                name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
                size={18}
                color={BROWN}
              />
            </TouchableOpacity>

            {/* Per-item emoji icon */}
            <View style={styles.imagePlaceholder}>
              <Text style={{ fontSize: 40 }}>{item.emoji}</Text>
            </View>

            <Text style={styles.drinkName}>{item.name}</Text>
            <View style={styles.drinkRow}>
              <Text style={styles.drinkPrice}>₱{item.prices.Small}</Text>
              <TouchableOpacity
                style={styles.addBtnSmall}
                onPress={() => onSelectDrink(item)}
              >
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 10,
  },
  shopName: {
    fontWeight: '700',
    fontSize: 16,
  },
  shopSub: {
    fontSize: 10,
    color: '#999',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: BROWN,
  },
  chipText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 13,
  },
  chipTextActive: {
    color: '#fff',
  },
  drinkCard: {
    flex: 1,
    backgroundColor: CREAM,
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },
  imagePlaceholder: {
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  favIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  drinkName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  drinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drinkPrice: {
    fontWeight: '700',
    color: BROWN,
  },
  addBtnSmall: {
    backgroundColor: BROWN,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
});