import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ value, onChangeText }: Props) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#aaa" />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#777"
        value= {value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    marginLeft: 8,
    color: "#fff",
    flex: 1,
    fontSize: 16,
  },
});
