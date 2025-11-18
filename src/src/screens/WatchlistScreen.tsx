import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import type { RootState } from '../store/store';
import MovieCard from '../components/MovieCard';
import { t } from 'i18next';

export default function WatchlistScreen() {
  const navigation = useNavigation<any>();
  const ids = useSelector((state: RootState) => state.favorites.ids);
  const items = useSelector((state: RootState) => state.favorites.items);

  if (!ids.length) {
    return (
      <View style={styles.center}>
        <Text>{t('watchlist_empty')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ids.map(id => items[id])}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <MovieCard
              movie={item}
              onPress={() =>
                navigation.navigate('MovieDetails', { id: item.id, title: item.title })
              }
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    marginBottom: 12,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
