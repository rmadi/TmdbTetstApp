import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import {
  colors,
  size,
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils';

type CastItem = {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
};

type Props = {
  cast: CastItem;
};

const CastCard: React.FC<Props> = ({ cast }) => {
  const uri = cast.profile_path
    ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
    : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {uri ? (
          <Image source={{ uri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {cast.name}
      </Text>
      {cast.character ? (
        <Text style={styles.role} numberOfLines={1}>
          {cast.character}
        </Text>
      ) : null}
    </View>
  );
};

export default CastCard;

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(96),
    marginRight: horizontalScale(12),
  },
  imageWrapper: {
    width: '100%',
    height: verticalScale(120),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    backgroundColor: colors.greyDark,
    marginBottom: verticalScale(6),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    backgroundColor: colors.greyDark,
  },
  name: {
    color: colors.white,
    fontSize: moderateScale(size.s),
    fontWeight: '600',
  },
  role: {
    color: colors.textSecondary,
    fontSize: moderateScale(size.xs),
  },
});
