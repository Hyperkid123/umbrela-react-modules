import React from 'react'
import FiltrationView, {FiltrationView as Snapshot} from '../../../../pages/researchEditorModule/components/filtrationView';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Filtration View component', () => {
  const initialState  = {
    questions: {
      activeQuestion: {
        questionId: 1
      }
    },
    editor: {
      activeSheet: {
        sheetId: 0,
        title: 'foo'
      }
    },
  };

  const mockStore = configureStore();
  it('should create component correctly', () => {
    let store = mockStore(initialState);
    let wrapper = shallow(<FiltrationView store={store}/>);
    expect(wrapper).toBeDefined();
  });

  it('should render correctly without questions', () => {
    const tree = shallow(
      <Snapshot
        activeSheet={{
          title: 'foo'
        }}
        getQuestions={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with questions', () => {
    const tree = shallow(
      <Snapshot
        activeSheet={{
          title: 'foo'
        }}
        questions={[
          {
            questionType: 'CloseQuestion',
            title: 'foo',
            questionId: 0,
            questionOrder: 0,
          }
        ]}
        getQuestions={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should not render any question', () => {
    const tree = shallow(
      <Snapshot
        activeSheet={{
          title: 'foo'
        }}
        questions={[
          {
            questionType: 'OpenQuestion',
            title: 'foo',
            questionId: 0,
            questionOrder: 0,
          }
        ]}
        getQuestions={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should call question update on sheet change', () => {
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
    wrapper.setProps({activeSheetId: 1});
    expect(getQuestions.mock.calls.length).toEqual(2);
  });
});
