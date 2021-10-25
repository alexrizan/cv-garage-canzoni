import classes from './suggestion-input.module.css';
import {Icon} from 'react-materialize';
import React from 'react';
import {AnimatedIcon} from '../animated-icon/animated-icon';
import SuggestionButton from './suggestion-button/suggestion-button';

interface ISuggestionInput {
  isLoading: boolean;
  suggestions?: string[];
  ref?: React.RefObject<HTMLInputElement>;
  onValueChange: (value: string) => void;
  handleSuggestionChoice: (text: string) => void;
  onIconClick?: () => void;
  iconName: string;
}

const SuggestionInput: React.FC<ISuggestionInput> =
  ({
     isLoading,
     suggestions,
     ref,
     onValueChange,
     handleSuggestionChoice,
     onIconClick,
     iconName
   }) => {

    const renderSpinner = () => {
      if (isLoading) {
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

    const renderSuggestionButtons = () => {
      return suggestions
      && suggestions?.length > 0
        ? suggestions.map((s, i) => {
          return (<SuggestionButton
            text={s}
            onClick={handleSuggestionChoice}
            key={i}
          />);
        })
        : null;
    };

    return (
      <div className="center-all">
        <div className={classes.inputField}>
          <div className={classes.label}>Поиск</div>
          <input type="text"
                 placeholder="Введите название исполнителя или песни"
                 onChange={e => onValueChange(e.target.value.trim())}
                 {...ref}
          />
          <div className={classes.suggestionsContainer}>
            {renderSuggestionButtons()}
          </div>
        </div>
        {renderSpinner()}
        {
          iconName
            ? <div className={`${classes.iconWrapper} center-all`}>
              <Icon
                className={classes.iconLight}
                onClick={onIconClick}
              >
                {iconName}
              </Icon>
            </div>
            : null
        }

      </div>
    );
  };

export {SuggestionInput};
