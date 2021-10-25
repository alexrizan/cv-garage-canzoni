import {Carousel} from 'react-materialize';
import classes from '../styles/collection.module.css';
import React, {useState} from 'react';
import {ISongsSliderProps} from '../songs-slider.model';
import {getRandomId, splitCollectionByCount} from '../../../utils/helper';
import {Song} from '../../saved-songs/songs.model';
import {SongItem} from '../../song-item/song-item';

const mobileItemsCount = 6;

const getCarousel = (songs: Song[], onSongChosen: (song: Song) => void, carouselId: string) => {
  const itemCollection = songs.map((s, index) => {
    return (
      <SongItem song={s} key={index} onChosen={onSongChosen}/>
    );
  });

  const storage = splitCollectionByCount(itemCollection, mobileItemsCount);

  return (
    <Carousel
      options={{
        fullWidth: true
      }}
      carouselId={carouselId}
    >
      {storage!.map((arr, index) => {
        return (
          <div className={classes.tabItemWrapper} key={index}>
            {arr}
          </div>
        );
      })}
    </Carousel>
  );
};

interface ICollectionMobileProps extends ISongsSliderProps {
}

const CollectionSongsMobile: React.FC<ICollectionMobileProps> = ({songs, onSongChosen}) => {
  const [carouselId,] = useState<string>(getRandomId());
  const carousel = getCarousel(songs, onSongChosen, carouselId);

  return (
    carousel
  );
};

export {CollectionSongsMobile};
