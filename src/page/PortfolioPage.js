import React, { useState } from 'react';
import portfolio_root from '../generated/portfolioRoot';
import { sortProjects, SORT } from '../helpers/misc';
import PortfolioCard from '../component/PortfolioCard';

const PortfolioPage = () => {
  const [sort_method, set_sort_method] = useState(SORT.PRIDE);
  const projects = sortProjects(portfolio_root, sort_method);
  return (
    projects.map((p, i) => (
      <PortfolioCard key={i} project={p} />
    ))
  );
};

export default PortfolioPage;
