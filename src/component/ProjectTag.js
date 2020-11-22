import React, { useState } from 'react';

const ProjectTag = ({ tag, year, pride, filterable }) => {
  const [ expanded, set_expanded ] = useState(false);
  let caption = tag;
  
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
  const clickPositive = () => {

  };
  const clickNegative = () => {

  };

  let title = null;
  if (year) {
    title = `Age ${tag - 1999}`;
  }
  if (pride) {
    caption = `Pride=${tag}`;
    title = [
      '0',
      'Ignore this plz',
      'Useful but trivial',
      'Hmm...',
      'shows expertise, but is not eye-catching',
      'shows who I am',
      'Check this out!',
    ][tag];
  }

  return (
    <>
      <span className='tag-span' onMouseLeave={onMouseLeave}>
        <span className='tag-middle smol-pad' style={{
          cursor: expanded ? 'text' : (
            filterable ? 'pointer' : 'default'
          ),
        }} onClick={clickTag} title={title}>
          {caption}
        </span>
        <span className='tag-positive smol-pad' 
          hidden={! expanded} onClick={clickPositive}
        >
          filter
        </span>
        <span className='tag-negative smol-pad' 
          hidden={! expanded} onClick={clickNegative}
        >
          exclude
        </span>
      </span>
      <span>{' '}</span>
    </>
  );
};

export default ProjectTag;
