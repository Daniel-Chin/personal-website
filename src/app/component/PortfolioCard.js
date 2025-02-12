import React from 'react';
import ProjectTag from '../component/ProjectTag';
import ProjectLink from '../component/ProjectLink';
import { resolveInternalUri } from '../helpers/misc';
import InkLeak from './InkLeak';

const PortfolioCard = ({
  project, positive_tags, negative_tags, 
  set_positive_tags, set_negative_tags
}) => {
  if (
    (
      positive_tags.filter((t) => (! project.tags.includes(t))).length === 0
    )
    && project.tags.filter((t) => (negative_tags.includes(t))).length === 0
  ) {
    return (
      <div className='portfolio-card'>
        <div className='card-left'>
          <span className='middle-helper'></span>
          {
            project.img === '__ink_leak__' 
            ? 
            <InkLeak text='Demo' height={100} className='thumb-image' />
            :
            <img 
              src={resolveInternalUri(project.img, 'portfolio')} 
              alt={project.img ? `A preview of ${project.img}` : ''}
              className='thumb-image'
            />
          }
        </div>
        <div className='card-right'>
          <h3 className='project-heading'>{project.title}</h3>
          <div>
            <ProjectTag tag={project.year} year />
            <ProjectTag tag={project.pride} pride />
            <>
              {project.tags.map((tag, i) => (
                <ProjectTag key={i} tag={tag} filterable 
                  positive_tags={positive_tags} 
                  negative_tags={negative_tags}
                  set_positive_tags={set_positive_tags}
                  set_negative_tags={set_negative_tags}
                />
              ))}
            </>
          </div>
          <p>
            {project.description}
          </p>
          <div>
            {project.links.map(([ caption, type, uri ], i) => {
              return <ProjectLink 
                key={i} caption={caption} 
                external={type === 'external'}
                uri={uri} context='portfolio'
              />;
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PortfolioCard;
