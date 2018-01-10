import React,{Component} from 'react';
import {Flex, OptionsFillListWrapper,PreviewImageContainer, PreviewImage} from '../../../../common/styledComponents/containers';
import {HasMultipleAnswers, HasOptionsAsImage} from '../../../../common/questionTypes';
import RadioChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import CheckBoxChecked from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxUncheck from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import Checkbox from 'material-ui/Checkbox';
import {findOpenOption} from '../../../../common/utils';
import TextField from 'material-ui/TextField';
import {
  TextFieldComent
} from '../../../../common/components/labels';
import {ANSWER_LENGTH, PREVIEW_SWITCH_STYLE} from '../../../../common/constants';
import LazyLoad from 'react-lazyload';

export default class ClosePreview extends Component {

    constructor(props){
    	super(props);
    	this.state = {
        openAnswer: '',
      };
    }

    setOpenAnswer = (openAnswer) => {
      this.setState({openAnswer});
    }
    renderOptions = () => {
      const checkedIcon = HasMultipleAnswers(this.props.questionType) ? <CheckBoxChecked/> : <RadioChecked/>;
      const uncheckedIcon = HasMultipleAnswers(this.props.questionType) ? <CheckBoxUncheck/> : <RadioUnchecked/>;
      if(HasOptionsAsImage(this.props.questionType)) return this.renderImageOptions(checkedIcon, uncheckedIcon);
      return this.props.options.map((option) => {
        if(option.optionType === 'NormalOption'){
          return <Checkbox key={option.optionId} label={option.title} checkedIcon={checkedIcon} uncheckedIcon={uncheckedIcon}/>
        }
        return null;
      });
    }

    renderImageOptions = (checkedIcon, uncheckedIcon) => {
      return this.props.options.map((option) => {
        if(option.optionType === 'NormalOption'){
          return (
            <Flex key={option.optionId}>
              <Checkbox style={PREVIEW_SWITCH_STYLE} checkedIcon={checkedIcon} uncheckedIcon={uncheckedIcon}/>
              <PreviewImageContainer>
                <LazyLoad>
                  <PreviewImage src={option.title} alt={option.title}/>
                </LazyLoad>
              </PreviewImageContainer>
            </Flex>
          )
        }
        return null;
      });
    }

    renderOpenOption = () => {
      const openOption = findOpenOption(this.props.options);
      if(openOption) {
          return (
            <Flex column grow>
              <TextField
                value={this.state.openAnswer}
                onChange={(event, newValue) => this.setOpenAnswer(newValue)}
                fullWidth
                floatingLabelText={openOption.title}
              />
              <TextFieldComent
                error={this.state.openAnswer.length > ANSWER_LENGTH}
                label={`${this.state.openAnswer.length} z ${ANSWER_LENGTH} znaků`}
                alignRight
              />
            </Flex>
      )}
      return null;
    }

    render() {
        return (
          <Flex column>
            <OptionsFillListWrapper column>
              {this.renderOptions()}
              {this.renderOpenOption()}
            </OptionsFillListWrapper>
          </Flex>
        );
    }
}
