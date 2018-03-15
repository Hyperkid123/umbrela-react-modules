import React from 'react'
import QuestionPreview, {QuestionPreview as Snapshot} from '../../../../../pages/researchEditorModule/components/questions/questionPreview';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Question Preview component', () => {
  const initialState  = {
    questions: {
      activeQuestion: {
        questionId: 10
      }
    },
    options: {
      options: []
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
    let wrapper = shallow(<QuestionPreview store={store}/>);
    expect(wrapper).toBeDefined();
  });

  it('should render correctly empty', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'CloseQuestion',
        }}
        options={[]}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render order preview', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'OrderQuestion',
        }}
        options={[]}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render divide preview', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'DivideQuestion',
        }}
        options={[]}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render matrix preview', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'MatrixSingleQuestion',
        }}
        options={[]}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render customHelp', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'CloseQuestion',
          customHelp: 'foo help'
        }}
        options={[]}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render open question', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'OpenQuestion',
          customHelp: 'foo help'
        }}
        options={[]}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render image preview', () => {
    const tree = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'MediaQuestion',
          url: 'foo.png'
        }}
        options={[]}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should set open answer', () => {
    const wrapper = shallow(
      <Snapshot
        activeQuestion={{
          questionType: 'OpenQuestion',
        }}
        options={[]}
        translate={jest.fn()}
      />
    );
    wrapper.instance().setOpenAnswer('foo');
    expect(wrapper.state().openAnswer).toEqual('foo');
  })
});
