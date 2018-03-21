import React from 'react'
import SheetFill, {SheetFill as Snapshot} from '../../../pages/fillModule/sheetFill';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Sheet fill component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.isLoaded = true;
    initialProps.activeSheet = {
      sheetTitle: 'title'
    }
    initialProps.sheetCount = 8;
    initialProps.filters = {};
    initialProps.answers = [];
    initialProps.translate = jest.fn();
    initialProps.startResearch = jest.fn();
    initialProps.match = {
      params: {
        sheetId: 0
      }
    }
  });

  it('should render correctly empty', () => {
    const tree = shallow(
      <Snapshot {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  const mockStore = configureStore();
  let initialState = {};
  let store;
  beforeEach(() => {
    initialState = {
      research: {
        isLoaded: true,
        sheets: [{}, {}]
      },
      filters: {},
      answers: [],
      locale: {
        languages: [{
          name: "English",
          code: 'en',
          active: true,
        }],
        translations: {}
      }
    }
  });

  it('should create component correctly', () => {
    store = mockStore(initialState);
    let wrapper = shallow(<SheetFill store={store} match={{params: {sheetId: 0}}}/>);
    expect(wrapper).toBeDefined();
  })

  it('should call start research on mount', () => {
    const startResearch = jest.fn();
    const wrapper = shallow(
      <Snapshot {...initialProps} startResearch={startResearch}/>
    )
    expect(startResearch.mock.calls.length).toEqual(1);
  })

  it('should scroll on top on sheet change', () => {
    const wrapper = shallow(
      <Snapshot {...initialProps}/>
    )
    wrapper.setProps({match: {params: {sheetId: 99}}})
    expect(document.scrollLeft).toBeFalsy();
  })

  it('should redirect to new page on sheet submit', () => {
    const activeSheet = {
      questions: []
    }
    const history = [];
    const wrapper = shallow(
      <Snapshot {...initialProps} activeSheet={activeSheet} history={history}/>
    )
    wrapper.instance().handleNextSheet('/test');
    expect(history).toEqual(['/test']);
  })

  it('should not redirect to new page on sheet submit', () => {
    const activeSheet = {
      questions: [{
        questionId: 99,
        isMandatory: true
      }]
    }
    const history = [];
    const wrapper = shallow(
      <Snapshot {...initialProps} activeSheet={activeSheet} history={history}/>
    )
    wrapper.instance().handleNextSheet('/test');
    expect(history).toEqual([]);
  })

  it('should render component with prev button', () => {
    const tree = shallow(
      <Snapshot {...initialProps} match={{params: {
        sheetId: 99
      }}}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render component without prev button', () => {
    const tree = shallow(
      <Snapshot {...initialProps} match={{params: {
        sheetId: 0
      }}}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render component with next button', () => {
    const tree = shallow(
      <Snapshot {...initialProps} match={{params: {
        sheetId: 0
      }}} sheetCount={33}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render component with submit button', () => {
    const tree = shallow(
      <Snapshot {...initialProps} match={{params: {
        sheetId: 32
      }}} sheetCount={33}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should return redicert component if research is not loaded', () => {
    const tree = shallow(
      <Snapshot {...initialProps} isLoaded={false}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
