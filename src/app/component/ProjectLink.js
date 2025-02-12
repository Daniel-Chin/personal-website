import React, { useState } from 'react';
import { resolveInternalUri } from '../helpers/misc';

const ProjectLink = ({ caption, external, uri, context }) => {
  const [ easter_egg, set_easter_egg ] = useState(false);

  const toggleEgg = () => {
    set_easter_egg(! easter_egg);
  }

  if (uri === '__egg__') {
    return (
      <span className='button project-link' onClick={toggleEgg}>
        {
          easter_egg ? 'Seriously?' : caption
        }
      </span>
    );
  }

  return (
    <a className='button project-link' 
      href={external ? uri : resolveInternalUri(uri, context)}
      rel='noreferrer' target='_blank'
    >
      {caption}
    </a>
  );
};

export default ProjectLink;
