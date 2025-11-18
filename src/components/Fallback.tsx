import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '../utils';

export default function Fallback() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.secondry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
