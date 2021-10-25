import {YoutubeCollectionSlider} from '../../../components/youtube-collection-slider';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {getPlaylist, selectPlaylistSongs, selectPlaylistUpdateStatus} from '../room.slice';
import {InfoError, Info, InfoIconColor, InfoListChild, Loader, RoundButton} from '../../../components';
import {ISong} from '../../../shared/songs.models';
import React, {useState} from 'react';
import {SongPlayerPopup} from '../../song-player-popup/song-player-popup';
import {playlistHelp} from '../content/playlist-help';

const Playlist = () => {
  const playlistUpdateResult = useAppSelector(selectPlaylistUpdateStatus);
  const playlist = useAppSelector(selectPlaylistSongs);
  const [playSong, setPlaySong] = useState<ISong | null>(null);
  const dispatch = useAppDispatch();

  const renderPlayer = () => {
    if (playSong) {
      return <SongPlayerPopup song={playSong} closeModal={() => setPlaySong(null)}/>;
    }
    return null;
  };

  const renderPlaylist = () => {
    if (playlistUpdateResult === 'loading') {
      return <div className="center-all" style={{minHeight: '200px'}}><Loader/></div>;
    }
    if (playlistUpdateResult === 'failed') {
      return (<InfoError/>);
    }
    if (!playlist.length) {
      return (
        <div className={'center-all'} style={{flexDirection: 'column'}}>
          <div style={{marginTop: '20px'}}>
            <RoundButton iconName={'refresh'} onClick={() => dispatch(getPlaylist())}/>
          </div>
          <Info
            iconName={'school'}
            header={'Плэйлист пока пуст'}
            iconColor={InfoIconColor.blue}
          >
            <InfoListChild messageLines={playlistHelp}/>
          </Info>
        </div>
      );
    }
    return (
      <div className={'center-all'} style={{flexDirection: 'column'}}>
        <div style={{margin: '15px'}}>
          <RoundButton iconName={'refresh'} onClick={() => dispatch(getPlaylist())}/>
        </div>
        <div>
          <YoutubeCollectionSlider
            songs={playlist as unknown as ISong[] ?? []}
            onSongChosen={(song) => setPlaySong(song)}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {renderPlaylist()}
      {renderPlayer()}
    </>

  );
};

export default Playlist;
