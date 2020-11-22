import React, { useState } from 'react';

const ProjectTag = ({
  tag, year, pride, filterable, 
  positive_tags, negative_tags, 
  set_positive_tags, set_negative_tags,
}) => {
  const [ expanded, set_expanded ] = useState(false);
  const highlight = filterable && positive_tags.includes(tag);
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
    if (highlight) {
      set_positive_tags(positive_tags.filter((t) => (t !== tag)));
    } else {
      set_positive_tags([ ...positive_tags, tag ]);
    }
  };
  const clickNegative = () => {
    set_negative_tags([ ...negative_tags, tag ]);
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
          color: highlight ? '#ff0' : 'white', 
          fontWeight: highlight ? 'bold' : 'normal',
        }} onClick={clickTag} title={title}>
          {caption}
        </span>
        <span className='tag-positive smol-pad' 
          hidden={! expanded} onClick={clickPositive}
        >
          {highlight ? 'unfilter' : 'filter'}
        </span>
        {highlight ? null :
          <span className='tag-negative smol-pad' 
            hidden={! expanded} onClick={clickNegative}
          >
            exclude
          </span>
        }
      </span>
      <span>{' '}</span>
    </>
  );
};

export default ProjectTag;
