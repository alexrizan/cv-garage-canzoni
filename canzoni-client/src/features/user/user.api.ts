import {getApiAxios} from '../../utils/canzoni-api-axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {updateUserDataLocalStorage, updateUserTokenDataLocalStorage} from '../../utils/authLocalStorage';

export interface IUserShorData {
  name: string;
  rooms?: string[];
  token: string;
  exp: number;
}

interface IUserProfile {
  name: string,
  email: string,
  rooms: string[]
}

export const registerNewUser = createAsyncThunk('user/register',
  async (userData: { login: string, name: string, password: string, password2: string }) => {
    const {login, name, password, password2} = userData;
    return await registerUser(login, name, password, password2);
  });

const registerUser = async (login: string, name: string, password: string, password2: string) => {
  await getApiAxios().post('/user/register',
    {
      email: login,
      name,
      password,
      password2
    },
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
};

export const loginByCredentials = createAsyncThunk('user/login', async (userLoginData: { login: string, password: string }) => {
  const {login, password} = userLoginData;

  const res = await signIn(login, password);
  updateUserDataLocalStorage(res.name, res.token, res.exp);
  return res;
});

const signIn = async (login: string, password: string): Promise<IUserShorData> => {
  return (await getApiAxios().post(
    'user/login',
    {
      email: login,
      password
    },
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })).data as IUserShorData;
};

const _getUserProfile = async () => {
  return (await getApiAxios().get('user/profile')).data as IUserProfile;
}

export const getUserProfile = createAsyncThunk('user/profile', async () => {
  return await _getUserProfile();
});


const _createNewRoom = async (room: string, password: string) => {
  const response = await getApiAxios().post('room/create',
    {room, password},
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  return response.data;
};

export const createNewRoom = createAsyncThunk('user/newRoom',
  async (roomLogin: { room: string, password: string }) => {
     await _createNewRoom(roomLogin.room, roomLogin.password);
     return await _getUserProfile();
  });

const _joinRoom = async (room: string, password: string) => {
  const response = await getApiAxios().post('room/join',
    {room, password},
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  return response.data;
};

export const joinRoom = createAsyncThunk('user/join',
  async (roomLogin: { room: string, password: string }) => {
    await _joinRoom(roomLogin.room, roomLogin.password);
    return await _getUserProfile();
  });

const _activateRoom = async (room: string): Promise<{token: string, exp: number, room: string}> => {
  const response = await getApiAxios().post('user/activate-room',
    {room},
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  return response.data;
}

export const activateRoom = createAsyncThunk('user/activateRoom', async (targetRoom: string) => {
  const {token, exp, room} = await _activateRoom(targetRoom);

  updateUserTokenDataLocalStorage(token,exp, room);
})
