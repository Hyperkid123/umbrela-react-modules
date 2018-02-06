import undoable, {} from 'redux-undo'

import {
  CHANGE_ROW_BLOCKS,
  REMOVE_PYRAMID_ROW,
  ADD_PYRAMID_ROW,
  DROP_IMAGES,
} from '../actions/actionTypes';

const initialState = {
  rows: [{
    blocks: 1
  }],
  images: []
}

const qMethodReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ROW_BLOCKS:
      return {...state, rows: updateRowBlocks(state.rows, action.payload.blocks, action.payload.rowIndex)}
    case ADD_PYRAMID_ROW:
      const newRow = {
        blocks: state.rows[state.rows.length - 1].blocks,
      }
      return {...state, rows: [...state.rows, newRow]};
    case REMOVE_PYRAMID_ROW:
      state.rows.pop();
      return {...state, rows: [...state.rows]}
    case DROP_IMAGES:
      return {...state, images: [...state.images, ...action.images]}
    default:
      return {...state};
  }
}

function updateRowBlocks(rows, blocks, rowIndex) {
  return rows.map((row, index) => {
    if(index !== rowIndex) {
      return row;
    }
    if(blocks < row.blocks) {
        return {blocks: blocks % 2 === 0 ? blocks - 1 : blocks}
    }
    return {blocks: blocks % 2 === 0 ? blocks + 1 : blocks}
  })
}

const undoableReducer = undoable(qMethodReducer);

export default undoableReducer;
