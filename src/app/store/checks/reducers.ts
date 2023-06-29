import {Reducer} from "redux";
import {
  BOOLEAN,
  Check,
  CheckFieldSet,
  ChecksActionType,
  ChecksActionTypes,
  ChecksState,
  UpdateCheckValueById
} from "app/store/checks/types";

const initialState: ChecksState = {
  data: undefined,
  error: undefined,
  loaded: false,
  showSuccess: false
};

const checksReducer: Reducer<ChecksState> = (state: ChecksState|undefined = initialState, action: ChecksActionTypes): ChecksState => {
  switch (action.type) {
    case ChecksActionType.GET_CHECKS_REQUEST:
      return {
        ...state,
        loaded: false
      };
    case ChecksActionType.GET_CHECKS_SUCCESS:
      const checkFieldSets: CheckFieldSet[] = action.payload
          .sort((a: Check, b: Check) => a.priority < b.priority ? -1 : 1 )
          .map((check: Check, index: number) => {
            return {
              ...check,
              disabled: !!index,
              focused: false
            }
          })
      return {
        ...state,
        data: checkFieldSets,
        error: undefined,
        loaded: true
      }
    case ChecksActionType.GET_CHECKS_ERROR:
      return {
        data: undefined,
        error: action.payload,
        loaded: true,
        showSuccess: false
      }
    case ChecksActionType.UPDATE_CHECK_VALUE_BY_ID:
      const newData = reduceCheckValueUpdate(state, action);
      return {
        ...state,
        data: newData
      }
    case ChecksActionType.POST_CHECK_RESULTS_REQUEST:
      return {
        ...state,
        loaded: false
      };
    case ChecksActionType.POST_CHECK_RESULTS_SUCCESS:
      return {
        ...state,
        data: undefined,
        error: undefined,
        loaded: true,
        showSuccess: true
      }
    default:
      return state;
  }
}

function reduceCheckValueUpdate(state: ChecksState, action: UpdateCheckValueById) {
  const currentIndex = state.data?.findIndex((check) =>
      check.id === action.payload.id);
  const nextIndex = currentIndex !== undefined ? currentIndex+1 : undefined;

  return state.data?.map((check: CheckFieldSet, index: number) => {
    const previousElement = !!index ? state.data?.[index - 1] : undefined;
    const isCurrent = check.id === action.payload.id;
    let disabled = !!index ? !previousElement?.value : false;
    let value = isCurrent ? action.payload.value : check.value;
    if (!!nextIndex && index === nextIndex) {
      disabled = !action.payload.value || action.payload.value === BOOLEAN.NO;
    } else if (currentIndex !== undefined && index > currentIndex) {
      disabled = true;
    }
    return {
      ...check,
      disabled,
      value
    }
  });
}

export default checksReducer;
