import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import {
  useCreateRequestTokenMutation,
  useValidateWithLoginMutation,
  useCreateSessionMutation,
} from '@api/tmdbApi';
import { setSession } from '@store/slices/authSlice';
import type { AppDispatch } from '@store/store';
import Translate from '@components/Translate';
import {
  colors,
  size,
  horizontalScale,
  verticalScale,
  moderateScale,
} from '@utils';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const [createToken] = useCreateRequestTokenMutation();
  const [validateLogin] = useValidateWithLoginMutation();
  const [createSession] = useCreateSessionMutation();

  const handleLogin = async () => {
    if (!username || !password) {
      return;
    }
    try {
      setErrorKey(null);
      setLoading(true);

      const token = await createToken().unwrap();
      const validated = await validateLogin({
        username,
        password,
        request_token: token.request_token,
      }).unwrap();
      const session = await createSession({
        request_token: validated.request_token,
      }).unwrap();

      dispatch(
        setSession({
          sessionId: session.session_id,
          username,
        }),
      );
    } catch (e) {
      console.log('Login error', e);
      setErrorKey('auth.loginError');
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !username || !password || loading;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Translate translationKey="auth.login" style={styles.heading} />

        <View style={styles.field}>
          <Translate
            translationKey="auth.username"
            style={styles.label}
          />
          <TextInput
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.input}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.field}>
          <Translate
            translationKey="auth.password"
            style={styles.label}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
          />
        </View>

        {errorKey ? (
          <Translate translationKey={errorKey} style={styles.error} />
        ) : null}

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={isDisabled}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          <Translate translationKey="auth.login" />
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(24),
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: moderateScale(20),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(24),
  },
  heading: {
    color: colors.textPrimary,
    fontSize: moderateScale(size.lg),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: verticalScale(16),
  },
  field: {
    marginBottom: verticalScale(12),
  },
  label: {
    color: colors.textSecondary,
    fontSize: moderateScale(size.s),
    marginBottom: verticalScale(4),
  },
  input: {
    backgroundColor: colors.white,
  },
  error: {
    color: colors.error,
    marginTop: verticalScale(4),
    marginBottom: verticalScale(8),
    fontSize: moderateScale(size.s),
  },
  button: {
    marginTop: verticalScale(8),
  },
  buttonContent: {
    paddingVertical: verticalScale(6),
  },
});
