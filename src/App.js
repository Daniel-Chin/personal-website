import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
      <Routes>
        <Route path='/' element={
          <TopOfEverything />
        } />
        <Route path='*' element={null} />
      </Routes>
      <Hat />
      <Routes>
        <Route path='/' element={
          <LandingPage />
        } />
        <Route path='/research' element={
          <ResearchPage />
        } />
        <Route path='/portfolio' element={
          <PortfolioPage />
        } />
        <Route path='/blogs' element={
          <BlogListPage />
        } />
        <Route path='/blog/:id' element={
          <BlogPage />
        } />
        <Route path='/novels' element={
          <NovelListPage />
        } />
        <Route path='/novel/:id' element={
          <NovelPage />
        } />
        <Route path='/questions' element={
          <QuestionListPage />
        } />
        <Route path='/question/:id' element={
          <QuestionPage />
        } />
        <Route path='/about' element={
          <AboutMePage />
        } />
        <Route path='/whoami' element={
          <WhoamiPage />
        } />
        <Route path='/indie/:uri' element={
          <IndieIframePage />
        } />
        <Route path='/documentation/:id' element={
          <DocumentationPage />
        } />
        <Route path='/temp' element={
          <TempPage />
        } />
        <Route path='*' element={
          <div>404 No such URL</div>
        } />
      </Routes>
    </>
  );
};

export default App;
