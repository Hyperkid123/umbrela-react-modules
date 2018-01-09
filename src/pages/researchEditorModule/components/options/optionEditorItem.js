import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import {changeOptionTitle, synchronizeOption} from '../../../../redux/actions';
import {ValideOption} from '../../../../common/validator';

class OptionEditorItem extends Component {

    updateOption = (option) => {
      if(ValideOption(option.title, this.props.questionType)) this.props.synchronizeOption(option)
    }

    render() {
      const {option} = this.props;
      return (
        <li key={option.optionId}>
          <TextField
            name={`optionInput${option.optionId}`}
            value={option.title}
            fullWidth
            onChange={(event, value) => this.props.changeOptionTitle(value, option.optionOrder)}
            onBlur={() => {this.updateOption(option)}}
            onKeyPress={(event) => {if(event.key === 'Enter') this.updateOption(option)}}
          />
        </li>
      );
    }
}

const mapStateToProps = (_, initialProps) => ({questions, options}) => {
  return{
    questionType: questions.activeQuestion.questionType,
    option: options.options[initialProps.optionOrder],
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeOptionTitle,
    synchronizeOption,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionEditorItem)
