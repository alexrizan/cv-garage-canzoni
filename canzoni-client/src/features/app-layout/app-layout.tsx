import React from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import {FullPageWrapperHoc} from '../../components';
import NavigationMenu from './navigation-menu/navigation-menu';
import {FeaturesUrls} from './nav-router-urls';
import {Songs} from '../songs/songs';
import User from '../user/user';

const AppLayout: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <NavigationMenu/>
      <FullPageWrapperHoc>
        <Switch location={location}>
          <Route path={FeaturesUrls.songs} component={Songs}/>
          <Route path={FeaturesUrls.user} component={User}/>
        </Switch>
      </FullPageWrapperHoc>
    </>
  );
};

export default AppLayout;
