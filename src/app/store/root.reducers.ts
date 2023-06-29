import {combineReducers} from "redux";
import checksReducer from "app/store/checks/reducers";

export const rootReducer = () =>
  combineReducers({
      checksState: checksReducer
  });
