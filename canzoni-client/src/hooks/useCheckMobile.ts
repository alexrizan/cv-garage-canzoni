import {useEffect, useState} from 'react';

const mobileDevicesWidth = 768;

const useCheckMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeChange);
    return () => {
      window.removeEventListener('resize', handleResizeChange);
    };
  }, []);

  return (width < mobileDevicesWidth);
};

export {useCheckMobile};
