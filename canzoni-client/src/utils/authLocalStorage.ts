const userLocalStorageKey = 'user';
export const userLocalStorageEventKey = 'userLocalStorage';

export interface IUserLocalData {
  name: string;
  token: string;
  exp: number;
  activeRoom?: string;
}

const dispatchUserLocalStorageEvent = () => {
  window.dispatchEvent(new Event(userLocalStorageEventKey));
};

export const getUsersDataFromLocalStorage = (): IUserLocalData | null => {
  const data = localStorage.getItem(userLocalStorageKey) ?? '';
  return data
    ? JSON.parse(data) as IUserLocalData :
    null;
};

export const updateUserDataLocalStorage = (name: string, token: string, exp: number, activeRoom: string | null = null) => {
  localStorage.setItem(userLocalStorageKey, JSON.stringify({name, token, exp, activeRoom}));
  dispatchUserLocalStorageEvent();
};

export const updateUserTokenDataLocalStorage = (token: string, exp: number, newActiveRoom: string | null = null) => {
  const data = getUsersDataFromLocalStorage();
  updateUserDataLocalStorage(data?.name!, token, exp, newActiveRoom);
};

/// TODO запилить процесс с refreshtoken
export const removeUsersDataFromLocalStorage = () => {
  localStorage.removeItem(userLocalStorageKey);
  dispatchUserLocalStorageEvent();
};
