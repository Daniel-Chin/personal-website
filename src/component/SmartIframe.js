import React, {
  createRef, useState, useLayoutEffect, useEffect, 
  useCallback, 
} from 'react';

/* 
  Problem: if Chrome is in full screen, every alt+tab will 
  trigger useLayoutEffect, bringing document scroll 
  position to the top.  
*/
const SmartIframe = ({ target, title }) => {
  const iFrame = createRef();
  const [iframeHeight, setIframeHeight] = useState(100);
  const [src, setSrc] = useState('');
  const [shrunk, setShrunk] = useState(true);
  
  const shrink = () => {
    setIframeHeight(50);
    setShrunk(true);
    // console.log('shrink');
  };
  
  const expand = useCallback(() => {
    setIframeHeight(
      iFrame.current.contentWindow.document.body
      .scrollHeight + 16
    );
    setShrunk(false);
    // console.log('expand', iFrame.current.contentWindow.document.body.scrollHeight);
}, [iFrame]);
  
  useLayoutEffect(() => {
    if (shrunk) {
      expand();
    }
    window.addEventListener('resize', shrink);
    return () => window.removeEventListener('resize', shrink);
  }, [expand, shrunk]);
  
  useEffect(() => {
    setSrc(target);
  }, [target]);
  
  const onLoad = () => {
    // console.log('onLoad');
    shrink();
  };

  return (
    <iframe 
      ref={iFrame} src={src}
      title={title} className='smart-iframe'
      onLoad={onLoad}
      style={{ height: `${iframeHeight}px` }}
    />
);
};

export default SmartIframe;
