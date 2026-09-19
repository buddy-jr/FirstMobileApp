import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      const savedFavs = await AsyncStorage.getItem('favorites');
      const savedOrders = await AsyncStorage.getItem('orderHistory');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
      if (savedOrders) setOrderHistory(JSON.parse(savedOrders));
      setLoaded(true);
    })();
  }, []);

  useEffect(() => { if (loaded) AsyncStorage.setItem('cart', JSON.stringify(cart)); }, [cart, loaded]);
  useEffect(() => { if (loaded) AsyncStorage.setItem('favorites', JSON.stringify(favorites)); }, [favorites, loaded]);
  useEffect(() => { if (loaded) AsyncStorage.setItem('orderHistory', JSON.stringify(orderHistory)); }, [orderHistory, loaded]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const addToCart = (drink, size, sugar, qty) => {
    setCart((prev) => [
      ...prev,
      { cartId: Date.now().toString(), id: drink.id, name: drink.name, size, sugar, qty, price: drink.prices[size] },
    ]);
  };

  const updateQty = (cartId, delta) => {
    setCart((prev) => prev.map((item) =>
      item.cartId === cartId ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeFromCart = (cartId) => setCart((prev) => prev.filter((i) => i.cartId !== cartId));

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const placeOrder = (address) => {
    const order = {
      orderId: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      items: cart,
      total: subtotal,
      address,
      status: 'Delivered',
    };
    setOrderHistory((prev) => [order, ...prev]);
    setCart([]);
    return order;
  };

  return (
    <CartContext.Provider value={{
      cart, favorites, orderHistory,
      toggleFavorite, addToCart, updateQty, removeFromCart, subtotal, placeOrder,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);