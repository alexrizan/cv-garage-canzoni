import React from 'react';
import {useForm} from 'react-hook-form';
import {InfoError, GlassButton, SlimInput} from '../../../components';
import {loginByCredentials, selectLoginStatus} from '../user.slice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';

interface IUserLoginForm {
  login: string;
  password: string;
}

const errMsgs = {
  required: 'Это поле обязательно к заполнению',
  minLength: 'Минимальное кол-во символов: ',
  patternLatinAndKirillic: 'Можно использовать только кириллицу, латиницу и цифры'
};

const UserLogin: React.FC = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<IUserLoginForm>();

  const dispatch = useAppDispatch();

  const loginStatus = useAppSelector(selectLoginStatus);

  const onSubmit = (data: IUserLoginForm) => {
    dispatch(loginByCredentials({...data}));
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          loginStatus === 'failed'
            ? <InfoError errorText={'Неправильный логин или пароль'}/>
            : null
        }
        <SlimInput
          name={'login'}
          label={'Логин'}
          placeholder={'Введите логин'}
          inputType={'text'}
          rest={register('login', {
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
            }
          })}
          onValueChange={() => {
          }}
        />
        <div style={{color: 'red'}}>{errors.login?.message} </div>
        <SlimInput
          name={'password'}
          label={'Пароль'}
          placeholder={'Введите пароль'}
          inputType={'password'}
          rest={register('password', {
            required: {
              value: true,
              message: errMsgs.required
            },
            minLength: {
              value: 4,
              message: errMsgs.minLength + 4
            }
          })}
          onValueChange={() => {
          }}
        />
        <div style={{color: 'red'}}>{errors.password?.message} </div>
        <GlassButton
          styles={{textAlign: 'center'}}
          onClick={() => {
          }}
          text={'Войти'}/>
      </form>
    );
  };

  return (
    <>
      {renderForm()}
    </>
  );
};

export default UserLogin;
