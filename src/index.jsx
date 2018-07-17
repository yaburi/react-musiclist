import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import TestComponent from './testcomponent';

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Component headline="Test Headline" count={2222} showCount />
    </AppContainer>,
    document.querySelector('#react-app'),
  );
};

// Initial render of the page
renderApp(TestComponent);

// Hot reloads the page and re-renders the page
if (module && module.hot) {
  module.hot.accept('./testcomponent', () => {
    renderApp(TestComponent);
  });
}
