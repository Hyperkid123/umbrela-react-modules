import React,{Component} from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import flow from 'lodash/flow';
import {findDOMNode} from 'react-dom';


const cardSource = {
    canDrag(props){
      return true
    },
    beginDrag(props){
        return {
            id: props.id,
            index: props.index,
        };
    },
    endDrag(props, monitor, component) {
      props.onDragEnd(props.researchId);
    }
};

export const cardTarget = {
    hover(props, monitor, component){
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        if (dragIndex === hoverIndex) {
            return;
        }
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        props.moveCard(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
};


class SheetDraggableCard extends Component {
  render() {
     const { isDragging, connectDragSource, connectDropTarget } = this.props;
     const opacity = isDragging ? 0.5 : 1;
     return connectDragSource(connectDropTarget(
         <li style={{opacity}}>
           {this.props.children}
         </li>
     ));
 }
}

export default flow(DropTarget('CARD', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
})), DragSource('CARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
})))(SheetDraggableCard);
