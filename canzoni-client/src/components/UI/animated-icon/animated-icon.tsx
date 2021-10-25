import classes from './animated-icon.module.css';
import React from 'react';
import {Icon} from 'react-materialize';

interface IAnimatedIconProps {
  iconName: string;
  animation: AnimationType;
  style?: React.CSSProperties;
  className?: string;
}

type AnimationType = 'flipHorizontalBottom' | 'rotateCenter'

export const AnimatedIcon: React.FC<IAnimatedIconProps> = ({iconName, style, className, animation}) => {
  return (
    <Icon
      className={`${className} ${classes[animation]}`}
      style={style}
    >
      {iconName}
    </Icon>
  );
};
