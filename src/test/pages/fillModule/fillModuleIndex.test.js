import React from 'react'
import Landing from '../../../pages/fillModule/';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Fill module index component', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <Landing/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
