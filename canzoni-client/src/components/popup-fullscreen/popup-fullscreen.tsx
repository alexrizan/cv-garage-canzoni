import classes from './popup-fullscreen.module.css';
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {FullPageWrapperHoc} from '../full-page-wrapper-hoc/full-page-wrapper-hoc';

interface IPopupOptions {
  rootId?: string;
  zIndex?: number;
  yAlignItemsCenter?: boolean;
}

interface IPopupFullScreenProps {
  alwaysOnTop?: boolean;
  options?: IPopupOptions;
}

const createPageWrapper = (
  zIndex: number = 1000,
  yAlignCenter: boolean = false
) => {
  const $el = document.createElement('div');
  $el.classList.add(classes.pageWrapper);
  $el.style.zIndex = zIndex.toString();

  if (yAlignCenter) {
    $el.style.alignItems = 'center';
  }

  return $el;
};

const PopupFullScreen: React.FC<IPopupFullScreenProps> = (
  {
    alwaysOnTop,
    options = null,
    children
  }) => {
  const [$el, setElement] = useState<HTMLElement>();

  useEffect(() => {
    const {rootId, zIndex, yAlignItemsCenter} = {...options};

    const modalRoot = document.getElementById(rootId ?? 'modal-root');

    const element = createPageWrapper(zIndex, yAlignItemsCenter);

    modalRoot!.appendChild(element);

    setElement(element);

    //необходимо, чтобы вернуть позицию скрола У
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';

    return () => {
      modalRoot!.removeChild(element);
      document.body.style.position = '';
      if (!alwaysOnTop) {
        window.scrollTo(0, scrollY);
      }
    };
  }, [alwaysOnTop, options]);

  return $el ? ReactDOM.createPortal((
    <FullPageWrapperHoc>
      {children}
    </FullPageWrapperHoc>
  ), $el) : null;
};

export {PopupFullScreen};
