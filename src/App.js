import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import LandingPage   from './page/LandingPage';
import PortfolioPage from './page/PortfolioPage';
import TempPage      from './page/TempPage';
import Hat           from './component/Hat';

const App = () => {
  return (
    <>
      <Hat />
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/portfolio'>
          <PortfolioPage />
        </Route>
        <Route exact path='/temp'>
          <TempPage />
        </Route>
        <Route>
          404 No such URL
        </Route>
      </Switch>
    </>
  );
};

export default App;
