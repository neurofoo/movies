import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routing/Router';
import { NavBarContainer } from './nav/NavBar';
import { Helmet } from 'react-helmet';

import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Movie App</title>
        </Helmet>
        <BrowserRouter>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <NavBarContainer />
              <Router />
            </PersistGate>
          </Provider>
        </BrowserRouter>
      </div>
    );
  }
}
