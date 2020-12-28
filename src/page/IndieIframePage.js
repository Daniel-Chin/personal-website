import React from 'react';
import { useParams } from 'react-router-dom';

import SmartIframe from '../component/SmartIframe';

const IndieIframePage = () => {
  const uri = useParams().uri;
  return (
    <SmartIframe 
      target={'/weakRef/' + uri} 
      title={uri}
    />
  );
};

export default IndieIframePage;
