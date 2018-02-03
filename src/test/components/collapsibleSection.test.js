import React from 'react'
import CollapsibleSectoin from '../../common/components/collapsibleSection';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('collapsibleSection component' , () => {

  it('should match snapshot', () => {
    const tree = shallow(
      <CollapsibleSectoin sectionTitle='foo'>
        <div>
          <p>Some copomnent body</p>
        </div>
      </CollapsibleSectoin>
    );
    expect(toJson(tree)).toMatchSnapshot();
  })
})
