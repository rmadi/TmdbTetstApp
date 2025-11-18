import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { setLanguage } from '@store/slices/settingsSlice';
import { signOut } from '@store/slices/authSlice';
import type { RootState, AppDispatch } from '@store/store';
import Translate from '@components/Translate';
import { setLocale } from '../services/i18next';
import {
  colors,
  size,
  horizontalScale,
  verticalScale,
  moderateScale,
} from '@utils';

export default function SettingsScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const language = useSelector((state: RootState) => state.settings.language);

  const changeLang = (lng: 'en' | 'hi') => {
    dispatch(setLanguage(lng));
    setLocale(lng);
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Translate translationKey="settings.title" style={styles.heading} />
        <Translate translationKey="settings.language" style={styles.label} />
        <View style={styles.row}>
          <Button
            mode={language === 'en' ? 'contained' : 'outlined'}
            onPress={() => changeLang('en')}
            style={styles.button}
          >
            <Translate translationKey="settings.english" />
          </Button>
          <Button
            mode={language === 'hi' ? 'contained' : 'outlined'}
            onPress={() => changeLang('hi')}
            style={styles.button}
          >
            <Translate translationKey="settings.hindi" />
          </Button>
        </View>
      </View>

      <View style={styles.card}>
        <Button mode="outlined" onPress={handleLogout}>
          <Translate translationKey="auth.logout" />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(24),
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(16),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  heading: {
    color: colors.textPrimary,
    marginBottom: verticalScale(12),
    fontSize: moderateScale(size.lg),
    fontWeight: '700',
  },
  label: {
    color: colors.textSecondary,
    marginBottom: verticalScale(8),
    fontSize: moderateScale(size.md),
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    marginRight: horizontalScale(12),
  },
});
