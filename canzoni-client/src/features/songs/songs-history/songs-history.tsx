import React, {useEffect, useState} from 'react';
import {useAppDispatch} from '../../../app/hooks';
import {useSelector} from 'react-redux';
import {clearSongsHistory, LoadingStatus, loadSongsHistory, selectTodaySongs} from '../songs.slice';
import SongsCollectionPlayer from '../songs-collection-player/songs-collection-player';
import {GlassButton, Info, InfoIconColor} from '../../../components';

const SongsHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const songs = useSelector(selectTodaySongs);
  const [status, setStatus] = useState<LoadingStatus>('loading');

  useEffect(() => {
    dispatch(loadSongsHistory());
    setStatus('idle');
  }, [dispatch]);

  const cleanHistory = () => {
    dispatch(clearSongsHistory());
  };

  const renderNotice = () => {
    return <Info
      header={'История ваших видео'}
      iconName={'emoji_symbols'}
      message={'Вы пока ничего не смотрели'}
      iconColor={InfoIconColor.blue}
    />
  };

  return (
    <>
      {
        songs?.length
          ? <SongsCollectionPlayer songs={songs} loadingStatus={status}/>
          : renderNotice()
      }
      <GlassButton
        small
        text={'Очистить историю'}
        onClick={cleanHistory}
        iconName={'clear'}
        alignIcon={'left'}
      />
    </>
  );
};

export default SongsHistory;
