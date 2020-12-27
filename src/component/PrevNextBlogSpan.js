import React from 'react';
import { Link } from 'react-router-dom';
import { blogId2Url } from '../helpers/misc';

const PrevNextBlogSpan = ({ text, blogMeta }) => {
  return (
    <span>
      {text}
      <Link to={blogId2Url(blogMeta.id)}>
        {blogMeta.title}
      </Link>
    </span>
  );
};

export default PrevNextBlogSpan;
