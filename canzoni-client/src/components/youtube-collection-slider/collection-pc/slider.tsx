import commonClasses from '../styles/collection.module.css';
import classes from './slider.module.css';
import React, {useState} from 'react';
import {Icon} from 'react-materialize';
import {ISongsSliderProps} from '../songs-slider.model';
import {Switcher} from '../../';
import {Song} from '../../saved-songs/songs.model';
import {splitCollectionByCount} from '../../../utils/helper';
import {useCheckMobile} from '../../../hooks/useCheckMobile';
import YoutubeSongItem from '../../youtube-song-item/youtube-song-item';

interface ICollectionPcProps extends ISongsSliderProps {
}

const Slider: React.FC<ICollectionPcProps> = ({songs, onSongChosen}) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const isMobile = useCheckMobile();

  let itemsCount = isMobile? 3 : 9;

  const getItemCollections = (songs: Song[], onSongChosen: (song: Song) => void) => {
    const itemCollection = songs.map((s, index) => {
      return (
        <div className={classes.songWrapper} key={index}>
          <YoutubeSongItem song={s} key={index} handleChosenSong={onSongChosen}/>
        </div>
      );
    });
    return splitCollectionByCount(itemCollection, itemsCount);
  };

  const storage = getItemCollections(songs, onSongChosen);

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

  let currentSlide = (
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

export {Slider};
