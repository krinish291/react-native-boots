import {
  GET_USER,
  SET_USER_LIST,
  GET_USER_LIST,
  SET_USER,
  ERROR,
} from '../Actions/Keys';
import DefaultState from './Default';

const INIT_STATE = DefaultState.user;

const UserReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.payload};
    case GET_USER_LIST:
      return {
        ...state,
        usersList: {
          data: state?.usersList?.data,
          isLoading: true,
          error: null,
        },
      };
    case SET_USER_LIST:
      return {
        ...state,
        usersList: {
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };
    case ERROR:
      return {
        ...state,
        usersList: {
          data: state?.usersList?.data,
          isLoading: false,
          error: true,
        },
      };
    default:
      return state;
  }
};

export default UserReducer;
