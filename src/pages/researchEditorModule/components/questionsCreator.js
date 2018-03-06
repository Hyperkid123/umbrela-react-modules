import React,{Component} from 'react';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';
import ActionAdd from 'material-ui-icons/Add';
import {
  Flex
} from '../../../common/styledComponents/containers';

import {
  BaseTypes,
} from '../../../common/questionTypes';


import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createNewQuestion,
} from '../../../redux/actions';

import QuestionMenu from './questionMenu';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

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
          key={i}
          onClick={() => this.handleCreateNewQuestion(type)}
        >
          {this.props.translate(`questions.baseTypes.${type}`)}
        </MenuItem>
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
                <Button onClick={this.handleClick}>
                  <ActionAdd/>
                  {this.props.translate('questions.addQuestion')}
                </Button>
                  <Menu
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleRequestClose}
                    >
                    {this.renderBaseQuestionTypes()}
                  </Menu>
              </Flex>
                <Flex column>
                  <QuestionMenu/>
                </Flex>
            </Flex>
        );
    }
}

function mapStateToProps({editor, locale}) {
  return {
    activeSheetId: editor.activeSheet ? editor.activeSheet.sheetId : null,
    researchId: editor.researchId,
    translate: getTranslate(locale),
    currentLanguage: getActiveLanguage(locale).code,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createNewQuestion,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsCreator)
