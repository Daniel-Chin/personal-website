import React, { useState } from 'react';
import portfolio_root from '../generated/portfolioRoot';
import { SORT, sortProjects, summarizeTags } from '../helpers/misc';
import PortfolioCard from '../component/PortfolioCard';
import ProjectTag from '../component/ProjectTag';

const PortfolioPage = () => {
  const [sort_method, set_sort_method] = useState(SORT.PRIDE);
  const [positive_tags, set_positive_tags] = useState([]);
  const [negative_tags, set_negative_tags] = useState([]);
  const projects = sortProjects(portfolio_root, sort_method);
  const tag_summary = summarizeTags(projects);
  return (
    <>
      <h2 className='center-text'>
        Project Portfolio
      </h2>
      <div className='portfolio-control-panel'>
        <div className='portfolio-control-panel-row'>
          <div className='portfolio-control-panel-row-left'>
            All tags:
          </div>
          <div className='portfolio-control-panel-row-right'>
            {tag_summary.map(({ tag, occurance }, i) => (
              positive_tags.includes(tag) || negative_tags.includes(tag) 
            ? null : 
              <ProjectTag key={i} tag={tag} filterable 
                positive_tags={positive_tags} 
                negative_tags={negative_tags}
                set_positive_tags={set_positive_tags}
                set_negative_tags={set_negative_tags} 
                occurance={occurance}
              />
            ))}
          </div>
        </div>
        <div className='portfolio-control-panel-row'>
          <div className='portfolio-control-panel-row-left'>
            Filtering for:
          </div>
          <div className='portfolio-control-panel-row-right'>
            {tag_summary.map(({ tag, occurance }, i) => (
              positive_tags.includes(tag)
            ? 
              <ProjectTag key={i} tag={tag} filterable 
                positive_tags={positive_tags} 
                negative_tags={negative_tags}
                set_positive_tags={set_positive_tags}
                set_negative_tags={set_negative_tags} 
                occurance={occurance}
              />
            :
              null
            ))}
          </div>
        </div>
        <div className='portfolio-control-panel-row'>
          <div className='portfolio-control-panel-row-left'>
            Excluding:
          </div>
          <div className='portfolio-control-panel-row-right'>
            {tag_summary.map(({ tag, occurance }, i) => (
              negative_tags.includes(tag) 
            ? 
              <ProjectTag key={i} tag={tag} filterable 
                positive_tags={positive_tags} 
                negative_tags={negative_tags}
                set_positive_tags={set_positive_tags}
                set_negative_tags={set_negative_tags} 
                occurance={occurance}
              />
            :
              null
            ))}
          </div>
        </div>
      </div>
      <div>
        {projects.map((p, i) => (
          <PortfolioCard 
            key={i} project={p} 
            positive_tags={positive_tags} negative_tags={negative_tags}
            set_positive_tags={set_positive_tags}
            set_negative_tags={set_negative_tags}
          />
        ))}
      </div>
    </>
  );
};

export default PortfolioPage;
