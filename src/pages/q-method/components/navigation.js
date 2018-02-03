import React,{Component} from 'react';
import {
  NavLink
} from 'react-router-dom';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import Upload from 'material-ui/svg-icons/file/cloud-upload';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router'
import {Flex} from '../../../common/styledComponents/containers';

class Navigation extends Component {

    render() {
        return (
            <Flex>
              <NavLink exact strict activeClassName='active-link' to='/'>
                <FlatButton label='Editor' icon={<EditIcon/>}/>
              </NavLink>
              <NavLink exact strict activeClassName='active-link' to='/upload'>
                <FlatButton label='Nahrát stimuly' icon={<Upload/>}/>
              </NavLink>
            </Flex>
        );
    }
}

export default withRouter(Navigation)
