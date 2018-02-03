import React from 'react'
import {Navigation} from '../../../../pages/q-method/components/navigation';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Q-method navigation component', () => {
  it('should render correclty' , () => {
      const tree = shallow(
        <Navigation/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });
});
