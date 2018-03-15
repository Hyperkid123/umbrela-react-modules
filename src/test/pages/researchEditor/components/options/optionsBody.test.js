import React from 'react'
import OptionsBody, {OptionsBody as Snapshot} from '../../../../../pages/researchEditorModule/components/options/optionsBody';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Options Body component', () => {
    const initialState  = {
      questions: {
        activeQuestion: {
          questionType: 'CloseQuestion'
        }
      },
      editor: {
        activeSheet: {
          sheetId: 0,
          title: 'foo'
        }
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
      let wrapper = shallow(<OptionsBody store={store}/>);
      expect(wrapper).toBeDefined();
    });

    it('should render non matrix question correctly', () => {
      const tree = shallow(
        <Snapshot
          questionType='CloseQuestion'
          translate={jest.fn()}
        />
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should render matrix question correctly', () => {
      const tree = shallow(
        <Snapshot
          questionType='MatrixSingleQuestion'
          translate={jest.fn()}
        />
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
    });
});
