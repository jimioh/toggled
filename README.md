# Getting Started with James' toggle solution

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To run

In the project directory, you can run:

### `yarn install`

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

## Considerations

1. The Question component is decoupled with a render props function to allow for separate choice of answer controls.
2. Accessibility is maintained by using a hidden radio button, and the change to the answer status ('The answer is correct/incorrect') will notify screen readers via the aria-live="polite" attribute.
3. On first component render the first toggle will be focused.
4. I used flexbox on the toggle labels so that at a smaller screen width the labels would wrap and maintain the same height. This could probably be done in a better way, I'm sure...

## Todo/Nice to do with more time

1. Fix z-index layering issue with toggle component so that white borders are displayed under overlay and text color shows through. There is another experimental feature branch (feature/resize-observer) where I used ResizeObserver with limited success to render the label on top of the overlay. Feel free to check it out.
2. Fix broken test with @testing-library/user-event to trigger arrow key successfully to test radio button accessibility.
3. Add CSS-in-JS library (styled-components) to replace style object code for background.
