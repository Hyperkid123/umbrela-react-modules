import React from 'react'
import Landing from '../../../pages/dataReviewModule/';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Data review module landing component', () => {
  it('should reder correctly', () => {
    const tree = shallow(
      <Landing/>
    ).dive();
    expect(toJson(tree)).toMatchSnapshot()
  })
});
