# Reflection

## In this section, we...
- Set up a (very) simple React app with Jest and Enzyme
- Used Enzyme's `shallow` function to render a component
- Tested that required DOM elements were rendered using `find()`
- Tested state using Enzyme's `setState()` and `state()`
- Used `simulate` to interact with rendered elements and (clicked button)
- Tested component for updates after interaction.
- Created re-usable `setup()` and `findByTestAttr()` functions.

## Post-Reflection Tasks
1. Decrement Button
- Create a new button with the text "Decrement Counter".
- When the new button is clicked, decrement the counter.

2. No Count Below Zero
- If the counter is at zero, and the decrement button is clicked:
    - Don't decrement the counter.
    - Display an error message saying the counter can't go below zero.

3. Clear Error on Increment
- Error should clear on click of increment button
- Counter should just increment as usual.


