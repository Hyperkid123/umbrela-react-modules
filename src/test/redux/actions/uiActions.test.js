import * as actions from '../../../redux/actions/';
import * as types from '../../../redux/actions/actionTypes';

describe('ui actions', () => {
  it('should create dragEnd action', () => {
    expect(actions.dragEnd()).toEqual({type: types.DRAG_END})
  })

  it('should create hideQuestions action', () => {
    expect(actions.hideQuestions()).toEqual({type: types.HIDE_QUESTIONS})
  })

  it('should create hideQuestions action', () => {
    expect(actions.hideSheets()).toEqual({type: types.HIDE_SHEETS})
  })

  it('should create hideChartlegend action', () => {
    expect(actions.hideChartlegend()).toEqual({type: types.HIDE_CHART_LEGEND})
  })

  it('should create changeChartType action', () => {
    expect(actions.changeChartType('foo')).toEqual({
      type: types.CHANGE_CHART_TYPE,
      chartType: 'foo'
    })
  })
})
