import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import TempPage         from './page/TempPage';
import LandingPage      from './page/LandingPage';
import ResearchPage     from './page/ResearchPage';
import PortfolioPage    from './page/PortfolioPage';
import BlogPage         from './page/BlogPage';
import BlogListPage     from './page/BlogListPage';
import NovelListPage    from './page/NovelListPage';
import QuestionListPage from './page/QuestionListPage';
import AboutMePage      from './page/AboutMePage';
import WhoamiPage       from './page/WhoamiPage';
import IndieIframePage  from './page/IndieIframePage';
import DocumentationPage    from './page/DocumentationPage';
import NovelPage        from './page/NovelPage';
import Hat              from './component/Hat';
import TopOfEverything  from './page/TopOfEverything';
import QuestionPage from './page/QuestionPage';

const App = () => {
  return (
    <>
      <Route exact path='/'>
        <TopOfEverything />
      </Route>
      <Hat />
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/research'>
          <ResearchPage />
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
        <Route exact path='/novel/:id'>
          <NovelPage />
        </Route>
        <Route exact path='/questions'>
          <QuestionListPage />
        </Route>
        <Route exact path='/question/:id'>
          <QuestionPage />
        </Route>
        <Route exact path='/about'>
          <AboutMePage />
        </Route>
        <Route exact path='/whoami'>
          <WhoamiPage />
        </Route>
        <Route exact path='/indie/:uri'>
          <IndieIframePage />
        </Route>
        <Route exact path='/documentation/:id'>
          <DocumentationPage />
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
