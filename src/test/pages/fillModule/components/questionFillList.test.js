import React from 'react'
import QuestionFillList from '../../../../pages/fillModule/components/questionFillList';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Question fill list component', () => {
  const initialProps = {}
  beforeEach(() => {
    initialProps.questions = []
    initialProps.questionType = 'CloseQuestion'
    initialProps.filters = {};
  });

  it('should render empty', () => {
    const tree = shallow(
      <QuestionFillList {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render empty with image preview', () => {
    const tree = shallow(
      <QuestionFillList
        {...initialProps}
        questions={[{
          questionId: 1,
          options: [],
          url: 'foo.url',
          questionType: 'MediaQuestion'
        }]}
        filters={{}}
      />
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should return if question is filtered', () => {
    const wrapper = shallow(
      <QuestionFillList
        {...initialProps}
        questions={[{
          questionId: 1,
          options: []
        }]}
        filters={{}}
      />
    )
    expect(wrapper.instance().checkFiltered(1)).toBeFalsy()
    wrapper.setProps({filters: {"1": []}})
    expect(wrapper.instance().checkFiltered(1)).toBeFalsy()
    wrapper.setProps({filters: {"1": [1]}});
    expect(wrapper.instance().checkFiltered(1)).toBeTruthy()
  })

  it('should update state on handle open request', () => {
    const wrapper = shallow(
      <QuestionFillList {...initialProps}/>
    )
    wrapper.instance().handleOpenDialog('foo.com');
    expect(wrapper.state().openDialog).toBeTruthy();
    expect(wrapper.state().dialogImage).toEqual('foo.com')
  })

  it('should update state on handle close request', () => {
    const wrapper = shallow(
      <QuestionFillList {...initialProps}/>
    )
    wrapper.instance().handleCloseDialog();
    expect(wrapper.state().openDialog).toBeFalsy();
  })

  it('should render with customHelp', () => {
    const tree = shallow(
      <QuestionFillList {...initialProps} questions={[{
        customHelp: 'custom help',
        questionId: 1,
        options: []
      }]}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
