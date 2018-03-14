import React from 'react'
import QuestionView, {QuestionView as Snapshot} from '../../../../pages/researchEditorModule/components/questionView';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Question View component', () => {
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
      let wrapper = shallow(<QuestionView store={store}/>);
      expect(wrapper).toBeDefined();
    });

    it('should render correctly empty', () => {
      const tree = shallow(
        <Snapshot
          activeQuestion={{
            title: 'foo'
          }}
          translate={jest.fn()}
        />
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should not render', () => {
      const tree = shallow(
        <Snapshot
          activeQuestion={{
            title: 'foo'
          }}
          translate={jest.fn()}
        />
      );
      expect(tree[0]).toBe(undefined);
    })

    it('should render modal', () => {
        const wrapper = shallow(
          <Snapshot
            activeQuestion={{
              title: 'foo'
            }}
            translate={jest.fn()}
          />
        );
        wrapper.setState({showDelete: true});
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Should delete question and update state', () => {
      const deleteQuestion = jest.fn();
      const wrapper = shallow(
        <Snapshot
          activeQuestion={{
            title: 'foo'
          }}
          deleteQuestion={deleteQuestion}
          translate={jest.fn()}
        />
      );
      wrapper.instance().handleDeleteQuestion();
      expect(deleteQuestion.mock.calls.length).toEqual(1);
      expect(wrapper.state().showDelete).toBeFalsy();
    });
});
