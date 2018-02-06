import {
  CHANGE_ROW_BLOCKS,
  ADD_PYRAMID_ROW,
  REMOVE_PYRAMID_ROW,
  DROP_IMAGES,
} from './actionTypes';

export function changeRowBlocks(blocks, rowIndex){
  return {
    type: CHANGE_ROW_BLOCKS,
    payload: {
      blocks,
      rowIndex
    }
  }
}

export function addPyramidRow(){
  return{
    type: ADD_PYRAMID_ROW
  }
}

export function removePyramidRow(){
  return {
    type:REMOVE_PYRAMID_ROW,
  }
}

export function dropImages(images){
  return {
    type: DROP_IMAGES,
    images
  }
}
