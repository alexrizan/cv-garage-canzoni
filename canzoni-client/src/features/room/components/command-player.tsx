import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {getPlayingSong, selectPlayingSong} from '../room.slice';
import {clearPlaylistEvent, selectPlayerEvent, selectPlaylistEvent} from '../../event-bus/event-bus.slice';
import {Button, Icon} from 'react-materialize';
import {Info, InfoIconColor, PopupFullScreen} from '../../../components';
import {SongPlayerPopup} from '../../song-player-popup/song-player-popup';

interface ICommandPlayerProps {
  closeModal(): void;
}

const CommandPlayer: React.FC<ICommandPlayerProps> = (
  {
    closeModal
  }) => {
  const playingSong = useAppSelector(selectPlayingSong);
  const playerEvent = useAppSelector(selectPlayerEvent);
  const playlistEvent = useAppSelector(selectPlaylistEvent);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (playlistEvent === 'SONG_NEXT') {
      dispatch(getPlayingSong());
      dispatch(clearPlaylistEvent())
    }
  }, [
    playerEvent,
    dispatch,
    playlistEvent
  ]);

  return (
    <>
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
          onClick={closeModal}>
          Назад
          <Icon left>
            arrow_back
          </Icon>
        </Button>
        <Info
          header={'Пульт управления песнями'}
          iconName={'hourglass_top'}
          iconColor={InfoIconColor.blue}
          message={'Сейчас ничего не проигрывается. Вы можете заказать, то что нравится вам'}
        />
      </PopupFullScreen>
      {
        playingSong
          ? <SongPlayerPopup song={playingSong} pultVisible closeModal={closeModal}/>
          : null
      }
    </>
  );
};

export {CommandPlayer}
