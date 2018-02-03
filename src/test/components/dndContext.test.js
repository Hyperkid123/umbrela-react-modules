import React from 'react'
import DndContext from '../../common/components/dndContext';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('collapsibleSection component' , () => {
  it('should match snapshot', () => {
    const tree = shallow(
      <DndContext sectionTitle='foo'>
        <div>
          <p>Some copomnent body</p>
        </div>
      </DndContext>
    );
    expect(toJson(tree)).toMatchSnapshot();
  })
})
