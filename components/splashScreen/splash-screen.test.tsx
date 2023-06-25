import React from "react";
import { render } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import { CustomSplashScreen } from "./splash-screen";

describe("CustomSplashScreen", () => {
  it("should render the splash screen correctly", () => {
    const tree = renderer.create(<CustomSplashScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
