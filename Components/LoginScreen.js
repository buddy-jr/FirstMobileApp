// FirstMobileApp/Components/LoginScreen.js
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { BROWN } from '../Data/menuData';
import { useAuth } from '../Context/AuthContext';
import { ShopLogo } from './ItemImage';

export default function LoginScreen({ onGoSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    if (!email || !password) return;
    login(email.split('@')[0], email); // fake login, no backend
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <ShopLogo size={70} />
      </View>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to continue your coffee journey.</Text>

      <TextInput
        placeholder="Email or Username"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Login</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: 'center', marginVertical: 10, color: '#999' }}>or</Text>

      <TouchableOpacity style={styles.signupBtn} onPress={onGoSignup}>
        <Text style={{ color: BROWN, fontWeight: '700' }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginTop: 16 },
  subtitle: { textAlign: 'center', color: '#888', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, marginBottom: 12 },
  loginBtn: { backgroundColor: BROWN, padding: 16, borderRadius: 10, alignItems: 'center' },
  signupBtn: { borderWidth: 1, borderColor: BROWN, padding: 16, borderRadius: 10, alignItems: 'center' },
});