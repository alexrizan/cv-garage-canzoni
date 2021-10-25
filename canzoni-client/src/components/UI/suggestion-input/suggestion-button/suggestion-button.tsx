import classes from './suggestion-button.module.css';
import React from 'react';

interface ISuggestionButtonProps {
  text: string,
  onClick: (text: string) => void
}

const SuggestionButton: React.FC<ISuggestionButtonProps> = ({text, onClick}) => {
  return (
    <button
      className={classes.btn}
      onClick={() => onClick(text)}
    >
      {text}
    </button>
  );
};

export default SuggestionButton;
