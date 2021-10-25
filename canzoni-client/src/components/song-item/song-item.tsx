import React from 'react';
import classes from './song-item.module.css';
import {LetterAvatar} from './letter-avatar/letter-avatar';
import {Song} from '../saved-songs/songs.model';

interface ISongItemProps {
  song: Song;
  onChosen: (song: Song) => void;
}

const SongItem: React.FC<ISongItemProps> = ({song, onChosen}) => {
  return (
    <div className={classes.container} onClick={() => onChosen(song)}>
      <div className={classes.ava}>
        <LetterAvatar name={song.artist}/>
      </div>
      <div className={classes.text}>
        <div className={classes.artistHeader}>{song.artist}</div>
        <div className={classes.trackHeader}>{song.track}</div>
        {
          song.isMidi
            ? <div style={{color: '#7f0303'}}>'плохое качество'</div>
            : null
        }
      </div>
    </div>
  );
};

export {SongItem};
