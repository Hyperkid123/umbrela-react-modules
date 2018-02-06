import React from 'react'
import CollapsibleSection from '../../common/components/collapsibleSection';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('collapsibleSection component' , () => {
  it('should match snapshot', () => {
    const tree = shallow(
      <CollapsibleSection sectionTitle='foo'>
        <div>
          <p>Some copomnent body</p>
        </div>
      </CollapsibleSection>
    );
    expect(toJson(tree)).toMatchSnapshot();
  })
})
