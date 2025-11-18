import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';

import { Movie } from '@types';
import { imageUri } from '@utils/image';
import {
  colors,
  size,
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils';
import Translate from '../Translate';

type Props = {
  movie: Movie;
  onPressTrailer: () => void;
};

const PosterHeader: React.FC<Props> = ({ movie, onPressTrailer }) => {
  const poster = imageUri(movie.poster_path || movie.backdrop_path, 'w780');

  return (
    <ImageBackground
      source={{ uri: poster }}
      style={styles.poster}
      imageStyle={styles.posterImage}
    >
      <View style={styles.overlay} />

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.trailerButton}
        onPress={onPressTrailer}
      >
        <View style={styles.playCircle}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
        <Translate
          translationKey="movies.watchTrailer"
          style={styles.trailerText}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default PosterHeader;

const styles = StyleSheet.create({
  poster: {
    width: '100%',
    height: verticalScale(220),
    borderRadius: moderateScale(20),
    overflow: 'hidden',
  },
  posterImage: {
    borderRadius: moderateScale(20),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayDark,
  },
  trailerButton: {
    position: 'absolute',
    bottom: verticalScale(16),
    left: horizontalScale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  playCircle: {
    width: horizontalScale(40),
    height: horizontalScale(40),
    borderRadius: horizontalScale(20),
    backgroundColor: colors.tagBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: horizontalScale(8),
  },
  playIcon: {
    color: colors.white,
    fontSize: moderateScale(size.md),
  },
  trailerText: {
    color: colors.white,
    fontSize: moderateScale(size.s),
    fontWeight: '600',
  },
});
