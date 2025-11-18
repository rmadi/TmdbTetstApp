import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import { Movie } from '../../types';
import { imageUri } from '../../utils/image';
import {
  colors,
  size,
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils';
import Translate from '../Translate';
import { Text } from 'react-native-paper';

type Props = {
  movie: Movie;
  onPressDetails: () => void;
  onAddToWatchlist: () => void;
};

export default function BannerItem({ movie, onPressDetails, onAddToWatchlist }: Props) {
  const poster = imageUri(movie.backdrop_path || movie.poster_path, 'w780');

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPressDetails}>
      <ImageBackground
        source={{ uri: poster }}
        style={styles.banner}
        imageStyle={styles.bannerImage}
      >
        <View style={styles.overlay} />

        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>

          <Translate
            translationKey="movies.mockGenres"
            style={styles.genres}
          />

          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>17+</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {movie.release_date?.slice(0, 4) || '2023'}
              </Text>
            </View>
            <View style={styles.tag}>
              <Translate
                translationKey="movies.duration3h"
                style={styles.tagText}
              />
            </View>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.ratingContainer}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.rating}>
                {movie.vote_average.toFixed(1)}
              </Text>
            </View>

            <TouchableOpacity style={styles.watchBtn} onPress={onAddToWatchlist}>
              <Translate
                translationKey="movies.addToWatchlist"
                style={styles.watchText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: horizontalScale(340),
    height: verticalScale(220),
    borderRadius: moderateScale(20),
    marginRight: horizontalScale(12),
  },
  bannerImage: {
    borderRadius: moderateScale(20),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayDark,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: horizontalScale(16),
  },
  title: {
    color: colors.white,
    fontSize: moderateScale(size.lg),
    fontWeight: '700',
    marginBottom: verticalScale(6),
  },
  genres: {
    color: colors.textSecondary,
    fontSize: moderateScale(size.s),
    marginBottom: verticalScale(10),
  },
  tagRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(12),
  },
  tag: {
    backgroundColor: colors.tagBackground,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(12),
    marginRight: horizontalScale(8),
  },
  tagText: {
    color: colors.white,
    fontSize: moderateScale(size.xs),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: colors.starGold,
    fontSize: moderateScale(size.lg),
    marginRight: horizontalScale(4),
  },
  rating: {
    color: colors.white,
    fontSize: moderateScale(size.md),
    fontWeight: '600',
  },
  watchBtn: {
    backgroundColor: colors.secondry,
    paddingHorizontal: horizontalScale(14),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(16),
  },
  watchText: {
    color: colors.white,
    fontSize: moderateScale(size.s),
    fontWeight: '600',
  },
});
