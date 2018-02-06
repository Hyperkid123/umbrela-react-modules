import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex} from '../../../../common/styledComponents/containers';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';

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
              <FormGroup row style={{paddingLeft: 14}}>
              <FormControlLabel
                control={
                  <Checkbox disabled={this.props.disableChange} style={checkBoxStyle} checked={mandatory} onChange={(event, checked) => this.props.changeMandatoryQuestion(checked)}/>
                }
                label='Povinná'
              />
              <FormControlLabel
                control={
                  <Checkbox disabled={this.props.disableChange} style={checkBoxStyle} checked={hasCustomHelp} onChange={(event, checked) => {this.props.setCustomHelp(checked)}}/>
                }
                label='Vlastní nápověda'
              />
                {CanHaveImagePreview(questionType) ?
                  <FormControlLabel
                    control={
                      <Checkbox disabled={this.props.disableChange} style={checkBoxStyle}
                        checked={HasImagePreview(questionType)}
                        onChange={() => this.props.changeQuestionType(SwitchToImagePreview[questionType])}
                      />
                    }
                    label='Obrázek v zadání'
                  />
                   : null}
                {CanHaveMultipleAnswers(questionType) ?
                  <FormControlLabel
                    control={
                      <Checkbox disabled={this.props.disableChange} style={checkBoxStyle}
                        checked={HasMultipleAnswers(questionType)}
                        onChange={() => this.props.changeQuestionType(SwitchQuestionMultipleAnswers[questionType])}
                      />
                    }
                    label='Více možností'
                  /> : null}
                {CanHaveOpenQuestion(questionType) ?
                  <FormControlLabel
                    control={
                      <Checkbox disabled={this.props.disableChange} style={checkBoxStyle}
                        checked={HasOpenQuestion(questionType)}
                        onChange={() => this.props.changeQuestionType(SwitchQuestionOpenOption[questionType])}
                      />
                    }
                    label='Vlastní opodvěd'
                  />
                   : null}
                {CanHaveOptionAsImage(questionType) ?
                  <FormControlLabel
                    control={
                      <Checkbox disabled={this.props.disableChange} style={checkBoxStyle}
                        checked={HasOptionsAsImage(questionType)}
                        onChange={() => this.props.changeQuestionType(SwitchOptionToImage[questionType])}
                      />
                    }
                    label='Možnosti jsou obrázky'
                  />
                  : null}
                </FormGroup>
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
