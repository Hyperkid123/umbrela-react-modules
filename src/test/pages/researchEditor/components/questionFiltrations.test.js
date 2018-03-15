import React from 'react'
import QuestionFiltrations, {QuestionFiltrations as Snapshot} from '../../../../pages/researchEditorModule/components/questionFiltrations';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Question filtrations', () => {
  const initialState  = {
    options: {
      allOptions: {
        1: []
      }
    },
    editor: {
      sheets: []
    },
    activeSheet: {}
  };

  const mockStore = configureStore();
  it('should create component correctly', () => {
    let store = mockStore(initialState);
    let wrapper = shallow(<QuestionFiltrations questionId={1} store={store}/>);
    expect(wrapper).toBeDefined();
  });

  it('should render correctly empty', () => {
    const tree = shallow(
      <Snapshot loadOptions={jest.fn()} />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render sheets list', () => {
    const tree = shallow(
      <Snapshot
        loadOptions={jest.fn()}
        activeSheet={{sheetOrder: 0, sheetId: 10}}
        sheets={[
          {sheetOrder: 1, sheetId: 10, title: 'foo'}
        ]}
        questionId={10}
        questionOrder={10}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should set tab correctly', () => {
    const options = [{
      optionId: 0
    }, {
        optionId: 10
    }];
    const wrapper = shallow(
      <Snapshot
        options={options}
        loadOptions={jest.fn()}
      />
    );
    wrapper.instance().setCurrentTab(1);
    expect(wrapper.state().tab).toEqual(1);
    expect(wrapper.state().selectedOptionId).toEqual(options[1].optionId);
  });

  it('should load options on question change', () => {
    const loadOptions = jest.fn();
    const wrapper = shallow(
      <Snapshot
        options={[]}
        loadOptions={loadOptions}
        questionId={0}
      />
    );
    expect(loadOptions.mock.calls.length).toEqual(1);
    wrapper.setProps({questionId: 1});
    expect(loadOptions.mock.calls.length).toEqual(2);
    wrapper.setProps({questionId: 1});
    expect(loadOptions.mock.calls.length).toEqual(2);
  });

  it('should set first atb if new options are loaded', () => {
    const wrapper = shallow(
      <Snapshot
        options={false}
        loadOptions={jest.fn()}
        questionId={0}
      />
    );
    wrapper.setProps({options: [{optionId: 99}]});
    expect(wrapper.state().selectedOptionId).toEqual(99);
  });

  it('shoud not render question list', () => {
    const tree = shallow(
      <Snapshot
        loadOptions={jest.fn()}
        activeSheet={{sheetOrder: 50, sheetId: 1}}
        sheets={[
          {sheetOrder: 0, sheetId: 10, title: 'foo'}
        ]}
        questionId={10}
        questionOrder={10}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });
});
