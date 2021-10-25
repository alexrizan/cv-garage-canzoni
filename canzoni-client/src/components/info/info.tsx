import classes from './info.module.css';
import React from 'react';
import {Icon} from 'react-materialize';
import {GlassButton} from '../UI';
import {InfoListChild} from './info-list-child';

export enum InfoIconColor {
  gray = 'rgba(0, 0, 0, 0.51)',
  blue = '#2e9ec1',
  red = '#ff8c8c'
}

interface IInfoProps {
  header: string;
  iconName: string;
  iconColor?: InfoIconColor;
  message?: string;
  buttonText?: string;
  onClick?: () => void;
  styles?:  React.CSSProperties;
}

const Info: React.FC<IInfoProps> = (
  {
    header,
    iconName,
    message,
    buttonText,
    onClick,
    children,
    iconColor = InfoIconColor.gray,
    styles
  }
) => {
  return (
    <div className={classes.container} style={styles?? undefined}>
      <div className={classes.header}>
        {header}
      </div>
      <div className={classes.iconWrapper}>
        <Icon className={classes.bigIcon} style={{color: iconColor}}>{iconName}</Icon>
      </div>
      <div className={classes.message}>
        {message}
        {children}
      </div>
      {
        buttonText && onClick
          ? (
            <div className={classes.buttonWrapper}>
              <GlassButton onClick={onClick} text={buttonText}/>
            </div>
          )
          : null
      }
    </div>
  );
};

export {Info, InfoListChild};
