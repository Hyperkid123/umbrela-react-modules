import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();
const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  if(process.env.NODE_ENV !== 'production') {
    return createStore(
      rootReducer,
      composeEnhacer(
        applyMiddleware(
          thunkMiddleware,
          loggerMiddleware
        )
      )
    )
  }
  return createStore(
    rootReducer,
    composeEnhacer(
      applyMiddleware(
        thunkMiddleware,
      ),
    )
  )
}
