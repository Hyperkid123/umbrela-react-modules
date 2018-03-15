import React from 'react'
import QuestionsCreator, {QuestionsCreator as Snapshot} from '../../../../pages/researchEditorModule/components/questionsCreator';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Questions Creator component', () => {
    const initialState  = {
      questions: {
        activeQuestion: {
          questionId: 1
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
      let wrapper = shallow(<QuestionsCreator store={store}/>);
      expect(wrapper).toBeDefined();
    });

    it('should render correctly', () => {
      const tree = shallow(
        <Snapshot
          translate={jest.fn()}
        />
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should close menu', () => {
      const wrapper = shallow(
        <Snapshot
          translate={jest.fn()}
        />
      );
      wrapper.instance().handleRequestClose();
      expect(wrapper.state().open).toBeFalsy();
    });

    it('should open menu', () => {
      const wrapper = shallow(
        <Snapshot
          translate={jest.fn()}
        />
      );
      wrapper.instance().handleClick({currentTarget: 'foo', preventDefault: jest.fn()});
      expect(wrapper.state().open).toBeTruthy();
      expect(wrapper.state().anchorEl).toEqual('foo');
    });

    it('should call new question', () => {
      const createNewQuestion = jest.fn();
      const wrapper = shallow(
        <Snapshot
          translate={jest.fn()}
          createNewQuestion={createNewQuestion}
        />
      );
      wrapper.instance().handleCreateNewQuestion('CloseQuestion');
      expect(createNewQuestion.mock.calls.length).toEqual(1);
    })
});
