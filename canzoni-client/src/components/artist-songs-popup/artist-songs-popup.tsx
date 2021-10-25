import classes from './artist-songs-popup.module.css';
import React from 'react';
import {FullPageWrapperHoc} from '../full-page-wrapper-hoc/full-page-wrapper-hoc';
import {Button, Icon} from 'react-materialize';
import {ArtistSongsMenu} from '../artist-songs-menu/artist-songs-menu';
import {PopupFullScreen} from '../popup-fullscreen/popup-fullscreen';
import {Artist, Song} from '../saved-songs/songs.model';

interface IArtistSongsPopupProps {
  artist: Artist;

  closeModal(): void;

  onSongChosen(song: Song): void;
}

const ArtistSongsPopup: React.FC<IArtistSongsPopupProps> = ({artist, onSongChosen, closeModal}) => {
  return (
    <PopupFullScreen alwaysOnTop>
      <FullPageWrapperHoc>
        <div>
          <Button
            className={`${classes.closeButton} glass-green`}
            large
            node="button"
            style={{
              textAlign: 'left',
              lineHeight: '36px'
            }}
            onClick={closeModal}
          >
            Назад
            <Icon left>
              arrow_back
            </Icon>
          </Button>
          <ArtistSongsMenu artist={artist} onSongChosen={onSongChosen}/>
        </div>
      </FullPageWrapperHoc>
    </PopupFullScreen>
  );
};

export {ArtistSongsPopup};
