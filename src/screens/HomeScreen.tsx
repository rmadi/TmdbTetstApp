import React, { useCallback, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '@api/tmdbApi';

import { addFavorite } from '@store/slices/favoritesSlice';
import type { Movie } from '@types';
import type { RootState, AppDispatch } from '@store/store';


import Translate from '@components/Translate';

import {
  colors,
  size,
  horizontalScale,
  verticalScale,
  moderateScale,
} from '@utils';
import BannerCarousel from '@components/home/BannerCarousel';
import HorizontalMovieList from '@components/home/HorizontalMovieList';
import { HomeStackParamList, TabsParamList } from '@navigation/Navigation';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const username = useSelector((s: RootState) => s.auth.username) || 'Guest';

  const [refreshing, setRefreshing] = useState(false);

  const nowPlaying = useGetNowPlayingMoviesQuery(1);
  const popular = useGetPopularMoviesQuery(1);
  const upcoming = useGetUpcomingMoviesQuery(1);

  const onPressDetails = (movie: Movie) => {
    navigation.navigate('MovieDetails', { id: movie.id, title: movie.title });
  };

  const onAddToWatchlist = (movie: Movie) => {
    dispatch(addFavorite(movie));
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      nowPlaying.refetch(),
      popular.refetch(),
      upcoming.refetch(),
    ]);
    setRefreshing(false);
  }, []);

  return (
    <FlashList
      data={[1]}

      renderItem={() => null}
      keyExtractor={() => 'home'}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="transparent"
          colors={['transparent']}
          progressViewOffset={verticalScale(50)}
          style={styles.refreshControl}
        />
      }
      ListHeaderComponent={
        <View style={styles.headerWrapper}>
          <Translate
            translationKey="home.welcomeBack"
            style={styles.welcome}
          />
          {/* username with a dot, like the design */}
          <View style={styles.usernameRow}>
            <Translate
              translationKey="" // no translation for username, so skip text
              includeTranslatedText={false}
              style={styles.username}
            >
              {username}
            </Translate>
            <Translate
              translationKey=""
              includeTranslatedText={false}
              style={styles.username}
            >
              .
            </Translate>
          </View>

          {/* Banner */}
          <View style={styles.bannerSection}>
            <BannerCarousel
              movies={nowPlaying.data?.results?.slice(0, 5) || []}
              loading={nowPlaying.isLoading}
              error={nowPlaying.isError}
              onPressDetails={onPressDetails}
              onAddToWatchlist={onAddToWatchlist}
              onRetry={nowPlaying.refetch}
            />
          </View>

          {/* Top Picks */}
          <HorizontalMovieList
            titleKey="movies.topPicks"
            movies={popular.data?.results?.slice(0, 10)}
            loading={popular.isLoading}
            error={popular.isError}
            onRetry={popular.refetch}
            onPressItem={onPressDetails}
          />

          {/* Upcoming */}
          <HorizontalMovieList
            titleKey="movies.upcoming"
            movies={upcoming.data?.results?.slice(0, 10)}
            loading={upcoming.isLoading}
            error={upcoming.isError}
            onRetry={upcoming.refetch}
            onPressItem={onPressDetails}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBackground,
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(40),
  },
  refreshControl: { backgroundColor: 'transparent' },
  headerWrapper: {
    paddingTop: verticalScale(20),
  },
  welcome: {
    color: colors.grey,
    fontSize: moderateScale(size.md),
    marginBottom: verticalScale(2),
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: verticalScale(18),
  },
  username: {
    color: colors.white,
    fontSize: moderateScale(size.xlg),
    fontWeight: '700',
  },
  bannerSection: {
    marginBottom: verticalScale(18),
  },
});
