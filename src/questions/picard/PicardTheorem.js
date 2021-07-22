import React from 'react';

import StupidIframe from '../../component/StupidIframe';
import pdf from './build.pdf';

const PicardTheorem = () => {
  return (
    <StupidIframe src={pdf} title='Picard Theorem' />
  );
};

export default PicardTheorem;
