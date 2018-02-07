import {HasOpenQuestion} from './questionTypes';
import lodash from 'lodash';
import {HasMultipleAnswers} from './questionTypes';
import red from 'material-ui/colors/red';
import pink from 'material-ui/colors/pink';
import purple from 'material-ui/colors/purple';
import deepPurple from 'material-ui/colors/deepPurple';
import indigo from 'material-ui/colors/indigo';
import blue from 'material-ui/colors/blue';
import lightBlue from 'material-ui/colors/lightBlue';
import cyan from 'material-ui/colors/cyan';
import teal from 'material-ui/colors/teal';
import green from 'material-ui/colors/green';
import lightGreen from 'material-ui/colors/lightGreen';
import lime from 'material-ui/colors/lime';
import yellow from 'material-ui/colors/yellow';
import amber from 'material-ui/colors/amber';
import orange from 'material-ui/colors/orange';
import deepOrange from 'material-ui/colors/deepOrange';
import brown from 'material-ui/colors/brown';
import blueGrey from 'material-ui/colors/blueGrey';
import grey from 'material-ui/colors/grey';

import {ORDER_QUESTION} from './chartTypes';


export const getNewOptionOrder = (options, questionType) => {
  if(HasOpenQuestion(questionType)) {
    return options.length - 1;
  } else {
    return options.length;
  }
}

export const findOpenOption = (options) => {
  return lodash.find(options, (option) => {
    return option.optionType === 'OpenOption';
  });
}

export const getOptionsInputType = (questionType) => {
  return HasMultipleAnswers(questionType) ? 'checkBox' : 'radioButton'
}

export const divideMatrixOptions = (options) => {
  const rows = [];
  const columns = [];
  options.forEach((option) => {
    if(option.optionType === 'ColumnOption') columns.push(option);
    if(option.optionType === 'RowOption') rows.push(option);
  });

  return {rows, columns};
}

const colorPool = [
  red[500],
  pink[500],
  purple[500],
  deepPurple[500],
  indigo[500],
  blue[500],
  lightBlue[500],
  cyan[500],
  teal[500],
  green[500],
  lightGreen[500],
  lime[500],
  yellow[500],
  amber[500],
  orange[500],
  deepOrange[500],
  brown[500],
  blueGrey[500],
  grey[500],
];

function getColor(){
  const color = colorPool.shift();
  colorPool.push(color);
  return color;
}

export function createChartData(questionOptions, questionAnswers, questionType, includeEmpty) {
  const options = [];
  questionOptions.forEach((option) => {
    options.push({
      value: 0,
      id: option.optionId,
      label: option.title,
      color: getColor(),
    });
  });
  let empty = 0;
  let other = 0;
  questionAnswers.forEach((answer) => {
    options.filter((obj) => {
      if (obj.id === answer.optionId) {
        obj.value++;
      }
    });
    if (!answer.optionId) {
      if(answer.shortAnswer){
        other ++;
      } else {
        empty ++;
      }
    }
  });
  if(includeEmpty && empty > 0) {
    options.push({
      value: empty,
      id: 'empty',
      label: 'nezodpovězeno',
      color: getColor(),
    });
  }
  return getBarFromPieData(options);
}

function getBarFromPieData(pieData){
  const labels = [];
  const values = [];
  const backgroundColor = [];
  const xlabels = [];

  pieData.forEach((option) => {
    let title = option.label;
    if (option.label.length > 15) {
      title = title.substr(0, 14) + '...';
    }
    labels.push(option.label);
    xlabels.push(title);
    values.push(option.value);
    backgroundColor.push(option.color);
  });
  const data = {};
  data.labels = labels;
  data.xLabels = xlabels;
  const dataset = {};
  dataset.backgroundColor = backgroundColor;
  dataset.label = '# počet odpovědí';
  dataset.borderWidth = 0.5;
  dataset.borderColor = '#e0e0e0';
  dataset.data = values;

  dataset.lineTension = 0.1;
  data.datasets = [];
  data.datasets.push(dataset);
  return {
    data,
    backroundPie: null,
    backroundLine: 'rgba(75,192,192,0.4)',
  };
}

export function getRespondents(answers, type) {
  if (type.toLowerCase().search('multi') !== -1) {
    const result = new Set();
    answers.forEach((answer) => {
      result.add(answer.sessionId);
    });
    return result.size;
  }
  return answers.length;
}

export function divideMatrixData(matrixOptions, matrixAnswers, questionType) {
  const rows = [];
  const columns = [];
  matrixOptions.forEach((option) => {
    option.optionType === 'RowOption' ? rows.push(option) : columns.push(option);
  });
  const dividedAnswers = {};
  rows.forEach((row) => {
    dividedAnswers[row.optionId] = [];
  });
  matrixAnswers.forEach((answer) => {
    if(!dividedAnswers[answer.rowId]){
      dividedAnswers[answer.rowId] = [];
    }
    dividedAnswers[answer.rowId].push({
      sessionId: answer.sessionId,
      optionId: answer.colId,
    });
  });
  const result = [];
  rows.forEach((subQuestion) => {
    const question = createChartData(columns, dividedAnswers[subQuestion.optionId], 'Matrix', true);
    question.questionTitle = subQuestion.title;
    question.respondents = getRespondents(matrixAnswers, questionType);
    question.answerCount = matrixAnswers.length;
    result.push(question);
  });
  return result;
}

export function createDivideData(questionOptions, questionAnswers, questionType) {
  const result = new Map();
  questionOptions.forEach((option) => {
    const obj = {};
    obj.count = 0;
    obj.values = [];
    obj.avg = 0;
    obj.median = 0;
    obj.modus = 0;
    obj.title = option.title;
    result.set(option.optionId, obj);
  });
  if(questionType === ORDER_QUESTION) {
    questionAnswers.forEach((answer) => {
      result.get(answer.optionId).count += answer.numericAnswer + 1;
      result.get(answer.optionId).values.push(answer.numericAnswer + 1);
    });

  }else {
    questionAnswers.forEach((answer) => {
      result.get(answer.optionId).count += answer.numericAnswer;
      result.get(answer.optionId).values.push(answer.numericAnswer);
    });

  }
  result.forEach((value) => {
     /*
     *serazeni pro median
     */

    value.values.sort((a, b) => {
      return a - b;
    });
     /*
     *vypocet modalni hodnoty
     */
    const counts = {};
    let max = 0;
    let res;
    for (const v in value.values) {
      counts[value.values[v]] = (counts[value.values[v]] || 0) + 1;
      if (counts[value.values[v]] > max) {
        max = counts[value.values[v]];
        res = value.values[v];
      }
    }
    value.modus = res;
     /*
     *Vypocet prumerne hodnoty
     */
    value.avg = value.count / value.values.length;
     /*
     * Vypocet median
     */
    const half = Math.floor(value.values.length / 2);
    if (value.values.length % 2) {
      value.median = value.values[half];
    } else {
      value.median = (value.values[half - 1] + value.values[half]) / 2.0;
    }
  });
  return result;
}
