import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex, PreviewImage} from '../../../../common/styledComponents/containers';
import {SmallHeading, FillQuestionheading, CustomHelp} from '../../../../common/styledComponents/typography';
import {QuestionTypes, HasImagePreview, HasNotOptions} from '../../../../common/questionTypes';
import LazyLoad from 'react-lazyload';
import TextField from 'material-ui/TextField';
import {
  TextFieldComent
} from '../../../../common/components/labels';
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
      return <CustomHelp>{customHelp}</CustomHelp>;
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
      return null;
    }

    render() {
        const {url, questionType, title, customHelp} = this.props.activeQuestion;
        return (
            <Flex column>
                <SmallHeading>
                  Náhled
                </SmallHeading>
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

function mapStateToProps({questions}) {
  return{
      activeQuestion: questions.activeQuestion,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPreview)
