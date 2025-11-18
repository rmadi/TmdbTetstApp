import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { setLanguage } from '../store/slices/settingsSlice';
import type { RootState, AppDispatch } from '../store/store';
import { t } from 'i18next';

export default function SettingsScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const language = useSelector((state: RootState) => state.settings.language);

  const changeLang = (lng: 'en' | 'hi') => {
    dispatch(setLanguage(lng));
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>
        {t('settings')}
      </Text>
      <Text style={styles.label}>{t('language')}</Text>
      <View style={styles.row}>
        <Button
          mode={language === 'en' ? 'contained' : 'outlined'}
          onPress={() => changeLang('en')}
          style={styles.button}
        >
          {t('english')}
        </Button>
        <Button
          mode={language === 'hi' ? 'contained' : 'outlined'}
          onPress={() => changeLang('hi')}
          style={styles.button}
        >
          {t('hindi')}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    marginRight: 12,
  },
});
