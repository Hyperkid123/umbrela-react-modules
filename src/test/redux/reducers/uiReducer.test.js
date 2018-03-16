import reducer from '../../../redux/reducers/uiReducer'
import * as types from '../../../redux/actions/actionTypes';
import {
   PIE_CHART,
} from '../../../common/chartTypes';

describe('UI reducer', () => {
  let initialState = {}
  beforeEach(() => {
    initialState = {
      dragging: false,
      hideSheets: false,
      hideQuestions: false,
      hideChartlegend: false,
      chartType: PIE_CHART
    };
  })
  it ('should set dragging to true drag sheet card', () => {
    const expectedState = {
      ...initialState,
      dragging: true,
    }
    expect(reducer(undefined, {
      type: types.DRAG_SHEET_CARD
    })).toEqual(expectedState);
  })

  it ('should set dragging to true drag question card', () => {
    const expectedState = {
      ...initialState,
      dragging: true,
    }
    expect(reducer(undefined, {
      type: types.DRAG_QUESTION_CARD
    })).toEqual(expectedState);
  })

  it ('should set dragging to true drag option card', () => {
    const expectedState = {
      ...initialState,
      dragging: true,
    }
    expect(reducer(undefined, {
      type: types.DRAG_OPTION_CARD
    })).toEqual(expectedState);
  })

  it('should set dragging to false', () => {
    const expectedState = {
      ...initialState,
      dragging: false,
    }
    expect(reducer({
      ...initialState,
      dragging: true
    }, {
      type: types.DRAG_END
    })).toEqual(expectedState);
  })

  it('should switch hide sheets', () => {
    const expectedState = {
      ...initialState,
      hideSheets: true,
    }
    expect(reducer({
      ...initialState,
      hideSheets: false
    }, {
      type: types.HIDE_SHEETS
    })).toEqual(expectedState);
  })

  it('should switch hide questions', () => {
    const expectedState = {
      ...initialState,
      hideQuestions: true,
    }
    expect(reducer({
      ...initialState,
      hideQuestions: false
    }, {
      type: types.HIDE_QUESTIONS
    })).toEqual(expectedState);
  })

  it('should switch hide legend', () => {
    const expectedState = {
      ...initialState,
      hideChartlegend: true,
    }
    expect(reducer({
      ...initialState,
      hideChartlegend: false
    }, {
      type: types.HIDE_CHART_LEGEND
    })).toEqual(expectedState);
  })

  it('should change chartType', () => {
    const expectedState = {
      ...initialState,
      chartType: 'some chart type'
    }
    expect(reducer(initialState, {
      type: types.CHANGE_CHART_TYPE,
      chartType: 'some chart type'
    })).toEqual(expectedState);
  })

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })
});
