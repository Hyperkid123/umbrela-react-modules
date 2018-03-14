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
  })
});
