import React from 'react';
import {useCheckMobile} from '../../hooks/useCheckMobile';
import {CollectionSongsMobile} from './collection-mobile/collection-songs-mobile';
import {CollectionSongsPc} from './collection-pc/collection-songs-pc';
import {ISongsSliderProps} from './songs-slider.model';

interface ISongsCollectionSliderProps extends ISongsSliderProps {

}

const SongsCollectionSlider: React.FC<ISongsCollectionSliderProps> = ({songs, onSongChosen}) => {
  const isMobile = useCheckMobile();

  return (
    <>
      {
        isMobile
          ? <CollectionSongsMobile songs={songs} onSongChosen={onSongChosen}/>
          : <CollectionSongsPc songs={songs} onSongChosen={onSongChosen}/>
      }
    </>
  );
};

export {SongsCollectionSlider};
