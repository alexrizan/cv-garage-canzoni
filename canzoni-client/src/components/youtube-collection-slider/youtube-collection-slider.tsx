import React from 'react';
import {Slider} from './collection-pc/slider';
import {ISongsSliderProps} from './songs-slider.model';

interface ISongsCollectionSliderProps extends ISongsSliderProps {

}

const YoutubeCollectionSlider: React.FC<ISongsCollectionSliderProps> = ({songs, onSongChosen}) => {
  return (
    <>
      <Slider songs={songs} onSongChosen={onSongChosen}/>
    </>
  );
};

export {YoutubeCollectionSlider};
