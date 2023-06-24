import { StyleSheet } from "react-native";
import { SplashScreen } from "./components/splash-screen";
import { Suspense, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./components/home-screen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Suspense fallback={<SplashScreen />}>
      {showContent ? (
        <NavigationContainer>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Welcome" }}
          />
        </NavigationContainer>
      ) : (
        <SplashScreen />
      )}
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
