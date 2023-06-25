import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Text, Alert } from "react-native";

export function HomeScreen({ navigation }) {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "a37c89ea6fbc1f0b0f4a2108870bb976";

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
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setCityName}
        value={cityName}
        placeholder="Choose a city..."
      />
      <Button title="Get Weather" onPress={fetchWeatherData} />
      {weatherData && (
        <View>
          <Text>City: {weatherData.name}</Text>
          <Text>Temperature: {weatherData.main.temp}</Text>
          <Text>Description: {weatherData.weather[0].description}</Text>
        </View>
      )}
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
  },
});

// https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
