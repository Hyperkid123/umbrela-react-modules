import React from 'react'
import ScrollToTopOnMount from '../../common/components/scrollTopOnMount';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Scroll top on mount component', () => {
  it('shloud return null', () => {
    const tree = shallow(
      <ScrollToTopOnMount/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
