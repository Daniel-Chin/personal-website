import React from 'react';
import ProjectTag from '../component/ProjectTag';
import ProjectLink from '../component/ProjectLink';

const LINKS = [
  { id: 'source',   caption: 'Source Code', external: true }, 
  { id: 'demo',     caption: 'Demo', external: true }, 
  { id: 'site_doc', caption: 'Documentation', external: false }, 
  { id: 'paper',    caption: 'Paper', external: false }, 
  { id: 'attached', caption: 'Attachment', external: false }, 
];

const PortfolioCard = ({ project }) => {
  return (
    <div className='portfolio-card'>
      <div className='card-left'>
        img
      </div>
      <div className='card-right'>
        <h3 className='project-heading'>{project.title}</h3>
        <div>
          <ProjectTag tag={project.year} year />
          <ProjectTag tag={project.pride} pride />
          <>
            {project.tags.map((tag, i) => (
              <ProjectTag key={i} tag={tag} filterable />
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
};

export default PortfolioCard;
