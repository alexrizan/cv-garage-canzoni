import {useAppSelector} from '../../../app/hooks';
import {selectFriends, selectFriendsUpdateStatus} from '../room.slice';
import {Icon} from 'react-materialize';
import {Loader} from '../../../components';

const Friends = () => {
  const friends = useAppSelector(selectFriends);
  const friendsUpdateStatus = useAppSelector(selectFriendsUpdateStatus);

  const renderFriends = () => {
    if (friends && friends.length) {
      const friendsJsx = friends.map((f,index) =>
        <div
          key={index}
          style={
          {
            fontSize: '1.4em',
            width: '100%',
            display: 'flex',
            fontWeight: 'bold',
            color: f.online ? 'rgb(106 174 133)' : 'rgba(0, 0, 0, 0.55)'
          }}>
          <div style={{width: '50%', textAlign: 'center'}}>{f.name}</div>
          <div style={{width: '50%', textAlign: 'center'}}>
            {
              f.online
                ? <Icon style={{fontWeight: 'bold'}}>sentiment_very_satisfied</Icon>
                : <Icon style={{fontWeight: 'bold'}}>sentiment_very_dissatisfied</Icon>
            }
          </div>
        </div>
      );

      return (
        <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
          {friendsJsx}
        </div>
      );
    }
  };

  return (
    <div style={{width: '100%', marginTop: '20px'}}>
      {
        friendsUpdateStatus === 'loading'
          ? <Loader/>
          : renderFriends()
      }
    </div>
  );
};

export default Friends;
