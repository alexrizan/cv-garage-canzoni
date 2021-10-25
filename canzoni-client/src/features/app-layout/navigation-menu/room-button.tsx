import React, {useState} from 'react';
import useAuth from '../../../hooks/useAuth';
import classes from './room-button.module.css';
import Room from '../../room/room';
import {GlassButton, PopupFullScreen} from '../../../components';

const RoomButton: React.FC = () => {
  const {activeRoom} = useAuth();
  const [showRoom, setShowRoom] = useState<boolean>(false)

  const callRoomModal = () => {
    setShowRoom(!showRoom && !!activeRoom);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.button} onClick={() => callRoomModal()}>
          <div className={classes.content}>{activeRoom?.toUpperCase()?? 'Ждем компанию'}</div>
        </div>
      </div>
      {
        showRoom
          ? (
          <PopupFullScreen>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
              <GlassButton onClick={callRoomModal} text={'Закрыть'} styles={{textAlign: 'center'}}/>
              <Room/>
            </div>
          </PopupFullScreen>)
          : null
      }
    </>
  );
};

export default RoomButton;
