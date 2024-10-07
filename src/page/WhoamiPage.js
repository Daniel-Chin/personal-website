import React from 'react';

const WhoamiPage = () => {
  return (
    <div className='page-with-margin'>
      <h1 className='center-text'>whoami</h1>
      <p>
        For those nerds among you: The URL of my website 
        looks weird. How do you know it's actually me? 
      </p>
      <p>
        Go to {' '}
        <a 
          href="https://github.com/daniel-chin" 
          rel='noreferrer' target='_blank'
        >
          https://github.com/daniel-chin
        </a>. 
        <br />
        You can see a URL pointing back to here. 
      </p>
    </div>
  );
};

export default WhoamiPage;
