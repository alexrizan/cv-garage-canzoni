import React, {useEffect, useState} from 'react';
import classes from './letter-avatar.module.css';

const getAvaName = (name: string) => {
  if (!name || name.length <= 2) {
    return '?';
  }

  const letters = name.split(' ');
  return letters.length === 1
    ? name[0] + name[name.length - 1]
    : letters.map(l => l[0]).join('');
};

const colours = [
  '#1abc9c', '#2ecc71', '#3498db', '#9b59b6',
  '#34495e', '#16a085', '#27ae60', '#2980b9',
  '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22',
  '#e74c3c', '#0a3452', '#79aeb3', '#f39c12',
  '#d35400', '#c0392b', '#444747', '#7f8c8d'
];

const getAvaColour = (letters: string) => {
  const colorIndex = letters[0].charCodeAt(0) % colours.length;
  return colours[colorIndex];
};

interface ILetterAvatarProps {
  name: string;
}

const LetterAvatar: React.FC<ILetterAvatarProps> = ({name}) => {
  const [avaLetters, setAvaLetters] = useState('');
  const [avaColor, setAvaColor] = useState('white');

  useEffect(() => {
    const avaName = getAvaName(name);
    setAvaLetters(avaName.toUpperCase());
    setAvaColor(getAvaColour(avaName));
  }, [name]);

  return (
    <div className={classes.ava} style={{background: avaColor, color: '#FFF'}}>
      <div>{avaLetters}</div>
    </div>
  );
};

export {LetterAvatar};
