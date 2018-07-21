// Default export from a module
import React from 'react';
// Individual method exports from a module
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

// CSS from a module
import 'bootstrap/dist/css/bootstrap.css';
// CSS from a local file
import './css/musiclist.scss';

// Default export from a local file
import Store from './store';

import TemplateContainer from './components/TemplateContainer';

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider store={Store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.querySelector('#react-app'),
  );
};

// Initial render of the page
renderApp(TemplateContainer);

// Hot reloads the page and re-renders the page
if (module && module.hot) {
  module.hot.accept();
}
