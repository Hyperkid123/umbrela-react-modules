import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex} from '../../../../common/styledComponents/containers';
import TextField from 'material-ui/TextField';
import {
  TextFieldComent
} from '../../../../common/components/labels';
import ContentAdd from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import {
  LABEL_LENGTH,
} from '../../../../common/constants';
import {getNewOptionOrder} from '../../../../common/utils';
import {ValideOption} from '../../../../common/validator';
import {synchronizeOption} from '../../../../redux/actions';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

export class NewOption extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        optionText: ''
      };
    }

    setOptionText = (optionText) => {
      this.setState({optionText});
    }

    createOption = () => {
      const {optionText} = this.state;
      if(ValideOption(optionText, this.props.activeQuestion.questionType, this.props.optionType)){
        const option = {
          title: optionText,
          questionId: this.props.activeQuestion.questionId,
          optionOrder: getNewOptionOrder(this.props.options, this.props.activeQuestion.questionType),
          optionType: this.props.optionType,
          new: true,
        }
        this.props.synchronizeOption(option)
        this.setState({optionText: ''})
      }
    }

    render() {
      const {translate} = this.props;
        const {optionText} = this.state;
        return (
            <Flex grow>
              <Flex column>
                <TextField
                  fullWidth
                  placeholder={this.props.placeholder || translate('options.newOption')}
                  value={optionText}
                  onChange={(event) => this.setOptionText(event.target.value)}
                  onBlur={this.createOption}
                  onKeyPress={(event) => {
                    if(event.key === 'Enter') this.createOption()
                  }}
                  margin='normal'
                />
                <TextFieldComent
                  error={optionText.length > LABEL_LENGTH}
                  label={`${optionText.length} ${translate('common.from')} ${LABEL_LENGTH} ${translate('common.characters')}`}
                  alignRight
                />
              </Flex>
              <IconButton
                onClick={this.createOption}
                tooltip={translate('options.addOption')}
              >
                <ContentAdd/>
              </IconButton>
            </Flex>
        );
    }
}

function mapStateToProps({questions, options, locale}) {
  return{
    activeQuestion: questions.activeQuestion,
    options: options.options,
    translate: getTranslate(locale),
    currentLanguage: getActiveLanguage(locale).code,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    synchronizeOption
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOption)
