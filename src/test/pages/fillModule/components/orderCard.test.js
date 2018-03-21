import React from 'react'
import {Card as Snapshot} from '../../../../pages/fillModule/components/orderCard';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Order card component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.isDragging = false;
    initialProps.connectDragSource = jest.fn();
    initialProps.connectDropTarget = jest.fn();
    initialProps.connectDragPreview = jest.fn();
    initialProps.index = 0;
    initialProps.id = 55;
    initialProps.moveCard = jest.fn();
    initialProps.option = {
      optionTitle: 'foo'
    }
  });

  it('should render correctly', () => {
    const tree = shallow(
        <Snapshot {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
