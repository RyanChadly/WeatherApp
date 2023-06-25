import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CityRenderer } from "./cityRenderer";

const mockCity = {
  id: "1",
  name: "New York",
};

describe("CityRenderer", () => {
  it("should render the city name correctly", () => {
    const { getByText } = render(
      <CityRenderer city={mockCity} onRemove={() => {}} onPress={() => {}} />
    );
    const cityName = getByText("New York");
    expect(cityName).toBeDefined();
  });

  it("should call onRemove when the remove icon is pressed", () => {
    const mockOnRemove = jest.fn();
    const { getByTestId } = render(
      <CityRenderer
        city={mockCity}
        onRemove={mockOnRemove}
        onPress={() => {}}
      />
    );

    const removeIcon = getByTestId("remove-icon");
    fireEvent.press(removeIcon);
    expect(mockOnRemove).toHaveBeenCalledWith(mockCity.id);
  });

  it("should call onPress when the pressable area is pressed", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <CityRenderer city={mockCity} onRemove={() => {}} onPress={mockOnPress} />
    );
    const pressableArea = getByText(mockCity.name);
    fireEvent.press(pressableArea);
    expect(mockOnPress).toHaveBeenCalledWith(mockCity);
  });
});
