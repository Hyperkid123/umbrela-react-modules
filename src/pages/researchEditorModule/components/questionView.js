import React,{Component} from 'react';

import {
  LABEL_LENGTH,
} from '../../../common/constants';

import {
  Flex,
  FlexSection
} from '../../../common/styledComponents/containers';
import {
  TextFieldComent
} from '../../../common/components/labels';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ActionDelete from 'material-ui-icons/DeleteForever';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  deleteQuestion,
  changeQuestionTitle,
  updateQuetionsInformation,
} from '../../../redux/actions';
import {DeleteNotification} from '../../../common/styledComponents/typography';

import QuestionBody from './questions/questionBody';

class QuestionView extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        showDelete: false
      };
    }

    componentDidMount() {
      if(this.props.activeQuestion && this.props.activeQuestion.newQuestion){
          this.questionTitle.focus();
          this.questionTitle.select();
      }
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.props.activeQuestion && this.props.activeQuestion.newQuestion){
          this.questionTitle.focus();
          this.questionTitle.select();
      }
    }

    handleDeleteOpen = () => {
      this.setState({showDelete: true});
    }

    handleDeleteClose = () => {
      this.setState({showDelete: false})
    }

    handleDeleteQuestion = () => {
      this.props.deleteQuestion(this.props.activeQuestion.questionId)
      this.setState({showDelete: false});
    }

    render() {
      if(this.props.activeQuestion) {
        return (
          <FlexSection autoHeight>
            <Flex column>
              <Paper square style={{padding: 10}}>
                <Flex grow baseline>
                  <Flex column grow>
                    <TextField
                      name="questionTitleInput"
                      style={{width: 'auto', marginRight: 15}}
                      value={this.props.activeQuestion.title}
                      onChange={(event) => this.props.changeQuestionTitle(event.target.value)}
                      onBlur={() => this.props.updateQuetionsInformation(this.props.activeQuestion)}
                      inputRef={(input) => this.questionTitle = input}
                      onKeyPress={(event) => {if(event.key === 'Enter') this.props.updateQuetionsInformation(this.props.activeQuestion)}}
                    />
                    <TextFieldComent
                      error={this.props.activeQuestion.title.length >= LABEL_LENGTH}
                      label={`${this.props.activeQuestion.title.length} z ${LABEL_LENGTH} znaků`}
                      alignRight
                    />
                  </Flex>
                  <Button raised onClick={this.handleDeleteOpen}>
                    <ActionDelete/>
                    Smazat otázku
                  </Button>
                </Flex>
                <QuestionBody questionType={this.props.activeQuestion.questionType}/>
              </Paper>
            </Flex>
            <Dialog
              open={this.state.showDelete}
              onClose={this.handleDeleteClose}
            >
              Smazat arch <DeleteNotification>{this.props.activeQuestion.title}</DeleteNotification>?
              <Button
                color='secondary'
                onClick={this.handleDeleteQuestion}
              >
                <ActionDelete/>
                Smazat
              </Button>
              <Button
                raised
                color='primary'
                onClick={this.handleDeleteClose}
              >
                Zpět
              </Button>
            </Dialog>
          </FlexSection>
        );
      } else {
        return null;
      }

    }
}

function mapStateToProps({editor, questions}) {
  return {
    activeSheet: editor.activeSheet,
    activeQuestion: questions.activeQuestion
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteQuestion,
    changeQuestionTitle,
    updateQuetionsInformation
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);
