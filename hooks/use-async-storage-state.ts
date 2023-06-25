import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions
 * to use (defaults to JSON.stringify and JSON.parse respectively)
 */

function useLocalStorageState(
  key: string,
  defaultValue: any = "",
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = useState();

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const initialize = async () => {
      const valueInLocalStorage = await AsyncStorage.getItem(key);
      if (valueInLocalStorage) {
        setState(deserialize(valueInLocalStorage));
      } else {
        setState(
          typeof defaultValue === "function" ? defaultValue() : defaultValue
        );
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    const synchronize = async () => {
      const prevKey = prevKeyRef.current;
      if (prevKey !== key) {
        await AsyncStorage.removeItem(prevKey);
      }
      prevKeyRef.current = key;
      if (state === undefined) {
        return AsyncStorage.removeItem(key);
      }
      await AsyncStorage.setItem(key, serialize(state));
    };

    synchronize();
  }, [key, state, serialize]);
  return [state, setState];
}

export { useLocalStorageState };
