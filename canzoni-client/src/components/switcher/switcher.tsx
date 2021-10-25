import './short-slider.css';
import './fader.css';
import './switcher.css';
import './y-fliper.css';
import './expander-y.css';

import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

type Animation = 'fade' | 'shortSlide' | 'flipY' | 'expanderY';
type AlignContent =
  | 'centerAll'
  | 'centerVertical'
  | 'centerHorizontal';

interface ISwitcherProps {
  name: string;
  effect: Animation;
  timeout?: number;
  alignContent?: AlignContent;
}

const defaultTimers = {
  fade: 1000,
  shortSlide: 1500,
  flipY: 1000,
  expanderY: 1000
};

const Switcher: React.FC<ISwitcherProps> = ({name, effect, timeout, alignContent, children}) => {

  const timer = timeout ?? defaultTimers[effect];

  return (
    <div className="switcher">
      <TransitionGroup className={alignContent} style={{width: '100%'}}>
        <CSSTransition
          key={name}
          timeout={timer}
          classNames={effect}
        >
          {children}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export {Switcher};
