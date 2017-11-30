import React,{Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
import ActionAdd from 'material-ui/svg-icons/content/add';
import {
  Flex
} from '../../../common/styledComponents/containers';

export default class QuestionsCreator extends Component {

    constructor(props){
    	super(props);
      this.state = {
        open: false,
        anchorOrigin: {
          horizontal: 'left',
          vertical: 'bottom',
        },
        targetOrigin: {
          horizontal: 'left',
          vertical: 'top',
        },
      };
    }

    handleClick = (event) => {
      event.preventDefault();
      this.setState({
        open: true,
        anchorEl: event.currentTarget,
      });
    };

    handleRequestClose = () => {
      this.setState({
        open: false,
      });
    };


    render() {
        return (
            <Flex>
                <FlatButton onClick={this.handleClick} icon={<ActionAdd/>}label='Přidat otázku'/>
                <Popover
                  open={this.state.open}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={this.state.anchorOrigin}
                  targetOrigin={this.state.targetOrigin}
                  onRequestClose={this.handleRequestClose}
                >
                  <Menu>
                    <MenuItem primaryText="Otevřená"/>
                    <MenuItem primaryText="Uzavřená"/>
                    <MenuItem primaryText="Uzavřená s obrázek v zadání"/>
                    <MenuItem primaryText="Maticová"/>
                    <MenuItem primaryText="Seřazovací"/>
                    <MenuItem primaryText="Rozdělovací"/>
                  </Menu>
                </Popover>
            </Flex>
        );
    }
}
