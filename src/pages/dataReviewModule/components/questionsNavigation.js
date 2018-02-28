import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from 'react-router';
import {Flex, MenuContainer, MenuList, FlexSection} from '../../../common/styledComponents/containers';
import Paper from 'material-ui/Paper'
import {SmallHeading} from '../../../common/styledComponents/typography';
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
    console.log(this.props.match.params, question.questionId);
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
          Otázky
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
