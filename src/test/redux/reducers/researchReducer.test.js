import reducer from '../../../redux/reducers/researchReducer'
import * as types from '../../../redux/actions/actionTypes';

describe('Research reducer', () => {
  let initialState = {}
  beforeEach(() => {
    initialState = {
      research: false,
      activeSheet: null,
      sheets: [],
      filters: [],
    }
  })

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should update research state', () => {
    const research = {foo: 'foo'};
    expect(reducer(initialState, {
      type: types.UPDATE_RESEARCH_STATE,
      research
    })).toEqual({...research, activeSheet: null, research: true})
  })

  it('should add startTime to state', () => {
    const startTime = new Date().getTime();
    expect(reducer(initialState, {
      type: types.START_RESEARCH
    })).toEqual({...initialState, startTime});
  })
})
