import React, { useState } from 'react';

const ProjectTag = ({ tag, filterable }) => {
  const [ expanded, set_expanded ] = useState(false);
  
  const clickTag = () => {
    if (filterable && ! expanded) {
      set_expanded(true);
    }
  };
  const onMouseLeave = () => {
    if (expanded) {
      set_expanded(false);
    }
  }

  return (
    <>
      <span className='tag-span' onMouseLeave={onMouseLeave}>
        <span className='tag-middle smol-pad' style={{
          cursor: expanded ? 'text' : 'pointer',
        }} onClick={clickTag}>
          {tag}
        </span>
        <span className='tag-positive smol-pad' hidden={! expanded}>
          filter
        </span>
        <span className='tag-negative smol-pad' hidden={! expanded}>
          exclude
        </span>
      </span>
      <span>{' '}</span>
    </>
  );
};

export default ProjectTag;
