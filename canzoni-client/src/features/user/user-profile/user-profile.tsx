import classes from './user-profile.module.css';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {getUserProfile, selectUserPrivateData} from '../user.slice';
import {GlassButton, Switcher} from '../../../components';
import NewRoomForm from './new-room-form';
import JoinRoomForm from './join-room-form';
import ActivateRoomForm from './activate-room-form';
import LogoutMenu from './logout-menu';
import useAuth from '../../../hooks/useAuth';
import {Button} from 'react-materialize';
import TvPanel from '../../tv-panel/tv-panel';

type VisibleMenuType = 'Own' | 'CreateRoom' | 'JoinRoom' | 'None';

const UserProfile: React.FC = () => {
  const {name} = useAppSelector(selectUserPrivateData);
  const dispatch = useAppDispatch();
  const [visibleAddition, setVisibleAddition] = useState<VisibleMenuType>('Own');
  const [isTvActive, setTvActive] = useState<boolean>(false);
  const {activeRoom} = useAuth();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleAdditionalAction = (actionType: VisibleMenuType) => {
    if (visibleAddition === actionType) {
      setVisibleAddition('None');
    } else {
      setVisibleAddition(actionType);
    }
  };

  const closeRoomCard = () => {
    setVisibleAddition('None');
  };

  const renderAdditionalRoom = () => {
    if (visibleAddition === 'CreateRoom') {
      return <NewRoomForm onSuccess={closeRoomCard}/>;
    }
    if (visibleAddition === 'JoinRoom') {
      return <JoinRoomForm onSuccess={closeRoomCard}/>;
    }
    if (visibleAddition === 'Own') {
      return <ActivateRoomForm onSuccess={closeRoomCard}/>;
    }
  };

  return (
    <div style={{width: '100%'}}>
      <div className={classes.wrapper}>
        <div className={classes.helloWrapper}>
          <div>Привет, {name}</div>
          <LogoutMenu/>
        </div>
        <div style={{width: '100%'}}>
          <div className={classes.actionMenu}>
            <GlassButton
              styles={{textAlign: 'center'}}
              onClick={() => handleAdditionalAction('Own')}
              text={'Мои компании'}
            />
            <GlassButton
              styles={{textAlign: 'center'}}
              onClick={() => handleAdditionalAction('CreateRoom')}
              text={'Создать компанию'}
            />
            <GlassButton
              styles={{textAlign: 'center'}}
              onClick={() => handleAdditionalAction('JoinRoom')}
              text={'Присоединится'}
            />
          </div>
        </div>
        {
          activeRoom
            ? <Button small style={{width: '100%', margin: '20px 0'}}
                      onClick={() => {setTvActive(true)}}
            >
              Перейти в режим Телевизора
            </Button>
            : null
        }
        <Switcher name={visibleAddition} effect={'fade'}>
          <>
            {
              visibleAddition !== 'None'
                ? (<div className={classes.roomActions}>
                  {
                    renderAdditionalRoom()
                  }
                </div>)
                : null
            }
          </>
        </Switcher>
      </div>
      {
        isTvActive
        ? <TvPanel handleExit={() => {setTvActive(false)}}/>
        : null
      }
    </div>
  );
};

export default UserProfile;
