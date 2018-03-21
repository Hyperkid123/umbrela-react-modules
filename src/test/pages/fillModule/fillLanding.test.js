import React from 'react'
import FillLanding, {FillLanding as Snapshot} from '../../../pages/fillModule/fillLanding';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Fill module index component', () => {
  const initialProps = {}
  beforeEach(() => {
    initialProps.isLoaded = true;
    initialProps.introText = 'intro text';
    initialProps.title = 'title';
    initialProps.filters = {};
    initialProps.translate = jest.fn();
    initialProps.currentLanguage = 'en';
    initialProps.getResearchStructure = jest.fn();
  });

  it('should render correctly', () => {
    const tree = shallow(
      <Snapshot {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render loading page', () => {
    const tree = shallow(
      <Snapshot {...initialProps} isLoaded={false}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  });

  const mockStore = configureStore();
  let initialState = {
    research: {
      isLoaded: true,
      introText: 'intro text',
      title: 'title'
    },
    filters: {},
    locale: {
      languages: [{
        name: "English",
        code: 'en',
        active: true,
      }],
      translations: {}
    }
  }

  it('should create component correctly', () => {
    let store = mockStore(initialState);
    let wrapper = shallow(<FillLanding store={store}/>);
    expect(wrapper).toBeDefined();
  })
});
