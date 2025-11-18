import React from 'react';
import { StyleSheet, View } from 'react-native';
import Translate from '../Translate';
import { colors, size, horizontalScale, verticalScale, moderateScale } from '../../utils';

type Props = {
  titleKey: string;
  onPressSeeAll?: () => void;
};

export default function SectionHeader({ titleKey, onPressSeeAll }: Props) {
  return (
    <View style={styles.container}>
      <Translate translationKey={titleKey} style={styles.title} />
      {/* You can wire See All later if needed */}
      {/* onPressSeeAll && (
        <TouchableOpacity onPress={onPressSeeAll}>
          <Translate translationKey="movies.seeAll" style={styles.seeAll} />
        </TouchableOpacity>
      ) */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(18),
    marginBottom: verticalScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: moderateScale(size.lg),
    fontWeight: '600',
  },
});
