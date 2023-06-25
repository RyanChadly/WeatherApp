import { StyleSheet, Text, Pressable } from "react-native";
import { City } from "../types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface CityRendererProps {
  city: City;
  onRemove: (id: string) => void;
  onPress: (city: City) => void;
}

export const CityRenderer = ({
  city,
  onRemove,
  onPress,
}: CityRendererProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
        },
        styles.container,
      ]}
      onPress={() => onPress(city)}
    >
      <Text style={styles.text}>{city.name}</Text>

      <Icon
        onPress={() => onRemove(city.id)}
        name="delete-outline"
        size={20}
        color="#0000FF"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
  },
});
