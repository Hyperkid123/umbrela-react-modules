import React,{Component} from 'react';

import {
  LABEL_LENGTH,
} from '../../../common/constants';
import Grid from 'material-ui/Grid';
import {
  CardWrapper,
  CardControlls,
  CardBody,
  InputHeader
} from '../../../common/styledComponents/card';
import {
  TextFieldComent
} from '../../../common/components/labels';

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
import Input, { InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import EditIcon from 'material-ui-icons/ModeEdit';

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
          <Grid item xs={12}>
            <CardWrapper>
              <InputHeader>
                <FormControl fullWidth>
                  <Input
                    name="questionTitleInput"
                    fullWidth
                    value={this.props.activeQuestion.title}
                    onChange={(event) => this.props.changeQuestionTitle(event.target.value)}
                    onBlur={() => this.props.updateQuetionsInformation(this.props.activeQuestion)}
                    inputRef={(input) => this.questionTitle = input}
                    onKeyPress={(event) => {if(event.key === 'Enter') this.props.updateQuetionsInformation(this.props.activeQuestion)}}
                    startAdornment={<InputAdornment position='start'><EditIcon/></InputAdornment>}
                  />
                </FormControl>
              </InputHeader>
                <TextFieldComent
                  error={this.props.activeQuestion.title.length >= LABEL_LENGTH}
                  label={`${this.props.activeQuestion.title.length} z ${LABEL_LENGTH} znaků`}
                  alignRight
                />
              <CardControlls>
                <Grid container spacing={0} justify="flex-end" direction="row">
                  <Grid item>
                    <Button raised onClick={this.handleDeleteOpen}>
                      <ActionDelete/>
                      Smazat otázku
                    </Button>
                  </Grid>
                </Grid>
              </CardControlls>
              <CardBody>
                  <QuestionBody questionType={this.props.activeQuestion.questionType}/>
              </CardBody>
            </CardWrapper>
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
          </Grid>
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
