import React, {useState} from 'react';
import {getRandomId} from '../../../utils/helper';
import classes from './radio-item.module.css';

interface IRadioButtonProps {
  name: string;
  text: string;
  value: any;
  onClick: (text: string, value: string) => void;
  isChecked?: boolean;
}

const RadioItem: React.FC<IRadioButtonProps> = ({name, text, value, isChecked, onClick}) => {

  const [id,] = useState(getRandomId());

  const handleClick = () => {
    onClick(text, value);
  };

  return (
    <>
      <div className={classes.inputGroup} onClick={() => handleClick()}>
        <input id={id} name={name} type="radio" className={classes.input} value={value} defaultChecked={!!isChecked}/>
        <label htmlFor={id} className={classes.label}>{text.toUpperCase()}</label>
      </div>
    </>
  );
};

export default RadioItem;
