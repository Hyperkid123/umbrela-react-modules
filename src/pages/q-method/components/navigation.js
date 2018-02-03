import React,{Component} from 'react';
import {
  NavLink
} from 'react-router-dom';
import EditIcon from 'material-ui-icons/ModeEdit';
import Upload from 'material-ui-icons/CloudUpload';
import Button from 'material-ui/Button';
import { withRouter } from 'react-router'
import {Flex} from '../../../common/styledComponents/containers';

export class Navigation extends Component {

    render() {
        return (
            <Flex>
              <NavLink exact strict activeClassName='active-link' to='/'>
                <Button>
                  <EditIcon/>&nbsp;
                  Editor
                </Button>
              </NavLink>
              <NavLink exact strict activeClassName='active-link' to='/upload'>
                <Button>
                  <Upload/>&nbsp;
                  Nahrát stimuly
                </Button>
              </NavLink>
            </Flex>
        );
    }
}

export default withRouter(Navigation)
