import classes from './song-search-view.module.css';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  addSongToHistory,
  clearStorageSearchResult,
  clearYoutubeSearch,
  findYoutubeVideos,
  selectStorageLoadingStatus,
  selectStorageSongsResult,
  selectYoutubeSearchResult,
  selectYoutubeSearchStatus,
  selectYoutubeSearchTerm
} from '../songs.slice';
import {useAppDispatch} from '../../../app/hooks';
import YoutubeSearchView from './youtube-search-view/youtube-search-view';
import NothingFoundView from './nothing-found-view/nothing-found-view';
import {Song} from '../songs.model';
import {InfoError, Loader} from '../../../components';
import {SongPlayerPopup} from '../../song-player-popup/song-player-popup';

const SongSearchView: React.FC = () => {
  const foundSongs = useSelector(selectStorageSongsResult);
  const storageLoadingStatus = useSelector(selectStorageLoadingStatus);
  const youtubeSongs = useSelector(selectYoutubeSearchResult);
  const youtubeLoadingStatus = useSelector(selectYoutubeSearchStatus);
  const [isSongModalActive, setSongModalActive] = useState<boolean>(false);
  const [songChosen, setSongChosen] = useState<Song>();
  const searchTerm = useSelector(selectYoutubeSearchTerm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearYoutubeSearch());
  }, [dispatch]);

  const searchOnYoutube = () => {
    dispatch(clearStorageSearchResult())
    dispatch(findYoutubeVideos());
  };

  const onSongChosen = (song: Song) => {
    setSongChosen(song);
    dispatch(addSongToHistory(song));
    setSongModalActive(true);
  };

  const closeSongModal = () => {
    setSongModalActive(false);
  };

  const renderSpinner = () => {
    return <div className={`${classes.loaderWrapper} center-all`}><Loader/></div>;
  };

  const renderView = () => {
    if (storageLoadingStatus === 'loading') {
      return renderSpinner();
    }
    if (storageLoadingStatus === 'failed') {
      return <InfoError/>
    }
    if (foundSongs.length) {
      return (
        <YoutubeSearchView
          songs={foundSongs}
          handleChosenSong={onSongChosen}
          enableMoreResultsButton
          handleMoreClick={() => searchOnYoutube()}
        />);
    }
    if (youtubeLoadingStatus === 'loading') {
      return renderSpinner();
    }
    if (youtubeSongs.length) {
      return <YoutubeSearchView songs={youtubeSongs} handleChosenSong={onSongChosen}/>;
    }

    if (!searchTerm || searchTerm.length < 3) {
      return (
        <div>

        </div>);
    }
    return <NothingFoundView handleSearchOnYoutube={searchOnYoutube}/>;
  };

  return (
    <div style={{paddingTop: '10px'}}>
      {renderView()}
      {
        isSongModalActive
          ? <SongPlayerPopup closeModal={closeSongModal} song={songChosen!} orderVisible/>
          : null
      }
    </div>

  );
};

export {SongSearchView};
