import classes from './round-button.module.css';
import {Icon} from 'react-materialize';
import React, {useState} from 'react';

interface IRoundButtonProps {
  iconName: string;
  onClick: () => void;
  showPressed?: boolean;
  blocked?: boolean;
}

const RoundButton: React.FC<IRoundButtonProps> = (
  {
    iconName,
    showPressed = false,
    blocked = false,
    onClick
  }) => {
  const [isClicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    setClicked(!isClicked);
    onClick();
  };

  const additionalClass = () => {
    if (blocked) {
      return classes.blocked;
    }
    return showPressed && isClicked ? classes.pressed : '';
  };

  return (
    <button
      onClick={handleClick}
      className={`
        glass-green
        text-color
        round-button-sm 
        ${classes.roundButtonSm} ${additionalClass()}`}
    >
      <Icon>{iconName}</Icon>
    </button>
  );
};

export {RoundButton};
