import React from 'react';

import { Link } from 'react-router-dom';
import InkLeak from '../component/InkLeak';

const QuestionListPage = () => {
  return (
    <div className='page-with-margin'>
      <h1 className='center-text'>
        <InkLeak text='Questions' height={150} className='no-fat' />
      </h1>
      <p>
        This is where I list questions I need assistance with. 
      </p>
      <table className='margin-hori-auto'>
        <tbody>
          <tr className='zebra'>
            <td>
              <Link to={'/question/picardTheorem'}>
              A &quot;counter example&quot; to Picard–Lindelöf theorem
              </Link>
            </td>
            <td>
              Jul. 2021
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuestionListPage;
