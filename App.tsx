import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Navigation } from "./components/navigation/navigation";
import { CustomSplashScreen } from "./components/splashScreen/splash-screen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [showContent, setShowContent] = useState(false);

  // there is nothing to fetch that would require a loading screen, so I am artificially delaying it.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (!showContent) return <CustomSplashScreen />;

  return <Navigation />;
}
