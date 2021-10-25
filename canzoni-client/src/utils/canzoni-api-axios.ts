import axios from 'axios';
import {getUsersDataFromLocalStorage} from './authLocalStorage';

export const getApiAxios = () => {
  const headers: any = {};
  const token = getUsersDataFromLocalStorage()?.token;

  if (token) {
    headers['x-access-token'] = token;
  }

  return axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers
  });
};
