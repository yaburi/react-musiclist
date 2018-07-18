import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import './css/musiclist.scss';
import Template from './components/Template';

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Component headline="Test Headline" count={2222} showCount />
    </AppContainer>,
    document.querySelector('#react-app'),
  );
};

// Initial render of the page
renderApp(Template);

// Hot reloads the page and re-renders the page
if (module && module.hot) {
  module.hot.accept();
}
