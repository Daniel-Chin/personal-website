import React from 'react';
import YoutubeEmbed from '../component/YoutubeEmbed';

const ResearchPage = () => {
  const videos = [
    [ 'jfkcDi0UJz4', 'Flute X GPT.' ],
    [ '5B_6gtv5crM', 'Concert with CNSO (Our ChatPiano demo at 23:40).' ],
    [ 'rpd-D5y02p8', 'LAUI: LLM-Agent User Interface.' ],
    [ 'DifOKvH1ErQ', 'A+V+H x curriculum.' ],
    [ 'UIqsYK9F4xo', 'Hyper-hybrid flute.' ],
    [ '-t-u0V-27ng', 'Wearable breath guidance (Yinmiao et al.)' ],
    [ 'YHPQSsr0SwI', 'Adaptive haptic guidance.' ],
    [ 'xKvCnMw3-4E', 'Haptic guidance (Xia et al.)' ],
  ];

  return (
    <div className='page-with-margin'>
      <h1 className='center-text'>
      Research
      </h1>

      <h2>Blogs</h2>
      <p>Under construction...</p>

      <h2>Videos</h2>
      <p>(Sorted from recent to old.)</p>
      {videos.map(([ video_id, desc ], i) => (
        <>
          <h3 className='normal-weight'>{desc}</h3>
          <YoutubeEmbed key={i} video_id={video_id} height={200} />
        </>
      ))}

      <h2>Publications</h2>
      <ol className='publications'>
        <li>
        <b>Chin, Daniel</b>, Yuxuan Wang and Gus Xia.{' '}
        <a href='https://arxiv.org/abs/2405.13050'>
          "Human-Centered LLM-Agent User Interface: A Position Paper."
        </a> <i>ArtsIT, Interactivity and Game Creation: 12th 
        EAI International Conference, ArtsIT 2024, Proceedings</i>, 2024.
        </li>

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
