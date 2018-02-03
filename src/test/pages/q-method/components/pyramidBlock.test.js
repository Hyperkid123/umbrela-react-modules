import React from 'react'
import PyramidBlock from '../../../../pages/q-method/components/pyramidBlock';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Q-method navigation component', () => {
  it('should render correclty' , () => {
      const tree = shallow(
        <PyramidBlock/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });
});
