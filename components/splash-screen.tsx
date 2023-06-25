import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const CustomSplashScreen = () => {
  return (
    <View style={styles.splashscreen}>
      <Text style={styles.text}>Weather App</Text>
      <Icon style={styles.icon} size={50} name="sun-thermometer-outline" />
      <ActivityIndicator style={styles.activity} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  splashscreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkslategrey",
  },
  text: {
    color: "darkgrey",
    fontSize: 40,
    textAlign: "center",
    marginTop: 20,
  },
  activity: {
    marginTop: 100,
  },
  icon: {
    marginTop: 20,
    color: "darkgrey",
  },
});
