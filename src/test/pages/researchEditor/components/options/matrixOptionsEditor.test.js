import React from 'react'
import MatrixOptionsEditor, {MatrixOptionsEditor as Snapshot} from '../../../../../pages/researchEditorModule/components/options/matrixOptionsEditor';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'

describe('Matrix options editor component', () => {
  const initialState  = {
    questions: {
      activeQuestion: {
        questionId: 1
      }
    },
    options: {
      options: []
    },
    ui: {
      draggingElement: false
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
    let wrapper = shallow(<MatrixOptionsEditor store={store}/>);
    expect(wrapper).toBeDefined();
  })
  it('should render correclty', () => {
      const tree = shallow(
        <Snapshot
          getOptions={jest.fn()}
          activeQuestion={{questionId: 1}}
          options={[
            {optionOrder: 1, optionId: 1, optionType: 'ColumnOption'},
            {optionOrder: 10, optionId: 10, optionType: 'RowOption'}
          ]}
          translate={jest.fn()}
        />
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });

  it('should call getOptions correctly', () => {
    const getOptions = jest.fn();
    const wrapper = shallow(
      <Snapshot
        getOptions={getOptions}
        activeQuestion={{questionId: 1}}
        options={[
          {optionOrder: 1, optionId: 1, optionType: 'ColumnOption'},
          {optionOrder: 10, optionId: 10, optionType: 'RowOption'}
        ]}
        translate={jest.fn()}
      />
    );
    expect(getOptions.mock.calls.length).toEqual(1);
    wrapper.instance().componentWillReceiveProps({activeQuestion: {questionId: 2}});
    expect(getOptions.mock.calls.length).toEqual(2);
  })
});
