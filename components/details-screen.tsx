import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export function DetailsScreen({ route }) {
  const favorites = useAsyncStorage("defaultcities");
  const [defaultCities, setDefaultCities] = useState([]);
  const { addToFavorites } = route.params;
  const { weatherData } = route.params;

  useEffect(() => {
    favorites.getItem().then((value) => setDefaultCities(JSON.parse(value)));
  }, []);

  const temperatureIcon = () => {
    if (weatherData.main.temp > 25) {
      return "🥵";
    } else if (weatherData.main.temp < 10) {
      return "🥶";
    } else {
      return "😊";
    }
  };

  const descriptionsIconArray = [
    { desc: "clear sky", icon: "☀️" },
    { desc: "few clouds", icon: "🌤" },
    { desc: "scattered clouds", icon: "🌥" },
    { desc: "broken clouds", icon: "☁️" },
    { desc: "shower rain", icon: "🌧" },
    { desc: "rain", icon: "🌧" },
    { desc: "thunderstorm", icon: "⛈" },
    { desc: "snow", icon: "🌨" },
    { desc: "mist", icon: "🌫" },
  ];

  const descriptionIcon = () => {
    const description = weatherData.weather[0].description;
    const icon = descriptionsIconArray.find(
      (item) => item.desc === description
    );
    return icon ? icon.icon : "";
  };

  const getflagFromRegionalIndicator = (regionalIndicator: any) => {
    const codePoints = regionalIndicator
      .toUpperCase()
      .split("")
      .map((char: { charCodeAt: () => number }) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

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
        {weatherData.main.temp}°C {temperatureIcon()}
      </Text>
      <Text style={styles.descriptionIcon}>{descriptionIcon()}</Text>
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
  descriptionIcon: { fontSize: 40 },
});
