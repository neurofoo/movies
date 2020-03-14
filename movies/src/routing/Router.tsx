import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from '../views/Home';
import { MoviePage } from '../views/Movie';

export class Router extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
    console.group('ROUTER ERROR: COMPONENT DID CATCH');
    console.error(error, info);
    console.groupEnd();
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/movie/:id' component={MoviePage} />
      </Switch>
    );
  }
}
