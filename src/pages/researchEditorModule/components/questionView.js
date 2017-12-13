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
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  deleteQuestion,
  changeQuestionTitle,
  updateQuetionsInformation,
} from '../../../redux/actions';

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
      const deleteAction = [
      <FlatButton
        label="Smazat"
        secondary
        icon={<ActionDelete/>}
        onClick={this.handleDeleteQuestion}
      />,
      <RaisedButton
        label="Zpět"
        primary={true}
        onClick={this.handleDeleteClose}
      />,
    ];
      if(this.props.activeQuestion) {
        return (
          <FlexSection autoHeight>
              <Paper rounded={false} style={{padding: 10}}>
                <Flex grow baseline>
                  <Flex column grow>
                    <TextField
                      ref={(input) => { this.questionTitle = input; }}
                      name="sheetTitleInput"
                      style={{width: 'auto', marginRight: 15}}
                      value={this.props.activeQuestion.title}
                      onChange={(event, newValue) => this.props.changeQuestionTitle(newValue)}
                      onBlur={() => this.props.updateQuetionsInformation(this.props.activeQuestion)}
                    />
                    <TextFieldComent
                      error={this.props.activeQuestion.title.length >= LABEL_LENGTH}
                      label={`${this.props.activeQuestion.title.length} z ${LABEL_LENGTH} znaků`}
                      alignRight
                    />
                  </Flex>
                    <RaisedButton onClick={this.handleDeleteOpen} secondary icon={<ActionDelete/>} label='Smazat otázku'/>
                </Flex>
              </Paper>
            <Dialog
              actions={deleteAction}
              modal={false}
              open={this.state.showDelete}
              onRequestClose={this.handleDeleteClose}
            >
              Smazat otázku?
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