import React, { Component } from 'react';
import DragByHandle from '../../../../../pages/researchEditorModule/components/options/dragByHandle';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import DndContext from '../../../../../common/components/dndContext';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import TestUtils from 'react-dom/test-utils';

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    class TestContextContainer extends Component {
      render() {
        return <DecoratedComponent {...this.props} />;
      }
    }
  );
}

function simulateDragAndDrop(dragComponent, dropComponent) {
    TestUtils.Simulate.dragStart(
        dragComponent,
        { nativeEvent: { dataTransfer: {} } }
    );

    TestUtils.Simulate.drop(
        dropComponent,
        { dataTransfer: { types: [] } }
    );
}

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

  /**it('should have correct opacity', () => {
    // Render with the test context that uses the test backend
    const NotDragged = wrapInTestContext(DragByHandle);
    const root = TestUtils.renderIntoDocument(<NotDragged name='test' id='testId'/>)
    const backend = root.getManager().getBackend();
    let li = TestUtils.findRenderedDOMComponentWithTag(root, 'li');
    expect(li.style.opacity).toEqual('1');
    //simulate dragging
    const Dragged = TestUtils.findRenderedComponentWithType(root, DragByHandle);
    backend.simulateBeginDrag([Dragged.getHandlerId()]);
    li = TestUtils.findRenderedDOMComponentWithTag(root, 'li');
    expect(li.style.opacity).toEqual('0.5');
  })*/
});
