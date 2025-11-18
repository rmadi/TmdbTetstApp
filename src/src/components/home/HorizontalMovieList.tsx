import React from 'react';
import { FlatList } from 'react-native';

import { Movie } from '../../types';
import SectionHeader from './SectionHeader';
import HorizontalMovieCard from './HorizontalMovieCard';
import Fallback from '../Fallback';
import ErrorFetch from '../ErrorFetch';
import ListEmpty from '../ListEmpty';

type Props = {
  titleKey: string;
  movies: Movie[] | undefined;
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  onPressItem: (movie: Movie) => void;
};

const HorizontalMovieList: React.FC<Props> = ({
  titleKey,
  movies,
  loading,
  error,
  onRetry,
  onPressItem,
}) => {
  return (
    <>
      <SectionHeader titleKey={titleKey} />

      {loading ? (
        <Fallback />
      ) : error ? (
        <ErrorFetch  />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={movies || []}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <HorizontalMovieCard
              movie={item}
              onPress={() => onPressItem(item)}
            />
          )}
          ListEmptyComponent={<ListEmpty message="No movies to show." />}
        />
      )}
    </>
  );
};

export default HorizontalMovieList;
