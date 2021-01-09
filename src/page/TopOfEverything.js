import React from 'react';
import { Link } from 'react-router-dom';
import { blogId2Url } from '../helpers/misc'
import blogRoot from '../helpers/blogRoot';

const TopOfEverything = () => {
  const sticky_ids = [
    'carbon_accounting', 
    'tor_hidden_service_democracy', 
  ];
  const sticky_blogs = blogRoot.filter(({ id }) => (
    sticky_ids.includes(id)
  ));
  return (
    <div className='landing-sticky dark-context'>
      <p>
        Top stuff: 
      </p>
      <ul>
        {sticky_blogs.map(({ id, title }, i) => (
          <li key={i}>
            <Link to={blogId2Url(id)}>{title}</Link>
          </li>
        ))}
        <li>
          <Link to='/questions'>Piccard's Theorem</Link>
        </li>
      </ul>
    </div>
  );
};

export default TopOfEverything;
