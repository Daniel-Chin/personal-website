import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import InkLeak from '../component/InkLeak';

const LandingPage = () => {
  const title = useRef();

  const onLoad = () => {
    title.current.scrollIntoView({
      behavior: 'smooth', 
      block: 'center',
    });
  };

  useEffect(() => {
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <>
    <div className='page-with-margin'>
      <h1 
        className='center-text no-vertical-margin'
        ref={title}
      >
        <InkLeak 
          text='Daniel Chin' height={100} 
          className='no-fat'
        />
      </h1>
      <p className='center-text no-vertical-margin legal-name'>
        Legally known as{' '}
        <span title='秦楠枫' className='cursor-help'>
          NanFeng Qin
        </span>
      </p>
      <img 
        src='/heavy/myface.jpg' alt="Daniel's face" 
        className='my-face no-fat'
      />
      <p>
        PhD student at{' '} 
        <a href='http://musicxlab.com/'>
          Music X Lab
        </a>,{' '} 
        New York University Shanghai. <br />
      </p>
      <p>
        Email:{' '}
        <a href='mailto:daniel.chin@nyu.edu'>
          daniel.chin@nyu.edu
        </a> <br />
        Github:{' '}
        <a href='https://github.com/daniel-chin'>
          github.com/daniel-chin
        </a> <br />
        Pronouns: he / they / 他
      </p>
      <h2>Greetings, visitor.</h2>
      <p>
        On this website you can find 
        things that make me look cooler than I really am - 
        so I encourage you to explore a bit. Have fun. 
      </p>
      <p>
        I'm into programming, game design, jazz, watching
        CS/game/jazz videos made by youtubers, writing 
        science 
        fictions and finance fictions, and Math. 
      </p>
      <p>
        Majoring in 
        Business and Finance and minoring in Interactive 
        Media Arts (IMA), I'm half way through my senior 
        year at NYU 
        Shanghai. Believe it or not, Finance is
        a lot of fun! (almost as fun as IMA.) 
      </p>
      <p>
        I expect to graduate in May. 
      </p>
      <h2>Publications</h2>
      <ol className='publications'>
        <li>
        <b>Daniel Chin</b>, Yian Zhang, Tianyu Zhang, 
        Jake Zhao, and Gus Xia.{' '}
        <a href='https://arxiv.org/abs/2004.13908'>
          Interactive Rainbow Score: A Visual-centered 
          Multimodal Flute Tutoring System
        </a>. <i>Proceedings of the International 
        Conference on New Interfaces for Musical 
        Expression (NIME)</i>, 2020. 
        </li>
        <li>
        Yian Zhang, Yinmiao Li, <b>Daniel Chin</b>, and 
        Gus Xia.{' '}
        <a href='https://arxiv.org/abs/1906.01197'>
        Adaptive Multimodal Music Learning via 
        Interactive-haptic Instrument
        </a>. <i>Proceedings of 
        the International Conference on New Interfaces 
        for Musical Expression (NIME)</i>, 2019. 
        </li>
      </ol>
    </div>
    <div className='landing-bottom dark-context'>
      <p>
        Bottom stuff:
      </p>
      <ul>
        <li>
          <Link to='/whoami'>Why is my URL so weird?</Link>
        </li>
      </ul>
    </div>
    </>
  );
};

export default LandingPage;
