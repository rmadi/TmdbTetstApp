import React, { useCallback } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { useGetMovieDetailsQuery } from '@api/tmdbApi';
import { addFavorite } from '@store/slices/favoritesSlice';
import type { Movie } from '@types';

import Fallback from '@components/Fallback';
import ErrorFetch from '@components/ErrorFetch';
import Translate from '@components/Translate';

import PosterHeader from '@components/details/PosterHeader';
import TagRow from '@components/details/TagRow';
import WatchlistButton from '@components/details/WatchlistButton';
import RatingSection from '../components/details/RatingSection';
import CastList from '@components/details/CastList';

import {
  colors,
  size,
  horizontalScale,
  verticalScale,
  moderateScale,
} from '@utils';

type RouteParams = {
  id: number;
  title?: string;
};

export default function MovieDetailsScreen() {
  const route = useRoute<any>();
  const { id } = route.params as RouteParams;

  const dispatch = useDispatch();

  const {
    data: movie,
    isLoading,
    isError,
    refetch,
  } = useGetMovieDetailsQuery(id);

  const onAddToWatchlist = useCallback(
    (m: Movie) => {
      dispatch(addFavorite(m));
    },
    [dispatch],
  );

  const handleWatchTrailer = useCallback(() => {
    if (!movie) {
      return;
    }
    const videos = (movie as any).videos?.results ?? [];
    const trailer = videos.find(
      (v: any) => v.type === 'Trailer' && v.site === 'YouTube',
    );

    if (trailer?.key) {
      const url = `https://www.youtube.com/watch?v=${trailer.key}`;
      Linking.openURL(url).catch(() => {});
    }
  }, [movie]);

  if (isLoading) {
    return <Fallback />;
  }

  if (isError || !movie) {
    return <ErrorFetch  onRetry={refetch} />;
  }

  const year = movie.release_date?.slice(0, 4) ?? '';
  const runtimeMinutes = (movie as any).runtime as number | undefined;
  const hours = runtimeMinutes ? Math.floor(runtimeMinutes / 60) : 2;
  const minutes = runtimeMinutes ? runtimeMinutes % 60 : 20;
  const durationLabel = `${hours}h ${minutes.toString().padStart(2, '0')}m`;

  const genres =
    movie.genres?.map(g => g.name).join(' • ') ?? '';

  const cast = ((movie as any).credits?.cast ?? []).slice(0, 10);

  return (
    <FlashList
      data={[1]}
      renderItem={() => null}
      keyExtractor={() => 'details'}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={styles.content}>
          {/* Header title */}
          <Translate
            translationKey="movies.detailsHeader"
            style={styles.headerTitle}
          />

          {/* Poster with trailer overlay */}
          <PosterHeader movie={movie} onPressTrailer={handleWatchTrailer} />

          {/* Genres */}
          {!!genres && (
            <Translate
              translationKey=""
              includeTranslatedText={false}
              style={styles.genresText}
            >
              {genres}
            </Translate>
          )}

          {/* Title */}
          <Translate
            translationKey=""
            includeTranslatedText={false}
            style={styles.title}
          >
            {movie.title}
          </Translate>

          {/* Tags row: PG, year, duration */}
          <TagRow pgLabel="PG 13" year={year} duration={durationLabel} />

          {/* Overview */}
          {movie.overview ? (
            <View style={styles.overviewBlock}>
              <Translate
                translationKey="movies.overview"
                style={styles.overviewTitle}
              />
              <Translate
                translationKey=""
                includeTranslatedText={false}
                style={styles.overviewText}
              >
                {movie.overview}
              </Translate>
            </View>
          ) : null}

          {/* Add to Watchlist */}
          <WatchlistButton onPress={() => onAddToWatchlist(movie)} />

          {/* Rating section */}
          <RatingSection rating={movie.vote_average} />

          {/* Cast section */}
          <CastList cast={cast} />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
    paddingBottom: verticalScale(32),
  },
  content: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(12),
  },
  headerTitle: {
    color: colors.white,
    fontSize: moderateScale(size.md),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  genresText: {
    color: colors.textSecondary,
    fontSize: moderateScale(size.s),
    marginTop: verticalScale(12),
  },
  title: {
    color: colors.white,
    fontSize: moderateScale(size.lg),
    fontWeight: '700',
    marginTop: verticalScale(6),
  },
  overviewBlock: {
    marginTop: verticalScale(12),
  },
  overviewTitle: {
    color: colors.white,
    fontSize: moderateScale(size.md),
    fontWeight: '600',
    marginBottom: verticalScale(4),
  },
  overviewText: {
    color: colors.textSecondary,
    fontSize: moderateScale(size.s),
    lineHeight: verticalScale(18),
  },
});
