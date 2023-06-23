import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Header } from "./components/Header";
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([
    { id: 1, text: "Milk" },
    { id: 1, text: "Eggs" },
    { id: 1, text: "Bread" },
    { id: 1, text: "Juice" },
  ]);
  return (
    <View style={styles.container}>
      <Header title="My App" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//asyncStorage is like local storage in the browser
