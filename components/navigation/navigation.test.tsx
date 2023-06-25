import renderer from "react-test-renderer";
import { Navigation } from "./navigation";

describe("Navigation", () => {
  it("should render NavigationContainer correctly", () => {
    const tree = renderer.create(<Navigation />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
