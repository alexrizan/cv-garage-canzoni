import React, {useState} from 'react';
import {InfoError, GlassButton, Loader, SlimInput} from '../../../components';
import {useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {Icon} from 'react-materialize';
import {createNewOneRoom, createNewRoom, selectCreateRoomStatus} from '../user.slice';

interface INewRoom {
  name: string;
  password: string;
  password2: string;
}

const errMsgs = {
  required: 'Это поле обязательно к заполнению',
  minLength: 'Минимальное кол-во символов: ',
  maxLength: 'Максимальное кол-во символов ',
  patternLatinAndKirillic: 'Можно использовать только кириллицу, латиницу и цифры',
  patternPasswordsNotEqual: 'Пароль и пароль подтверждения должны совпадать'
};

interface INewRoomFormProps {
  onSuccess: () => void;
}

const NewRoomForm: React.FC<INewRoomFormProps> = ({onSuccess}) => {

  const {register, handleSubmit, formState: {errors}} = useForm<INewRoom>();
  const [isPasswordApprove, setPasswordApprove] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const createRoomStatus = useAppSelector(selectCreateRoomStatus);

  const onSubmit = (data: INewRoom) => {
    if (data.password !== data.password2) {
      setPasswordApprove(false);
      return;
    }
    dispatch(createNewRoom({room: data.name, password: data.password}));
  };

  const handleCreateNewOne = () => {
    dispatch(createNewOneRoom());
    onSuccess();
  };

  const renderSuccess = () => {
    return (
      <div className={'center-all'} style={{flexDirection: 'column'}}>
        <div className={'center-all'}
             style={{fontSize: '1.3em', color: '#7c7d7d', marginBottom: '20px'}}
        >
          Компания создана
          <Icon
          >sentiment_very_satisfied
          </Icon>
        </div>
        <GlassButton onClick={handleCreateNewOne} text={'Ок'}/>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <SlimInput
          name={'room'}
          inputType={'text'}
          label={'Название новой компании'}
          placeholder={'Придумайте название для своей компании'}
          onValueChange={() => {
          }}
          rest={
            register('name', {
              required: {
                value: true,
                message: errMsgs.required
              },
              minLength: {
                value: 4,
                message: errMsgs.minLength + 4
              },
              pattern: {
                value: /^[а-яА-ЯA-Za-z0-9]+$/i,
                message: errMsgs.patternLatinAndKirillic
              },
              maxLength :{
                value: 21,
                message: errMsgs.maxLength + 21
              }
            })
          }/>
        <div style={{color: 'red'}}>{errors.name?.message} </div>
        <SlimInput
          name={'password'}
          inputType={'password'}
          label={'Пароль от своей компании'}
          onValueChange={() => {
          }}
          placeholder={'Придумайте пароль для своей компании'}
          rest={
            register('password', {
              required: {
                value: true,
                message: errMsgs.required
              },
              minLength: {
                value: 4,
                message: errMsgs.minLength + 4
              }
            })
          }/>
        <div style={{color: 'red'}}>{errors.password?.message} </div>
        <SlimInput
          name={'password2'}
          inputType={'password'}
          label={'Подтвердите пароль'}
          onValueChange={() => {
          }}
          placeholder={'Введите пароль еще раз'}
          rest={
            register('password2', {
              required: {
                value: true,
                message: errMsgs.required
              },
              minLength: {
                value: 4,
                message: errMsgs.minLength + 4
              }
            })
          }/>
        <div style={{color: 'red'}}>{errors.password2?.message} </div>
        {
          isPasswordApprove
            ? null
            : <div style={{color: 'red'}}>{errMsgs.patternPasswordsNotEqual} </div>
        }
        <GlassButton
          styles={{textAlign: 'center'}}
          onClick={() => {
          }} text={'Создать'}/>
      </form>
    );
  };
  return (
    <div>
      {
        createRoomStatus === 'loading'
          ? <Loader/>
          : null
      }
      {
        createRoomStatus === 'idle'
          ? renderForm()
          : null
      }
      {
        createRoomStatus === 'success'
          ? renderSuccess()
          : null
      }
      {
        createRoomStatus === 'failed'
          ? (
            <div>
              <InfoError errorText={'Возможно такая компания уже существует'}/>
              <GlassButton
                onClick={() => {dispatch(createNewOneRoom())}}
                text={'Еще раз'}
                styles={{textAlign:'center', marginTop: '20px'}}
              />
            </div>
          )
          : null
      }
    </div>
  );
};

export default NewRoomForm;
