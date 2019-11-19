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

// Ensure that an app component renders.
test('App renders without crashing', () => {
  const wrapper = setup();
  // Find all components with a data-test attr with value 'component-app'.
  const appComponent = findByTestAttr(wrapper, 'component-app');
  // Expecting to have found one element.
  expect(appComponent.length).toBe(1);
});

// Ensure that a increment button renders.
test('increment button renders without crashing', () => {
  const wrapper = setup();
  // Find all components with a data-test attr with value
  // 'increment-button'.
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  // Expecting to have found one element.
  expect(incrementButton.length).toBe(1);
});

// Ensure that a decrement button renders.
test('decrement button renders', () => {
  const wrapper = setup();
  // Find all components with a data-test attr with value
  // 'decrement-button'.
  const buttonDecrement = findByTestAttr(wrapper, 'decrement-button');
  // Expecting to have found one element.
  expect(buttonDecrement.length).toBe(1);
})

// Ensure that a counter display renders.
test('counter display renders without crashing', () => {
  const wrapper = setup();
  // Find all components with a data-test attr with value
  // 'counter-display'.
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

// Ensure that the clicking the increment button increments the counter.
// (Checking the counter display and not state, trying to move as far away
// from implementation as possible).
test('clicking increment button increments counter display', () => {
  const exampleCount = 7;
  // Gets a wrapper with state prop 'count' initialized to 7.
  const wrapper = setup(null, {count: exampleCount});
  // Gets reference to the increment button.
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  // Simulate a click event on the increment button.
  incrementButton.simulate('click');
  // Find counter display.
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  // Extract the value of its text attribute.
  const text = counterDisplay.text();
  // Expect the counterDiplay to be displaying text holding the value of
  // <exampleCount> incremented by 1.
  expect(text).toContain(exampleCount + 1);
});

// Ensure that clicking the decrement button decrements the counter.
test('clicking decrement button decrements counter display', () => {
  const exampleCount = 7;
  // Gets a wrapper with a state prop 'count' initialized to 7.
  const wrapper = setup(null, {count: exampleCount});
  // Gets reference to the decrement button.
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  // Simulate a click event on the decrement button.
  decrementButton.simulate('click');
  // Find counter display.
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  // Extract the value of its text attribute.
  const text = counterDisplay.text();
  // Expect the counterDisplay to be display text holding the value of
  // <exampleCount> decremented by 1.
  expect(text).toContain(exampleCount - 1);
});

// Ensure that clicking the decrement button when the counter is 0 does not
// decrement the counter.
test('no decrement if counter is 0', () => {
  const zeroCount = 0;
  // Gets a wrapper with a state prop 'count' initialized to 0.
  const wrapper = setup(null, {count: zeroCount});
  // Gets a reference to the decrement button.
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  // Simulate a click event on the decrement button.
  decrementButton.simulate('click');
  // Find the counter display.
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  // Extract the value of its text attribute.
  const text = counterDisplay.text();
  // Expect the text of counterDisplay to not contain a value of <zeroCount>
  // decremented by 1.
  expect(text).not.toContain(zeroCount - 1);
});

// Ensure that an error message is displayed when decrement button is clicked
// while counter is 0.
test('error message displayed if try to decrement counter while it is 0', () => {
  const zeroCount = 0;
  // Gets a wrapper with a state prop 'count' initialized to 0.
  const wrapper = setup(null, {count: zeroCount});
  // Gets a reference to the decrement button.
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  // Simulate a click event on the decrement button.
  decrementButton.simulate('click');
  // Expect for an error message to pop up
  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(1);
});

// Ensure that error message is cleared when increment button is clicked.
test('error message cleared if increment clicked', () => {
  const zeroCount = 0;
  // Gets a wrapper with a state prop 'count' initialized to 0.
  const wrapper = setup(null, {count: zeroCount});
  // Gets a reference to the decrement button.
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  // Simulate a click event on the decrement button.
  decrementButton.simulate('click');
  // At this point error message is present. Now to click increment button:
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');
  // With increment button click, error message expected to be gone.
  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(0);
})
