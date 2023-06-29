import {all, fork} from "redux-saga/effects";
import checksSaga from "app/store/checks/sagas";

export default function* rootSaga() {
  yield all([
    fork(checksSaga),
  ]);
}
