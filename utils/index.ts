import { City } from "../types";

export const temperatureIcon = (temperature: number) => {
  if (temperature > 25) {
    return "🥵";
  } else if (temperature < 10) {
    return "🥶";
  } else {
    return "😊";
  }
};

const descriptionsIconArray = [
  { desc: "clear sky", icon: "☀️" },
  { desc: "few clouds", icon: "🌤" },
  { desc: "scattered clouds", icon: "🌥" },
  { desc: "broken clouds", icon: "☁️" },
  { desc: "shower rain", icon: "🌧" },
  { desc: "rain", icon: "🌧" },
  { desc: "thunderstorm", icon: "⛈" },
  { desc: "snow", icon: "🌨" },
  { desc: "mist", icon: "🌫" },
];

export const descriptionIcon = (description: string) => {
  const icon = descriptionsIconArray.find((item) => item.desc === description);
  return icon ? icon.icon : "";
};

export const getflagFromRegionalIndicator = (regionalIndicator: any) => {
  const codePoints = regionalIndicator
    .toUpperCase()
    .split("")
    .map((char: { charCodeAt: () => number }) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

export const isCityNotInFavorites = (
  cityName: string,
  defaultCities: City[]
) => {
  if (!defaultCities) return false;
  return !defaultCities.some((city) => city.name === cityName);
};
