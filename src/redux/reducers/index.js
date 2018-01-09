import {combineReducers} from 'redux';
import researchReducer from './researchReducer';
import researchEditorReducer from './researchEditorReducer';
import uiReducer from './uiReducer';
import questionsReducer from './questionsReducer';
import optionsReducer from './optionsReducer';

const rootReducer = combineReducers({
  research: researchReducer,
  editor: researchEditorReducer,
  ui: uiReducer,
  questions: questionsReducer,
  options: optionsReducer,
});

export default rootReducer;
