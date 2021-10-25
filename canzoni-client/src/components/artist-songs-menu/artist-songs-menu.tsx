import classes from './artist-songs-menu.module.css';
import React from 'react';
import {Artist, Song} from '../saved-songs/songs.model';
import {SongsCollectionSlider} from '../songs-collection-slider';

interface IArtistSongsMenuProps {
  artist: Artist;

  onSongChosen(song: Song): void;
}

const ArtistSongsMenu: React.FC<IArtistSongsMenuProps> = ({artist, onSongChosen}) => {

  const artistsMenu = artist ?
    (
      <div className={`${classes.wrapper}`}>
        <h3 className={classes.artistName}>{artist.name}</h3>
        <SongsCollectionSlider songs={artist.songs} onSongChosen={onSongChosen}/>
      </div>
    ) : <></>;

  return (
    <>
      {artistsMenu}
    </>
  );
};

export {ArtistSongsMenu};
