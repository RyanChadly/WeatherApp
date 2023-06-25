import { View, StyleSheet, Text, Button } from "react-native";
import { City } from "../types";

interface CityRendererProps {
  city: City;
  onRemove: (id: number) => void;
}

export const CityRenderer = ({ city, onRemove }: CityRendererProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{city.name}</Text>
      <Button title="" onPress={() => onRemove(city.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
  },
});
