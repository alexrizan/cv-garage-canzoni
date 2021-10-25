import classes from './login-button.module.css';
import React from 'react';
import {Icon} from 'react-materialize';
import useAuth from '../../../hooks/useAuth';

interface ILoginButtonProps {
  onClick: () => void;
}

const LoginButton: React.FC<ILoginButtonProps> = ({onClick}) => {
  const {isAuth} = useAuth();
  // TODO after login icon: sentiment_very_satisfied
  return (
    <div className={`${classes.wrapper} ${isAuth ? classes.auth : classes.notAuth}`}>
      <Icon className={classes.icon}>sentiment_satisfied_alt</Icon>
      <div onClick={onClick} className={classes.cornerCircle}/>
    </div>
  );
};

export default LoginButton;
