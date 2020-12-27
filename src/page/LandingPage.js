import React from 'react';
import { Link } from 'react-router-dom';
import { blogId2Url } from '../helpers/misc'
import blogRoot from '../helpers/blogRoot';

const LandingPage = () => {
  const sticky_ids = [
    'carbon_accounting', 
    'tor_hidden_service_democracy', 
  ];
  const sticky_blogs = blogRoot.filter(({ id }) => (
    sticky_ids.includes(id)
  ));
  return (
    <div className='margin-1em'>
      <h1 className='center-text'>Daniel Chin</h1>
      <p className='center-text'>Legally known as NanFeng Qin</p>
      <p>This is my personal website.</p>
      <p>It is <b>under construction</b>.</p>
      <p>
        Sticky blogs: 
        {sticky_blogs.map(({ id, title }, i) => (
          <span key={i}>
            <br />
            <Link to={blogId2Url(id)}>{title}</Link>
          </span>
        ))}
      </p>
      <p>
        Also, <Link to='/whoami'>Why is my URL so weird?</Link>
      </p>
    </div>
  );
};

export default LandingPage;
