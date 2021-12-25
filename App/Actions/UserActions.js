import {GET_USER, LOG_OUT, GET_USER_LIST} from './Keys';

export const getUserDetail = () => ({
  type: GET_USER,
});

export const userLogout = () => ({
  type: LOG_OUT,
});

export const getUserList = page => ({
  type: GET_USER_LIST,
  payload: page,
});
