import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Translate from '@components/Translate';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import type { RootState, AppDispatch } from '@store/store';
import MovieCard from '@components/MovieCard';
import { removeFavorite } from '@store/slices/favoritesSlice';
import { HomeStackParamList } from '@navigation/Navigation';

export default function WatchlistScreen() {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.favorites.items);

  if (!items.length) {
    return (
      <View style={styles.center}>
        <Translate translationKey="movies.noFavorites" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <MovieCard
              movie={item}
              onPress={() => {
                //  navigation.navigate('MovieDetails', {
                //               id: item.id,
                //               title: item.title,
                //             })
              }}
            />
            <TouchableOpacity
              style={styles.removeWrapper}
              onPress={() => dispatch(removeFavorite(item.id))}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    marginBottom: 12,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeWrapper: {
    marginTop: 4,
    alignItems: 'flex-end',
  },
  removeText: {
    color: 'red',
    fontSize: 12,
  },
});
