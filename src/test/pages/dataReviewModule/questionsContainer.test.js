import React from 'react'
import QuestionsContainer, {QuestionsContainer as Snapshot} from '../../../pages/dataReviewModule/questionsContainer';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Questions container component', () => {
  it('should render empty correclty' , () => {
      const tree = shallow(
        <Snapshot
          questionData={new Map()}
          translate={jest.fn()}
          match={{params: {questionId: 10}}}
          questions={{}}
          fetchQuestionIfNeeded={jest.fn()}
          ui={{
            chartType: 'PIE_CHART',
            hideChartlegend: false,
          }}
        />
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });

  const mockStore = configureStore();
  let initialState = {
    ui: {
      chartType: 'PIE_CHART',
      hideChartlegend: false,
    },
    data: {
      isFetching: false,
      questionData: {}
    },
    locale: {
      languages: [{
        name: "English",
        code: 'en',
        active: true,
      }],
      translations: {}
    }
  };

  it('should create component correctly', () => {
    let store = mockStore(initialState);
    let wrapper = shallow(<QuestionsContainer store={store}/>);
    expect(wrapper).toBeDefined();
  })

  it('should render with data correclty' , () => {
    const questionId = 1;
    const questionData = new Map();
    questionData.set(questionId, {});
      const tree = shallow(
        <Snapshot
          fetchQuestionIfNeeded={jest.fn()}
          questionData={questionData}
          translate={jest.fn()}
          match={{params: {questionId}}}
          questions={{"1": {
            title: 'foo',
            type: 'CloseQuestion'
          }}}
          ui={{
            chartType: 'PIE_CHART',
            hideChartlegend: false,
          }}
        />
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });

  it('should update data on question change', () => {
    const fetchQuestions = jest.fn();
    const questionId = 1;
    const questionData = new Map();
    questionData.set(questionId, {});
    const wrapper = shallow(
      <Snapshot
        fetchQuestionIfNeeded={fetchQuestions}
        questionData={questionData}
        translate={jest.fn()}
        match={{params: {questionId}}}
        questions={{"1": {
          title: 'foo',
          type: 'CloseQuestion'
        }}}
        ui={{
          chartType: 'PIE_CHART',
          hideChartlegend: false,
        }}
      />
    );
    wrapper.setProps({match:{params: {questionId: 2}}});
    expect(fetchQuestions.mock.calls.length).toEqual(2);
  })
});
