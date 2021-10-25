import {SongPlayerPopup} from '../song-player-popup/song-player-popup';
import React, {memo, useEffect, useState} from 'react';
import {clearPlayingSong, getPlayingSong, selectPlayingSong} from '../room/room.slice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Info, InfoIconColor, InfoListChild, Loader, PopupFullScreen} from '../../components';
import {
  clearPlayerEvent,
  clearPlaylistEvent,
  selectPlayerEvent,
  selectPlaylistEvent
} from '../event-bus/event-bus.slice';
import {YoutubeConroller} from '../song-player-popup/components/youtube-conroller';
import {Button, Icon} from 'react-materialize';
import {tvRoleHelp} from './content/tv-helper';
import {getStubSong} from './content/stub-song';
import useFullScreenDetect from '../../hooks/useFullScreenDetect';
import {ISong} from '../../shared/songs.models';
import {playNextSong} from '../song-player-popup/song-player.api';

interface ITvPanelProps {
  handleExit: () => void;
}

const PopupPlayerMemoized = memo(SongPlayerPopup, (prevProps, nextProps) => {
  return nextProps.song.youtubeId === prevProps.song.youtubeId
    && nextProps.showChildNode === prevProps.showChildNode
    && nextProps.fsChildNode === prevProps.fsChildNode;
});

const TvPanel: React.FC<ITvPanelProps> = ({handleExit}) => {
  const [player, setPlayer] = useState<YoutubeConroller | undefined>();
  const [showHelper, setShowHelper] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const playingSong = useAppSelector(selectPlayingSong);
  const playerEvent = useAppSelector(selectPlayerEvent);
  const playlistEvent = useAppSelector(selectPlaylistEvent);
  const [stubSong, setStubSong] = useState<ISong>(getStubSong());
  const isFullScreen = useFullScreenDetect();

  useEffect(() => {
    if (playerEvent) {
      if (playingSong) {
        if (playerEvent === 'PLAYER_PAUSE') {
          player?.pause();
        } else if (playerEvent === 'PLAYER_PLAY') {
          player?.play();
        } else if (playerEvent === 'PLAYER_REPEAT') {
          player?.replay();
        }
      }
      dispatch(clearPlayerEvent);
    }
  }, [
    playerEvent,
    dispatch,
    playlistEvent,
    playingSong,
    player
  ]);

  useEffect(() => {
    if (playlistEvent === 'SONG_NEXT') {
      dispatch(getPlayingSong());
      setStubSong(getStubSong());
      dispatch(clearPlaylistEvent());
    }
    if (playlistEvent === 'SONG_QUEUE_UPDATED') {
      if (!playingSong) {
        dispatch(getPlayingSong());
        setStubSong(getStubSong());
        dispatch(clearPlaylistEvent());
      }
    }
  }, [
    dispatch,
    playlistEvent,
    playingSong
  ]);

  useEffect(() => {
    if (!playingSong) {
      player?.play();
      setShowHelper(true);
    } else {
      setShowHelper(false);
    }
  }, [player, playingSong, stubSong]);

  const goFs = () => {
    const $player = document.getElementById('ytPlayer');
    $player?.requestFullscreen();
  };

  const getSong = () => {
    if (!playingSong) {
      return stubSong;
    }
    return playingSong;
  };

  const onVideoEnd = async () => {
    dispatch(clearPlayingSong());
    setStubSong(getStubSong());
    await playNextSong();
  };

  const renderTopComp = () => {
    if (isFullScreen && !playingSong) {
      return (
        <Info
          header={'Режим ТВ'}
          iconName={'live_tv'}
          iconColor={InfoIconColor.blue}
          styles={{background: '#ffffffcf'}}
        >
          <InfoListChild messageLines={tvRoleHelp}/>
          <div className={'center-all'} style={{margin: '20px 0'}}>
            <Loader/>
          </div>
        </Info>
      );
    }
  };

  return (
    <>
      <PopupPlayerMemoized
        song={getSong()}
        closeModal={handleExit}
        onPlayerNewState={(p) => setPlayer(p)}
        onVideoEnd={onVideoEnd}
        fsChildNode={(renderTopComp())}
        showChildNode={showHelper}
      />
      {
        isFullScreen
          ? null
          : (
            <PopupFullScreen>
              <Button
                className="glass-green"
                large
                node="button"
                style={{
                  textAlign: 'left',
                  lineHeight: '36px',
                  width: '100%',
                  marginBottom: '1em'
                }}
                onClick={handleExit}>
                Выйти из режима ТВ
                <Icon left>
                  arrow_back
                </Icon>
              </Button>
              <Info
                header={'Режим ТВ'}
                iconName={'live_tv'}
                iconColor={InfoIconColor.blue}
              >
                <InfoListChild messageLines={tvRoleHelp}/>
                <div className={'center-all'} style={{margin: '20px 0'}}>
                  <Loader/>
                </div>
              </Info>
              <Button
                className="glass-green"
                large
                node="button"
                style={{
                  textAlign: 'left',
                  lineHeight: '36px',
                  width: '100%',
                  marginBottom: '1em'
                }}
                onClick={goFs}>
                Готов
                <Icon left>
                  thumb_up_off_alt
                </Icon>
              </Button>
            </PopupFullScreen>)
      }
    </>
  );
};

export default TvPanel;
