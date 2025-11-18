import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import {
  useCreateRequestTokenMutation,
  useValidateWithLoginMutation,
  useCreateSessionMutation,
} from '../api/tmdbApi';
import { setSession } from '../store/slices/authSlice';
import type { AppDispatch } from '../store/store';
import { t } from 'i18next';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();

  const [createToken] = useCreateRequestTokenMutation();
  const [validateLogin] = useValidateWithLoginMutation();
  const [createSession] = useCreateSessionMutation();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const tokenRes = await createToken().unwrap();
      const validated = await validateLogin({
        username,
        password,
        request_token: tokenRes.request_token,
      }).unwrap();
      const session = await createSession({
        request_token: validated.request_token,
      }).unwrap();

      dispatch(setSession({ sessionId: session.session_id, username }));
      navigation.goBack();
    } catch (e) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>
        {t('login')}
      </Text>
      <TextInput
        label={t('username')}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        label={t('password')}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleLogin} loading={loading} disabled={!username || !password}>
        {t('sign_in')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  heading: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});
