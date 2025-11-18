import React from 'react';
import { View, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, colors } from '../../utils';

type Props = {
  count: number;
  activeIndex: number;
};

export default function PaginationDots({ count, activeIndex }: Props) {
  if (count <= 1) return null;

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <View
            key={index.toString()}
            style={[styles.dot, isActive && styles.dotActive]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  dot: {
    width: horizontalScale(6),
    height: horizontalScale(6),
    borderRadius: horizontalScale(3),
    backgroundColor: colors.greyDark,
    marginHorizontal: horizontalScale(4),
  },
  dotActive: {
    width: horizontalScale(18),
    borderRadius: horizontalScale(9),
    backgroundColor: colors.white,
  },
});
