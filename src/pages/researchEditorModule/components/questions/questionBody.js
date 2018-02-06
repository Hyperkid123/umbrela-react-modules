import React,{Component} from 'react';
import {Flex} from '../../../../common/styledComponents/containers';
import AppBar from 'material-ui/AppBar';

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
import Tabs, {Tab} from 'material-ui/Tabs';
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

    constructor(props){
    	super(props);
    	this.state = {
        tab: 0
      };
    }

    handleTabChange = (value) => {
      this.setState({tab: value});
    }

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
        const {tab} = this.state;
        return (
            <Flex column>
              <Chip style={{marginBottom: 5}} label={`Typ otázky: ${QuestionTypes[questionType]}`}/>
              <QuestionTypeChanger/>
              <AppBar color='default' position='static'>
                <Tabs
                  style={{marginTop: 5}}
                  value={tab}
                  onChange={(event, value) => this.handleTabChange(value)}
                  fullWidth
                  centered
                  indicatorColor='primary'
                  >
                    <Tab color='secondary' fullWidth label='Editace' icon={<ModeEditIcon/>}/>
                    {!HasNotOptions(questionType) ? <Tab fullWidth label='Náhled' icon={<PreviewIcon/>}/> : null}
                  </Tabs>
              </AppBar>
              {tab === 0 &&
                <Flex column> {hasCustomHelp ?
                    <TextField
                      name="customHelpInput"
                      fullWidth
                      multiline
                      value={customHelp}
                      onChange={(event) => this.props.changeCustomHelp(event.target.value)}
                      onBlur={() => this.props.updateQuetionsInformation(this.props.activeQuestion)}
                      label='Vlastní nápověda'
                      margin='normal'
                      inputRef={(input) => this.customHelpInput = input}
                    />
                    : null}
                  {HasScalePoints(questionType) ?
                    <TextField
                      name="customHelpInput"
                      fullWidth
                      margin='normal'
                      type='number'
                      value={scalePoints}
                      label='Celkový počet bodů'
                      onChange={(event) => this.props.changeScalePoints(event.target.value)}
                      onBlur={() => this.props.updateQuetionsInformation(this.props.activeQuestion)}
                      onKeyPress={(event) => {if(event.key === 'Enter') this.props.updateQuetionsInformation(this.props.activeQuestion)}}
                    />
                    : null}
                  {HasImagePreview(questionType) ?
                    <Flex column grow>
                      <TextField
                        margin='normal'
                        inputRef={(input) => { this.imagePreviewInput = input; }}
                        name="imagePreviewInput"
                        value={url || ''}
                        fullWidth
                        label='URL adresa k obrázku'
                        onChange={(event) => this.props.chnageQuestionUrl(event.target.value)}
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
                     </Flex>
              }
              {tab === 1 && <QuestionPreview/>}
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
