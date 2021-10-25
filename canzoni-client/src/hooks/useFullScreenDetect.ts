import {useEffect, useState} from 'react';

const useFullScreenDetect = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(!!document.fullscreenElement);

  const handleFullScreenDetection = () => {
    if (!!document.fullscreenElement) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenDetection);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenDetection);
  }, []);

  return isFullScreen;
};

export default useFullScreenDetect;
