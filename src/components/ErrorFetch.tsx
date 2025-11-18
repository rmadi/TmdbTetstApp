import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Translate from './Translate';
import { colors, horizontalScale, verticalScale } from '../utils';

export default function ErrorFetch({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={styles.container}>
      <Translate translationKey="common.error" style={styles.text} />

      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Translate translationKey="common.retry" style={styles.buttonText} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: verticalScale(20) },
  text: { color: colors.white, marginBottom: verticalScale(10) },
  button: {
    backgroundColor: colors.secondry,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    borderRadius: 10,
  },
  buttonText: { color: colors.white },
});
