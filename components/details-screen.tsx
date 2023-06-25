import { View, Text, StyleSheet, Button } from "react-native";

export function DetailsScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>Country: {route.params.weatherData.sys.country}</Text>
      <Text>City: {route.params.weatherData.name}</Text>
      <Text>Temperature: {route.params.weatherData.main.temp}</Text>
      <Text>
        Description: {route.params.weatherData.weather[0].description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
