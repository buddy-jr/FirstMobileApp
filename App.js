// FirstMobileApp/App.js
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider, useCart } from './Context/CartContext';
import { AuthProvider, useAuth } from './Context/AuthContext';
import SplashScreen from './Components/SplashScreen';
import LoginScreen from './Components/LoginScreen';
import SignupScreen from './Components/SignupScreen';
import MenuScreen from './Components/MenuScreen';
import CustomizeScreen from './Components/CustomizeScreen';
import CartScreen from './Components/CarttScreen';
import FavoritesScreen from './Components/FavoritesScreen';
import ReservationScreen from './Components/ReservationScreen';
import OrderConfirmationScreen from './Components/OrderConfirmationScreen';
import OrderHistoryScreen from './Components/OrderHistoryScreen';
import ProfileScreen from './Components/ProfileScreen';
import { BROWN } from './Data/menuData';

function MainApp() {
  const [showSplash, setShowSplash] = useState(true);
  const [authScreen, setAuthScreen] = useState('login'); // 'login' | 'signup'
  const [screen, setScreen] = useState('menu');
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  const { user, loaded: authLoaded } = useAuth();
  const { cart, favorites } = useCart();

  if (showSplash) {
    return <SplashScreen onDone={() => setShowSplash(false)} />;
  }

  if (!authLoaded) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: BROWN, fontSize: 16 }}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return authScreen === 'login' ? (
      <LoginScreen onGoSignup={() => setAuthScreen('signup')} />
    ) : (
      <SignupScreen onGoLogin={() => setAuthScreen('login')} />
    );
  }

  const openCustomize = (drink) => {
    setSelectedDrink(drink);
    setScreen('customize');
  };

  const hideBottomNav =
    screen === 'reservation' || screen === 'confirmation' || screen === 'customize';

  return (
    <View style={styles.app}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={{ flex: 1 }}>
        {screen === 'menu' && <MenuScreen onSelectDrink={openCustomize} />}

        {screen === 'customize' && selectedDrink && (
          <CustomizeScreen
            drink={selectedDrink}
            onDone={() => setScreen('menu')}
            onAddedToCart={() => setScreen('cart')}
          />
        )}

        {screen === 'cart' && (
          <CartScreen onReserve={() => setScreen('reservation')} />
        )}

        {screen === 'reservation' && (
          <ReservationScreen
            onPlaced={(order) => {
              setLastOrder(order);
              setScreen('confirmation');
            }}
            onBack={() => setScreen('cart')}
          />
        )}

        {screen === 'confirmation' && (
          <OrderConfirmationScreen
            order={lastOrder}
            onBackHome={() => setScreen('menu')}
            onViewOrders={() => setScreen('orders')}
          />
        )}

        {screen === 'favorites' && (
          <FavoritesScreen onSelectDrink={openCustomize} />
        )}

        {screen === 'orders' && (
          <OrderHistoryScreen onBack={() => setScreen('profile')} />
        )}

        {screen === 'profile' && (
          <ProfileScreen
            onGoOrders={() => setScreen('orders')}
            onGoFavorites={() => setScreen('favorites')}
          />
        )}
      </View>

      {!hideBottomNav && (
        <View style={styles.bottomNav}>
          <TabButton icon="home" label="Home" active={screen === 'menu'} onPress={() => setScreen('menu')} />
          <TabButton
            icon="heart"
            label="Favorites"
            active={screen === 'favorites'}
            badge={favorites?.length || 0}
            onPress={() => setScreen('favorites')}
          />
          <TabButton
            icon="cart"
            label="Cart"
            active={screen === 'cart'}
            badge={cart?.length || 0}
            onPress={() => setScreen('cart')}
          />
          <TabButton icon="person" label="Profile" active={screen === 'profile'} onPress={() => setScreen('profile')} />
        </View>
      )}
    </View>
  );
}

function TabButton({ icon, label, active, badge = 0, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabBtn} activeOpacity={0.7}>
      <View>
        <Ionicons name={active ? icon : `${icon}-outline`} size={22} color={active ? BROWN : '#999'} />
        {badge > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.tabLabel, { color: active ? BROWN : '#999' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, marginTop: 50, backgroundColor: '#fff' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  bottomNav: {
    flexDirection: 'row', borderTopWidth: 1, borderColor: '#eee',
    paddingVertical: 10, paddingBottom: 12, backgroundColor: '#fff',
  },
  tabBtn: { alignItems: 'center', flex: 1 },
  tabLabel: { fontSize: 11, marginTop: 2, fontWeight: '500' },
  badge: {
    position: 'absolute', top: -4, right: -10, backgroundColor: BROWN,
    borderRadius: 8, minWidth: 16, height: 16,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3,
  },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '700' },
});