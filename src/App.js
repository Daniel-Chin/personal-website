import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import TempPage         from './page/TempPage';
import LandingPage      from './page/LandingPage';
import PortfolioPage    from './page/PortfolioPage';
import BlogPage         from './page/BlogPage';
import BlogListPage     from './page/BlogListPage';
import NovelListPage    from './page/NovelListPage';
import QuestionListPage from './page/QuestionListPage';
import AboutMePage      from './page/AboutMePage';
import WhoamiPage       from './page/WhoamiPage';
import Hat              from './component/Hat';
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
        <Route exact path='/blogs'>
          <BlogListPage />
        </Route>
        <Route exact path='/blog/:id'>
          <BlogPage />
        </Route>
        <Route exact path='/novels'>
          <NovelListPage />
        </Route>
        <Route exact path='/questions'>
          <QuestionListPage />
        </Route>
        <Route exact path='/about'>
          <AboutMePage />
        </Route>
        <Route exact path='/whoami'>
          <WhoamiPage />
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
