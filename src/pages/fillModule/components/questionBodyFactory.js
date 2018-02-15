import React from 'react';
import {
  IsMatrixQuestion,
  HasScalePoints,
  IsOrderQuestion,
  HasNotOptions,
} from '../../../common/questionTypes'
import MatrixBody from './matrixBody'
import DivideBody from './divideBody'
import OrderBody from './orderBody'
import NormalBody from './normalBody'
import OpenBody from './openBody';
export default class QuestionBodyFactory {
  static build(question) {
    if(IsMatrixQuestion(question.questionType)) {
      return <MatrixBody
        questionId={question.questionId}
        questionType={question.questionType}
        options={question.options}/>
    }
    if(HasScalePoints(question.questionType)) {
      return <DivideBody question={question}/>
    }
    if(IsOrderQuestion(question.questionType)) {
      return <OrderBody question={question}/>
    }
    if(HasNotOptions(question.questionType)) {
      return <OpenBody questionTitle={question.questionTile} questionId={question.questionId}/>
    }
    return question.options.map(option => (
      <NormalBody key={option.optionId} option={option} questionType={question.questionType} questionId={question.questionId}/>
    ));
  }
}
