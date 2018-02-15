import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import {
  TextFieldComent
} from '../../../common/components/labels';
import {Flex} from '../../../common/styledComponents/containers';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ANSWER_LENGTH} from '../../../common/constants';
import {answerOpenQuestion} from '../../../redux/actions/'

export class OpenBody extends Component {

    getOpenValue = () => {
        if (this.props.answer) return this.props.answer;
        return '';
    };

    render() {
      const answer = this.getOpenValue()
        return (
          <Flex column grow>
            <TextField value={answer}
              onChange={(event) => this.props.answerOpenQuestion(this.props.questionId, event.target.value)}
              placeholder='Odpověď'
              fullWidth
              multiline
              key={`openOption_${this.props.questionId}`}
              type="text"
            />
            <TextFieldComent
              error={answer.length > ANSWER_LENGTH}
              label={`${answer.length} z ${ANSWER_LENGTH} znaků`}
              alignRight
            />
          </Flex>
        );
    }
}

function mapStateToProps({answers}, initialProps) {
  return {
    answer: answers[initialProps.questionId]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    answerOpenQuestion
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenBody)
