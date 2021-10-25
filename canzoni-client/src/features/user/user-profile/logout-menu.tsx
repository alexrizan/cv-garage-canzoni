import classes from './user-profile.module.css';
import {Icon} from 'react-materialize';
import React, {useState} from 'react';
import {removeUsersDataFromLocalStorage} from '../../../utils/authLocalStorage';
import {logout} from '../user.slice';
import {useAppDispatch} from '../../../app/hooks';

const LogoutMenu = () => {
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    removeUsersDataFromLocalStorage();
    dispatch(logout());
  };

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      {
        showLogout
          ? (
            <div style={{fontSize: '15px', textAlign: 'center'}}>
              Вы точно хотите выйти?
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <button
                  onClick={handleLogout}
                  className={classes.logoutAgree}>
                  <div>Да</div>
                </button>
                <button
                  onClick={() => setShowLogout(false)}
                  className={classes.logoutAgree}
                >
                  <div>Нет</div>
                </button>
              </div>
            </div>
          )
          : null
      }
      <div className={classes.logout} onClick={() => setShowLogout(!showLogout)}>
        <Icon>logout</Icon>
      </div>
    </div>
  )
}
export default LogoutMenu;
