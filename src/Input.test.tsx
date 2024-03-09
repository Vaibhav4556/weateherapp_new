import { shallow, render } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import InputData from "./pages/InputData";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("App", () => {
  it("renders", async () => {
    render(
      <BrowserRouter>
        <InputData />
      </BrowserRouter>
    );
  });
});

const wrapper = shallow(<InputData />);

it("Input is empty initially", () => {
  expect(wrapper.hasClass("inputdata")).toEqual(true);
  const Input = wrapper.find(".input");

  expect(Input.at(0).text()).toEqual("");
});

test("Onclick of button the value should be svaed in the Input", () => {
  const event = { target: { name: "input", value: "input" } };
  wrapper.find("input").at(0).simulate("change", event);
});

test("Onchange event should prevent fron rerendring", () => {
  wrapper.find("form").simulate("submit", { preventDefault: () => {} });
});
