/**
 * Created by rela on 27/06/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import flow from 'lodash/flow';
import {
  OrderQuestionItem
} from '../../../common/styledComponents/containers'

import SvgIcon from 'material-ui/SvgIcon';

const cardSource = {
    beginDrag(props){
        return {
            id: props.id,
            index: props.index,
        };
    },
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


const buttonStyle = {
    border: 'none',
    padding: 0,
    marginRight: 5,
};

const previewStyle = {
  display: 'inline-block'
}

class Card extends Component {
    render() {
        const { isDragging, connectDragSource, connectDropTarget, connectDragPreview } = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(connectDropTarget(
            <div style={{...opacity, textAlign: 'center'}}>
              {connectDragPreview(
                <span style={previewStyle}>
                  <OrderQuestionItem>
                    <SvgIcon style={buttonStyle} color='disabled'>
                      <path d="M13,11H18L16.5,9.5L17.92,8.08L21.84,12L17.92,15.92L16.5,14.5L18,13H13V18L14.5,16.5L15.92,17.92L12,21.84L8.08,17.92L9.5,16.5L11,18V13H6L7.5,14.5L6.08,15.92L2.16,12L6.08,8.08L7.5,9.5L6,11H11V6L9.5,7.5L8.08,6.08L12,2.16L15.92,6.08L14.5,7.5L13,6V11Z" />
                    </SvgIcon>
                    <span>
                      {this.props.option.optionTitle}
                    </span>
                  </OrderQuestionItem>
                </span>
              )}
            </div>
        ));
    }
}


Card.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    moveCard: PropTypes.func.isRequired,
    option: PropTypes.object.isRequired,
};

export default flow(DropTarget('CARD', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
})), DragSource('CARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})))(Card);
