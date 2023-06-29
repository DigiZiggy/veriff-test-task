export enum BOOLEAN {
  YES = "Yes",
  NO = "No"
}

export interface CheckError {
  message: string;
}

export interface Check {
  id: string;
  priority: number;
  description: string;
}

export interface CheckFieldSet extends Check {
  disabled?: boolean;
  value?: BOOLEAN;
}

export interface CheckResult {
  checkId: string;
  result: string;
}

export interface ChecksState {
  readonly loaded: boolean;
  readonly data?: CheckFieldSet[];
  readonly error?: CheckError;
  readonly showSuccess: boolean;
}

export enum ChecksActionType {
  GET_CHECKS_REQUEST = "GET_CHECKS_REQUEST",
  GET_CHECKS_SUCCESS = "GET_CHECKS_SUCCESS",
  GET_CHECKS_ERROR = "GET_CHECKS_ERROR",
  UPDATE_CHECK_VALUE_BY_ID = "UPDATE_CHECK_VALUE_BY_ID",
  POST_CHECK_RESULTS_REQUEST = "POST_CHECK_RESULTS_REQUEST",
  POST_CHECK_RESULTS_SUCCESS = "POST_CHECK_RESULTS_SUCCESS",
}

export type GetChecksRequest = {
  type: typeof ChecksActionType.GET_CHECKS_REQUEST;
};

export type GetChecksSuccess = {
  payload: Check[];
  type: typeof ChecksActionType.GET_CHECKS_SUCCESS;
};

export type GetChecksError = {
  payload: CheckError;
  type: typeof ChecksActionType.GET_CHECKS_ERROR;
};

export type UpdateCheckValueById = {
  payload: {id: string, value?: BOOLEAN};
  type: typeof ChecksActionType.UPDATE_CHECK_VALUE_BY_ID;
};

export type PostCheckResultsRequest = {
  payload: CheckResult[];
  type: typeof ChecksActionType.POST_CHECK_RESULTS_REQUEST;
};

export type PostCheckResultsSuccess = {
  payload: CheckResult[];
  type: typeof ChecksActionType.POST_CHECK_RESULTS_SUCCESS;
};

export type ChecksActionTypes = GetChecksRequest | GetChecksSuccess | GetChecksError |
    UpdateCheckValueById | PostCheckResultsRequest | PostCheckResultsSuccess;
