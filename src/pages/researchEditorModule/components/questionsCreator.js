import React,{Component} from 'react';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
import ActionAdd from 'material-ui-icons/Add';
import {
  Flex
} from '../../../common/styledComponents/containers';

import {
  BaseTypes,
  QuestionTypes,
} from '../../../common/questionTypes';


import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createNewQuestion,
} from '../../../redux/actions';

import QuestionMenu from './questionMenu';

class QuestionsCreator extends Component {

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

    renderBaseQuestionTypes = () => {
      return BaseTypes.map((type, i) => {
        return <MenuItem
          primaryText={QuestionTypes[type]}
          key={i}
          onClick={() => this.handleCreateNewQuestion(type)}
        />
      })
    }

    handleCreateNewQuestion = (type) => {
      this.props.createNewQuestion(this.props.researchId, this.props.activeSheetId, type);
      this.handleRequestClose();
    }


    render() {
        return (
            <Flex column>
              <Flex>
                <Button onClick={this.handleClick} icon={<ActionAdd/>}label='Přidat otázku'/>
                <Popover
                  open={this.state.open}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={this.state.anchorOrigin}
                  targetOrigin={this.state.targetOrigin}
                  onRequestClose={this.handleRequestClose}
                  >
                    <Menu>
                      {this.renderBaseQuestionTypes()}
                    </Menu>
                  </Popover>
              </Flex>
                <Flex column>
                  <QuestionMenu/>
                </Flex>
            </Flex>
        );
    }
}

function mapStateToProps({editor}) {
  return {
    activeSheetId: editor.activeSheet ? editor.activeSheet.sheetId : null,
    researchId: editor.researchId,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createNewQuestion,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsCreator)
