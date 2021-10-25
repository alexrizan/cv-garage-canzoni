import commonClasses from '../styles/collection.module.css';
import classes from './collection-artists-mobile.module.css';
import {Carousel} from 'react-materialize';
import React, {useState} from 'react';
import {ArtistsSliderProps} from '../artists-slider.model';
import {ArtistItem} from '../artist-item/artist-item';
import {getRandomId, splitCollectionByCount} from '../../../utils/helper';
import {Artist} from '../../saved-songs/songs.model';

const mobileItemsCount = 10;

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

interface ICollectionMobileProps extends ArtistsSliderProps {

}

const CollectionArtistsMobile: React.FC<ICollectionMobileProps> = ({artists, onArtistChosen}) => {
  const storage = splitCollectionByCount(getItemCollections(artists, onArtistChosen), mobileItemsCount);
  const [carouselId,] = useState<string>(getRandomId());

  return (
    <>
      {
        storage && storage.length
          ? <Carousel
            options={{
              fullWidth: true
            }}
            carouselId={carouselId}
          >
            {storage!.map((arr, index) => {
              return (
                <div className={commonClasses.tabItemWrapper} key={index}>
                  {arr}
                </div>
              );
            })}
          </Carousel>
          : <></>
      }
    </>
  );
};

export {CollectionArtistsMobile};
