import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  colors,
  size,
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils';
import Translate from '../Translate';

type Props = {
  onPress: () => void;
};

const WatchlistButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Translate
        translationKey="movies.addToWatchlist"
        style={styles.buttonText}
      />
    </TouchableOpacity>
  );
};

export default WatchlistButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondry,
    marginTop: verticalScale(16),
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: moderateScale(size.md),
    fontWeight: '600',
  },
});
