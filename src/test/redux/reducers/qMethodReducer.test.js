import reducer from '../../../redux/reducers/qMethodReducer'
import * as types from '../../../redux/actions/actionTypes';

describe('qMethod reducer', () => {
  const initialState = {
    past: [],
    present: {
      images: [],
      rows: [
        {
          blocks: 1
        }
      ]
    },
    future: [],
    history: {
      past: [],
      present: {
        images: [],
        rows: [
          {
            blocks: 1
          }
        ]
      },
      future: []
    }
  }
  const multipleBlocksState = {
    past: [],
    present: {
      rows: [
        {
          blocks: 5
        }
      ]
    },
    future: [],
    history: {
      past: [],
      present: {
        rows: [
          {
            blocks: 5
          }
        ]
      },
      future: []
    }
  }
  const multipleRowsState = {
    past: [],
    present: {
      rows: [
        {
          blocks: 5
        },
        {
          blocks: 5
        }
      ]
    },
    future: [],
    history: {
      past: [],
      present: {
        rows: [
          {
            blocks: 5
          },
          {
            blocks: 5
          }
        ]
      },
      future: []
    }
  }
  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle change row blocks', () => {
    const expectedRowsState = [{
        blocks: 3
    }];
    expect(reducer(initialState, {type: types.CHANGE_ROW_BLOCKS, payload: {
      blocks: 2,
      rowIndex: 0
    }}).present.rows).toEqual(expectedRowsState)
    expect(reducer(multipleBlocksState, {type: types.CHANGE_ROW_BLOCKS, payload: {
      blocks: 4,
      rowIndex: 0
    }}).present.rows).toEqual(expectedRowsState)
  })

  it('should handle add row', () => {
    const expectedRowsState = [{
        blocks: 5
      },{
        blocks: 5
      }]
    expect(reducer(multipleBlocksState, {type: types.ADD_PYRAMID_ROW}).present.rows).toEqual(expectedRowsState)
  })

  it('should handle remove row', () => {
    const expectedRowsState = [{
      blocks: 5
    }]
    expect(reducer(multipleRowsState, {type: types.REMOVE_PYRAMID_ROW}).present.rows).toEqual(expectedRowsState)
  })
})
