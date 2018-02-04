import React from 'react'
import DropZone from '../../../pages/q-method/dropZone';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Q-method dropZone component', () => {
  it('should render correclty' , () => {
      const tree = shallow(
        <DropZone/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });
});
