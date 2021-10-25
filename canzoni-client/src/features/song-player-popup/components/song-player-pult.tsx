import classes from './controls.module.css';
import {Button, Icon} from 'react-materialize';
import React, {useState} from 'react';
import {useAppDispatch} from '../../../app/hooks';
import {raiseEvent} from '../../event-bus/event-bus.slice';
import {playNextSong} from '../song-player.api';
import {Loader} from '../../../components';

const SongPlayerPult: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleNextSong = async () => {
    try {
      setLoading(true);
      await playNextSong();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const renderButtons = () => {
    return (
      <>
        <div className={'center-all'}>
          <Button
            className="red"
            floating
            icon={<Icon>play_arrow</Icon>}
            large
            node="button"
            waves="light"
            onClick={() => dispatch(raiseEvent({event: 'PLAYER_PLAY'}))}
          />
        </div>
        <div className={'center-all'}>
          <Button
            className="red"
            floating
            icon={<Icon>pause</Icon>}
            large
            node="button"
            waves="light"
            onClick={() => dispatch(raiseEvent({event: 'PLAYER_PAUSE'}))}
          />
        </div>
        <div className={'center-all'}>
          <Button
            className="red"
            floating
            icon={<Icon>replay</Icon>}
            large
            node="button"
            waves="light"
            onClick={() => dispatch(raiseEvent({event: 'PLAYER_REPEAT'}))}
          />
        </div>
        <div className={'center-all'}>
          <Button
            className="red"
            floating
            style={{fontWeight: 'bold', fontSize: '1.2em'}}
            icon={<Icon>skip_next</Icon>}
            large
            node="button"
            waves="light"
            onClick={() => handleNextSong()}
          />
        </div>
        <div className={'center-all'}>
          <Button
            className="red"
            floating
            icon={<Icon>article</Icon>}
            large
            node="button"
            waves="light"
            disabled
            onClick={() => {
            }}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className={classes.header}>Управление караоке:</div>
      <div className={classes.buttonsWrapper} style={{gridGap: '10px'}}>
        {
          isLoading
            ? <Loader/>
            : renderButtons()
        }
      </div>
    </>
  );
};

export default SongPlayerPult;
