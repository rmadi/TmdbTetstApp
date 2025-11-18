import React from 'react';
import { Image as RNImage, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { useGetMovieDetailsQuery } from '../api/tmdbApi';
import { imageUri } from '../utils/image';
import { formatDate } from '../utils/format';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';
import type { RootState, AppDispatch } from '../store/store';
import { t } from 'i18next';

type RouteParams = {
  id: number;
  title: string;
};

export default function MovieDetailsScreen() {
  const route = useRoute<any>();
  const { id } = route.params as RouteParams;

  const { data } = useGetMovieDetailsQuery(id);
  const dispatch = useDispatch<AppDispatch>();
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);

  if (!data) {
    return (
      <View style={styles.center}>
        <Text>{t('loading')}</Text>
      </View>
    );
  }

  const poster = imageUri(data.poster_path, 'w500');
  const isFavorite = favoriteIds.includes(data.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {poster ? <RNImage source={{ uri: poster }} style={styles.poster} /> : null}
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          {data.title}
        </Text>
        <View style={styles.row}>
          <Text>
            {t('release_date')}: {formatDate(data.release_date)}
          </Text>
          <Text style={styles.rating}>
            ⭐ {Number.isFinite(data.vote_average) ? data.vote_average.toFixed(1) : '–'}
          </Text>
        </View>
        <Text style={styles.overview}>{data.overview}</Text>
        <View style={styles.genreContainer}>
          {data.genres?.map(genre => (
            <View key={genre.id} style={styles.genreChip}>
              <Text>{genre.name}</Text>
            </View>
          ))}
        </View>
        <Button
          mode="contained"
          onPress={() =>
            isFavorite
              ? dispatch(removeFavorite(data.id))
              : dispatch(addFavorite(data))
          }
        >
          {isFavorite ? t('remove_from_watchlist') : t('add_to_watchlist')}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  poster: {
    width: '100%',
    height: 320,
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    marginLeft: 12,
  },
  overview: {
    marginBottom: 16,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  genreChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
    marginBottom: 8,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
