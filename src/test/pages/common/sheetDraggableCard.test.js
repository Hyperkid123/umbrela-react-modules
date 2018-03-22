import React, {Component} from 'react'
import SheetDraggableCard, {cardTarget} from '../../../pages/common/sheetDraggableCard';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import TestUtils from 'react-dom/test-utils';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';

describe('Sheet draggable card isolated component', () => {
  it('should have the right opaccity while dragging', () => {
    const Card = SheetDraggableCard.DecoratedComponent;
    const identity = el => el;
    let rootComponent = TestUtils.renderIntoDocument(
      <Card
        connectDragSource={identity}
        connectDropTarget={identity}
      />
    );

    let li = TestUtils.findRenderedDOMComponentWithTag(rootComponent, 'li');
    expect(li.style.opacity).toEqual("1");

    rootComponent = TestUtils.renderIntoDocument(
      <Card
        connectDragSource={identity}
        connectDropTarget={identity}
        isDragging
      />
    );
    li = TestUtils.findRenderedDOMComponentWithTag(rootComponent, 'li');
    expect(li.style.opacity).toEqual("0.5");
  })
});

describe('Sheet draggable card connected domponent', () => {
  function wrapInTestContext(DecoratedComponent) {
    return DragDropContext(TestBackend)(
      class TestContextContainer extends Component {
        render() {
          return <DecoratedComponent {...this.props} />;
        }
      }
    );
  }

  it('should have the righ opactiry while dragging', () => {
    // Render with the test context that uses the test backend
    const CardContext = wrapInTestContext(SheetDraggableCard);
    const rootElement = TestUtils.renderIntoDocument(<CardContext/>);

    // Obtain a reference to the backend
    const backend = rootElement.getManager().getBackend();

    // Test that the opacity is 1
    let li = TestUtils.findRenderedDOMComponentWithTag(rootElement, 'li');
    expect(li.style.opacity).toEqual("1");

    // Find the drag source ID and use it to simulate the dragging operation
    const box = TestUtils.findRenderedComponentWithType(rootElement, SheetDraggableCard);
    backend.simulateBeginDrag([box.getHandlerId()]);

    // Verify that the div changed its opacity
    li = TestUtils.findRenderedDOMComponentWithTag(rootElement, 'li');
    expect(li.style.opacity).toEqual("0.5");
  });

  it('should not change target with itself', () => {
    const props = {
      index: 10
    }
    const monitor = {
      getItem: () => {
        return {
          index: 10
        }
      }
    }
    const component = {}
    expect(cardTarget.hover(props, monitor, component)).toBeUndefined();
  })

  it('should change target with other component', () => {
  const CardContext = wrapInTestContext(SheetDraggableCard);
  const rootElement = TestUtils.renderIntoDocument(<CardContext/>);
  const moveCard = jest.fn();
    const props = {
      index: 11,
      moveCard
    }
    const monitor = {
      getItem: () => {
        return {
          index: 10
        }
      },
      getClientOffset: () => {
        return {y: 999}
      }
    }
    const component = rootElement;
    cardTarget.hover(props, monitor, component);
    expect(moveCard).toHaveBeenCalledWith(10, 11);
  })

  it('should not change target with other component when outside of target', () => {
  const CardContext = wrapInTestContext(SheetDraggableCard);
  const rootElement = TestUtils.renderIntoDocument(<CardContext/>);
  const moveCard = jest.fn();
    const props = {
      index: 11,
      moveCard
    }
    const monitor = {
      getItem: () => {
        return {
          index: 10
        }
      },
      getClientOffset: () => {
        return {y: -1}
      }
    }
    const component = rootElement;
    cardTarget.hover(props, monitor, component);
    expect(moveCard).toHaveBeenCalledTimes(0);
  })

  it('should not change target with other component when outside of target', () => {
  const CardContext = wrapInTestContext(SheetDraggableCard);
  const rootElement = TestUtils.renderIntoDocument(<CardContext/>);
  const moveCard = jest.fn();
    const props = {
      index: 9,
      moveCard
    }
    const monitor = {
      getItem: () => {
        return {
          index: 10
        }
      },
      getClientOffset: () => {
        return {y: 1}
      }
    }
    const component = rootElement;
    cardTarget.hover(props, monitor, component);
    expect(moveCard).toHaveBeenCalledTimes(0);
  })
});
