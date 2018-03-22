import React from 'react'
import {FillModuleWrapper} from '../fillModule';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Fill module wrapper mounting component', () => {
  const mockStore = configureStore();
  it('should render correctly', () => {
    const store = mockStore({})
    const tree = shallow(
      <FillModuleWrapper store={store}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
