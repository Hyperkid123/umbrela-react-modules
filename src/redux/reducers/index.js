import {combineReducers} from 'redux';
import researchReducer from './researchReducer';
import researchEditorReducer from './researchEditorReducer';
import uiReducer from './uiReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
  research: researchReducer,
  editor: researchEditorReducer,
  ui: uiReducer,
  questions: questionsReducer,
});

export default rootReducer;
