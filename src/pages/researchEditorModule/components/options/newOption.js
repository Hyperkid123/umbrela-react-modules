import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex} from '../../../../common/styledComponents/containers';
import TextField from 'material-ui/TextField';
import {
  TextFieldComent
} from '../../../../common/components/labels';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import {LABEL_LENGTH} from '../../../../common/constants';
import {getNewOptionOrder} from '../../../../common/utils';
import {grey500} from 'material-ui/styles/colors';
import {ValideOption} from '../../../../common/validator';
import {synchronizeOption} from '../../../../redux/actions';

class NewOption extends Component {
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
      if(ValideOption(optionText, this.props.activeQuestion.questionType)){
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
        const {optionText} = this.state;
        return (
            <Flex>
                <Flex column grow>
                  <TextField
                    fullWidth
                    hintText='Nová možnost'
                    value={optionText}
                    onChange={(event, newValue) => this.setOptionText(newValue)}
                    onBlur={this.createOption}
                    onKeyPress={(event) => {
                      if(event.key === 'Enter') this.createOption()
                    }}
                  />
                  <TextFieldComent
                    error={optionText.length > LABEL_LENGTH}
                    label={`${optionText.length} z ${LABEL_LENGTH} znaků`}
                    alignRight
                  />
                </Flex>
                <IconButton onClick={this.createOption} style={{
                  width: 48,
                  height: 48,
                  marginRight: 10,
                }} iconStyle={{
                  width: 48,
                  height: 48,
                  color: grey500,
                }} tooltip='Přidat možnost'>
                  <ContentAdd/>
                </IconButton>
            </Flex>
        );
    }
}

function mapStateToProps({questions, options}) {
  return{
    activeQuestion: questions.activeQuestion,
    options: options.options
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    synchronizeOption
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOption)
