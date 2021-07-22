import React from 'react';
import { useParams } from 'react-router-dom';

import PicardTheorem from '../questions/picard/PicardTheorem';

const QuestionPage = () => {
  const question_id = useParams().id;

  switch (question_id) {
    case 'picardTheorem':
      return <PicardTheorem />;  
    default:
      return (
        <div>
          Question not found. (Gosh!)
        </div>
      );
  }
};

export default QuestionPage;
