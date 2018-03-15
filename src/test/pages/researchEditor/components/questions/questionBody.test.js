import React from 'react'
import QuestionBody, {QuestionBody as Snapshot} from '../../../../../pages/researchEditorModule/components/questions/questionBody';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Question body component', () => {
  const initialState  = {
    questions: {
      activeQuestion: {
        questionId: 10
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
    let wrapper = shallow(<QuestionBody store={store}/>);
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
  })

  it('should change tab correctly', () => {
    const wrapper = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'CloseQuestion',
        }}
        translate={jest.fn()}
      />
    );
    wrapper.instance().handleTabChange(1);
    expect(wrapper.state().tab).toEqual(1);
  })

  it('should render only preview', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'OpenQuestion',
        }}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with customHelp', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'CloseQuestion',
          hasCustomHelp: true,
          customHelp: 'foo',
        }}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with scalePoints', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'OrderQuestion',
          scalePoints: 100,
        }}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render correctly with image preview', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'MediaQuestion',
          url: 'foo.png'
        }}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

});
