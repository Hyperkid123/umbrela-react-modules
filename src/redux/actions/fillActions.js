import {
  START_RESEARCH,
  UPDATE_RESEARCH_STATE,
  CREATE_FILTER_STRUCTURE
} from './actionTypes'

import {
  researchStructureRequest
} from './endpoints';

export function startResearch(){
  return {
    type:START_RESEARCH
  }
}

export function updateResearchState(research){
  return {
    type:UPDATE_RESEARCH_STATE,
    research
  }
}

export function createFilterStructure(research){
  return {
    type:CREATE_FILTER_STRUCTURE,
    research
  }
}

export function getResearchStructure() {
  const researchId = window.researchId;
  return (dispatch, getState) => {
    return researchStructureRequest(researchId)
    .then((response) => {
        if(!response.ok){
            throw new Error(response);
        }
        return response.json();
    }).then((data) => {
      dispatch(updateResearchState(data));
        return getState();
    }).then((state) => {
      dispatch(createFilterStructure(state.research));
    }).catch((err) => {
      console.log('Error ocured during saving: ', err);
    });
  }

}
