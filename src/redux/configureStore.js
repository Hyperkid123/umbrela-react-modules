import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';
import { initialize, setActiveLanguage, addTranslationForLanguage } from 'react-localize-redux';
import en from '../lang/en.js';
import cs from '../lang/cs.js';

const loggerMiddleware = createLogger();
const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  const languages = [{
    name: 'Czech',
    code: 'cs',
  },{
    name: 'English',
    code: 'en',
  }];
  let store;
  if(process.env.NODE_ENV !== 'production') {
    store = createStore(
      rootReducer,
      composeEnhacer(
        applyMiddleware(
          thunkMiddleware,
          loggerMiddleware
        )
      )
    )
  } else {
    store = createStore(
      rootReducer,
      composeEnhacer(
        applyMiddleware(
          thunkMiddleware,
        ),
      )
    )
  }
  store.dispatch(initialize(languages))
  store.dispatch(addTranslationForLanguage(en, 'en'));
  store.dispatch(addTranslationForLanguage(cs, 'cs'));
  store.dispatch(setActiveLanguage(window.lang));
  return store;
}
