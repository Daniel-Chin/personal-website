import React from 'react';
import { useParams } from 'react-router-dom';

import StupidIframe from '../component/StupidIframe';

const IndieIframePage = () => {
  const uri = useParams().uri;

  return (
    <StupidIframe 
      src={'/weakRef/' + uri} title={uri}
    />
  );
};

export default IndieIframePage;
