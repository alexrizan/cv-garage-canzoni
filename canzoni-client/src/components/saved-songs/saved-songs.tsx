import classes from './saved-songs.module.css';
import React from 'react';
import {Artist, Song} from './songs.model';
import {Tab, Tabs} from 'react-materialize';
import {SongsCollectionSlider} from '../songs-collection-slider';
import {ArtistsCollectionSlider} from '../artists-collection-slider';

interface ISavedSongsProps {
  songs: Song[];
  onArtistChosen: (artist: Artist) => void;
  onSongChosen: (song: Song) => void;
}

const SavedSongs: React.FC<ISavedSongsProps> = ({songs, onArtistChosen, onSongChosen}) => {
  return (
    <div>
      <Tabs
        className="tab-demo z-depth-1-half"
        options={{
          swipeable: false,
          duration: 100,
          onShow: () => {
          },
          responsiveThreshold: Infinity
        }}
      >
        <Tab
          active
          title="Все"
        >
          <div className={classes.contentWrapper}>
            <SongsCollectionSlider songs={songs} onSongChosen={onSongChosen}/>
          </div>

        </Tab>
        <Tab
          title="По исполнителю"
        >
          <div className={classes.contentWrapper}>
            <ArtistsCollectionSlider songs={songs} onArtistChosen={onArtistChosen}/>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export {SavedSongs};
