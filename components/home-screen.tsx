import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  FlatList,
} from "react-native";
import { City } from "../types";
import { CityRenderer } from "./cityRenderer/cityRenderer";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { useLocalStorageState } from "../hooks/use-async-storage-state";

export function HomeScreen({ navigation }) {
  const [cityName, setCityName] = useState("");
  // this is a free api key, I'd normally use a gitignored file to store it
  const apiKey = "a37c89ea6fbc1f0b0f4a2108870bb976";
  const [defaultCities, setDefaultCities] = useLocalStorageState(
    "defaultcities",
    [
      {
        id: uuid(),
        name: "Warsaw",
      },
      {
        id: uuid(),
        name: "Paris",
      },
      {
        id: uuid(),
        name: "New York",
      },
      {
        id: uuid(),
        name: "Tokyo",
      },
    ]
  ) as unknown as [City[], (value: City[]) => void];

  const addToFavorites = (cityName: string) => () => {
    setDefaultCities([...defaultCities, { id: uuid(), name: cityName }]);
  };

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

      navigation.navigate("Details", { weatherData: data, addToFavorites });
    } catch (error) {
      Alert.alert("Error", error.message, [
        { text: "OK", onPress: () => setCityName("") },
      ]);
    }
  };

  const handlePress = (city: City) => {
    setCityName(city.name);
  };

  const handleRemove = (id: string) => {
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
