import React from 'react'
import DivideBody, {DivideBody as Snapshot} from '../../../../pages/fillModule/components/divideBody';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Divide body component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.answer = null;
    initialProps.translate = jest.fn();
    initialProps.startResearch = jest.fn();
    initialProps.question = {
      questionId: 0,
      scalePoints: 100,
      options: [],
    }
    initialProps.answerDivideQuestion = jest.fn();
  });

  it('should render correctly empty', () => {
    const tree = shallow(
      <Snapshot {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  const mockStore = configureStore();
  let initialState = {};
  let store;
  beforeEach(() => {
    initialState = {
      answers: {
        "0": {
          options: []
        }
      },
      locale: {
        languages: [{
          name: "English",
          code: 'en',
          active: true,
        }],
        translations: {}
      }
    }
  });

  it('should create component correctly', () => {
    store = mockStore(initialState);
    let wrapper = shallow(
      <DivideBody
        question={{questionId: 0, scalePoints: 100, options: []}}
        store={store}
      />);
    expect(wrapper).toBeDefined();
  });

  it('should reder with options', () => {
    const question = {
      options: [{
        optionId: 0,
        optionTitle: 'option 1'
      }, {
        optionId: 1,
        optionTitle: 'option 2'
      }]
    }
    const tree = shallow(
      <Snapshot {...initialProps} question={question}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should add scale points to option', () => {
    const options = [{}, {}]
    const answerDivideQuestion = jest.fn();
    const wrapper = shallow(
      <Snapshot {...initialProps} answerDivideQuestion={answerDivideQuestion}/>
    )
    wrapper.instance().handleDivideChange(0, {target: {value: 50}}, options.length, 0, 1);
    expect(answerDivideQuestion).toHaveBeenCalledWith(0, 50, 2, 0);
  })

  it('should sub answer, not enough points', () => {
    const options = [{
      optionId: 0
    }, {
      optionId: 1
    }]
    const answer = [50, 50]
    const question = {
      scalePoints: 100,
      options,
    }
    const answerDivideQuestion = jest.fn();
    const wrapper = shallow(
      <Snapshot
        {...initialProps}
        question={question}
        answerDivideQuestion={answerDivideQuestion}
        answer={answer}
      />
    )
    wrapper.instance().handleDivideChange(0, {target: {value: 3}}, options.length, 0, 100);
    expect(answerDivideQuestion).toHaveBeenCalledWith(0, 3, 2, 0);
  })

  it('should not update answer, not enough points', () => {
    const options = [{
      optionId: 0
    }, {
      optionId: 1
    }]
    const answer = [50, 50]
    const question = {
      scalePoints: 0,
      options,
    }
    const answerDivideQuestion = jest.fn();
    const wrapper = shallow(
      <Snapshot
        {...initialProps}
        question={question}
        answerDivideQuestion={answerDivideQuestion}
        answer={answer}
      />
    )
    wrapper.instance().handleDivideChange(0, {target: {value: 50}}, options.length, 0, 100);
    expect(answerDivideQuestion).toHaveBeenCalledTimes(0);
  })
});
