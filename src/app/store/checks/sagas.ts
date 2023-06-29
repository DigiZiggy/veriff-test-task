import { put, takeLatest, all, call } from 'redux-saga/effects';
import {ChecksActionType, PostCheckResultsSuccess} from "app/store/checks/types";
import {getChecksError, getChecksSuccess, postCheckResultsSuccess} from "app/store/checks/actions";
import {callApi} from "app/api/utils";
import {
  CHECK_RESULTS_PATH,
  CHECKS_PATH,
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  REST_FRONT_END_TEST_URL
} from "app/api/types";

function* fetchChecks() {
  const url = REST_FRONT_END_TEST_URL + CHECKS_PATH;
  const {error, response} = yield call(callApi, HTTP_METHOD_GET, url);
  if (!!error) {
    yield put(getChecksError(error));
  } else {
    yield put(getChecksSuccess(response));
  }
}

function* saveChecks(action: PostCheckResultsSuccess) {
  const url = REST_FRONT_END_TEST_URL + CHECK_RESULTS_PATH;
  const {error, response} = yield call(callApi, HTTP_METHOD_POST, url, action.payload);
  if (!!error) {
    yield put(getChecksError(error));
  } else {
    yield put(postCheckResultsSuccess(response));
  }
}

function* watchFetchRequest() {
  yield takeLatest(ChecksActionType.GET_CHECKS_REQUEST, fetchChecks)
}

function* watchSaveRequest() {
  yield takeLatest(ChecksActionType.POST_CHECK_RESULTS_REQUEST, saveChecks)
}

export default function* checksSaga(){
  yield all([
    watchFetchRequest(),
    watchSaveRequest()
  ]);
}
