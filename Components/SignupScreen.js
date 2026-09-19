import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { BROWN } from '../Data/menuData';
import { useAuth } from '../Context/AuthContext';

export default function SignupScreen({ onGoLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSignup = () => {
    if (!name || !email || !password) return;
    login(name, email); // auto-login after signup, like the poster says
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join us and get your favorite coffee anytime!</Text>

      <TextInput placeholder="Full Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoLogin} style={{ marginTop: 14 }}>
        <Text style={{ textAlign: 'center', color: BROWN }}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center' },
  subtitle: { textAlign: 'center', color: '#888', marginBottom: 24, marginTop: 6 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, marginBottom: 12 },
  signupBtn: { backgroundColor: BROWN, padding: 16, borderRadius: 10, alignItems: 'center' },
});