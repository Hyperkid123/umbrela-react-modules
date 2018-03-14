import React from 'react';
import DragByHandle from '../../../../../pages/researchEditorModule/components/options/dragByHandle';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import DndContext from '../../../../../common/components/dndContext';

describe('DragByHandle component', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <DndContext>
        <DragByHandle/>
      </DndContext>
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })

    it('should not render tooltip while dragging', () => {
      const tree = shallow(
        <DndContext>
          <DragByHandle draggingElement={{}} index={1}/>
        </DndContext>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
    })
});
