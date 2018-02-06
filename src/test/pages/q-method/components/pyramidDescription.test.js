import React from 'react'
import PyramidDescription from '../../../../pages/q-method/components/pyramidDescription';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Q-method navigation component', () => {
  it('should render correclty' , () => {
      const tree = shallow(
        <PyramidDescription/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });
});
