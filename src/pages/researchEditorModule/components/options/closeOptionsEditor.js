import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex, OptionsList} from '../../../../common/styledComponents/containers';
import NewOption from './newOption';
import {getOptions, changeOptionTitle, synchronizeOption, deleteOption} from '../../../../redux/actions';
import {ValideOption} from '../../../../common/validator';
import {findOpenOption} from '../../../../common/utils';
import OptionEditorItem from './optionEditorItem';
import TextField from 'material-ui/TextField';
import {
  TextFieldComent
} from '../../../../common/components/labels';
import {
  LABEL_LENGTH,
} from '../../../../common/constants';

export class CloseOptionsEditor extends Component {

    componentWillMount() {
      this.props.getOptions(this.props.activeQuestion.questionId);
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.activeQuestion.questionId !== this.props.activeQuestion.questionId) {
        this.props.getOptions(nextProps.activeQuestion.questionId);
      }
    }

    updateOption = (option) => {
      if(ValideOption(option.title, this.props.activeQuestion.questionType, option.optionType)) this.props.synchronizeOption(option)
    }

    renderOptions = (options) => {
      return this.props.options.map((option, index) => {
        if(option.optionType === 'NormalOption') {
          return <OptionEditorItem
            draggingElement={this.props.draggingElement}
            option={option}
            index={index}
            key={option.optionId}
            optionOrder={option.optionOrder}
            deleteOption={() => this.props.deleteOption(option)}
          />;
        }
        return null;
      })
    }

    renderOpenOption = () => {
      const option = findOpenOption(this.props.options);
      if(option) {
        return (
          <Flex column>
            <TextField
              fullWidth
              placeholder='Vlastní opověď'
              value={option.title}
              onChange={(event) => this.props.changeOptionTitle(event.target.value, option.optionOrder)}
              onBlur={() => {this.updateOption(option)}}
              onKeyPress={(event) => {if(event.key === 'Enter') this.updateOption(option)}}
              margin='normal'
            />
            <TextFieldComent
              error={option.title.length > LABEL_LENGTH}
              label={`${option.title.length} z ${LABEL_LENGTH} znaků`}
              alignRight
            />
          </Flex>
        )
      }
      return null;
    }

    render() {
        const {options} = this.props.activeQuestion;
        return (
            <Flex column>
              <OptionsList>
                {this.renderOptions(options)}
              </OptionsList>
              {this.renderOpenOption()}
              <NewOption optionType='NormalOption'/>
            </Flex>
        );
    }
}

function mapStateToProps({questions, options, ui}) {
  return{
    activeQuestion: questions.activeQuestion,
    options: options.options,
    draggingElement: ui.dragging,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getOptions,
    changeOptionTitle,
    synchronizeOption,
    deleteOption,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CloseOptionsEditor)
