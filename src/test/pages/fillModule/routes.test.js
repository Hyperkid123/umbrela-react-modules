import React from 'react'
import Routes from '../../../pages/fillModule/routes';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Fill module routes component', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <Routes/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
