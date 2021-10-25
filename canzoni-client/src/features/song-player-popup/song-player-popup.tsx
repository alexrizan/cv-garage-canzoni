import classes from './song-player-popup.module.css';
import React, {useState} from 'react';
import YouTube from 'react-youtube';
import {Button, Icon} from 'react-materialize';
import {Song} from '../songs/songs.model';
import {GlassButton, Loader, PopupFullScreen} from '../../components';
import SongRate from './components/song-rate';
import SongPlayerPult from './components/song-player-pult';
import {addSongToQueue, IRating, IResult, sendSongRating} from './song-player.api';
import AddQueuePanel from './components/add-queue-panel';
import {YoutubeConroller} from './components/youtube-conroller';
import useFullScreenDetect from '../../hooks/useFullScreenDetect';


/*
* playerVars:
* https://developers.google.com/youtube/player_parameters
*
* players api:
* https://developers.google.com/youtube/iframe_api_reference
* */

type CurrentView = 'pult' | 'feedback' | 'playlist' | 'loading'

interface ISongPlayerPopupProps {
  song: Song;

  closeModal(): void;

  pultVisible?: boolean;
  orderVisible?: boolean;

  onPlayerNewState?: (player?: YoutubeConroller) => void;
  onVideoEnd?: () => void;

  fsChildNode?: React.ReactNode;
  showChildNode?: boolean;
}


const SongPlayerPopup: React.FC<ISongPlayerPopupProps> = (
  {
    song,
    closeModal,
    pultVisible = false,
    orderVisible = false,
    onPlayerNewState,
    onVideoEnd,
    fsChildNode,
    showChildNode
  }) => {
  const [currentView, setCurrentView] = useState<CurrentView>('feedback');
  const [ratingResult, setRatingResult] = useState<IResult>();
  const [addQueueResult, setQueueResult] = useState<IResult>();
  const isFullScreen = useFullScreenDetect();

  const onReady = (event: any) => {
    event.target.playVideo();
    if (onPlayerNewState) {
      onPlayerNewState(new YoutubeConroller(event.target));
    }
  };

  const onEnd = () => {
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  const handleRate = async (rating: IRating) => {
    setRatingResult({});
    setCurrentView('loading');
    const res = await sendSongRating(rating);
    setRatingResult(res);
    setCurrentView('feedback');
  };

  const handleAddToPlaylist = async (friendName: string) => {
    setQueueResult({});
    setCurrentView('loading');
    const res = await addSongToQueue({youtubeId: song.youtubeId!, users: [friendName]});
    setQueueResult(res);
    setCurrentView('playlist');
  };

  const renderResult = (result: IResult, successText: string) => {
    const resultSign = result?.isSuccess ? successText : result?.error;
    return (
      <>
        <div className={'text-a-center'}
             style={{color: result?.isSuccess ? 'green' : 'red'}}>
          {resultSign}
        </div>
      </>
    );
  };

  const renderPlaylist = () => {
    if (addQueueResult?.isSuccess || addQueueResult?.error) {
      return renderResult(addQueueResult, `Добавлено в плэйлист: ${song.artist ?? song.track}`);
    }
    if (currentView === 'playlist') {
      return <AddQueuePanel
        onSendToQueue={(friendName) => handleAddToPlaylist(friendName)}/>;
    }
    return null;
  };

  const renderPult = () => {
    if (pultVisible && currentView === 'pult') {
      return <SongPlayerPult/>;
    }
    return null;
  };

  const renderFeedback = () => {
    if (ratingResult?.isSuccess || ratingResult?.error) {
      return renderResult(ratingResult, 'Спасибо за ваш отзыв');
    }
    if (currentView === 'feedback') {
      return <SongRate onSongRate={(r) => handleRate(r)} youtubeId={song.youtubeId!}/>;
    }
    return null;
  };

  const getYtPlayerClasses = () => {
    if (isFullScreen) {
      return classes.fsContainer;
    }
    return;
  }

  return (
    <PopupFullScreen alwaysOnTop>
      <div className={classes.cardWrapper}>
        <div>
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
        </div>
        <div className={classes.youtubeContainer}>
          <div id='ytPlayer'
            className={getYtPlayerClasses()}
          >
            <YouTube
              videoId={song.youtubeId}
              onReady={(event => onReady(event))}
              onEnd={onEnd}
              onError={(event) => console.log(event)}
            />
            {
              fsChildNode && isFullScreen && showChildNode
                ? <div className={classes.fsChild}>{fsChildNode}</div>
                : null
            }
          </div>
          <div className={classes.pultWrapper}>
            <div style={{display: 'flex'}}>
              <GlassButton onClick={() => setCurrentView('feedback')} centerText text={'Оценить'}/>
              {
                pultVisible
                  ? <GlassButton onClick={() => setCurrentView('pult')} centerText text={'Пульт'}/>
                  : null
              }
              {
                orderVisible
                  ? <GlassButton onClick={() => setCurrentView('playlist')} centerText text={'Плэйлист'}/>
                  : null
              }
            </div>
            {currentView === 'loading'
              ? <Loader/>
              :
              <>
                {renderPult()}
                {renderFeedback()}
                {renderPlaylist()}
              </>
            }
          </div>
        </div>
      </div>
    </PopupFullScreen>
  );
};

export {SongPlayerPopup};
