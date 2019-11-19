import React from 'react';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

// Configures Enzyme with an adapter.
// Lets Enzyme know that React 16 is going to be used, and that's what it's
// going to take as the raw materials to create the virtual DOM.
Enzyme.configure({adapter: new EnzymeAdapter()})

test('renders without crashing', () => {
  
});
