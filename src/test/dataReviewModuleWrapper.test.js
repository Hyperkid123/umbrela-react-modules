import React from 'react'
import {DataReviewModuleWrapper} from '../dataReviewModule';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Data review module wrapper mounting component', () => {
  const mockStore = configureStore();
  it('should render correctly', () => {
    const store = mockStore({})
    const tree = shallow(
      <DataReviewModuleWrapper store={store}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
