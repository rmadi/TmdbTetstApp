import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { imageUri } from '@utils/image';
import type { Movie } from '@types';

type Props = {
  movie: Movie;
  onPress?: () => void;
  rightAccessory?: React.ReactNode;
};

export default function MovieCard({ movie, onPress, rightAccessory }: Props) {
  const poster = imageUri(movie.poster_path, 'w342');

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card style={styles.card}>
        {poster ? <Card.Cover source={{ uri: poster }} style={styles.cover} /> : null}
        <Card.Content style={styles.content}>
          <Text numberOfLines={2} style={styles.title}>
            {movie.title}
          </Text>
          <View style={styles.row}>
            <Text>⭐ {Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : '–'}</Text>
            {rightAccessory ? <View style={styles.accessory}>{rightAccessory}</View> : null}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 16,
    overflow: 'hidden',
    flex: 1,
  },
  cover: {
    height: 220,
  },
  content: {
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  accessory: {
    marginLeft: 8,
  },
});
