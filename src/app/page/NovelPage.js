import React from 'react';
import { useParams } from 'react-router-dom';

import StupidIframe from '../component/StupidIframe';
import novelRoot from '../helpers/novelRoot';

const NovelPage = () => {
  const novel_id = useParams().id;

  const novel_index = novelRoot.findIndex(({ id }) => (
    id === novel_id
  ));

  if (novel_index === -1) {
    return (
      <div>
        Novel not found. Jesus. 
      </div>
    );
  }

  const meta = novelRoot[novel_index];

  return (
    <StupidIframe 
      src={`/novel/${novel_id}/${meta.build_name}`} 
      title={meta.title}
    />
  );
};

export default NovelPage;
