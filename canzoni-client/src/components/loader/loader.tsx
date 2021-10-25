import {Preloader} from 'react-materialize';
import React from 'react';
import {PopupFullScreen} from '../popup-fullscreen/popup-fullscreen';

interface ILoaderProps {
  fullScreen?: boolean;
}

const Loader: React.FC<ILoaderProps> = ({fullScreen}) => {

  const loaderView = (
    <div className="center-all">
      <Preloader
        active
        color="blue"
        flashing
      />
    </div>);

  const currentView = fullScreen
    ? <PopupFullScreen options={{yAlignItemsCenter: true}}>
      {loaderView}
    </PopupFullScreen>
    : <>{loaderView}</>;

  return (
    <>{currentView}</>
  );
};

export {Loader};
