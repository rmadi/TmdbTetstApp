import React, { useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';

import { Movie } from '../../types';
import BannerItem from './BannerItem';
import PaginationDots from './PaginationDots';
import Fallback from '../Fallback';
import ErrorFetch from '../ErrorFetch';
import ListEmpty from '../ListEmpty';

type Props = {
  movies: Movie[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  onPressDetails: (movie: Movie) => void;
  onAddToWatchlist: (movie: Movie) => void;
};

export default function BannerCarousel({
  movies,
  loading,
  error,
  onRetry,
  onPressDetails,
  onAddToWatchlist,
}: Props) {
  const [index, setIndex] = useState(0);

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const newIndex = Math.round(contentOffset.x / layoutMeasurement.width);
    setIndex(newIndex);
  };

  if (loading) return <Fallback />;
  if (error) return <ErrorFetch  />;

  if (!movies.length) {
    return <ListEmpty message="No movies to show." />;
  }

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={item => item.id.toString()}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item }) => (
          <BannerItem
            movie={item}
            onPressDetails={() => onPressDetails(item)}
            onAddToWatchlist={() => onAddToWatchlist(item)}
          />
        )}
      />
      <PaginationDots count={movies.length} activeIndex={index} />
    </View>
  );
}
