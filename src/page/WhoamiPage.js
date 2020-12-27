import React from 'react';

const WhoamiPage = () => {
  return (
    <div className='margin-1em'>
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
        I put a public key there. You can verify that 
        your current HTTPS connection uses the same 
        public key. 
      </p>
      <p>
        If it actually does not, Netlify may have changed 
        key without asking me. 
        In that case, please open an issue at {' '}
        <a 
          href="https://github.com/Daniel-Chin/daniel-chin/issues"
          rel='noreferrer' target='_blank'
        >
          https://github.com/Daniel-Chin/daniel-chin/issues
        </a> {' '} if you will. 
      </p>
    </div>
  );
};

export default WhoamiPage;
