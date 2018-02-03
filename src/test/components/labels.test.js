import React from 'react'
import {TextFieldComent} from '../../common/components/labels';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('collapsibleSection component' , () => {
  it('should match snapshot', () => {
    const tree = shallow(
      <TextFieldComent label='foo'/>
    );
    expect(toJson(tree)).toMatchSnapshot();
  })
})
