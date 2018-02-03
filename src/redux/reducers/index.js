import {combineReducers} from 'redux';
import researchReducer from './researchReducer';
import researchEditorReducer from './researchEditorReducer';
import uiReducer from './uiReducer';
import questionsReducer from './questionsReducer';
import optionsReducer from './optionsReducer';
import qMethodReducer from './qMethodReducer';

const rootReducer = combineReducers({
  research: researchReducer,
  editor: researchEditorReducer,
  ui: uiReducer,
  questions: questionsReducer,
  options: optionsReducer,
  qMethodBuilder: qMethodReducer,
});

export default rootReducer;
