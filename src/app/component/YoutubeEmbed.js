import React from 'react';

const YoutubeEmbed = ({
  video_id, width = 560, height = 315, title = null, 
}) => {
  return (
    <iframe 
      className='youtube-embed'
      width={`${width}`} height={`${height}`}
      src={`https://www.youtube.com/embed/${video_id}`} 
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerPolicy="strict-origin-when-cross-origin" 
      allowFullScreen
    ></iframe>
  );
};

export default YoutubeEmbed;
