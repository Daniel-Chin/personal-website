import React, { useState } from 'react';

const ProjectTag = ({
  tag, year, pride, filterable, 
  positive_tags, negative_tags, 
  set_positive_tags, set_negative_tags, 
  occurance, 
}) => {
  const [ expanded, set_expanded ] = useState(false);
  const is_positive = filterable && positive_tags.includes(tag);
  const is_negative = filterable && negative_tags.includes(tag);
  let color = 'white';
  let backgroundColor = 'black';
  let caption = tag;
  if (is_positive) {
    color = '#0e0';
  }
  if (is_negative) {
    color = '#f77';
  }
  if (tag === 'middle_school') {
    backgroundColor = '#853';
  }
  if (tag === 'high_school') {
    backgroundColor = '#006';
  }
  
  const clickTag = (_, force) => {
    if (filterable) {
      if (force || ! expanded) {
        set_expanded(! expanded);
      }
    }
  };
  const onMouseLeave = () => {
    if (expanded) {
      set_expanded(false);
    }
  };
  const clickPositive = () => {
    if (is_positive) {
      set_positive_tags(positive_tags.filter((t) => (t !== tag)));
    } else {
      set_positive_tags([ ...positive_tags, tag ]);
    }
  };
  const clickNegative = () => {
    if (is_negative) {
      set_negative_tags(negative_tags.filter((t) => (t !== tag)));
    } else {
      set_negative_tags([ ...negative_tags, tag ]);
    }
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
        <span 
          className='tag-middle smol-pad' style={{
            cursor: expanded ? 'text' : (
              filterable ? 'pointer' : 'help'
            ),
            color, 
            fontWeight: is_positive || is_negative ? 'bold' : 'normal',
            backgroundColor, 
          }} onClick={clickTag} title={title} 
          tabIndex={0} onKeyUp={(event) => {
            if (event.key === 'Enter' || event.keyCode === 13) {
              clickTag(null, true);
            }
          }}
        > 
          {caption}
          {occurance && occurance > 1 ? ` (${occurance})` : null}
        </span>
        {is_negative ? null :
          <span className='tag-positive smol-pad' 
            hidden={! expanded} onClick={clickPositive}
            tabIndex={0} onKeyUp={(event) => {
              if (event.key === 'Enter' || event.keyCode === 13) {
                clickPositive();
              }
            }}
          >
            {is_positive ? 'unfilter' : 'filter'}
          </span>
        }
        {is_positive ? null :
          <span className='tag-negative smol-pad' 
            hidden={! expanded} onClick={clickNegative}
            tabIndex={0} onKeyUp={(event) => {
              if (event.key === 'Enter' || event.keyCode === 13) {
                clickNegative();
              }
            }}
            >
            {is_negative ? 'unexclude' : 'exclude'}
          </span>
        }
      </span>
      <span>{' '}</span>
    </>
  );
};

export default ProjectTag;
