import React from 'react';
import YoutubeEmbed from '../component/YoutubeEmbed';

const ResearchPage = () => {
  const videos = [
    'jfkcDi0UJz4', 
    'rpd-D5y02p8', 
    'DifOKvH1ErQ',
    'YHPQSsr0SwI',
    'xKvCnMw3-4E',
  ];

  return (
    <div className='page-with-margin'>
      <h1 className='center-text'>
      Research
      </h1>

      <h2>Blogs</h2>
      <p>Under construction...</p>

      <h2>Videos</h2>
      {videos.map((video_id, i) => (
        <YoutubeEmbed key={i} video_id={video_id} height={200} />
      ))}

      <h2>Publications</h2>
      <ol className='publications'>
        <li>
        <b>Chin, Daniel</b> and Gus Xia.{' '}
        <a href='https://nime.pubpub.org/pub/bchhb87h/'>
          "A Computer-aided Multimodal Music Learning System with Curriculum: A Pilot Study."
        </a> <i>Proceedings of the International 
        Conference on New Interfaces for Musical 
        Expression (NIME)</i>, 2022. 
        </li>

        <li>
          Li, Michael Yue, <b>Daniel Chin</b>, Charles Puelz and 
          Pejman Sanaei.{' '}
          <a href='https://doi.org/10.1063/5.0086452'>
            "Simulating liquid-gas interfaces and moving 
            contact lines with the immersed boundary method".
          </a> <i>Physics of Fluids 34, 053323.</i> 2022.{' '}
          <a href='https://doi.org/10.1063/5.0086452'>
            https://doi.org/10.1063/5.0086452
          </a>. 
        </li>

        <li>
        <b>Chin, Daniel</b> and Gus Xia.{' '}
        <a href='https://arxiv.org/abs/2107.08727'>
          "Measuring a Six-hole Recorder Flute's Response 
          to Breath Pressure Variations and Fitting a Model."
        </a> <i>arXiv preprint arXiv:2107.08727</i> 2021.
        </li>

        <li>
        <b>Chin, Daniel</b>, Ian Zhang, and Gus Xia.{' '}
        <a href='https://nime.pubpub.org/pub/eshr/'>
          "Hyper-hybrid Flute: Simulating and Augmenting 
          How Breath Affects Octave and Microtone." 
        </a> <i>Proceedings of the International 
        Conference on New Interfaces for Musical 
        Expression (NIME)</i>, 2021. 
        </li>

        <li>
        <b>Chin, Daniel</b>, Yian Zhang, Tianyu Zhang, 
        Jake Zhao, and Gus Xia.{' '}
        <a href='https://arxiv.org/abs/2004.13908'>
          "Interactive Rainbow Score: A Visual-centered 
          Multimodal Flute Tutoring System."
        </a> <i>Proceedings of the International 
        Conference on New Interfaces for Musical 
        Expression (NIME)</i>, 2020. 
        </li>
        
        <li>
        Zhang, Yian, Yinmiao Li, <b>Daniel Chin</b>, and 
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
  );
};

export default ResearchPage;
