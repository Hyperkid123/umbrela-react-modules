import React from 'react'
import Landing from '../../../pages/q-method/';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Q-method landing component', () => {
  it('should render correclty' , () => {
      const tree = shallow(
        <Landing/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });
});
