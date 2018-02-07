import {
  DRAG_END,
  HIDE_QUESTIONS,
  HIDE_SHEETS,
  HIDE_CHART_LEGEND,
  CHANGE_CHART_TYPE,
} from './actionTypes';


export function dragEnd(){
  return{
    type:DRAG_END
  }
}

export function hideQuestions(){
  return {
    type:HIDE_QUESTIONS,
  }
}

export function hideSheets(){
  return {
    type:HIDE_SHEETS
  }
}

export function hideChartlegend(){
  return {
    type:HIDE_CHART_LEGEND
  }
}

export function changeChartType(chartType){
  return{
    type: CHANGE_CHART_TYPE,
    chartType,
  }
}
