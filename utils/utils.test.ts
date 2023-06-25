import {
  temperatureIcon,
  descriptionIcon,
  getflagFromRegionalIndicator,
  isCityNotInFavorites,
} from ".";

describe("temperatureIcon", () => {
  it("should return the correct icons for high temperatures", () => {
    expect(temperatureIcon(30)).toBe("🥵");
    expect(temperatureIcon(5)).toBe("🥶");
    expect(temperatureIcon(20)).toBe("😊");
  });
});

describe("descriptionIcon", () => {
  it("should return the correct icon for a known description", () => {
    expect(descriptionIcon("clear sky")).toBe("☀️");
  });

  it("should return an empty string for an unknown description", () => {
    expect(descriptionIcon("unknown")).toBe("");
  });
});

describe("getflagFromRegionalIndicator", () => {
  it("should return the correct flag emoji", () => {
    expect(getflagFromRegionalIndicator("fr")).toBe("🇫🇷");
  });
});

describe("isCityNotInFavorites", () => {
  const defaultCities = [
    { name: "New York", id: "1" },
    { name: "London", id: "2" },
    { name: "Paris", id: "3" },
  ];

  it("should return true if the city is not in favorites", () => {
    expect(isCityNotInFavorites("Tokyo", defaultCities)).toBe(true);
  });

  it("should return false if the city is in favorites", () => {
    expect(isCityNotInFavorites("London", defaultCities)).toBe(false);
  });

  it("should return false if the defaultCities array is empty", () => {
    expect(isCityNotInFavorites("Tokyo", [])).toBe(false);
  });

  it("should return false if the defaultCities array is not provided", () => {
    expect(isCityNotInFavorites("Tokyo", undefined)).toBe(false);
  });
});
