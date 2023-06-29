import {Store, createStore, applyMiddleware, Middleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from "app/store/root.reducers";
import {IRootState} from "app/store/root.types";
import rootSaga from "app/store/root.sagas";

export const logger: Middleware = () => (next) => (action) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(action);
  }
  return next(action);
};

export function configureStore(): Store<IRootState> {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [logger, sagaMiddleware]

  const store = createStore(
    rootReducer(),
    applyMiddleware(...middlewares)
  )

  sagaMiddleware.run(rootSaga);
  return store;
}
