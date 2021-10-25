import classes from './radio-buttons.module.css';
import React from 'react';
import RadioItem from './radio-item';

interface IRadioButtonsProps {
  header: string;
  groupName: string;
  buttonProps: { text: string, value: any, isChecked?: boolean }[];
  headerStyles?: React.CSSProperties;
  onClick: (text: string, value: string) => void;
}

const RadioButtons: React.FC<IRadioButtonsProps> =
  ({
     groupName,
     buttonProps,
     header,
     headerStyles,
     onClick
   }) => {

    return (
      <div className={classes.wrapper} style={headerStyles}>
        <div className={classes.question}>{header}</div>
        {
          buttonProps.map(x => {
            return (
              <RadioItem
                name={groupName}
                text={x.text}
                value={x.value}
                key={x.text}
                onClick={(text, value) => onClick(text, value)}
                isChecked={x.isChecked}
              />
            );
          })
        }
      </div>
    );
  };

export {RadioButtons};
