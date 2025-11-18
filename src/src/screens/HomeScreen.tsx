import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useGetPopularMoviesQuery } from '../api/tmdbApi';
import MovieCard from '../components/MovieCard';
import ErrorFetch from '../components/ErrorFetch';
import { t } from 'i18next';

export default function HomeScreen() {
  const { data, isLoading, isError } = useGetPopularMoviesQuery(1);
  const navigation = useNavigation<any>();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>{t('loading')}</Text>
      </View>
    );
  }

  if (isError || !data) {
    return <ErrorFetch />;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>
        {t('popular')}
      </Text>
      <FlatList
        data={data.results}
        numColumns={2}
        columnWrapperStyle={styles.column}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() =>
              navigation.navigate('MovieDetails', { id: item.id, title: item.title })
            }
          />
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
  heading: {
    marginBottom: 8,
  },
  column: {
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
