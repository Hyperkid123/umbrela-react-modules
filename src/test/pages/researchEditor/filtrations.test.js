import React from 'react'
import Filtrations, {Filtrations as Snapshot} from '../../../pages/researchEditorModule/filtrations';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'

describe('Filtrations component empty', () => {
  it('should render correclty' , () => {
      const tree = shallow(
        <Snapshot getSheets={jest.fn()}/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });
  const mockStore = configureStore();
  let initialState = {
    editor: {
      sheets: [],
      activeSheet: {}
    }
  };
  it('should create component correctly', () => {
    let store = mockStore(initialState);
    let wrapper = shallow(<Filtrations store={store}/>);
    expect(wrapper).toBeDefined();
  })

  it('should render correclty with active sheet' , () => {
      const tree = shallow(
        <Snapshot getSheets={jest.fn()} activeSheet/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });
});
