import {takeLatest} from 'redux-saga/effects';
import {GET_USER, GET_USER_LIST} from '../Actions/Keys';
import {getUserSaga, getUserListSaga} from './UserSaga';

export default function* rootSaga() {
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(GET_USER_LIST, getUserListSaga);
}
