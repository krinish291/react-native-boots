import {put, select} from 'redux-saga/effects';
import {ERROR, SET_USER_LIST} from '../Actions/Keys';
import {getUserList} from '../Services/UserService';

const getData = state => state.user.usersList;

export function* getUserSaga(action) {
  try {
    // Here call Service from UserService
  } catch (error) {}
}

export function* getUserListSaga(action) {
  try {
    const page = action.payload || 1;
    let userListing;
    const response = yield getUserList(page);
    userListing = response.results;
    if (page === 2) {
      const userList = yield select(getData);
      userListing = [...userListing, ...userList.data];
    }
    console.log('userListing', userListing.length);
    yield put({type: SET_USER_LIST, payload: userListing});
  } catch (error) {
    console.log(error);
    yield put({
      type: ERROR,
      payload: 'Something went wrong',
    });
  }
}
