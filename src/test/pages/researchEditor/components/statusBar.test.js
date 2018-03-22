import React from 'react'
import StatusBar, {StatusBar as Snapshot} from '../../../../pages/researchEditorModule/components/statusBar';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Status Bar component', () => {
    const initialState  = {
      editor: {
        isFetching: false,
        failed: false
      },
      questions: {
        isFetching: false,
        failed: false
      },
      options: {
        isFetching: false,
        failed: false
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
      let wrapper = shallow(<StatusBar store={store}/>);
      expect(wrapper).toBeDefined();
    });

    it('should render correctly with ok message', () => {
      const tree = shallow(
        <Snapshot translate={jest.fn()}/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should render correctly with ok message', () => {
      const tree = shallow(
        <Snapshot isFetching translate={jest.fn()}/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should render correctly with fail message', () => {
      const tree = shallow(
        <Snapshot failed translate={jest.fn()}/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
    });
});
