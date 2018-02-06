import * as actions from '../../redux/actions/';
import * as types from '../../redux/actions/actionTypes';

describe('actions', () => {
  it('should create correct action to change row blocks', () => {
    const blocks = 10;
    const rowIndex = 15;
    const expectedAction = {
      type: types.CHANGE_ROW_BLOCKS,
      payload: {
        blocks,
        rowIndex
      }
    }
    expect(actions.changeRowBlocks(blocks, rowIndex)).toEqual(expectedAction)
  });

  it('should create correct action to add pyramid row', () => {
    const expectedAction = {
      type: types.ADD_PYRAMID_ROW
    }
    expect(actions.addPyramidRow()).toEqual(expectedAction)
  });

  it('should create correct action to remove pyramid row', () => {
    const expectedAction = {
      type: types.REMOVE_PYRAMID_ROW
    }
    expect(actions.removePyramidRow()).toEqual(expectedAction)
  })

  it('should create correct action to drop images', () => {
    const expectedAction = {
      type: types.DROP_IMAGES,
      images: [{}, {}],
    }
    expect(actions.dropImages([{}, {}])).toEqual(expectedAction);
  })
})
