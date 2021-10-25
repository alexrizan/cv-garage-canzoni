import {Icon} from 'react-materialize';
import {InfoError, GlassButton, Loader, RadioButtons} from '../../../components';
import {activateRoom, selectActivateRoomStatus, selectUserPrivateData, switchToAnotherRoom} from '../user.slice';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import classes from './user-profile.module.css';
import useAuth from '../../../hooks/useAuth';

interface IActivateRoomForm {
  onSuccess: () => void
}

const ActivateRoomForm: React.FC<IActivateRoomForm> = () => {
  const dispatch = useAppDispatch();
  const activateRoomStatus = useAppSelector(selectActivateRoomStatus);
  const {rooms} = useAppSelector(selectUserPrivateData);
  const [chosenRoom, setChosenRoom] = useState<string>('');
  const {activeRoom} = useAuth();

  const roomChosen = (text: string, _value: string) => {
    setChosenRoom(text);
  };

  const handleConnectToRoom = () => {
    dispatch(activateRoom(chosenRoom));
  };

  const renderRoomActivateFailed = () => {
    return (
      <div>
        <InfoError errorText={'Не удалось подключится к компании'}/>
        <GlassButton
          onClick={() => {dispatch(switchToAnotherRoom())}}
          text={'Еще раз'}
          styles={{textAlign:'center', marginTop: '20px'}}
        />
      </div>
    )
  }

  const renderNoRooms = () => {
    return (
      <div>
        <div className={'center-all'}><Icon style={{fontSize: '3em', color: '#6c69ff'}}>groups</Icon></div>
        <div style={{textAlign: 'center', fontWeight: 'bold'}}>Вы пока не состоите ни в одной компании.</div>
        <div style={{textAlign: 'center'}}>Создайте новую компанию или присоединитесь к уже существующей компании
          друзей
        </div>
      </div>
    );
  };

  const renderRoomActivated = () => {
    return (
      <div className={'center-all'} style={{flexDirection: 'column'}}>
        <div className={'center-all'}
             style={{fontSize: '1.3em', color: '#7c7d7d', marginBottom: '20px'}}
        >
          {`Вы подключились к ${chosenRoom}`}
          <Icon
          >sentiment_very_satisfied
          </Icon>
        </div>
        <GlassButton onClick={() => dispatch(switchToAnotherRoom())} text={'Хорошо'}/>
      </div>
    );
  };

  const renderRoomsChoice = () => {
    return (
      <div style={{width: '100%'}}>
        <div className={'center-all'}>
          <RadioButtons
            headerStyles={{textAlign: 'center'}}
            header={'Выбери свою компанию:'}
            groupName={'rooms'}
            onClick={roomChosen}
            buttonProps={rooms!.map(r => {
              return {
                text: r,
                value: r,
                isChecked: r === activeRoom
              };
            })}/>
        </div>
        <div className={'center-all'}>
          {
            chosenRoom && chosenRoom !== activeRoom
              ? <GlassButton
                text={`Подключится к ${chosenRoom}`}
                onClick={handleConnectToRoom}
                styles={{margin: '10px 0 10px 0', textAlign: 'center'}}/>
              : null
          }
        </div>
      </div>
    );
  };

  const renderRoomMenu = () => {
    if (activateRoomStatus === 'idle') {
      return (
        <div className={classes.buttonWrapper}>
          {
            rooms?.length
              ? renderRoomsChoice()
              : renderNoRooms()
          }
        </div>
      )
    }
    if (activateRoomStatus === 'loading') {
      return (
        <div className={classes.buttonWrapper}>
          <Loader/>
        </div>
      )
    }
    if (activateRoomStatus === 'success') {
      return renderRoomActivated();
    }

    return renderRoomActivateFailed();
  }

  return (
    <>
      {renderRoomMenu()}
    </>
  );
};

export default ActivateRoomForm;
