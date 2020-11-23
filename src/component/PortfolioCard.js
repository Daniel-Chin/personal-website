import React from 'react';
import ProjectTag from '../component/ProjectTag';
import ProjectLink from '../component/ProjectLink';
import { resolveInternalUri } from '../helpers/misc';

const LINKS = [
  { id: 'source',   caption: 'Source Code', external: true }, 
  { id: 'readmore',   caption: 'Read More', external: true }, 
  { id: 'demo',     caption: 'Demo', external: true }, 
  { id: 'site_doc', caption: 'Documentation', external: false }, 
  { id: 'paper',    caption: 'Paper', external: false }, 
  { id: 'attached', caption: 'Attachment', external: false }, 
];

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
          <img 
            src={resolveInternalUri(project.img, 'portfolio')} 
            alt={project.img ? `A preview of ${project.img}` : ''}
            className='thumb-image'
          />
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
            {LINKS.map(({ id, caption, external }, i) => {
              if (project[id]) {
                return <ProjectLink 
                  key={i} caption={caption} external={external}
                  uri={project[id]} context='portfolio'
                />;
              } else {
                return null;
              }
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
