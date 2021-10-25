import React, {useState} from 'react';
import {GlassButton, Loader, SlimInput} from '../../../components';
import {useForm} from 'react-hook-form';
import {useAppDispatch} from '../../../app/hooks';
import {registerNewUser, selectRegisterStatus} from '../user.slice';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

interface IUserRegisterForm {
  login: string;
  name: string;
  password: string;
  password2: string;
}

const errMsgs = {
  required: 'Это поля обязательно к заполнению',
  minLength: 'Минимальное кол-во символов: ',
  patternLatinAndKirillic: 'Можно использовать только кириллицу, латиницу и цифры'
};

const UserRegister: React.FC = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<IUserRegisterForm>();

  const [pswdError, setPswdError] = useState<boolean>();

  const history = useHistory();

  const dispatch = useAppDispatch();
  const registerStatus = useSelector(selectRegisterStatus);

  const onSubmit = (data: IUserRegisterForm) => {
    if (data.password !== data.password2) {
      setPswdError(true);
      return;
    }
    dispatch(registerNewUser({...data}));
    setPswdError(false);
  };

  const goLogin = () => {
    history.push('/user/login');
  };

  const renderGoLogin = () => {
    return (
      <div style={{textAlign: 'center'}} className={'glass-green'}>
        <h5 style={{color: 'green'}}>Пользователь успешно зарегестрирован</h5>
        <GlassButton styles={{textAlign: 'center'}} onClick={goLogin} text={'Войти'}/>
      </div>);
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <SlimInput
          name={'login'}
          label={'Логин'}
          placeholder={'Придумайте логин'}
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
          name={'name'}
          label={'Имя'}
          placeholder={'Как приложение будет тебя звать? т.е Дима / Вова'}
          inputType={'text'}
          rest={register('name', {
            required: {
              value: true,
              message: errMsgs.required
            },
            minLength: {
              value: 4,
              message: errMsgs.minLength + 4
            },
            pattern: {
              value: /^[а-яА-ЯA-Za-z0-9 ]+$/i,
              message: errMsgs.patternLatinAndKirillic
            }
          })}
          onValueChange={() => {
          }}
        />
        <div style={{color: 'red'}}>{errors.name?.message} </div>
        <SlimInput
          name={'password'}
          label={'Пароль'}
          inputType={'password'}
          placeholder={'Введите пин или пароль. Минимум 4 символа'}
          rest={register('password', {
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
        <div style={{color: 'red'}}>{errors.password?.message} </div>
        <SlimInput
          name={'password2'}
          label={'Подтвердите пароль'}
          inputType={'password'}
          placeholder={'Подтвердите пароль'}
          rest={register('password2', {
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
        <div style={{color: 'red'}}>{errors.password2?.message} </div>
        {
          pswdError ? <div style={{color: 'red'}}>Пароли должны совпадать</div> : null
        }
        {
          registerStatus === 'failed' ? <div style={{color: 'red'}}>Возможно такой пользователь уже
            существует</div> : null
        }
        <GlassButton
          styles={{textAlign: 'center'}}
          onClick={() => {
          }}
          text={'Создать аккаунт'}
        />
        {
          registerStatus === 'loading'
            ? <Loader fullScreen/>
            : null
        }

      </form>
    );
  };

  return (
    <>
      {
        registerStatus === 'success'
          ? renderGoLogin()
          : renderForm()
      }
    </>
  );
};

export default UserRegister;
