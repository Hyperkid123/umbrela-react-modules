import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {MenuList} from '../../../common/styledComponents/containers';
import {MenuListItem} from './navigationComponents';
import {
  CardWrapper,
  CardHeader,
  CardBody
} from '../../../common/styledComponents/card';

class QuestionsNavigation extends Component{

  constructor(props){
    super(props);
    this.state = {
      hideQuestions: false,
      activeQuestion: null,
    };
  }

  handleItemClick = (questionId) => this.setState({activeQuestion: questionId})

  renderNavigationItems = () => this.props.questions.map((question) => {
  return  <MenuListItem
      key={question.questionId}
      link={`/question/${question.questionId}`}
      label={question.title}
      onClick={() => this.handleItemClick(question.questionId)}
      active={this.state.activeQuestion === question.questionId}
    />
  })

  render(){
    return(
      <CardWrapper>
        <CardHeader>
          {this.props.title}
        </CardHeader>
        <CardBody>
          <MenuList>
            {this.renderNavigationItems()}
          </MenuList>
        </CardBody>
      </CardWrapper>
    );
  }
}

QuestionsNavigation.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default (withRouter)(QuestionsNavigation);
