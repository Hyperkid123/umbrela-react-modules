import reducer from '../../../redux/reducers/researchEditorReducer'
import * as types from '../../../redux/actions/actionTypes';

describe('Research editor reducer', () => {
  let initialState = {}
  beforeAll(() => {
    initialState = {
      sheets: null,
      isFetching: false,
      activeSheet: null,
      researchId: window.researchId,
      failed: false,
    }
  })

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set new sheets to reucer', () => {
    const sheets = [{
      title: 'sheet 1'
    }, {
      title: 'sheet 2'
    }];
    const expectedState = {
      ...initialState,
      sheets
    };
    expect(reducer(initialState, {
      type: types.GET_RESEARCH_SHEETS,
      sheets
    })).toEqual(expectedState);
  })

  it('should set isFetching to true', () => {
    expect(reducer(initialState, {
      type: types.REQUEST_SHEETS
    })).toEqual({
      ...initialState,
      isFetching: true,
    })
  })

  it('should receive and select new active sheet', () => {
    const sheets = [{
      title: 'sheet 1',
      sheetId: 1
    }, {
      title: 'sheet 2',
      sheetId: 2
    }];
    const expectedState = {
      ...initialState,
      activeSheet: {
        ...sheets[1],
        newSheet: true
      },
      sheets
    }
    expect(reducer({
      ...initialState,
      sheets,
    }, {
      type: types.RECEIVE_NEW_SHEET,
      sheetId: 2
    })).toEqual(expectedState)
  })

  it('should select new active sheet', () => {
    const sheets = [{
      title: 'sheet 1',
      sheetId: 1
    }, {
      title: 'sheet 2',
      sheetId: 2
    }];
    const expectedState = {
      ...initialState,
      activeSheet: sheets[1],
      sheets
    }
    expect(reducer({
      ...initialState,
      sheets,
    }, {
      type: types.SELECT_EDITOR_SHEET,
      sheetId: 2
    })).toEqual(expectedState)
  })

  it('should deselect active sheet', () => {
    expect(reducer({
      ...initialState,
      activeSheet: {foo: 'foo'}
    }, {
      type: types.DESELECT_ACTIVE_SHEET
    })).toEqual(initialState)
  })

  it('should chnage active sheet title', () => {
    const sheet = {
      title: 'foo'
    }
    const expectedState = {
      ...initialState,
      activeSheet: {
        ...sheet,
        title: 'title',
        newSheet: false
      }
    }
    expect(reducer({
      ...initialState,
      activeSheet: sheet
    }, {
      type: types.CHANGE_SHEET_TITLE,
      title: 'title'
    })).toEqual(expectedState)
  })

  it('should chnage sheet order', () => {
    const sheets = [{
      title: 'sheet 1',
    }, {
      title: 'sheet 2',
    }, {
      title: 'sheet 3',
    }]
    const finalSheets = [{
      title: 'sheet 3',
    }, {
      title: 'sheet 2',
    }, {
      title: 'sheet 1',
    }]
    const expectedState = {
      ...initialState,
      sheets: finalSheets
    }
    expect(reducer({
      ...initialState,
      sheets
    }, {
      type: types.DRAG_SHEET_CARD,
      dragIndex: 0,
      hoverIndex: 2
    })).toEqual(expectedState)
  })

  it('should set state to failed', () => {
    expect(reducer(initialState, {
      type: types.RESEARCH_FETCH_FAILED
    })).toEqual({
      ...initialState,
      failed: true
    })
  })
})
