import React from 'react'
import {QuestionsNavigation} from '../../../../pages/dataReviewModule/components/questionsNavigation';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Questions navigation component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.questions = [{
      questionId: 1,
      title: 'question 1'
    }, {
      questionId: 2,
      title: 'question 2'
    }, {
      questionId: 3,
      title: 'question 3'
    }]
    initialProps.title = 'foo';
  });

  it('should render correctly', () => {
    const tree = shallow(
      <QuestionsNavigation {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should update state on navigation item click', () => {
    const wrapper = shallow(
      <QuestionsNavigation {...initialProps}/>
    );
    wrapper.instance().handleItemClick(1);
    expect(wrapper.state().activeQuestion).toEqual(1)
  })
});
