import React, {useState} from 'react';
import {InfoError, GlassButton, Loader, SlimInput} from '../../../components';
import {useForm} from 'react-hook-form';
import {Icon} from 'react-materialize';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {joinOtherOneRoom, joinRoom, selectJoinRoomStatus} from '../user.slice';

interface IJoinRoom {
  name: string;
  password: string;
}

const errMsgs = {
  required: 'Это поля обязательно к заполнению',
  minLength: 'Минимальное кол-во символов: ',
  patternLatinAndKirillic: 'Можно использовать только кириллицу, латиницу и цифры'
};

interface IJoinRoomFormProps {
  onSuccess: () => void;
}

const JoinRoomForm: React.FC<IJoinRoomFormProps> = ({onSuccess}) => {

  const {register, handleSubmit, formState: {errors}} = useForm<IJoinRoom>();
  const [company, setCompany] = useState<string>('');
  const dispatch = useAppDispatch();
  const joinRoomStatus = useAppSelector(selectJoinRoomStatus);

  const onSubmit = (data: IJoinRoom) => {
    dispatch(joinRoom({room: data.name, password: data.password}));
    setCompany(data.name);
  };

  const handleAfterJoin = () => {
    dispatch(joinOtherOneRoom());
    onSuccess();
  };

  const renderSuccess = () => {
    return (
      <div className={'center-all'} style={{flexDirection: 'column'}}>
        <div className={'center-all'}
             style={{fontSize: '1.3em', color: '#7c7d7d', marginBottom: '20px'}}
        >
          Вы присоединились к компании: {company}
          <Icon
          >sentiment_very_satisfied
          </Icon>
        </div>
        <GlassButton onClick={handleAfterJoin} text={'Ок'}/>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <SlimInput
          name={'room'}
          inputType={'text'}
          label={'В какую компанию вас пригласили'}
          placeholder={'Введите название компании'}
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
              }
            })
          }/>
        <div style={{color: 'red'}}>{errors.name?.message} </div>
        <SlimInput
          name={'password'}
          inputType={'password'}
          label={'Пароль от компании'}
          onValueChange={() => {
          }}
          placeholder={'Введите пароль от компании'}
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
        <GlassButton
          styles={{textAlign: 'center'}}
          onClick={() => {
          }} text={'Присоединится'}/>
      </form>
    );
  };

  return (
    <div>
      {
        joinRoomStatus === 'idle'
          ? renderForm()
          : null
      }
      {
        joinRoomStatus === 'success'
          ? renderSuccess()
          : null
      }
      {
        joinRoomStatus === 'loading'
          ? <Loader/>
          : null
      }
      {
        joinRoomStatus === 'failed'
          ? (
            <div>
              <InfoError
                errorText={`Не удалось присоединится к ${company}.
                Проверьте введенные данные и попробуйте еще раз`}
              />
              <GlassButton
                onClick={() => {dispatch(joinOtherOneRoom())}}
                text={'Еще раз'}
                styles={{textAlign:'center', marginTop: '20px'}}
              />
            </div>)

          : null
      }
    </div>
  );
};

export default JoinRoomForm;
