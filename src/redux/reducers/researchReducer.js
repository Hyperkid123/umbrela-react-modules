import {
  UPDATE_RESEARCH_STATE
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
    default:
      return state;
  }
}

export default researchReducer;
