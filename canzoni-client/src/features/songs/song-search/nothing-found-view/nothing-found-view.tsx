import classes from './nothing-found-view.module.css';
import {Button, Icon} from 'react-materialize';
import React from 'react';

interface NothingFoundViewProps {
  handleSearchOnYoutube: () => void;
}

const NothingFoundView: React.FC<NothingFoundViewProps> = ({handleSearchOnYoutube}) => {
  return (
    <div className={`${classes.noResultWrapper} center-all`}>
      <div>
        <p>Ничего не найдено. Может немножко youtube?</p>
      </div>
      <div>
        <Button
          className="glass-green"
          large
          node="button"
          style={{
            textAlign: 'left',
            lineHeight: '36px',
            width: '100%',
            marginBottom: '1em',
            borderRadius: '50px'
          }}
          onClick={handleSearchOnYoutube}
        >
          Найти на Youtube
          <Icon left>
            face
          </Icon>
        </Button>
      </div>
    </div>
  );
};

export default NothingFoundView;
