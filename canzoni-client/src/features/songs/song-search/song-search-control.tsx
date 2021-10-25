import classes from './song-search-control.module.css';
import React, {useRef, useState} from 'react';
import {Icon} from 'react-materialize';
import {useDebounceEffect} from '../../../hooks/useDebounceEffect';
import {useAppDispatch} from '../../../app/hooks';
import {
  clearGoogleSuggestionSearch,
  clearSearchTerm,
  clearStorageSearchResult,
  clearYoutubeSearch,
  loadSongsByTerm,
  selectAreStorageSongsFound,
  selectGoogleSuggestionChosen,
  selectGoogleSuggestions,
  selectGoogleSuggestionsStatus,
  selectStorageLoadingStatus,
  updateActualGoogleSuggestion,
  updateGoogleSuggestions,
  updateUserSearchTerm
} from '../songs.slice';
import SuggestionButton from './suggestion-button/suggestion-button';
import {useSelector} from 'react-redux';
import {AnimatedIcon} from '../../../components';

interface ISongSearchControlProps {
  storageSearchDebounceTime?: number;
  googleSearchDebounceTime?: number;
  onValueChanged(): void;
}

/// TODO перейти на suggestion-input из компонентов
const SongSearchControl: React.FC<ISongSearchControlProps> = (
  {
    onValueChanged,
    googleSearchDebounceTime = 500,
    storageSearchDebounceTime = 2500
  }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const chosenSuggestion = useSelector(selectGoogleSuggestionChosen);
  const suggestions = useSelector(selectGoogleSuggestions);
  const suggestionLoadStatus = useSelector(selectGoogleSuggestionsStatus);
  const isStorageSongsFound = useSelector(selectAreStorageSongsFound);
  const storageSearchStatus = useSelector(selectStorageLoadingStatus);
  const [, setQuery] = useState<string>('');

  const minQueryLength = 4;

  useDebounceEffect(() => {
      if (isSearchStillRelevant()
        && inputRef.current!.value.length > minQueryLength
        && storageSearchStatus !== 'loading') {
        dispatch(loadSongsByTerm(inputRef.current!.value));
      }
    },
    inputRef.current?.value,
    storageSearchDebounceTime
  );

  useDebounceEffect(() => {
      if (isSearchStillRelevant()
        && inputRef.current!.value.length > minQueryLength) {
        dispatch(updateGoogleSuggestions(inputRef.current!.value));
      }
    },
    inputRef.current?.value,
    googleSearchDebounceTime
  );

  const isSearchStillRelevant = () => {
    return !!inputRef.current?.value
      && inputRef.current.value.trim() !== chosenSuggestion;
  };

  const onValueChange = (text: string) => {
    const searchValue = text.trim();

    if (!searchValue || !searchValue.length) {
      onCancelSearch();
      return;
    }
    setQuery(searchValue);
    dispatch(clearGoogleSuggestionSearch());
    dispatch(clearYoutubeSearch());
    dispatch(updateUserSearchTerm(text));
    onValueChanged();
  };

  const onCancelSearch = () => {
    inputRef.current!.value = '';
    dispatch(clearGoogleSuggestionSearch());
    dispatch(clearYoutubeSearch());
    dispatch(clearStorageSearchResult());
    dispatch(clearSearchTerm());
  };

  const handleSuggestionChoice = (text: string) => {
    inputRef.current!.value = text;
    dispatch(clearGoogleSuggestionSearch());
    dispatch(updateActualGoogleSuggestion(text));
  };

  const renderSuggestionButtons = () => {
    return storageSearchStatus === 'loading'
    || isStorageSongsFound
      ? <></>
      : suggestions.map((s, i) => {
        return <SuggestionButton
          text={s}
          onClick={handleSuggestionChoice}
          key={i}
        />;
      });
  };

  const renderSpinner = () => {
    if (suggestionLoadStatus !== 'idle') {
      return (
        <div className={`${classes.iconWrapper} center-all`}>
          <AnimatedIcon
            iconName={'autorenew'}
            animation={'rotateCenter'}
            className={classes.iconLight}
            style={{fontSize: '3em'}}
          />
        </div>
      );
    }
  };

  return (
    <div className="center-all">
      <div className={classes.inputField}>
        <div className={classes.label}>Поиск</div>
        <input type="text"
               placeholder="Введите название исполнителя или песни"
               onChange={e => onValueChange(e.target.value.trim())}
               ref={inputRef}
        />
        <div className={classes.suggestionsContainer}>
          {renderSuggestionButtons()}
        </div>
      </div>
      {renderSpinner()}
      <div className={`${classes.iconWrapper} center-all`}>
        <Icon
          className={classes.iconLight}
          onClick={() => onCancelSearch()}
        >
          delete_forever
        </Icon>
      </div>
    </div>
  );
};

export {SongSearchControl};
