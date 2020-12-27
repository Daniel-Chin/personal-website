import React from 'react';

const LandingPage = () => {
  return (
    <div className='landing-page'>
      <h1 className='center-text'>Daniel Chin</h1>
      <p className='center-text'>Legally known as NanFeng Qin</p>
      <p>This is my personal website.</p>
      <p>It is <b>under construction</b>.</p>
      <p>
        For the nerds among you: The URL looks weird. 
        How do you know it's actually me? Go to {' '}
        <a href="https://github.com/daniel-chin">
          https://github.com/daniel-chin
        </a>. 
        <br />
        I put a public key there. You can verify that 
        your current HTTPS connection uses the same 
        public key. 
        <br />
        If it actually does not, Netlify may have changed 
        key without asking me. 
        In that case, please open an issue at {' '}
        <a href="https://github.com/Daniel-Chin/daniel-chin/issues">
          https://github.com/Daniel-Chin/daniel-chin/issues
        </a> {' '} if you will. 
      </p>
    </div>
  );
};

export default LandingPage;
