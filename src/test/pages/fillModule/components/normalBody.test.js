import React from 'react'
import NormalBody, {NormalBody as Snapshot} from '../../../../pages/fillModule/components/normalBody';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Normal body component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.answer = {};
    initialProps.answerCloseOpenQuestion = jest.fn();
    initialProps.answerOptionAnswer = jest.fn();
    initialProps.answerMultiQuestion = jest.fn();
    initialProps.questionId = 0;
    initialProps.option = {
      optionTitle: 'foo'
    };
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
      answers: {},
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
      <NormalBody
        questionId={0}
        store={store}
        option={{optionTitle: 'foo'}}
      />);
    expect(wrapper).toBeDefined();
  });

  it('should update state on modal open', () => {
    const wrapper = shallow(
      <Snapshot {...initialProps}/>
    )
    wrapper.instance().handleOpen();
    expect(wrapper.state().modalOpen).toBeTruthy()
  })

  it('should update state on modal close', () => {
    const wrapper = shallow(
      <Snapshot {...initialProps}/>
    )
    wrapper.instance().handleClose();
    expect(wrapper.state().modalOpen).toBeFalsy()
  })

  it('should update state on new props', () => {
    const wrapper = shallow(
      <Snapshot {...initialProps}/>
    )
    wrapper.setProps({})
    expect(wrapper.state().modalOpen).toBeFalsy()
  })

  it('should return correct open answer', () => {
    const wrapper = shallow(
      <Snapshot {...initialProps}/>
    )
    expect(wrapper.instance().getOpenValue()).toEqual('');
    wrapper.setProps({answer: {}});
    expect(wrapper.instance().getOpenValue()).toEqual('');
    wrapper.setProps({answer: {openAnswer: 'foo'}})
    expect(wrapper.instance().getOpenValue()).toEqual('foo');
  })

  it('should return correct close single answer', () => {
    const wrapper = shallow(
      <Snapshot {...initialProps}/>
    )
    expect(wrapper.instance().getSingleValue()).toBeFalsy();
    wrapper.setProps({answer: {}, option:{}});
    expect(wrapper.instance().getSingleValue()).toBeFalsy();
    wrapper.setProps({answer: {optionId: 1}, option:{optionId: 1}});
    expect(wrapper.instance().getSingleValue()).toBeTruthy();
  })

  it('should return correct close multi answer', () => {
    const wrapper = shallow(
      <Snapshot {...initialProps}/>
    )
    expect(wrapper.instance().getMultiValue()).toBeFalsy();
    wrapper.setProps({answer: {options: []}, option:{}});
    expect(wrapper.instance().getMultiValue()).toBeFalsy();
    wrapper.setProps({answer: {options: [2]}, option:{optionId: 1}});
    expect(wrapper.instance().getMultiValue()).toBeFalsy();
    wrapper.setProps({answer: {options: [2, 5, 6, 1]}, option:{optionId: 1}});
  })

  it('should render multiple answers', () => {
    const tree = shallow(
      <Snapshot {...initialProps} questionType='CloseMultiQuestion'/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render open option', () => {
    const tree = shallow(
      <Snapshot {...initialProps} option={{optionType: 'OpenOption'}}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render option as image', () => {
    const tree = shallow(
      <Snapshot {...initialProps} questionType='ImageOptionsQuestion'/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render only NormalOption', () => {
    const imageWrapper = shallow(
      <Snapshot {...initialProps} option={{optionType: 'foo'}}/>
    )
    expect(imageWrapper.instance().renderImageOptions('foo', 'foo')).toBeFalsy()

    const normalWrapper = shallow(
      <Snapshot {...initialProps} option={{optionType: 'foo'}}/>
    )
    expect(normalWrapper.instance().renderImageOptions('foo', 'foo')).toBeFalsy()
  })

  it('should call single answer action', () => {
    const answerOptionAnswer = jest.fn();
    const wrapper = shallow(
      <Snapshot
        {...initialProps}
        answerOptionAnswer={answerOptionAnswer}
        questionType='CloseQuestion'
      />
    )
    wrapper.instance().handleOptionAnswer(1, 1, false)
    expect(answerOptionAnswer).toHaveBeenCalledWith(1, 1, false)
  })

  it('should call multi answer action', () => {
    const answerMultiQuestion = jest.fn();
    const wrapper = shallow(
      <Snapshot
        {...initialProps}
        answerMultiQuestion={answerMultiQuestion}
        questionType='CloseMultiQuestion'
      />
    )
    wrapper.instance().handleOptionAnswer(1, 1, false)
    expect(answerMultiQuestion).toHaveBeenCalledWith(1, 1, false)
  })

  it('should return call correct answer method', () => {
    const getMultiValue = jest.fn();
    const getSingleValue = jest.fn();
    const wrapper = shallow(
      <Snapshot
        {...initialProps}
        questionType='CloseMultiQuestion'
      />
    )
    wrapper.instance().getMultiValue = getMultiValue;
    wrapper.instance().getSingleValue = getSingleValue;
    wrapper.instance().getCheckedValue();
    expect(getMultiValue).toHaveBeenCalled();

    wrapper.setProps({questionType: 'CloseQuestion'})
    wrapper.instance().getCheckedValue();
    expect(getSingleValue).toHaveBeenCalled();
  })

  it('should handle open answer in single question', () => {
    const answerOptionAnswer = jest.fn();
    const wrapper = shallow(
      <Snapshot
        {...initialProps}
        answerOptionAnswer={answerOptionAnswer}
      />
    )
    wrapper.instance().handleAnswerSingleChoice(0, 0, false);
    expect(answerOptionAnswer).toHaveBeenCalledTimes(0);
    wrapper.instance().handleAnswerSingleChoice(0, 0, true);
    expect(answerOptionAnswer).toHaveBeenCalledTimes(1);
    expect(answerOptionAnswer).toHaveBeenCalledWith(0, 0, true)
  })
});
