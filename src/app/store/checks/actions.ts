import {
  BOOLEAN,
  Check,
  CheckResult,
  ChecksActionType,
  CheckError,
  GetChecksError,
  GetChecksRequest,
  GetChecksSuccess,
  PostCheckResultsRequest,
  PostCheckResultsSuccess,
  UpdateCheckValueById
} from "./types"

export function getChecksRequest(): GetChecksRequest {
  return {
    type: ChecksActionType.GET_CHECKS_REQUEST,
  }
}

export function getChecksSuccess(payload: Check[]): GetChecksSuccess {
  return {
    type: ChecksActionType.GET_CHECKS_SUCCESS,
    payload
  }
}

export function getChecksError(payload: CheckError): GetChecksError {
  return {
    type: ChecksActionType.GET_CHECKS_ERROR,
    payload
  }
}

export function updateCheckValueById(payload: {id: string, value?: BOOLEAN}): UpdateCheckValueById {
  return {
    type: ChecksActionType.UPDATE_CHECK_VALUE_BY_ID,
    payload
  }
}

export function postCheckResults(payload: CheckResult[]): PostCheckResultsRequest {
  return {
    type: ChecksActionType.POST_CHECK_RESULTS_REQUEST,
    payload
  }
}

export function postCheckResultsSuccess(payload: CheckResult[]): PostCheckResultsSuccess {
  return {
    type: ChecksActionType.POST_CHECK_RESULTS_SUCCESS,
    payload
  }
}
