import { StyleSheet, Text, View } from "react-native";

export const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 90,
    padding: 15,
    backgroundColor: "darkslateblue",
    paddingTop: 30,
  },
  text: {
    color: "#fff",
    fontSize: 23,
    textAlign: "center",
  },
});
