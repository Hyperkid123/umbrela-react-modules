import * as actions from '../../../redux/actions/';
import * as types from '../../../redux/actions/actionTypes';

describe('Common actions', () => {
  it('should create finishFetch action', () => {
    expect(actions.finishFetch()).toEqual({type: types.FINISH_FETCH});
  })

  it('should create fetchFailed action with custom type', () => {
    expect(actions.fetchFailed('foo')).toEqual({type: 'foo'});
  })
});
