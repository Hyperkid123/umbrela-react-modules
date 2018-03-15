import React from 'react'
import QuestionMenu, {QuestionMenu as Snapshot} from '../../../../pages/researchEditorModule/components/questionMenu';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Question Menu component', () => {
  const initialState  = {
    editor: {
      activeSheet: {
        sheetId: 10
      }
    },
    ui: {
      draggingElement: false,
    },
    questions: {
      activeQuestion: {
        questionId: 10
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
  };

  const mockStore = configureStore();
  it('should create component correctly', () => {
    let store = mockStore(initialState);
    let wrapper = shallow(<QuestionMenu store={store}/>);
    expect(wrapper).toBeDefined();
  });

  it('should render correctly empty', () => {
    const tree = shallow(
      <Snapshot
        activeSheet={{
          title: 'foo'
        }}
        getQuestions={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render correctly with questions', () => {
    const tree = shallow(
      <Snapshot
        questions={[{
          questionId: 1
        }, {
          questionId: 2
        }]}
        getQuestions={jest.fn()}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should get new questions on sheet change', () => {
    const getQuestions = jest.fn();
    const wrapper = shallow(
      <Snapshot
        activeSheet={{
          title: 'foo'
        }}
        activeSheetId={0}
        getQuestions={getQuestions}
      />
    );
    expect(getQuestions.mock.calls.length).toEqual(1);
    wrapper.setProps({activeSheetId: 1});
    expect(getQuestions.mock.calls.length).toEqual(2);
  })
});
