import {
  DRAG_END,
  DRAG_SHEET_CARD,
  DRAG_QUESTION_CARD,
  DRAG_OPTION_CARD,
  HIDE_SHEETS,
  HIDE_QUESTIONS,
  HIDE_CHART_LEGEND,
  CHANGE_CHART_TYPE,
} from '../actions/actionTypes';

import {
   PIE_CHART,
} from '../../common/chartTypes';


const initialState = {
  dragging: false,
  hideSheets: false,
  hideQuestions: false,
  hideChartlegend: false,
  chartType: PIE_CHART
};


export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case DRAG_SHEET_CARD:
    case DRAG_QUESTION_CARD:
    case DRAG_OPTION_CARD:
      return {...state, dragging: true};
    case DRAG_END:
      return {...state, dragging: false}
    case HIDE_SHEETS:
      return {...state, hideSheets: !state.hideSheets}
    case HIDE_QUESTIONS:
      return {...state, hideQuestions: !state.hideQuestions}
    case HIDE_CHART_LEGEND:
      return {...state, hideChartlegend: !state.hideChartlegend}
    case CHANGE_CHART_TYPE:
      return {...state, chartType: action.chartType}
    default:
      return state;

  }
}
