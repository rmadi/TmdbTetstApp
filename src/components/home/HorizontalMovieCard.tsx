import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { Movie } from '@types';
import { imageUri } from '@utils/image';
import { colors, size, horizontalScale, verticalScale, moderateScale } from '../../utils';

type Props = {
  movie: Movie;
  onPress?: () => void;
};

const HorizontalMovieCard: React.FC<Props> = ({ movie, onPress }) => {
  const poster = imageUri(movie.poster_path, 'w342');

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Image source={{ uri: poster }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.rating}>★ {movie.vote_average.toFixed(1)}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {(movie.release_date || '2023').slice(0, 4)} • 2h 20m
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalMovieCard;

const styles = StyleSheet.create({
  wrapper: {
    width: horizontalScale(140),
    marginRight: horizontalScale(12),
  },
  image: {
    width: horizontalScale(140),
    height: verticalScale(190),
    borderRadius: moderateScale(14),
    marginBottom: verticalScale(6),
  },
  info: {},
  rating: {
    color: colors.starGold,
    fontSize: moderateScale(size.xs),
    marginBottom: verticalScale(2),
  },
  title: {
    color: colors.white,
    fontSize: moderateScale(size.s),
    fontWeight: '600',
  },
  meta: {
    color: colors.textSecondary,
    fontSize: moderateScale(size.xs),
  },
});
