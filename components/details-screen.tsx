import { View, Text, StyleSheet, Button } from "react-native";

export function DetailsScreen({ navigation, route }) {
  const { addToFavorites } = route.params;
  const { weatherData } = route.params;
  return (
    <View style={styles.container}>
      <Text>Country: {weatherData.sys.country}</Text>
      <Text>City: {weatherData.name}</Text>
      <Text>Temperature: {weatherData.main.temp}</Text>
      <Text>Description: {weatherData.weather[0].description}</Text>
      <Button
        title="Add to Favorites"
        onPress={addToFavorites(weatherData.name)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
