import classes from './button-home.module.css';
import React from 'react';
import {Icon} from 'react-materialize';

const ButtonHome: React.FC = () => {
  return (
    <div className={`${classes.wrapper} center-all`}>
      <div className={'center-all'} style={{flexDirection: 'column', color: '#00000059'}}>
        <Icon className={classes.icon}>manage_search</Icon>
      </div>
    </div>
  )
}

export default ButtonHome;
