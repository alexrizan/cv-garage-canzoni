import React from 'react';
import {Button, Icon} from 'react-materialize';

type AlignIconType = 'left' | 'right' | 'center'

interface IGlassButtonProps {
  onClick: () => void;
  text: string;
  iconName?: string;
  styles?: React.CSSProperties;
  small?: boolean;
  centerText?: boolean;
  alignIcon?: AlignIconType;
}

const GlassButton: React.FC<IGlassButtonProps> = (
  {
    onClick,
    text,
    iconName,
    styles,
    small = false,
    centerText = false,
    alignIcon = 'left'
  }) => {

  return (
    <Button
      large={!small}
      small={small}
      node="button"
      style={{
        textAlign: centerText ? 'center' : 'left',
        lineHeight: '36px',
        width: '100%',
        ...styles
      }}
      onClick={onClick}
      className={'glass-green'}

    >
      {text}
      {
        iconName
          ? (
            <Icon
              left={alignIcon === 'left'}
              right={alignIcon === 'right'}
              center={alignIcon === 'center'}
            >
              {iconName}
            </Icon>
          )
          : null
      }
    </Button>
  );
};

export {GlassButton};
