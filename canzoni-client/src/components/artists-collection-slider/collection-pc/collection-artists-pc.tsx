import classes from './collection-artists-pc.module.css';
import React, {useState} from 'react';
import {Icon} from 'react-materialize';
import commonClasses from '../styles/collection.module.css';
import {ArtistsSliderProps} from '../artists-slider.model';
import {Artist} from '../../saved-songs/songs.model';
import {ArtistItem} from '../artist-item/artist-item';
import {splitCollectionByCount} from '../../../utils/helper';
import {Switcher} from '../../';

const pcItemsCount = 18;

const getItemCollections = (artists: Artist[], clickHandler: (artist: Artist) => void) => {
  const lettersCollection: any = {};
  const itemCollection = artists.map((artist, index) => {
    let needLetter;
    let firstLetter = artist.name[0].toLowerCase();

    if (!lettersCollection[firstLetter]) {
      lettersCollection[firstLetter] = true;
      needLetter = true;
    } else {
      needLetter = false;
    }

    return (
      <div className={classes.artistItem} key={index}>
        {needLetter ? <div className={classes.letterWrapper}>{artist.name[0].toUpperCase()}</div> : null}
        <div className={classes.artistSelector}>
          <ArtistItem artist={artist} onChosen={clickHandler}/>
        </div>
      </div>
    );
  });

  return itemCollection;
};

interface ICollectionPcProps extends ArtistsSliderProps {

}

const CollectionArtistsPc: React.FC<ICollectionPcProps> = ({artists, onArtistChosen}) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const storage = splitCollectionByCount(getItemCollections(artists, onArtistChosen), pcItemsCount);

  let currentSlide = (
    <div className={commonClasses.tabItemWrapper}>
      {storage[slideNumber]}
    </div>
  );

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

  return (
    <div className={classes.contentWrapper}>
      <div className={`${classes.switchWrapper} ${classes.left}`} onClick={nextSlide}>
        <Icon>arrow_back_ios_new</Icon>
      </div>
      <Switcher name={slideNumber.toString()} effect={'shortSlide'} timeout={500}>
        {currentSlide}
      </Switcher>
      <div className={`${classes.switchWrapper} ${classes.right}`} onClick={previousSlide}>
        <Icon>arrow_forward_ios</Icon>
      </div>
    </div>
  );
};

export {CollectionArtistsPc};
