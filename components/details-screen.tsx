import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { LogBox, View, Text, StyleSheet, Button } from "react-native";
import {
  descriptionIcon,
  getflagFromRegionalIndicator,
  temperatureIcon,
} from "../utils";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export function DetailsScreen({ route }) {
  const favorites = useAsyncStorage("defaultcities");
  const [defaultCities, setDefaultCities] = useState([]);
  const { addToFavorites } = route.params;
  const { weatherData } = route.params;

  useFocusEffect(() => {
    favorites.getItem().then((value) => setDefaultCities(JSON.parse(value)));
  });

  const isCityNotInFavorites = (cityName: string) => {
    if (!defaultCities) return false;
    return !defaultCities.some((city) => city.name === cityName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.flag}>
        {weatherData.name}
        {getflagFromRegionalIndicator(weatherData.sys.country)}
      </Text>

      <Text style={styles.temperature}>
        {weatherData.main.temp}°C {temperatureIcon(weatherData.main.temp)}
      </Text>
      <Text style={styles.descriptionIcon}>
        {descriptionIcon(weatherData.weather[0].description)}
      </Text>
      <Text>{weatherData.weather[0].description}</Text>
      <Text>Humidity: {weatherData.main.humidity}%</Text>
      {isCityNotInFavorites(weatherData.name) && (
        <Button
          title="Add to Favorites"
          onPress={addToFavorites(weatherData.name)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  temperature: { fontSize: 40 },
  flag: { fontSize: 40 },
  descriptionIcon: { fontSize: 80 },
});
