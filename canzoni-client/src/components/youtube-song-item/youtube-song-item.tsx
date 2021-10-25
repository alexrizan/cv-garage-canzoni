import classes from './youtube-song-item.module.css';
import React from 'react';
import {Icon} from 'react-materialize';
import {SongItem} from '../song-item/song-item';
import {Song} from '../saved-songs/songs.model';

interface IYoutubeSongItemProps {
  song: Song;
  handleChosenSong: (song: Song) => void;
}

const YoutubeSongItem: React.FC<IYoutubeSongItemProps> = ({song, handleChosenSong}) => {
  const handleChosen = () => {
    handleChosenSong(song);
  };

  return (
    <div className={`center-all`} style={{height: '100%'}}>
      <div className={classes.itemWrapper}>
        <div className={classes.imageContainer}>
          <img className={classes.image} src={song.imageUrlMd} alt={song.youtubeTitle}/>
          <div className={classes.imageBlur}>
            {
              song.isMidi
                ? <div className={`${classes.badQualityWrapper} center-all`}>
                  <Icon className={classes.badQualityText}>thumb_down_off_alt</Icon>
                </div>
                : null
            }
          </div>
        </div>
        <SongItem song={song} onChosen={() => handleChosen()}/>
      </div>
    </div>
  );
};

export default YoutubeSongItem;
