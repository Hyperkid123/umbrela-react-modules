import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import {changeOptionTitle, synchronizeOption, dragOptionCard, remapOptions} from '../../../../redux/actions';
import {ValideOption, getOptionValidationMessage} from '../../../../common/validator';
import OptionsDraggableCard from './dragByHandle';

export class OptionEditorItem extends Component {

    updateOption = (option) => {
      if(ValideOption(option.title, this.props.questionType, option.optionType)) this.props.synchronizeOption(option)
    }

    render() {
      const {option} = this.props;
      const valid = ValideOption(option.title, this.props.questionType, option.optionType);
      const validMessage = getOptionValidationMessage(option.title, this.props.questionType, option.optionType)

      return (
        <OptionsDraggableCard
          id={option.optionId}
          index={this.props.index}
          key={option.optionId}
          moveCard={this.props.dragOptionCard}
          onDragEnd={() => this.props.remapOptions(this.props.questionId)}
          deleteOption={this.props.deleteOption}
        >
          <TextField
            name={`optionInput${option.optionId}`}
            value={option.title}
            placeholder='Text možnosti'
            fullWidth
            onChange={(event) => this.props.changeOptionTitle(event.target.value, option.optionOrder)}
            onBlur={() => {this.updateOption(option)}}
            onKeyPress={(event) => {if(event.key === 'Enter') this.updateOption(option)}}
            margin="normal"
            label={validMessage}
            error={!valid}
          />
        </OptionsDraggableCard>
      );
    }
}

const mapStateToProps = (_, initialProps) => ({questions, options}) => {
  return {
    questionType: questions.activeQuestion.questionType,
    questionId: questions.activeQuestion.questionId,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeOptionTitle,
    synchronizeOption,
    dragOptionCard,
    remapOptions,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionEditorItem)
