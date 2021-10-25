import classes from './artist-item.module.css';
import React from 'react';
import {Artist} from '../../saved-songs/songs.model';

interface IArtistItemProps {
  artist: Artist;
  onChosen: (artist: Artist) => void;
}

const ArtistItem: React.FC<IArtistItemProps> = ({artist, onChosen}) => {
  return (
    <div className={classes.text} onClick={() => onChosen(artist)}>
      <div>{artist.name}</div>
      <div className={classes.circleBadge}>{artist.songs.length}</div>
    </div>
  );
};

export {ArtistItem};
