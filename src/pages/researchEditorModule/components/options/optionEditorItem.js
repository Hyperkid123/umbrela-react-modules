import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import {changeOptionTitle, synchronizeOption, dragOptionCard, remapOptions} from '../../../../redux/actions';
import {ValideOption} from '../../../../common/validator';
import OptionsDraggableCard from './dragByHandle';

class OptionEditorItem extends Component {

    updateOption = (option) => {
      if(ValideOption(option.title, this.props.questionType)) this.props.synchronizeOption(option)
    }

    render() {
      const {option} = this.props;
      console.log('reder');
      return (
        <OptionsDraggableCard
          id={option.optionId}
          index={this.props.index}
          key={option.optionId}
          moveCard={this.props.dragOptionCard}
          onDragEnd={() => this.props.remapOptions(this.props.questionId)}
        >
          <TextField
            name={`optionInput${option.optionId}`}
            value={option.title}
            fullWidth
            onChange={(event, value) => this.props.changeOptionTitle(value, option.optionOrder)}
            onBlur={() => {this.updateOption(option)}}
            onKeyPress={(event) => {if(event.key === 'Enter') this.updateOption(option)}}
          />
        </OptionsDraggableCard>
      );
    }
}

const mapStateToProps = (_, initialProps) => ({questions, options}) => {
  return{
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
