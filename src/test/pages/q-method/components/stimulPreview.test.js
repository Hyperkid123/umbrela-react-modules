import React from 'react'
import StimulPreview from '../../../../pages/q-method/components/stimulPreview';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Stimul preview component', () => {
  it('should render correclty' , () => {
      const tree = shallow(
        <StimulPreview images={[{name: 'foo', preview: 'foo'}]}/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });
});
