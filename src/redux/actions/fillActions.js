import {
  START_RESEARCH,
  UPDATE_RESEARCH_STATE,
  LOAD_LANG,
  CREATE_FILTER_STRUCTURE
} from './actionTypes'

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

export function loadLang(lang){
  return {
    type:LOAD_LANG,
    lang
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
  const url = window.base + researchId + '/get-research-structure';
  return (dispatch, getState) => {
    return fetch(url, {
      method: 'POST',
      body: researchId,
      redirect: 'manual',
      headers: {
          'Accept': 'application/json',
      },
    }).then((response) => {
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
