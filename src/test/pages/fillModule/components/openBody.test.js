import React from 'react'
import OpenBody, {OpenBody as Snapshot} from '../../../../pages/fillModule/components/openBody';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Open body component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.answer = {};
    initialProps.answerOpenQuestion = jest.fn();
    initialProps.translate = jest.fn();
    initialProps.questionId = 0;
    initialProps.answer = '';
  });

  it('should render correctly empty', () => {
    const tree = shallow(
      <Snapshot {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  const mockStore = configureStore();
  let initialState = {};
  let store = {};
  beforeEach(() => {
    initialState = {
      answers: {},
      locale: {
        languages: [{
          name: "English",
          code: 'en',
          active: true,
        }],
        translations: {}
      }
    }
  });

  it('should create component correctly', () => {
    store = mockStore(initialState);
    let wrapper = shallow(
      <OpenBody questionId={0} store={store}/>);
    expect(wrapper).toBeDefined();
  });

  it('should return correct answer value', () => {
    const wrapper = shallow(
      <Snapshot {...initialProps}/>
    )
    expect(wrapper.instance().getOpenValue()).toEqual('');
    wrapper.setProps({answer: 'foo'});
    expect(wrapper.instance().getOpenValue()).toEqual('foo');
  })
});
