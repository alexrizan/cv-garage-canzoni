import classes from './navigation-menu.module.css';
import React from 'react';
import LoginButton from './login-button';
import {FeaturesUrls} from '../nav-router-urls';
import {Link} from 'react-router-dom';
import RoomButton from './room-button';
import ButtonHome from './button-home';
import useSSE from '../../event-bus/useSSE';

export const NavigationMenu: React.FC = () => {
  useSSE();

  return (
    <div className={classes.menuContainer}>
      <div style={{display: 'flex'}}>
        <div className={'center-all'} style={{background: '#e6f6fb',border: '2px solid #00000059'}}>
          <Link to={FeaturesUrls.songs}>
            <ButtonHome/>
          </Link>
        </div>
        <RoomButton/>
      </div>
      <div className={classes.logoWrapper}/>
      <div className={classes.login}>
        <Link to={FeaturesUrls.user}>
          <LoginButton onClick={() => {
          }}/>
        </Link>
      </div>
    </div>
  );
};

export default NavigationMenu;
