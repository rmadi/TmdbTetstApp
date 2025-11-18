import React from 'react';
import { StyleSheet, View } from 'react-native';
import Translate from './Translate';
import { colors } from '../utils';

export default function ListEmpty({ message }: { message?: string }) {
  return (
    <View style={styles.container}>
      {message ? (
        <Translate
          translationKey=""
          includeTranslatedText={false}
          style={styles.text}
        >
          {message}
        </Translate>
      ) : (
        <Translate translationKey="movies.noResults" style={styles.text} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 20 },
  text: { color: colors.textSecondary },
});
