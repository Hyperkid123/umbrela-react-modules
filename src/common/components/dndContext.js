import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import React,{Component} from 'react';
import {Flex} from '../styledComponents/containers';

class DNDContext extends Component {

    render() {
        return (
            <Flex grow>
                {this.props.children}
            </Flex>
        );
    }
}

export default DragDropContext(HTML5Backend)(DNDContext);
