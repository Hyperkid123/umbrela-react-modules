import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex, PreviewImage, CustomHelpWrapper, CustomHelpLine} from '../../../../common/styledComponents/containers';
import {FillQuestionheading} from '../../../../common/styledComponents/typography';
import {HasImagePreview, HasNotOptions, IsOrderQuestion, HasScalePoints, IsMatrixQuestion} from '../../../../common/questionTypes';
import LazyLoad from 'react-lazyload';
import TextField from 'material-ui/TextField';
import {
  TextFieldComent
} from '../../../../common/components/labels';
import ClosePreview from './closePreview';
import OrderPreview from './orderPreview';
import DividePreview from './dividePreview';
import MatrixPreview from './matrixPreview';
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
          <TextField
            value={this.state.openAnswer}
            onChange={(event) => this.setOpenAnswer(event.target.value)}
            fullWidth
            placeholder='Napište odpověď'
            margin='normal'
          />
          <TextFieldComent
            error={this.state.openAnswer.length > ANSWER_LENGTH}
            label={`${this.state.openAnswer.length} z ${ANSWER_LENGTH} znaků`}
            alignRight
          />
        </Flex>
      )
    }

    renderOptionsList = () => {
      const {questionType, title, scalePoints} = this.props.activeQuestion;
      const options = this.props.options;
      if(IsOrderQuestion(questionType)){
        return <OrderPreview title={title} options={options}/>
      }
      if(HasScalePoints(questionType)){
         return <DividePreview title={title} options={options} scalePoints={scalePoints}/>
      }
      if(IsMatrixQuestion(questionType)) {
        return <MatrixPreview title={title} options={options} questionType={questionType}/>
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
