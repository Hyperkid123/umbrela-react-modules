import React from 'react'
import SheetsContainer, {SheetsContainer as Snapshot} from '../../../pages/dataReviewModule/sheetsContainer';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Sheets container component', () => {
  let initialProps = {}
  beforeEach(() => {
    initialProps.getQuestions = jest.fn();
    initialProps.fetchQuestionIfNeeded = jest.fn();
    initialProps.activeSheet = {sheetId: 1};
    initialProps.hideQuestions = false;
    initialProps.isFetching = false;
    initialProps.questions = [];
    initialProps.translate = jest.fn();
  })

  it('should render empty correclty' , () => {
      const tree = shallow(
        <Snapshot {...initialProps}/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });

  const mockStore = configureStore();
  let initialState = {
    ui: {
      hideQuestions: false,
    },
    editor: {
      activeSheet: {},
    },
    questions: {
      questions: [],
      isFetching: true,
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
    let wrapper = shallow(<SheetsContainer store={store}/>);
    expect(wrapper).toBeDefined();
  })

  it('should update questions on sheet change' , () => {
    const getQuestions = jest.fn()
    const wrapper = shallow(
      <Snapshot
        {...initialProps}
        getQuestions={getQuestions}
      />
    );
    wrapper.setProps({activeSheet: {sheetId: 10}})
    expect(getQuestions.mock.calls.length).toEqual(2);
  });
});
