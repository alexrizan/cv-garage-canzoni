import React from 'react';
import {Song} from '../../songs.model';
import {GlassButton} from '../../../../components';
import {YoutubeCollectionSlider} from '../../../../components/youtube-collection-slider';

interface IYoutubeSearchViewProps {
  songs: Song[];
  handleChosenSong: (song: Song) => void;
  enableMoreResultsButton?: boolean;
  handleMoreClick?: () => void;
}

const YoutubeSearchView: React.FC<IYoutubeSearchViewProps> =
  ({
     songs,
     handleChosenSong,
     handleMoreClick = () => {
     },
     enableMoreResultsButton = false
   }) => {


    return (
      <>
        <YoutubeCollectionSlider songs={songs} onSongChosen={handleChosenSong}/>
        {
          enableMoreResultsButton ?
            (
              <div>
                <GlassButton onClick={() => handleMoreClick()}
                             text={'... Еще песни ...'}
                             small
                             styles={{textAlign: 'center'}}
                />
              </div>
            )
            : null
        }
      </>
    );
  };

export default YoutubeSearchView;
