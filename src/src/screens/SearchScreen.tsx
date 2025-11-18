import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import SearchBar from '../components/SearchBar';
import { useSearchMoviesQuery } from '../api/tmdbApi';
import MovieCard from '../components/MovieCard';
import { t } from 'i18next';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { data, isFetching } = useSearchMoviesQuery(
    { query, page: 1 },
    { skip: !query.trim() },
  );
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder={t('search_placeholder')}
      />
      {!query.trim() ? (
        <View style={styles.center}>
          <Text>{t('search_hint')}</Text>
        </View>
      ) : (
        <FlatList
          data={data?.results ?? []}
          keyExtractor={item => String(item.id)}
          ListHeaderComponent={isFetching ? <Text>{t('loading')}</Text> : null}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginBottom: 12,
  },
});
