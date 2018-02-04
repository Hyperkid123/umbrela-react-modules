import React from 'react'
import Landing, {ResearchEditorModule as Snapshot} from '../../../pages/researchEditorModule/';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'

describe('Research editor landing component', () => {
  it('should render correclty' , () => {
      const tree = shallow(
        <Snapshot getSheets={jest.fn()}/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });
  const mockStore = configureStore();
  let initialState = {
    editor: {
      sheets: []
    }
  };
  it('should create component correctly', () => {
    let store = mockStore(initialState);
    let wrapper = shallow(<Landing store={store}/>);
    expect(wrapper).toBeDefined();
  })
});
