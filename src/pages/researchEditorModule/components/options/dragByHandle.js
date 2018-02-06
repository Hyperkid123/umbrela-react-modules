import React,{Component} from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import flow from 'lodash/flow';
import {findDOMNode} from 'react-dom';
import {OptionItemWrapper} from '../../../../common/styledComponents/containers';
import DragHandle from 'material-ui-icons/DragHandle';
import DeleteIcon from 'material-ui-icons/DeleteForever';
import IconButton from 'material-ui/IconButton';
import ReactTooltip from 'react-tooltip';
import red from 'material-ui/colors/red';

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
     return connectDragSource(connectDropTarget(
       <li style={{opacity}}>
         <OptionItemWrapper row grow >
           {this.props.children}
           {connectDragPreview(
             <div data-tip='tažením můžete změnit pořadí možností' data-for={`option-tooltip-${this.props.index}`}>
               <DragHandle style={{cursor: 'move', height: 48, marginLeft: 5}}/>
             </div>)}
           <IconButton onClick={this.props.deleteOption}>
             <DeleteIcon color='error' style={{height: 48}}/>
           </IconButton>
        </OptionItemWrapper>
        {!this.props.draggingElement ?
          <ReactTooltip id={`option-tooltip-${this.props.index}`} place="top" effect="solid" type="info" delayShow={300}/>
          : null}
       </li>
     ));
 }
}

export default flow(DropTarget('CARD', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
})), DragSource('CARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})))(OptionsDraggableCard);
