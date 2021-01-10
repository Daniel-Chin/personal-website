import React from 'react';

import { Link } from 'react-router-dom';
import novelRoot from '../helpers/novelRoot';
import InkLeak from '../component/InkLeak';

const NovelListPage = () => {
  return (
    <div className='page-with-margin'>
      <h1 className='center-text'>
        <InkLeak text='Novels' height={130} className='no-fat' />
      </h1>
      <table className='margin-hori-auto'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Language</th>
            <th>Prerequisites</th>
          </tr>
        </thead>
        <tbody>
          {novelRoot.map((meta, i) => (
            <tr key={i} className='zebra'>
              <td>
                <Link to={`/novel/${meta.id}`}>
                  {meta.title}
                </Link>
              </td>
              <td>
                {meta.year}
              </td>
              <td>
                {meta.language}
              </td>
              <td>
                {
                  meta.prerequisites.length 
                  ? meta.prerequisites.join(', ')
                  : 'none'
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NovelListPage;
