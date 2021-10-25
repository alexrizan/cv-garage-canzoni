import React, {useState} from 'react';
import classes from './slim-input.module.css';
import {Icon} from 'react-materialize';

type InputType = 'text' | 'password';

type IFormInputProps = {
  name: string;
  label: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  inputType?: InputType;
  rest?: any;
}

const SlimInput: React.FC<IFormInputProps> =
  ({
     label,
     onValueChange,
     placeholder,
     inputType = 'text',
     name,
     rest
   }) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const showPasswordHandle = () => {
      setShowPassword(!showPassword);
    };

    const inputTypeExt = () => {
      if (inputType !== 'password') {
        return inputType;
      }

      return showPassword ? 'text' : inputType;
    };

    return (
      <div className={classes.inputField}>
        <div className={classes.label}>{label}</div>
        <div className={'center-all'}>
          <input name={name}
                 type={inputTypeExt()}
                 placeholder={placeholder}
                 onChange={e => onValueChange(e.target.value.trim())}
                 {...rest}
          />
          {
            inputType === 'password'
              ? <Icon
                style={{color: 'rgb(164 151 195)', cursor: 'pointer'}}
                onClick={showPasswordHandle}
              >
                visibility
              </Icon>
              : null
          }
        </div>
      </div>);
  };

export {SlimInput};
