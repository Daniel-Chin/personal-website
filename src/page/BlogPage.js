import React from 'react';
import { useParams } from 'react-router-dom';

import blogRoot from '../helpers/blogRoot';
import StupidIframe from '../component/StupidIframe';
import PrevNextBlog from '../component/PrevNextBlog';

const BlogPage = () => {
  const blog_id = useParams().id;
  const blog_index = blogRoot.findIndex(({ id }) => (
    id === blog_id
  ));

  if (blog_index === -1) {
    return (
      <div>
        Blog not found. Jesus. 
      </div>
    );
  }

  const blogMeta = blogRoot[blog_index];
  return (
    <div>
      <PrevNextBlog blog_index={blog_index} />
      <StupidIframe 
        src={`/blog/${blog_id}/build.${blogMeta.build_type}`} 
        title={blogMeta.title}
      />
      <PrevNextBlog blog_index={blog_index} />
    </div>
  );
};

export default BlogPage;
