import React from 'react';

import blogRoot from '../helpers/blogRoot';
import PrevNextBlogSpan from '../component/PrevNextBlogSpan';

const PrevNextBlog = ({ blog_index }) => {
  const prev = blogRoot[blog_index - 1];
  const next = blogRoot[blog_index + 1];
  return (
    <div className='prev-next-blog'>
      <p>
        {
          prev && <PrevNextBlogSpan 
            text='Previous blog: ' blogMeta={prev}
          />
        }
        {
          prev && next && <br />
        }
        {
          next && <PrevNextBlogSpan 
          text='Next blog: ' blogMeta={next}
        />
      }
      </p>
    </div>
  );
};

export default PrevNextBlog;
