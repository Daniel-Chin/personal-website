import React, { useState } from 'react';

const ProjectTag = ({ tag }) => {
  const [ expanded, set_expanded ] = useState(false);
  
  return (
    <>
      <span className='tag-span'>
        {tag}
      </span>
      <span>{' '}</span>
    </>
  );
};

export default ProjectTag;
