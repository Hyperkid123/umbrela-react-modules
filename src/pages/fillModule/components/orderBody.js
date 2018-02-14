/**
 * Created by rela on 27/06/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from './orderCard';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  OrderQuestionList
} from '../../../common/styledComponents/containers'

import {
  createCards,
  dragCard,
} from '../../../redux/actions';


class OrderBody extends Component {

    moveCard = (dragIndex, hoverIndex) => {
        this.props.dragCard(this.props.question.questionId, this.props.question.options, dragIndex, hoverIndex);

    };

    renderCards = () => {
        if (!this.props.answer) {
            this.props.createCards(this.props.question.questionId, this.props.question.options);
            return [];
        } else {
            return this.props.answer.map((option, i) => {
                return (
                    <Card index={i}
                          id={option.optionId}
                          moveCard={this.moveCard}
                          key={option.optionId}
                          option={option}/>
                );
            });
        }
    };

    render() {
        return (
                <OrderQuestionList>
                  {this.renderCards()}
                </OrderQuestionList>
        );
    }
}

/**OrderQuestion.propTypes = {
    dragCard: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired,
    answer: PropTypes.array,
    createCards: PropTypes.func.isRequired,
};*/

function mapStateToProps({answers}, initialProps) {
  return{
    answer: answers[initialProps.question.questionId]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createCards,
    dragCard,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBody)
