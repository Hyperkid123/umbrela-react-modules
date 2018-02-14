import React,{Component} from 'react';
import {QuestionItemHeading} from '../../../common/styledComponents/typography'
import {
  Flex,
  QuestionFillListContainer,
  QuestionListItem,
  CustomHelpWrapper,
  PreviewImage
} from '../../../common/styledComponents/containers'

import {connect} from 'react-redux';
import ScrollTopOnMount from '../../../common/components/scrollTopOnMount';
import {
    IsMatrixQuestion,
    HasImagePreview,
} from '../../../common/questionTypes';
import QuestionBodyFactory from './questionBodyFactory';
import LazyLoad from 'react-lazyload';

export class QuestionFillList extends Component {

    renderImagePreview = (url) => (
      <LazyLoad>
        <PreviewImage alt={url} src={url}/>
      </LazyLoad>
    )

    renderList = () => {
      return this.props.questions.map(question => (
        <QuestionListItem
          key={question.questionId}
          id={`question_${question.questionId}`}
          matrix={IsMatrixQuestion(question.questionType)}
        >
          <QuestionItemHeading>
            {question.questionTitle}
          </QuestionItemHeading>
          {HasImagePreview(question.questionType) && this.renderImagePreview(question.url)}
          <CustomHelpWrapper>
            {question.customHelp && question.customHelp.split('\n').map((item, key) => (
              <span key={key}>{item}<br/></span>
            ))}
          </CustomHelpWrapper>
          {QuestionBodyFactory.build(question)}
        </QuestionListItem>
      ))
    }

    render() {
        return (
            <Flex column>
              <ScrollTopOnMount/>
              <QuestionFillListContainer>
                {this.renderList()}
              </QuestionFillListContainer>
            </Flex>
        );
    }
}

export default QuestionFillList
