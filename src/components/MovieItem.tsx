import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface MovieItemProps {
  item: {
    id: string;
    title: string;
    poster: string;
    genres: string[];
    rating: number;
    year: string;
    duration: string;
    pg: string;
  };
}

const MovieItem = ({ item }: MovieItemProps) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.poster }} style={styles.poster} />

      <View style={styles.infoBox}>
        {/* Genres */}
        <Text style={styles.genres}>
          {item.genres.join("  •  ")}
        </Text>

        {/* Title */}
        <Text style={styles.title}>{item.title}</Text>

        {/* Tags */}
        <View style={styles.tagsRow}>
          <Text style={styles.tag}>{item.pg}</Text>
          <Text style={styles.tag}>{item.year}</Text>
          <Text style={styles.tag}>{item.duration}</Text>
        </View>

        {/* Bottom row */}
        <View style={styles.bottomRow}>
          <View style={styles.ratingBox}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.rating}>{item.rating}</Text>
          </View>

          <TouchableOpacity style={styles.watchBtn}>
            <Text style={styles.watchText}>Add To Watchlist</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    borderRadius: 14,
    padding: 10,
    marginBottom: 16,
  },
  poster: {
    width: 95,
    height: 130,
    borderRadius: 12,
  },
  infoBox: {
    flex: 1,
    marginLeft: 12,
  },
  genres: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  tagsRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  tag: {
    backgroundColor: "#2E2E2E",
    color: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 11,
    marginRight: 6,
  },
  bottomRow: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    color: "#FFD700",
    fontSize: 16,
  },
  rating: {
    marginLeft: 4,
    color: "#fff",
    fontSize: 14,
  },
  watchBtn: {
    backgroundColor: "#0078C6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  watchText: {
    color: "#fff",
    fontSize: 12,
  },
});
