import React from 'react'
import QuestionBodyFactory from '../../../../pages/fillModule/components/questionBodyFactory';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Question body factory', () => {
  it('should return  NormalBody question', () => {
    const body = QuestionBodyFactory.build({
      questionType: 'CloseQuestion',
      questionId: 1,
      options: [{
        optionId: 1,
      }, {
        optionId: 2,
      }]
    });
    expect(body.length).toEqual(2);
    expect(body[0].type.displayName).toEqual('Connect(NormalBody)');
  })

  it('should return  OpenBody question', () => {
    const body = QuestionBodyFactory.build({
      questionType: 'OpenQuestion',
      questionId: 1,
      questionTitle: 'Open question'
    });
    expect(body.type.displayName).toEqual('Connect(OpenBody)');
  })

  it('should return  OrderBody question', () => {
    const body = QuestionBodyFactory.build({
      questionType: 'OrderQuestion',
      questionId: 1,
    });
    expect(body.type.displayName).toEqual('Connect(OrderBody)');
  })

  it('should return  DivideBody question', () => {
    const body = QuestionBodyFactory.build({
      questionType: 'DivideQuestion',
      questionId: 1,
    });
    expect(body.type.displayName).toEqual('Connect(DivideBody)');
  })

  it('should return  MatrixBody question', () => {
    const body = QuestionBodyFactory.build({
      questionType: 'MatrixSingleQuestion',
      questionId: 1,
      questionTitle: 'Matrix question',
      options: []
    });
    expect(body.type.displayName).toEqual('Connect(MatrixBody)');
  })
});
