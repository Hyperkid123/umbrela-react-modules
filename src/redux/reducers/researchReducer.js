import {
  UPDATE_RESEARCH_STATE,
  START_RESEARCH
} from '../actions/actionTypes';

let research = {
    research: false,
    activeSheet: null,
    sheets: [],
    filters: [],
};

function researchReducer(state = research, action) {
  switch (action.type) {
    case UPDATE_RESEARCH_STATE:
      return {
        ...action.research,
        activeSheet: null,
        research: true,
      }
    case START_RESEARCH:
      return {...state, startTime: performance.now()};  
    default:
      return state;
  }
}

export default researchReducer;
