import * as actions from '../../../redux/actions/';
import * as types from '../../../redux/actions/actionTypes';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('Synchronous fill actions', () => {
  it('should create startResearch action', () => {
    expect(actions.startResearch()).toEqual({type: types.START_RESEARCH});
  })

  it('should create updateResearchState action', () => {
    const research = {foo: 'foo'}
    const expectedAction = {
      type: types.UPDATE_RESEARCH_STATE,
      research,
    }
    expect(actions.updateResearchState(research)).toEqual(expectedAction);
  })
});

describe('Async fill actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it('should get research structure', () => {
    let store = mockStore({});
    fetchMock.getOnce(`${window.base}get-research-structure/${window.researchId}`, {
      response: {test: true}
    })
    return store.dispatch(actions.getResearchStructure())
    .then(() => {
      expect(store.getActions()).toBeDefined();
    });
  })

  it('should fail fetching', () => {
    let store = mockStore({});
    fetchMock.getOnce(`${window.base}get-research-structure/${window.researchId}`, {
      status: 500,
    })
    return store.dispatch(actions.getResearchStructure())
    .then(() => {
      expect(store.getActions()).toEqual([]);
    });

  })

})
