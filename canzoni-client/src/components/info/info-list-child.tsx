import classes from './info-list-child.module.css';
import React from 'react';

interface IInfoListChildProps {
  messageLines: string[]
}

const InfoListChild: React.FC<IInfoListChildProps> = ({messageLines}) => {

  const renderItems = () => {
    return messageLines.map((m,i) => {
      return <li key={i} className={classes.infoItem}>{m}</li>
    })
  }

  return (
    <div className={classes.wrapper}>
      {renderItems()}
    </div>
  )
}

export {InfoListChild}
