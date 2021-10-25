import classes from './songs.module.css';
import React from 'react';
import {Button, Icon} from 'react-materialize';
import {SongSearchControl, SongSearchView} from './song-search';
import SongsHistory from './songs-history/songs-history';
import {Switcher} from '../../components';
import {Link, Route, Switch, useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import SongRecommended from './song-recommended/song-recommended';

/*
* Не оптимизировать до
* https://github.com/react-materialize/react-materialize/issues/952
* Бага materialize с генерацией id у ряда компонентов
*/

enum SongRouterUrls {
  history = '/history',
  recommended = '/recommended',
  search = '/search'
}

const Songs = () => {
  const location = useLocation();
  const history = useHistory();
  let {path, url} = useRouteMatch();

  const handleContentTypeClick = (contentType: SongRouterUrls) => {
    // TODO Обозначить как-то выбор актуальной вьюхи
  };

  const displaySearchView = () => {
    history.push(`${path}${SongRouterUrls.search}`)
  };

  return (
    <div>
      <div className={classes.menuWrapper}>
        <Link to={`${url}${SongRouterUrls.search}`}>
          <Button
            large
            node="button"
            style={{
              textAlign: 'left',
              lineHeight: '36px',
              width: '100%'
            }}
            onClick={() => {
              handleContentTypeClick(SongRouterUrls.search);
            }}
            className={'glass-green'}
          >
            Поиск
            <Icon left>
              cloud
            </Icon>
          </Button>
        </Link>

        <Link to={`${url}${SongRouterUrls.history}`}>
          <Button
            large
            node="button"
            style={{
              textAlign: 'left',
              lineHeight: '36px',
              width: '100%'
            }}
            onClick={() => {
              handleContentTypeClick(SongRouterUrls.history);
            }}
            className={'glass-green'}
          >
            История
            <Icon left>
              menu_book
            </Icon>
          </Button>
        </Link>

        <Link to={`${url}${SongRouterUrls.recommended}`}>
          <Button
            large
            node="button"
            style={{
              textAlign: 'left',
              lineHeight: '36px',
              width: '100%'
            }}
            onClick={() => {
              handleContentTypeClick(SongRouterUrls.recommended);
            }}
            className={'glass-green'}
          >
            Рекомендации
            <Icon left>
              emoji_objects
            </Icon>
          </Button>
        </Link>
      </div>
      <div>
        <SongSearchControl
          onValueChanged={() => {
            displaySearchView();
          }}
        />
      </div>
      <div className={classes.contentWrapper}>
        <Switcher name={location.key!} effect={'fade'}>
          <Switch location={location}>
            <Route path={`${path}${SongRouterUrls.history}`} component={SongsHistory}/>
            <Route path={`${path}${SongRouterUrls.recommended}`} component={SongRecommended}/>
            <Route path={`${path}${SongRouterUrls.search}`} component={SongSearchView}/>
          </Switch>
        </Switcher>
      </div>

    </div>
  );
};

export {Songs};
