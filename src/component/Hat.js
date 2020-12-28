import React from 'react';
import { Link } from 'react-router-dom';

const Hat = () => {
  return (
    <div className='hat'>
      <ul>
        <Link to='/'><li className='ma-left-07em'>
          <b>Daniel Chin</b>
        </li></Link>
        <Link to='/portfolio'><li>Portfolio</li></Link>
        <Link to='/blogs'><li>Blogs</li></Link>
        <Link to='/novels'><li>Novels</li></Link>
        <Link to='/questions'><li>Questions</li></Link>
        {/* <Link to='/about'><li>About Me</li></Link> */}
      </ul>
    </div>
  );
};

export default Hat;
