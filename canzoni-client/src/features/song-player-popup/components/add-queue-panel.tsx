import classes from './controls.module.css';
import React, {useState} from 'react';
import {GlassButton, SlimInput} from '../../../components';

interface IAddQueuePanelProps {
  onSendToQueue: (friendName: string) => void
}

const AddQueuePanel: React.FC<IAddQueuePanelProps> = ({onSendToQueue}) => {
  const [friendName, setFriendsName] = useState<string>('')

  const handleSendQueueRequest = () => {
    onSendToQueue(friendName);
  }

  return (
    <>
      <div className={classes.header}>Вы можете заказать эту песню:</div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <SlimInput
          name={'friend'}
          onValueChange={(name) => {setFriendsName(name)}}
          label={'Друг ( необязательно )'}
          placeholder={'Введите имя друга, с которым вы хотели бы спеть'}
        />
        <div style={{margin: '20px'}}>
          <GlassButton
            onClick={handleSendQueueRequest}
            text={'Добавить'}
          />
        </div>
      </div>
    </>

  )
}

export default AddQueuePanel;
