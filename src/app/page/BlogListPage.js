import React from 'react';

import { Link } from 'react-router-dom';
import blogRoot from '../helpers/blogRoot';
import { blogId2Url, formatTime } from '../helpers/misc'
import InkLeak from '../component/InkLeak';

const BlogListPage = () => {
  return (
    <div className='page-with-margin'>
      <h1 className='center-text'>
      <InkLeak text='Blogs' height={150} className='no-fat' />
      </h1>
      <table className='margin-hori-auto'>
        {/* <thead>
          <tr>
            <th>Title</th>
            <th>Last compiled at</th>
          </tr>
        </thead> */}
        <tbody>
          {blogRoot.map((blogMeta, i) => (
            <tr key={i} className='zebra'>
              <td>
                <Link to={blogId2Url(blogMeta.id)}>
                  {blogMeta.title}
                </Link>
              </td>
              <td>
                {formatTime(blogMeta.time)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogListPage;
