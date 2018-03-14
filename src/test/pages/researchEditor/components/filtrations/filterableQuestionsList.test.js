import React from 'react'
import FilterableQuestionsList, {FilterableQuestionsList as Snapshot} from '../../../../../pages/researchEditorModule/components/filtrations/filterableQuestionsList';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('FilterableQuestionsList component', () => {
    const initialState  = {
      options:{
        optionsFilters: {}
      },
      questions: {
        allQuestions:{
          1: [{
            questionId: 1,
            title: 'foo',
          }]
        }
      },
    };

    const mockStore = configureStore();
    it('should create component correctly', () => {
      let store = mockStore(initialState);
      let wrapper = shallow(<FilterableQuestionsList store={store}/>);
      expect(wrapper).toBeDefined();
    });

    it('should render correctly with questions', () => {
      const tree = shallow(
        <Snapshot
          loadQuestions={jest.fn()}
          questions={[{
            questionId: 1,
            title: 'foo',
          }]}
          filters={[{}]}
          selectedOptionId={0}
        />
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
    });
});
