import React from 'react'
import OrderBody, {OrderBody as Snapshot} from '../../../../pages/fillModule/components/orderBody';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Order body component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.answer = [];
    initialProps.createCards = jest.fn();
    initialProps.dragCard = jest.fn();
    initialProps.question = {
      questionId: 0,
      options: []
    };
    initialProps.option = {
      optionTitle: 'foo',
      optionId: 0
    };
  });

  it('should render correctly empty', () => {
    const tree = shallow(
      <Snapshot {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  const mockStore = configureStore();
  let initialState = {};
  let store;
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
      <OrderBody
        question={{
          questionId: 0
        }}
        store={store}
        option={{optionTitle: 'foo'}}
      />);
    expect(wrapper).toBeDefined();
  });

  it('should render correctly empty', () => {
    const dragCard = jest.fn();
    const wrapper = shallow(
      <Snapshot {...initialProps} dragCard={dragCard}/>
    )
    wrapper.instance().moveCard(10, 5);
    expect(dragCard).toHaveBeenCalledWith(0, [], 10, 5)
  })

  it('should call create cards action if no answer exists', () => {
    const createCards = jest.fn();
    const wrapper = shallow(
      <Snapshot {...initialProps} createCards={createCards} answer={false}/>
    )
    wrapper.instance().moveCard(10, 5);
    expect(createCards).toHaveBeenCalledWith(0, [])
  })

  it('should render options', () => {
    const answer = [{
      optionId: 0,
    }, {
      optionId: 1
    }, {
      optionId: 2,
    }]
    const tree = shallow(
      <Snapshot {...initialProps} answer={answer}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
