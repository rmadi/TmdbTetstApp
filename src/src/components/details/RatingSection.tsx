import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Translate from '../Translate';
import {
  colors,
  size,
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils';

type Props = {
  rating: number;
};

const RatingSection: React.FC<Props> = ({ rating }) => {
  return (
    <View style={styles.container}>
      {/* Overall */}
      <View style={styles.column}>
        <Translate
          translationKey="movies.overallRating"
          style={styles.label}
        />
        <Text style={styles.value}>{rating.toFixed(1)}</Text>
        <Text style={styles.stars}>★★★★★</Text>
      </View>

      <View style={styles.divider} />

      {/* Your rating (static 0.0) */}
      <View style={styles.column}>
        <Translate
          translationKey="movies.yourRating"
          style={styles.label}
        />
        <Text style={styles.value}>0.0</Text>
        <Text style={styles.stars}>★★★★★</Text>
      </View>
    </View>
  );
};

export default RatingSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: verticalScale(20),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(14),
    backgroundColor: colors.card,
    paddingHorizontal: horizontalScale(16),
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: horizontalScale(12),
  },
  label: {
    color: colors.textSecondary,
    fontSize: moderateScale(size.s),
    marginBottom: verticalScale(4),
  },
  value: {
    color: colors.white,
    fontSize: moderateScale(size.lg),
    fontWeight: '700',
    marginBottom: verticalScale(4),
  },
  stars: {
    color: colors.starGold,
    fontSize: moderateScale(size.s),
  },
});
