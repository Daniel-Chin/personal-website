import React, {
  createRef, useState, useLayoutEffect, 
  useCallback
} from 'react';

const SmartIframe = ({ target, title }) => {
  const iFrame = createRef();
  const [iframeHeight, setIframeHeight] = useState(10);
  const [src, setSrc] = useState('');
  const [shrunk, setShrunk] = useState(true);
  
  const resizeIframe = useCallback(() => {
    setIframeHeight(
      iFrame.current.contentWindow.document.body
      .scrollHeight + 80
    );
  }, [iFrame]);
  
  useLayoutEffect(() => {
    if (shrunk) {
      setShrunk(false);
      resizeIframe();
      console.log('unshrink');
    }
    const onWindowResize = () => {
      setIframeHeight(10);
      setShrunk(true);
    };
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [resizeIframe, shrunk]);
  
  useLayoutEffect(() => {
    setIframeHeight(10);
    setShrunk(true);
    setSrc(target);
    console.log('target changed');
  }, [target]);
  
  return (
    <iframe 
      ref={iFrame} src={src}
      title={title} className='smart-iframe'
      onLoad={resizeIframe}
      style={{ height: `${iframeHeight}px` }}
    />
);
};

export default SmartIframe;
