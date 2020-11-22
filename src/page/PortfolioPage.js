import React, { useState } from 'react';
import portfolio_root from '../generated/portfolioRoot';
import { SORT, sortProjects } from '../helpers/misc';
import PortfolioCard from '../component/PortfolioCard';

const PortfolioPage = () => {
  const [sort_method, set_sort_method] = useState(SORT.PRIDE);
  const [positive_tags, set_positive_tags] = useState([]);
  const [negative_tags, set_negative_tags] = useState([]);
  const projects = sortProjects(portfolio_root, sort_method);
  return (
    projects.map((p, i) => (
      <PortfolioCard 
        key={i} project={p} 
        positive_tags={positive_tags} negative_tags={negative_tags}
        set_positive_tags={set_positive_tags}
        set_negative_tags={set_negative_tags}
      />
    ))
  );
};

export default PortfolioPage;
