import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

// Configures Enzyme with an adapter.
// Lets Enzyme know that React 16 is going to be used, and that's what it's
// going to take as the raw materials to create the virtual DOM.
Enzyme.configure({adapter: new EnzymeAdapter()});

/**
 * Factory function to create a ShalloWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for the setup.
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {String} val - Value of data-test attribute to search.
 * @return {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

// Ensure that the app renders without crashing.
test('App renders without crashing', () => {
  const wrapper = setup();
  // Find all components with a data-test attr with value 'component-app'.
  const appComponent = findByTestAttr(wrapper, 'component-app');
  // Expecting to have found one element.
  expect(appComponent.length).toBe(1);
});

// Ensure that the increment button renders without crashing.
test('increment button renders without crashing', () => {
  const wrapper = setup();
  // Find all components with a data-test attr with value
  // 'component-increment-button'.
  const button = findByTestAttr(wrapper, 'increment-button');
  // Expecting to have found one element.
  expect(button.length).toBe(1);
});

// Ensure that the counter display renders without crashing.
test('counter display renders without crashing', () => {
  const wrapper = setup();
  // Find all components with a data-test attr with value
  // 'component-counter-display'.
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  // Expecting to have found one element.
  expect(counterDisplay.length).toBe(1);
});

// Ensure that the counter starts at 0.
test('counter starts at 0', () => {
  const wrapper = setup();
  // Capturing the value of the 'count' state prop from wrapper.
  const initialCounterState = wrapper.state('count');
  // Expecting for 'count' state prop to have be initialized to 0.
  expect(initialCounterState).toBe(0);
});

// Ensure that the clicking the button increments the counter. (Checking the
// counter display and not state, trying to move as far away from
// implementation as possible).
test('clicking button increments counter display', () => {
  const exampleCount = 7;
  // Gets a wrapper with state prop 'count' initialized to 7.
  const wrapper = setup(null, {count: exampleCount});
  // Gets reference to the increment button.
  const button = findByTestAttr(wrapper, 'increment-button');
  // Simulate a click event on the increment button.
  button.simulate('click');
  // Find display and test value.
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  // Extract the value of its text attribute.
  const extractedCount = counterDisplay.text();
  // Expect the counterDiplay to be displaying text holding the value of
  // <exampleCount> incremented by 1.
  expect(extractedCount).toContain(exampleCount + 1);
});
