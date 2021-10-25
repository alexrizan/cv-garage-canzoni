import React from 'react';
import {useCheckMobile} from '../../hooks/useCheckMobile';
import {CollectionArtistsMobile} from './collection-mobile/collection-artists-mobile';
import {CollectionArtistsPc} from './collection-pc/collection-artists-pc';
import {Artist, Song} from '../saved-songs/songs.model';

interface IArtistsCollectionSliderProps {
  songs: Song[];
  onArtistChosen: (artist: Artist) => void;
}

const groupByArtist = (songs: Song[]) => {
  const sorted = songs.reduce((store: any, song) => {
    if (!store[song.artist]) {
      store[song.artist] = [];
    }
    store[song.artist].push(song);
    return store;
  }, {});

  return Object.keys(sorted).map(artistKey => {
    return {
      name: artistKey,
      songs: sorted[artistKey]
    } as Artist;
  });
};

const sortArtistsByName = (artists: Artist[]) => {
  return artists.sort((a, b) => {
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
  });
};

const ArtistsCollectionSlider: React.FC<IArtistsCollectionSliderProps> = ({songs, onArtistChosen}) => {
  const artists = sortArtistsByName(groupByArtist(songs));

  const isMobile = useCheckMobile();

  return (
    <>
      {
        isMobile
          ? <CollectionArtistsMobile artists={artists} onArtistChosen={onArtistChosen}/>
          : <CollectionArtistsPc artists={artists} onArtistChosen={onArtistChosen}/>
      }
    </>
  );
};

export {ArtistsCollectionSlider};
