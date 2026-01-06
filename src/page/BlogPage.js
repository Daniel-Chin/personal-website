import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';

import blogRoot from '../helpers/blogRoot';
import StupidIframe from '../component/StupidIframe';
import PrevNextBlog from '../component/PrevNextBlog';

const BlogPage = () => {
  const blog_id = useParams().id;
  const blog_index = blogRoot.findIndex(({ id }) => (
    id === blog_id
  ));

  const [commentInfo, setCommentInfo] = useState(null);

  useEffect(() => {
    setCommentInfo(null);
    fetch(`/blog/${blog_id}/llm_comment_info.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          return null;  // File not found
        }
        return response.json();
      })
      .then((jsonData) => {
        setCommentInfo(jsonData);
      })
  }, [blog_id]);

  if (blog_index === -1) {
    return (
      <div>
        Blog not found. Jeez. 
      </div>
    );
  }

  const onceInfo = (() => {
    if (!commentInfo) {
      return null;
    }
    const { latest, old } = commentInfo;
    if (latest && latest.comment) {
      return latest;
    } else if (old && old.comment) {
      return old;
    } else {
      return null;
    }
  })();

  const blogMeta = blogRoot[blog_index];
  return (
    <div>
      <PrevNextBlog blog_index={blog_index} />
      <StupidIframe 
        src={`/blog/${blog_id}/build.${blogMeta.build_type}`} 
        title={blogMeta.title}
      />
      <PrevNextBlog blog_index={blog_index} />
      {onceInfo ? <div className='page-with-margin'>
        <h1>Comment by {onceInfo.model_snapshot}</h1>
        <p><a href='https://github.com/Daniel-Chin/personal-website/blob/main/public/blog/prompt.md'>
          System Prompt
        </a></p>
        <ReactMarkdown>{onceInfo.comment}</ReactMarkdown>
      </div> : ' '}
    </div>
  );
};

export default BlogPage;
