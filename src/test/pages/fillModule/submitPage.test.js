import React from 'react'
import SubmitPage, {SubmitPage as Snapshot} from '../../../pages/fillModule/submitPage';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Submit page component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.isLoaded = true;
    initialProps.leaveText = 'leave text'
    initialProps.answers = [];
    initialProps.translate = jest.fn();
    initialProps.submitAnswers = jest.fn()
    initialProps.isFetching = false;
    initialProps.title = 'title';
  });

  it('should render correctly', () => {
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
        leaveText: 'leave text',
        title: 'title'
      },
      answers: {
        isFetching: false
      },
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
    let wrapper = shallow(<SubmitPage store={store} />);
    expect(wrapper).toBeDefined();
  })

  it('should render correctly fetching page', () => {
    const tree = shallow(
      <Snapshot {...initialProps} isFetching={true}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should redirec correctly if research is not loaded', () => {
    const tree = shallow(
      <Snapshot {...initialProps} isLoaded={false}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should redirec correctly with template leave text', () => {
    const tree = shallow(
      <Snapshot {...initialProps} leaveText={false}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
