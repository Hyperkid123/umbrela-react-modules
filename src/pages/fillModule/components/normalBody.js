/**
 * Created by rela on 26/06/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

import RadioChecked from 'material-ui-icons/RadioButtonChecked';
import RadioUnchecked from 'material-ui-icons/RadioButtonUnchecked';
import CheckBoxChecked from 'material-ui-icons/CheckBox';
import CheckBoxUncheck from 'material-ui-icons/CheckBoxOutlineBlank';
import Button from 'material-ui/Button';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { OptionTypes } from '../../../common/optionTypes';
import { FormControlLabel } from 'material-ui/Form';
import {
  Flex,
  PreviewImageContainer,
  PreviewImage,
  FullImage
} from '../../../common/styledComponents/containers';
import {ANSWER_LENGTH, PREVIEW_SWITCH_STYLE} from '../../../common/constants';
import LazyLoad from 'react-lazyload';
import {
  TextFieldComent
} from '../../../common/components/labels';

import {
  answerCloseOpenQuestion,
  answerOptionAnswer,
  answerMultiQuestion
} from '../../../redux/actions';

import {
    HasMultipleAnswers,
    HasOptionsAsImage,
} from '../../../common/questionTypes';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

class NormalBody extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
            imageUrl: this.props.option.optionTitle
        };
    }
    handleOpen = () => {
        this.setState({modalOpen: true});
    };

    handleClose = () => {
        this.setState({modalOpen: false});
    };

    componentWillReceiveProps() {
        this.setState({modalOpen: false});
    }

    getOpenValue = () => {
        if (this.props.answer) {
            return this.props.answer.openAnswer || '';
        }
        else {
            return '';
        }
    };

    getSingleValue = () => {
        if (this.props.answer) {
            const answer = this.props.answer;
            return parseInt(answer.optionId, 10) === this.props.option.optionId;
        }
        return false;
    };

    getMultiValue = () => {
        if (this.props.answer) {
            const answer = this.props.answer;
            let result = false;
            if (answer.options) {
                answer.options.forEach((option) => {
                    if (option === this.props.option.optionId) result = true;
                });
            }
            return result;
        }
        return false;

    };

    renderOptionRow = () => {
      const checkedIcon = HasMultipleAnswers(this.props.questionType) ? <CheckBoxChecked/> : <RadioChecked/>;
      const uncheckedIcon = HasMultipleAnswers(this.props.questionType) ? <CheckBoxUncheck/> : <RadioUnchecked/>;
      if (OptionTypes.OpenOption === this.props.option.optionType) return this.renderOpenOption();
      if (HasOptionsAsImage(this.props.questionType)) return this.renderImageOptions(checkedIcon, uncheckedIcon)
      return this.renderNormalOption(checkedIcon, uncheckedIcon);
    };

    renderImageOptions = (checkedIcon, uncheckedIcon) => {
        const { option } = this.props
        if(option.optionType === 'NormalOption'){
          return (
            <Flex key={option.optionId}>
              <Checkbox
                style={PREVIEW_SWITCH_STYLE}
                checkedIcon={checkedIcon}
                icon={uncheckedIcon}
                onChange={(event, isInputChecked) => this.handleOptionAnswer(this.props.questionId, option.optionId, isInputChecked)}
                checked={this.getCheckedValue()}
              />
              <PreviewImageContainer>
                <LazyLoad>
                  <PreviewImage onClick={this.handleOpen} src={option.optionTitle} alt={option.optionTitle}/>
                </LazyLoad>
              </PreviewImageContainer>
            </Flex>
          )
        }
        return null;
    }

    renderNormalOption = (checkedIcon, uncheckedIcon) => {
      const { option } = this.props;
      if(option.optionType === 'NormalOption'){
        return (
          <FormControlLabel
            key={option.optionId}
            control={
              <Checkbox
                checkedIcon={checkedIcon}
                icon={uncheckedIcon}
                onChange={(event, isInputChecked) => this.handleOptionAnswer(this.props.questionId, option.optionId, isInputChecked)}
                checked={this.getCheckedValue()}
              />
            }
            label={option.optionTitle}
          />
        )
      }
      return null;
    }
    renderOpenOption = () => {
      const openValue = this.getOpenValue();
      return (
        <Flex column grow>
          <TextField
            value={openValue}
            label={this.props.option.optionTitle}
            multiline
            fullWidth
            style={{flexGrow: 1}}
            name={`open_option_${this.props.option.optionId}`}
            onChange={(event) => this.props.answerCloseOpenQuestion(this.props.questionId, this.props.option.optionId, event.target.value)}
            type="text"
           />
           <TextFieldComent
             error={openValue.length > ANSWER_LENGTH}
             label={`${openValue.length} z ${ANSWER_LENGTH} znaků`}
             alignRight
           />
        </Flex>
        );
    }

    handleOptionAnswer = (questionId, optionId, isInputChecked) => {
      if(HasMultipleAnswers(this.props.questionType)) {
        this.props.answerMultiQuestion(questionId, optionId, isInputChecked)
      } else {
        this.props.answerOptionAnswer(questionId, optionId, isInputChecked)
      }
    }

    getCheckedValue = () => {
      if(HasMultipleAnswers(this.props.questionType)) {
        return this.getMultiValue()
      } else {
        return this.getSingleValue()
      }
    }

    handleAnswerSingleChoice(questionId, optionId, isInputChecked) {
        if(isInputChecked) {
            this.props.answerOptionAnswer(questionId, optionId, isInputChecked);
        }
    }

    render() {
        return (
          <Flex column>
            {this.renderOptionRow()}
            <Dialog
              open={this.state.modalOpen}
              onClose={this.handleClose}
              fullScreen
            >
              <DialogContent>
                <DialogTitle>Náhled</DialogTitle>
                <LazyLoad>
                  <FullImage src={this.state.imageUrl}/>
                </LazyLoad>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose}>
                  Zavřít
                </Button>
              </DialogActions>
            </Dialog>
          </Flex>

        );
    }
}

function mapStateToProps({answers}, initialProps) {
  return{
    answer: answers[initialProps.questionId]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    answerCloseOpenQuestion,
    answerOptionAnswer,
    answerMultiQuestion,
  },dispatch)
}

/**Option.propTypes = {
    answer: PropTypes.object,
    questionId: PropTypes.number.isRequired,
    option: PropTypes.object.isRequired,
    questionType: PropTypes.string.isRequired,
    answerCloseOpenQuestion: PropTypes.func.isRequired,
    answerMultiQuestion: PropTypes.func.isRequired,
    answerOptionAnswer: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
};*/

export default connect(mapStateToProps, mapDispatchToProps)(NormalBody)
