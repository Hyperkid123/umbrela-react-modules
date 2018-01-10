import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex, PreviewImage, CustomHelpWrapper, CustomHelpLine} from '../../../../common/styledComponents/containers';
import {FillQuestionheading} from '../../../../common/styledComponents/typography';
import {HasImagePreview, HasNotOptions, IsOrderQuestion} from '../../../../common/questionTypes';
import LazyLoad from 'react-lazyload';
import TextField from 'material-ui/TextField';
import {
  TextFieldComent
} from '../../../../common/components/labels';
import ClosePreview from './closePreview';
import OrderPreview from './orderPreview';
import {ANSWER_LENGTH} from '../../../../common/constants';


class QuestionPreview extends Component {

    constructor(props){
    	super(props);
    	this.state = {
        openAnswer: '',
      };
    }

    setOpenAnswer = (openAnswer) => {
      this.setState({openAnswer});
    }

    renderImagePreview = (url) => {
      return (
        <LazyLoad>
          <PreviewImage alt={url} src={url}/>
        </LazyLoad>
      );
    }

    renderCustomHelp = (customHelp) => {
      if(!customHelp) return null;
      return (
        <CustomHelpWrapper>
          {customHelp.split("\n").map((line, i) => <CustomHelpLine key={i}>{line}</CustomHelpLine>)}
        </CustomHelpWrapper>
      );
    }

    renderOpenOption = () => {
      return (
        <Flex column grow>
          <TextField value={this.state.openAnswer} onChange={(event, newValue) => this.setOpenAnswer(newValue)} fullWidth hintText='Napište odpověď'/>
          <TextFieldComent
            error={this.state.openAnswer.length > ANSWER_LENGTH}
            label={`${this.state.openAnswer.length} z ${ANSWER_LENGTH} znaků`}
            alignRight
          />
        </Flex>
      )
    }

    renderOptionsList = () => {
      const {questionType, title, options} = this.props.activeQuestion;
      if(IsOrderQuestion(questionType)){
        return <OrderPreview title={title} options={options}/>
      }
      return <ClosePreview
        title={title}
        options={options}
        questionType={questionType}/>
    }

    render() {
        const {url, questionType, title, customHelp} = this.props.activeQuestion;
        return (
            <Flex column>
                <FillQuestionheading>
                  {title}
                </FillQuestionheading>
                {HasImagePreview(questionType) ? this.renderImagePreview(url) : null}
                {this.renderCustomHelp(customHelp)}
                {HasNotOptions(questionType) ? this.renderOpenOption() : this.renderOptionsList()}
            </Flex>
        );
    }
}

function mapStateToProps({questions, options}) {
  return{
      activeQuestion: questions.activeQuestion,
      options: options.options
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPreview)
