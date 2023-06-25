import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  FlatList,
} from "react-native";
import { City } from "../types";
import { CityRenderer } from "./cityRenderer";

export function HomeScreen({ navigation }) {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "a37c89ea6fbc1f0b0f4a2108870bb976";
  const [defaultCities, setDefaultCities] = useState<City[]>([
    {
      id: 1,
      name: "London",
    },
    {
      id: 2,
      name: "Paris",
    },
    {
      id: 3,
      name: "New York",
    },
    {
      id: 4,
      name: "Tokyo",
    },
  ]);

  const fetchWeatherData = async () => {
    try {
      if (!cityName) throw new Error("City name is required.");
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=metric`
      ).then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw new Error("This city is not found.");
        }
      });
      const data = await response.json();
      setWeatherData(data);
      setCityName("");
      navigation.navigate("Details", { weatherData: data });
    } catch (error) {
      Alert.alert("Error", error.message, [
        { text: "OK", onPress: () => setCityName("") },
      ]);
    }
  };

  const handlePress = (city: City) => {
    setCityName(city.name);
  };
  const handleRemove = (id: number) => {
    setDefaultCities(defaultCities.filter((city) => city.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setCityName}
        value={cityName}
        placeholder="Choose a city..."
      />
      <Button title="Get Weather" onPress={fetchWeatherData} />
      <FlatList
        renderItem={(city) => (
          <CityRenderer
            city={city.item}
            onRemove={handleRemove}
            onPress={handlePress}
          />
        )}
        data={defaultCities}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderRadius: 5,
  },
});

// https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
