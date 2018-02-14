/**
 * Created by rela on 27/06/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import {Flex} from '../../../common/styledComponents/containers';
import { LinearProgress } from 'material-ui/Progress';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
  answerDivideQuestion
} from '../../../redux/actions';

class DivideBody extends Component {

    renderScalePoints = () => {
        return (
            <label>Zbývající body: {this.remainingPoints()}</label>
        );
    };

    getScaleValues = () => {
      if (this.props.answer) {
        return this.props.answer;
      } else {
        return this.props.question.options.map(() => {
          return 0;
        });
      }
    };

    remainingPoints = () => {
        return this.props.question.scalePoints - this.getScaleValues().reduce((a, b) => a + b, 0);
    };

    handleDivideChange = (questionId, event, size, index, value) => {
        if (this.remainingPoints() + value - parseInt(event.target.value, 10) >= 0) {
            this.props.answerDivideQuestion(questionId, parseInt(event.target.value, 10), size, index);
        } else {
            if (this.remainingPoints() < this.remainingPoints() - parseInt(event.target.value, 10) || isNaN(this.remainingPoints())) {
                this.props.answerDivideQuestion(questionId, parseInt(event.target.value, 10), size, index);
            }
            else {
                console.log('not enough points', this.remainingPoints());
            }
        }
    };

    handleSelectInput = (event) => {
        event.target.select();
    };


    renderOptions = () => {
      const scaleValues = this.getScaleValues()
        return this.props.question.options.map((option, i) => {
            return (
                <Flex key={option.optionId}>
                  <TextField style={{width: 150, flexShrink: 0}} type="number"
                       min={0}
                       onFocus={(event) => this.handleSelectInput(event)}
                       onChange={(event) => this.handleDivideChange(this.props.question.questionId, event, this.props.question.options.length, i, scaleValues[i])}
                       value={scaleValues[i]}
                       name={`divide_input_${option.optionId}`}/>
                  <Flex column grow style={{marginLeft: 10, paddingTop: 10}}>
                    {option.optionTitle}
                    <LinearProgress mode='determinate' value={(scaleValues[i] / this.props.question.scalePoints) * 100}/>
                  </Flex>
                </Flex>
            );
        });
    };


    render() {
        return (
                <Flex column>
                    {this.renderScalePoints()}
                    <Flex column>
                        {this.renderOptions()}
                    </Flex>
                </Flex>
        );
    }
}

function mapStateToProps({answers, research}, initialProps) {
  return {
    answer: answers[initialProps.question.questionId],
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    answerDivideQuestion
  },dispatch)
}

/**DivideBody.propTypes = {
    question: PropTypes.object.isRequired,
    answerDivideQuestion: PropTypes.func.isRequired,
};*/

export default connect(mapStateToProps, mapDispatchToProps)(DivideBody)
