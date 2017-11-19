import {combineReducers} from 'redux';
import researchReducer from './researchReducer';

const rootReducer = combineReducers({
  research: researchReducer,
});

export default rootReducer;
