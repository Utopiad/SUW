import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { createLogger }  from 'redux-logger'
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
  const middlewares = [
    thunkMiddleware,
    loggerMiddleware
  ];

  const store = createStore(rootReducer, initialState, compose(
      applyMiddleware(...middlewares)
    )
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;
}
