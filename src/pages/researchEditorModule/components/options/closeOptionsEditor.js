import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex, OptionsList} from '../../../../common/styledComponents/containers';
import NewOption from './newOption';
import {getOptions, changeOptionTitle, synchronizeOption} from '../../../../redux/actions';
import TextField from 'material-ui/TextField';
import {ValideOption} from '../../../../common/validator';

class CloseOptionsEditor extends Component {

    componentWillMount() {
      this.props.getOptions(this.props.activeQuestion.questionId);
    }

    renderOptions = (options) => {
      return this.props.options.map((option) => {
        return (
          <li key={option.optionId}>
            <TextField
              name={`optionInput${option.optionId}`}
              value={option.title}
              onChange={(event, value) => this.props.changeOptionTitle(value, option.optionOrder)}
              onBlur={() => {
                if(ValideOption(option.title, this.props.activeQuestion.questionType)) this.props.synchronizeOption(option)
                }
              }
            />
          </li>
        );
      })
    }

    render() {
        const {options} = this.props.activeQuestion;
        return (
            <Flex column>
              <OptionsList>
                {this.renderOptions(options)}
              </OptionsList>
              <NewOption optionType='NormalOption'/>
            </Flex>
        );
    }
}

function mapStateToProps({questions, options}) {
  return{
    activeQuestion: questions.activeQuestion,
    options: options.options,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getOptions,
    changeOptionTitle,
    synchronizeOption,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CloseOptionsEditor)
