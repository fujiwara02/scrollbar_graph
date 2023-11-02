import React, { useEffect, useRef } from 'react';

const VideoPreview = ({ stream }, {url}) => {
    const videoRef = useRef(null);
  
    useEffect(() => {
      
      if (videoRef.current && stream) {
    
        videoRef.current.srcObject = stream;
      }
    }, [stream]);
    if (!stream) {
       
        return <video src='null' height="450"  muted />;
    }
    
    return <video ref={videoRef} height="450"  autoPlay playsInline muted />;
};

export default VideoPreview;

