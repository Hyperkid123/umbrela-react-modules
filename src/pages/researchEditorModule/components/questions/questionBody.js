import React,{Component} from 'react';
import {Flex} from '../../../../common/styledComponents/containers';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  changeCustomHelp,
  updateQuetionsInformation,
  chnageQuestionUrl,
} from '../../../../redux/actions';

import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';

import {QuestionTypes, HasImagePreview} from '../../../../common/questionTypes';
import QuestionTypeChanger from './questionTypeChanger';
import {
  TextFieldComent
} from '../../../../common/components/labels';

import {
  validateUrl
} from '../../../../common/validator';

class QuestionBody extends Component {

    componentDidUpdate(prevProps, prevState) {
      const {activeQuestion} = this.props;
        if(activeQuestion.hasCustomHelp && activeQuestion.hasCustomHelp !== prevProps.activeQuestion.hasCustomHelp){
            this.customHelpInput.focus();
            this.customHelpInput.select();
        }
        if(HasImagePreview(activeQuestion.questionType) && !HasImagePreview(prevProps.activeQuestion.questionType)) {
            this.imagePreviewInput.focus();
            this.imagePreviewInput.select();
        }
    }

    render() {
        const {questionType, customHelp, hasCustomHelp, url} = this.props.activeQuestion;;
        return (
            <Flex column>
              <Chip>
                Typ otázky: {QuestionTypes[questionType]}
              </Chip>
              <QuestionTypeChanger/>
              {hasCustomHelp ?
                <TextField
                  ref={(input) => { this.customHelpInput = input; }}
                  name="customHelpInput"
                  fullWidth
                  multiLine
                  value={customHelp}
                  onChange={(event, newValue) => this.props.changeCustomHelp(newValue)}
                  onBlur={() => this.props.updateQuetionsInformation(this.props.activeQuestion)}
                  floatingLabelText='Vlastní nápověda'
                />
                : null}
              {HasImagePreview(questionType) ?
                <Flex column grow>
                  <TextField
                    ref={(input) => { this.imagePreviewInput = input; }}
                    name="imagePreviewInput"
                    multiLine
                    value={url || ''}
                    fullWidth
                    floatingLabelText='URL adresa k obrázku'
                    onChange={(event, newValue) => this.props.chnageQuestionUrl(newValue)}
                    onBlur={() => this.props.updateQuetionsInformation(this.props.activeQuestion)}
                  />
                  <TextFieldComent
                    error={!validateUrl(url)}
                    label={validateUrl(url) ? null : 'Toto není validní URL adresa!'}
                    alignRight
                  />
                </Flex>
                 : null}
            </Flex>
        );
    }
}

function mapStateToProps({questions}) {
  return{
    activeQuestion: questions.activeQuestion
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeCustomHelp,
    updateQuetionsInformation,
    chnageQuestionUrl,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBody)
