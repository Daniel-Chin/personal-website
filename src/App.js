import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import PortfolioPage from './page/PortfolioPage';

const App = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/portfolio' />
      </Route>
      <Route exact path='/portfolio'>
        <PortfolioPage />
      </Route>
      <Route>
        404 No such URL
      </Route>
    </Switch>
  );
};

export default App;
