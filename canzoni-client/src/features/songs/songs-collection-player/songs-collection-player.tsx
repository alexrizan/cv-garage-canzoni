import React, {useCallback, useState} from 'react';
import {addSongToHistory, LoadingStatus,} from '../songs.slice';
import {useAppDispatch} from '../../../app/hooks';
import {ArtistSongsPopup, InfoError, Loader, SavedSongs} from '../../../components';
import {Artist, Song} from '../songs.model';
import {SongPlayerPopup} from '../../song-player-popup/song-player-popup';

interface ISongsCollectionPlayer {
  loadingStatus: LoadingStatus;
  songs: Song[];
}

const SongsCollectionPlayer: React.FC<ISongsCollectionPlayer> = ({loadingStatus, songs}) => {
  const dispatch = useAppDispatch();

  const [isArtistModalActive, setArtistModalActive] = useState<boolean>(false);
  const [artistChosen, setArtistChosen] = useState<Artist>();

  const [songChosen, setSongChosen] = useState<Song>();
  const [isSongModalActive, setSongModalActive] = useState<boolean>(false);

  const onArtistChosen = useCallback((artist: Artist) => {
    setArtistModalActive(true);
    setArtistChosen(artist);
  }, []);

  const closeArtistModal = () => {
    setArtistModalActive(false);
  };

  const onSongChosen = (song: Song) => {
    setSongChosen(song);
    dispatch(addSongToHistory(song));
    setSongModalActive(true);
  };

  const closeSongModal = () => {
    setSongModalActive(false);
  };

  let alternativeView = null;

  if (loadingStatus === 'failed') {
    alternativeView = <InfoError/>;
  } else if (loadingStatus !== 'idle') {
    alternativeView = <Loader fullScreen={true}/>;
  }

  const componentView = (
    <div>
      <SavedSongs songs={songs} onArtistChosen={onArtistChosen} onSongChosen={onSongChosen}/>
      {
        isArtistModalActive
          ? <ArtistSongsPopup artist={artistChosen!} closeModal={closeArtistModal} onSongChosen={onSongChosen}/>
          : null
      }
      {
        isSongModalActive
          ? <SongPlayerPopup closeModal={closeSongModal} song={songChosen!} orderVisible/>
          : null
      }
    </div>
  );

  return (
    <>
      {alternativeView ?? componentView}
    </>
  );
};

export default SongsCollectionPlayer;
