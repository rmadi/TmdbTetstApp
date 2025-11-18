import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import {
  colors,
  size,
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils';

type Props = {
  pgLabel: string;
  year: string;
  duration: string;
};

const TagRow: React.FC<Props> = ({ pgLabel, year, duration }) => {
  return (
    <View style={styles.row}>
      <View style={styles.tag}>
        <Text style={styles.tagText}>{pgLabel}</Text>
      </View>
      {!!year && (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{year}</Text>
        </View>
      )}
      <View style={styles.tag}>
        <Text style={styles.tagText}>{duration}</Text>
      </View>
    </View>
  );
};

export default TagRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
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
});
