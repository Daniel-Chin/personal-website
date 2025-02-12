import React from 'react';
import { useParams } from 'react-router-dom';

import StupidIframe from '../component/StupidIframe';

const DocumentationPage = () => {
  const doc_id = useParams().id;

  return (
    <StupidIframe 
      src={`/documentation/${doc_id}/build.html`} 
      title={doc_id}
    />
  );
};

export default DocumentationPage;
