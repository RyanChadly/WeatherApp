import { View, Text, StyleSheet, Button } from "react-native";

export function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Text>Details Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
