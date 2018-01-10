import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex} from '../../../../common/styledComponents/containers';
import Checkbox from 'material-ui/Checkbox';

import {
  changeMandatoryQuestion,
  setCustomHelp,
  changeQuestionType
} from '../../../../redux/actions';

import  {
  SwitchToImagePreview,
  CanHaveImagePreview,
  HasImagePreview,
  CanHaveMultipleAnswers,
  SwitchQuestionMultipleAnswers,
  HasMultipleAnswers,
  CanHaveOpenQuestion,
  HasOpenQuestion,
  SwitchQuestionOpenOption,
  SwitchOptionToImage,
  HasOptionsAsImage,
  CanHaveOptionAsImage,
} from '../../../../common/questionTypes';

class QuestionTypeChanger extends Component {


    render() {
        const {mandatory, hasCustomHelp, questionType} = this.props.activeQuestion;
        const checkBoxStyle = {width: 'auto', whiteSpace: 'nowrap', marginRight: 10};
        return (
            <Flex row grow wrap='true'>
                <Checkbox disabled={this.props.disableChange} style={checkBoxStyle} label='Povinná' checked={mandatory} onCheck={(event, checked) => this.props.changeMandatoryQuestion(checked)}/>
                <Checkbox disabled={this.props.disableChange} style={checkBoxStyle} label='Vlastní nápověda' checked={hasCustomHelp} onCheck={(event, checked) => {this.props.setCustomHelp(checked)}}/>
                {CanHaveImagePreview(questionType) ?
                  <Checkbox disabled={this.props.disableChange} style={checkBoxStyle}
                    label='Obrázek v zadání'
                    checked={HasImagePreview(questionType)}
                    onCheck={() => this.props.changeQuestionType(SwitchToImagePreview[questionType])}
                  />
                   : null}
                {CanHaveMultipleAnswers(questionType) ?
                  <Checkbox disabled={this.props.disableChange} style={checkBoxStyle}
                    label='Více možností'
                    checked={HasMultipleAnswers(questionType)}
                    onCheck={() => this.props.changeQuestionType(SwitchQuestionMultipleAnswers[questionType])}
                  /> : null}
                {CanHaveOpenQuestion(questionType) ?
                  <Checkbox disabled={this.props.disableChange} style={checkBoxStyle}
                    label='Vlastní opodvěd'
                    checked={HasOpenQuestion(questionType)}
                    onCheck={() => this.props.changeQuestionType(SwitchQuestionOpenOption[questionType])}
                  />
                   : null}
                {CanHaveOptionAsImage(questionType) ?
                  <Checkbox disabled={this.props.disableChange} style={checkBoxStyle}
                    label='Možnosti jsou obrázky'
                    checked={HasOptionsAsImage(questionType)}
                    onCheck={() => this.props.changeQuestionType(SwitchOptionToImage[questionType])}
                  />
                  : null}
            </Flex>
        );
    }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeMandatoryQuestion,
    setCustomHelp,
    changeQuestionType
  },dispatch)
}


function mapStateToProps({questions}) {
  return{
    activeQuestion: questions.activeQuestion,
    disableChange: questions.isFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionTypeChanger);
