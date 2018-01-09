import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex, OptionsList} from '../../../../common/styledComponents/containers';
import NewOption from './newOption';
import {getOptions, changeOptionTitle, synchronizeOption, deleteOption} from '../../../../redux/actions';
import {ValideOption} from '../../../../common/validator';
import {findOpenOption} from '../../../../common/utils';
import OptionEditorItem from './optionEditorItem';
import {HasOpenQuestion} from '../../../../common/questionTypes';
import TextField from 'material-ui/TextField';
import {
  TextFieldComent
} from '../../../../common/components/labels';
import {
  LABEL_LENGTH,
} from '../../../../common/constants';

class CloseOptionsEditor extends Component {

    componentWillMount() {
      this.props.getOptions(this.props.activeQuestion.questionId);
    }

    updateOption = (option) => {
      if(ValideOption(option.title, this.props.activeQuestion.questionType)) this.props.synchronizeOption(option)
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
              hintText='Vlastní opověď'
              value={option.title}
              onChange={(event, newValue) => this.props.changeOptionTitle(newValue, option.optionOrder)}
              onBlur={() => {this.updateOption(option)}}
              onKeyPress={(event) => {if(event.key === 'Enter') this.updateOption(option)}}
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