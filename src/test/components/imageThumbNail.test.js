import React from 'react'
import {ImageThumbNail} from '../../common/components/imageThumbNail';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('collapsibleSection component' , () => {
  it('should match snapshot', () => {
    const tree = shallow(
      <ImageThumbNail src='foo.png' alt='foo'/>
    );
    expect(toJson(tree)).toMatchSnapshot();
  })
})
