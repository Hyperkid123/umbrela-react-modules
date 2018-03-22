import React from 'react'
import {ResearchEditorModuleWrapper} from '../researchEditorModule';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Research editor module wrapper mounting component', () => {
  const mockStore = configureStore();
  it('should render correctly', () => {
    const store = mockStore({})
    const tree = shallow(
      <ResearchEditorModuleWrapper store={store}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
