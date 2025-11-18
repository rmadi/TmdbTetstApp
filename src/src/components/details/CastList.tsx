import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Translate from '../Translate';
import CastCard from './CastCard';
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
  cast: CastItem[];
};

const CastList: React.FC<Props> = ({ cast }) => {
  if (!cast.length) return null;

  return (
    <View style={styles.container}>
      {/* Tabs row */}
      <View style={styles.tabsRow}>
        <Translate
          translationKey="movies.cast"
          style={[styles.tabText, styles.tabActive]}
        />
        <Translate
          translationKey="movies.writer"
          style={styles.tabText}
        />
        <Translate
          translationKey="movies.director"
          style={styles.tabText}
        />
        <Translate
          translationKey="movies.seeAll"
          style={styles.seeAll}
        />
      </View>

      {/* Cast list */}
      <FlatList
        horizontal
        data={cast}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CastCard cast={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default CastList;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(20),
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: moderateScale(size.s),
    marginRight: horizontalScale(12),
  },
  tabActive: {
    color: colors.white,
    fontWeight: '600',
  },
  seeAll: {
    marginLeft: 'auto',
    color: colors.accent,
    fontSize: moderateScale(size.s),
  },
  listContent: {
    paddingRight: horizontalScale(16),
  },
});
