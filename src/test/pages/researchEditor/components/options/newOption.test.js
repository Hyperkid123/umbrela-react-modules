import React from 'react'
import NewOption, {NewOption as Snapshot} from '../../../../../pages/researchEditorModule/components/options/newOption';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'

describe('New option component', () => {
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
    let wrapper = shallow(<NewOption store={store}/>);
    expect(wrapper).toBeDefined();
  })
  it('should render correclty', () => {
      const tree = shallow(
        <Snapshot
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

  it('should synchronizeOption correctly', () => {
    const synchronizeOption = jest.fn();
    const wrapper = shallow(
      <Snapshot
        activeQuestion={{questionId: 1}}
        options={[
          {optionOrder: 1, optionId: 1, optionType: 'ColumnOption'},
          {optionOrder: 10, optionId: 10, optionType: 'RowOption'}
        ]}
        synchronizeOption={synchronizeOption}
        translate={jest.fn()}
      />
    );
    wrapper.setState({optionText: 'foo'});
    wrapper.instance().createOption();
    expect(synchronizeOption.mock.calls.length).toEqual(1);
  })

  it('should set option text corrcetly', () => {
    const wrapper = shallow(
      <Snapshot
        activeQuestion={{questionId: 1}}
        options={[
          {optionOrder: 1, optionId: 1, optionType: 'ColumnOption'},
          {optionOrder: 10, optionId: 10, optionType: 'RowOption'}
        ]}
        translate={jest.fn()}
      />
    );
    wrapper.instance().setOptionText('foo');
    expect(wrapper.state()).toEqual({optionText: 'foo'});

  })
});
