import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import React,{Component} from 'react';
import {Flex} from '../styledComponents/containers';

class DNDContext extends Component {

    render() {
        return this.props.children
    }
}

export default DragDropContext(HTML5Backend)(DNDContext);
