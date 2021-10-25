import React from 'react';
import {Info, InfoIconColor} from './info';

interface IInfoErrorProps {
  errorText?: string;
  header?: string;
}

const InfoError: React.FC<IInfoErrorProps> =
  ({errorText = 'Попробуйте снова', header = 'Что-то пошло не так'}) => {
  return (
    <Info
      header={header}
      message={errorText}
      iconColor={InfoIconColor.red}
      iconName={'snowshoeing'}/>
  )
};

export {InfoError};
