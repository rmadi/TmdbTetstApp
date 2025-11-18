import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import SearchBar from '@components/SearchBar';
import MovieItem from '@components/MovieItem';
import ListEmpty from '@components/ListEmpty';
import Fallback from '@components/Fallback';
import ErrorFetch from '@components/ErrorFetch';

import useDebounce from '../hooks/useDebounce';
import { useSearchMoviesQuery } from '@api/tmdbApi';
import { imageUri } from '@utils/image';
import type { Movie } from '@types';

const mapMovieToItem = (movie: Movie) => ({
  id: String(movie.id),
  title: movie.title,
  poster: imageUri(movie.poster_path, "w342"),
  genres: movie.genres?.map(g => g.name) || [],
  rating: movie.vote_average,
  year: movie.release_date?.slice(0, 4) || "",
  pg: "PG-13",
  duration: "2h 0m",
});

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 500);

  const { data, isLoading, isError, refetch } = useSearchMoviesQuery(
    { query: debounced, page: 1 },
    { skip: debounced.trim().length === 0 }
  );
  console.log("🚀 ~ SearchScreen ~ isError:", isError)
  console.log("🚀 ~ SearchScreen ~ data:", data)

  const movies = data?.results || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search.</Text>

      <SearchBar value={query} onChangeText={setQuery} />

      <Text style={styles.subtitle}>Previous Search</Text>

      {isLoading ? (
        <Fallback />
      ) : isError ? (
        <ErrorFetch  />
      ) : debounced.trim().length === 0 ? (
        <ListEmpty message="Start typing to search movies..." />
      ) : (
        <FlatList
          data={movies}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem item={mapMovieToItem(item)} />
          )}
          ListEmptyComponent={
            <ListEmpty message="No movies found for this search." />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 12,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 10,
  },
});
