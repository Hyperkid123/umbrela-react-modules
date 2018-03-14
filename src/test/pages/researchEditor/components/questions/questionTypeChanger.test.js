import React from 'react'
import QuestionTypeChanger, {QuestionTypeChanger as Snapshot} from '../../../../../pages/researchEditorModule/components/questions/questionTypeChanger';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Question type changer component', () => {
  const initialState  = {
    questions: {
      activeQuestion: {
        questionId: 10
      },
      isFetching: false,
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
    let wrapper = shallow(<QuestionTypeChanger store={store}/>);
    expect(wrapper).toBeDefined();
  });

  it('should render correctly empty', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'CloseQuestion',
        }}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly image preview checkbox', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'MediaQuestion',
        }}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly multiple answers checkbox', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'CloseMultiQuestion',
        }}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render correctly multiple answers checkbox', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'CloseMultiQuestion',
        }}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render correctly open option checkbox', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'CloseWithOpenQuestion',
        }}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render correctly options as images checkbox', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'CloseQuestion',
        }}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })
});
