import {Link, Route, Switch, useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import {GlassButton, Switcher} from '../../components';
import React, {useEffect} from 'react';
import UserProfile from './user-profile/user-profile';
import UserRegister from './user-register/user-register';
import UserLogin from './user-login/user-login';
import useAuth from '../../hooks/useAuth';
import classes from './user.module.css';

enum UserRouterUrl {
  login = 'login',
  register = 'register',
  profile = 'profile'
}

const User = () => {
  const location = useLocation();
  let {path, url} = useRouteMatch();
  const {isAuth} = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (isAuth) {
      history.push(`${path}/${UserRouterUrl.profile}`);
    }
  }, [isAuth, location.pathname, history, path]);

  return (
    <div className={'center-all'} style={{flexDirection:'column'}}>
      {
        isAuth
          ? null
          :
          (<div className={classes.card}>
            <div className={classes.btnWrapper}>
              <Link to={`${url}/${UserRouterUrl.login}`}>
                <GlassButton text={'Вход'} onClick={()=>{}}
                             styles={{textAlign: 'center'}}
                />
              </Link>
            </div>
            <div className={classes.btnWrapper}>
              <Link to={`${url}/${UserRouterUrl.register}`}>
                <GlassButton text={'Регистрация'} onClick={()=>{}}
                             styles={{textAlign: 'center'}}/>
              </Link>
            </div>
          </div>)
      }
      <Switcher name={location.key!} effect={'fade'}>
        <Switch location={location}>
          <Route path={`${path}/${UserRouterUrl.register}`} component={UserRegister}/>
          <Route path={`${path}/${UserRouterUrl.login}`} component={UserLogin}/>
        </Switch>
      </Switcher>
      {
        isAuth
          ? <Route path={`${path}/${UserRouterUrl.profile}`} component={UserProfile}/>
          : null
      }
    </div>
  );
};

export default User;
