import classes from './controls.module.css';
import React, {useState} from 'react';
import {GlassButton, RoundButton} from '../../../components';
import {IRating} from '../song-player.api';

interface ISongRate {
  youtubeId: string;
  onSongRate: (rating: IRating) => void;
}

const SongRate:React.FC<ISongRate> = ({onSongRate, youtubeId}) => {
  const [rating, setRating] = useState<IRating>({} as IRating);
  const [blockBadQuality, setBlockBadQuality] = useState<boolean>(false)
  const [error, setError] = useState<string>();

  const onCompleteRate = () => {
    if (rating.isAllGood) {
      onSongRate({
        youtubeId: youtubeId,
        isAllGood: true
      } as IRating);
      return;
    }

    if (Object.values(rating).find(v => v)) {
      onSongRate({
        ...rating,
        youtubeId: youtubeId
      });
      return;
    }
    setError('Выберите опции оценки');
  }

  const handleRate = (rate: string) => {
    if (rate === 'isAllGood') {
      setBlockBadQuality(!blockBadQuality);
    }

    setRating({
      ...rating,
      [rate]: !rating[rate as keyof IRating]
    })
  }

  return (
    <>
      <div className={classes.header}>Оцените песню:</div>
      <div className={classes.buttonsWrapper}>
        <div className={classes.buttonWithText}>
          <RoundButton
            onClick={() => {handleRate('isAllGood')}}
            iconName={'thumb_up'}
            showPressed
          >
          </RoundButton>
          <div className={'text-color text-a-center bold'}>Все ок</div>
        </div>
        <div className={classes.buttonWithText}>
          <RoundButton
            onClick={() => {handleRate('Midi')}}
            iconName={'videogame_asset'}
            showPressed
            blocked={blockBadQuality}
          >
          </RoundButton>
          <div className={'text-color text-a-center bold'}>Музыка Dendy</div>
        </div>
        <div className={classes.buttonWithText}>
          <RoundButton
            onClick={() => {handleRate('notSong')}}
            iconName={'thumb_down_off_alt'}
            showPressed
            blocked={blockBadQuality}
          >
          </RoundButton>
          <div className={'text-color text-a-center bold'}>Не песня</div>
        </div>
        <div className={classes.buttonWithText}>
          <RoundButton
            onClick={() => {handleRate('textBadQuality')}}
            iconName={'videogame_asset'}
            showPressed
            blocked={blockBadQuality}
          >
          </RoundButton>
          <div className={'text-color text-a-center bold'}>Плохое качество текста</div>
        </div>

      </div>
      <div className={'center-all'} style={{margin: '20px', display: 'flex', flexDirection: 'column'}}>
        {
          error?
            (
              <div style={{color: 'red'}}>
                {error}
              </div>
            )
            : null
        }
        <GlassButton onClick={onCompleteRate} text={'Отправить'}/>
      </div>
    </>
  );
};

export default SongRate;
