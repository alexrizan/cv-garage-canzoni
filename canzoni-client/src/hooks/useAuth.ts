import {useEffect, useState} from 'react';
import {
  getUsersDataFromLocalStorage,
  IUserLocalData,
  removeUsersDataFromLocalStorage,
  userLocalStorageEventKey,
} from '../utils/authLocalStorage';

const isExpired = (exp: number) => {
  return (exp < Date.now() / 1000);
};

const getUserAuthData = () => {
  const data = getUsersDataFromLocalStorage();
  if (!data) return null;

  if (isExpired(data.exp)) {
    removeUsersDataFromLocalStorage();
    return null;
  }

  return data;
};

const useAuth = () => {
  const [userData, setUserData] = useState<IUserLocalData | null>(getUserAuthData());

  const handleUserStorageEvent = () => {
    setUserData(getUserAuthData());
  };

  useEffect(() => {
    window.addEventListener(userLocalStorageEventKey, handleUserStorageEvent);
    return () => window.removeEventListener(userLocalStorageEventKey, handleUserStorageEvent);
  }, []);

  return {
    isAuth: !!userData?.token,
    name: userData?.name,
    activeRoom: userData?.activeRoom,
    token: userData?.token
  };
};

export default useAuth;
