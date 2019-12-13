import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { exportAllDeclaration } from "@babel/types";
Enzyme.configure({
  adapter: new EnzymeAdapter()
});

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

const findTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});
test("renders counter display", () => {
  const wrapper = setup();
  const appCounter = findTestAttr(wrapper, "counter-display");
  expect(appCounter.length).toBe(1);
});
test("renders counter start with 0", () => {
  const wrapper = setup();
  const stateInitialVal = wrapper.state("counter");
  console.log("stateInitialVal ", stateInitialVal);
  expect(stateInitialVal).toBe(0);
});
test("renders clicking button increment counter", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  const button = findTestAttr(wrapper, "increment-button");
  button.simulate("click");

  const appCounter = findTestAttr(wrapper, "counter-display");
  console.log("appCounter.text()");
  expect(appCounter.text()).toContain(counter+1);
});
