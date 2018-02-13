import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from 'react-router';
import {Flex, MenuContainer, MenuList, FlexSection} from '../../../common/styledComponents/containers';
import Paper from 'material-ui/Paper'
import {SmallHeading} from '../../../common/styledComponents/typography';
import {MenuListItem} from './navigationComponents';

class QuestionsNavigation extends Component{

  constructor(props){
    super(props);
    this.state = {
      hideQuestions: false,
    };
  }

  renderNavigationItems = () => this.props.questions.map((question) => (
    <MenuListItem
      key={question.questionId}
      link={`/question/${question.questionId}`}
      label={question.title}
      onClick={() => {}}
      active={this.props.match.params.questionId === question.questionId}
    />
  ))

  render(){
    return(
      <FlexSection autoHeight minWidth={300}>
        <Flex grow>
          <Paper square style={{width: '100%'}}>
            <MenuContainer>
            <SmallHeading>
              Otázky
            </SmallHeading>
            <Scrollbars
              style={{height: 'calc(100vh - 2em - 60px - 28px)'}}
            >
              <MenuList>
                {this.renderNavigationItems()}
              </MenuList>
            </Scrollbars>
          </MenuContainer>
          </Paper>
        </Flex>
      </FlexSection>
    );
  }
}

QuestionsNavigation.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default (withRouter)(QuestionsNavigation);
