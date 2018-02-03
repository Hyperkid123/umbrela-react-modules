import React,{Component} from 'react';
import {Flex} from '../../../../common/styledComponents/containers';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  changeCustomHelp,
  updateQuetionsInformation,
  chnageQuestionUrl,
  changeScalePoints,
} from '../../../../redux/actions';

import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import PreviewIcon from 'material-ui-icons/RemoveRedEye';

import {QuestionTypes, HasImagePreview, HasNotOptions, HasScalePoints} from '../../../../common/questionTypes';
import QuestionTypeChanger from './questionTypeChanger';
import {
  TextFieldComent
} from '../../../../common/components/labels';

import {
  validateUrl
} from '../../../../common/validator';

import QuestionPreview from './questionPreview';
import OptionsBody from '../options/optionsBody';

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
        const {questionType, customHelp, hasCustomHelp, url, scalePoints} = this.props.activeQuestion;
        return (
            <Flex column>
              <Chip style={{marginBottom: 5}}>
                Typ otázky: {QuestionTypes[questionType]}
              </Chip>
              <QuestionTypeChanger/>
              <Tabs style={{marginTop: 5}}>
                <Tab label='Editace' icon={<ModeEditIcon/>}>
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
                  {HasScalePoints(questionType) ?
                    <TextField
                      ref={(input) => { this.customHelpInput = input; }}
                      name="customHelpInput"
                      fullWidth
                      type='number'
                      value={scalePoints}
                      floatingLabelText='Celkový počet bodů'
                      onChange={(event, newValue) => this.props.changeScalePoints(newValue)}
                      onBlur={() => this.props.updateQuetionsInformation(this.props.activeQuestion)}
                      onKeyPress={(event) => {if(event.key === 'Enter') this.props.updateQuetionsInformation(this.props.activeQuestion)}}
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
                    {HasNotOptions(questionType) ?
                        <QuestionPreview/>
                       : <OptionsBody/>}
                </Tab>
                {!HasNotOptions(questionType) ?
                <Tab label='Náhled' icon={<PreviewIcon/>}>
                  <QuestionPreview/>
                </Tab> : null}
              </Tabs>
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
    changeScalePoints,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBody)
