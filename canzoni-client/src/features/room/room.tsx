import {GlassButton} from '../../components';
import React, {useEffect, useState} from 'react';
import useAuth from '../../hooks/useAuth';
import Playlist from './components/playlist';
import Friends from './components/friends';
import {getFriends, getPlaylist} from './room.api';
import {useAppDispatch} from '../../app/hooks';
import {CommandPlayer} from './components/command-player';

type RoomOptionType = 'None' | 'MusicQueue' | 'Friends';

const Room = () => {
  const [viewType, setVIewType] = useState<RoomOptionType>('None');
  const {activeRoom} = useAuth();
  const dispatch = useAppDispatch();
  const [isPlayerVisible, setPlayerVisible] = useState<boolean>();

  useEffect(() => {
    dispatch(getFriends());
    dispatch(getPlaylist());
  }, [dispatch]);

  const switchOption = (chosenViewType: RoomOptionType) => {
    if (viewType === chosenViewType) {
      setVIewType('None');
      return;
    }
    setVIewType(chosenViewType);
  };

  const renderPlayerPopup = () => {
    if (isPlayerVisible) {
      return <CommandPlayer closeModal={() => setPlayerVisible(false)}/>;
    }
  };

  const renderView = () => {
    if (viewType === 'None') {
      return null;
    }
    if (viewType === 'MusicQueue') {
      return <Playlist/>;
    }
    if (viewType === 'Friends') {
      return <Friends/>;
    }
  };

  return (
    <div>
      <div className={'center-all'} style={{margin: '20px 0px'}}>
        <div style={{fontSize: '2em', fontWeight: 'bold', color: '#00000059'}}>{activeRoom?.toUpperCase()}</div>
      </div>
      <div className={'center-all'}>
        <GlassButton
          onClick={() => switchOption('MusicQueue')}
          text={'Очередь'} styles={{textAlign: 'center', padding: '0'}}/>
        <GlassButton
          onClick={() => setPlayerVisible(true)}
          text={'Плеер'} styles={{textAlign: 'center', padding: '0'}}/>
        <GlassButton
          onClick={() => switchOption('Friends')}
          text={'Компания'}
          styles={{textAlign: 'center', padding: '0'}}/>
      </div>
      <div className={'center-all'}>
        {renderView()}
        {renderPlayerPopup()}
      </div>

    </div>
  );
};

export default Room;
