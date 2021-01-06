import React, { useRef, useState, useEffect } from 'react';

const StupidIframe = ({ src, title }) => {
  const iFrame = useRef();
  const [scrolled, set_scrolled] = useState(0);

  useEffect(() => {
    if (scrolled === 1) {
      setTimeout(() => {  // Why do we need 100ms? 
        iFrame.current.scrollIntoView(true, { behavior: 'smooth' });
      }, 100);  // Why does "smooth" not work in Chrome 87? 
      set_scrolled(2);
    }
  }, [scrolled]);

  const onLoad = () => {
    set_scrolled(1);
  }

  return (
    <iframe 
      className='stupid-iframe' ref={iFrame}
      src={src} title={title}
      onLoad={onLoad}
    />
  );
};

export default StupidIframe;
