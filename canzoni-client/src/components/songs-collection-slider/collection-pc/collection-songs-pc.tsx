import commonClasses from '../styles/collection.module.css';
import classes from './collection-songs-pc.module.css';
import React, {useState} from 'react';
import {Icon} from 'react-materialize';
import {ISongsSliderProps} from '../songs-slider.model';
import {SongItem, Switcher} from '../../';
import {Song} from '../../saved-songs/songs.model';
import {splitCollectionByCount} from '../../../utils/helper';

interface ICollectionPcProps extends ISongsSliderProps {
}

const pcItemsCount = 21;

const getItemCollections = (songs: Song[], onSongChosen: (song: Song) => void) => {
  const itemCollection = songs.map((s, index) => {
    return (
      <div className={classes.songWrapper} key={index}>
        <SongItem song={s} key={index} onChosen={onSongChosen}/>
      </div>
    );
  });

  return splitCollectionByCount(itemCollection, pcItemsCount);
};


const CollectionSongsPc: React.FC<ICollectionPcProps> = ({songs, onSongChosen}) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const storage = getItemCollections(songs, onSongChosen);

  let currentSlide;

  const nextSlide = () => {
    const nextSlideNumber = slideNumber + 1;
    if (nextSlideNumber >= storage.length) {
      setSlideNumber(0);
    } else {
      setSlideNumber(nextSlideNumber);
    }
  };

  const previousSlide = () => {
    const prevSlideNumber = slideNumber - 1;
    if (prevSlideNumber < 0) {
      setSlideNumber(storage.length - 1);
    } else {
      setSlideNumber(prevSlideNumber);
    }
  };

  currentSlide = (
    <div className={commonClasses.tabItemWrapper}>
      {storage[slideNumber]}
    </div>
  );

  return (
    <div className={classes.contentWrapper}>
      <div className={`${classes.switchWrapper} ${classes.left}`} onClick={nextSlide}>
        <Icon>arrow_back_ios_new</Icon>
      </div>
      <Switcher name={slideNumber.toString()} effect={'shortSlide'} timeout={700}>
        {currentSlide}
      </Switcher>
      <div className={`${classes.switchWrapper} ${classes.right}`} onClick={previousSlide}>
        <Icon>arrow_forward_ios</Icon>
      </div>
    </div>
  );
};

export {CollectionSongsPc};
