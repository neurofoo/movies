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
    console.group('DESIGNED AND DEVELOPED BY NEUROFOO.COM');
    console.log(
      'Please see https://neurofoo.com/ for additional information. Thanks for peeking at the source code :)',
    );
    console.groupEnd();

    return (
      <div>
        <Helmet>
          <title>Frederick Movie App</title>
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
