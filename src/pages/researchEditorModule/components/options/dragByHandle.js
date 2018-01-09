import React,{Component} from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import flow from 'lodash/flow';
import {findDOMNode} from 'react-dom';
import {Flex} from '../../../../common/styledComponents/containers';

const handleStyle = {
	backgroundColor: 'green',
	width: '1rem',
	height: '1rem',
	display: 'inline-block',
	marginRight: '0.75rem',
	cursor: 'move',
}

const cardSource = {
    beginDrag(props){
        return {
            id: props.id,
            index: props.index,
        };
    },
    endDrag(props, monitor, component) {
      props.onDragEnd(props.questionId);      
    }
};

const cardTarget = {
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


class OptionsDraggableCard extends Component {
  render() {
     const { isDragging, connectDragSource, connectDropTarget, connectDragPreview} = this.props;
     const opacity = isDragging ? 0.5 : 1;
     return connectDragSource(connectDropTarget(connectDragPreview(
       <li style={{opacity}}>
        <Flex row grow>
         {this.props.children}
			   {connectDragPreview(<div style={handleStyle} />)}
        </Flex>
       </li>
     )));
 }
}

export default flow(DropTarget('CARD', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
})), DragSource('CARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})))(OptionsDraggableCard);
