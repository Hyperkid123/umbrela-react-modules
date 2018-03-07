import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import {
  TextFieldComent
} from '../../../common/components/labels';
import {Flex} from '../../../common/styledComponents/containers';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ANSWER_LENGTH} from '../../../common/constants';
import {answerOpenQuestion} from '../../../redux/actions/';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

export class OpenBody extends Component {

    getOpenValue = () => {
        if (this.props.answer) return this.props.answer;
        return '';
    };

    render() {
      const answer = this.getOpenValue();
      const {translate} = this.props;
        return (
          <Flex column grow>
            <TextField value={answer}
              onChange={(event) => this.props.answerOpenQuestion(this.props.questionId, event.target.value)}
              placeholder={translate('questions.customAnswer')}
              fullWidth
              multiline
              key={`openOption_${this.props.questionId}`}
              type="text"
            />
            <TextFieldComent
              error={answer.length > ANSWER_LENGTH}
              label={`${answer.length} ${translate('common.from')} ${ANSWER_LENGTH} ${translate('common.characters')}`}
              alignRight
            />
          </Flex>
        );
    }
}

function mapStateToProps({answers, locale}, initialProps) {
  return {
    answer: answers[initialProps.questionId],
    translate: getTranslate(locale),
    currentLanguage: getActiveLanguage(locale).code,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    answerOpenQuestion
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenBody)
