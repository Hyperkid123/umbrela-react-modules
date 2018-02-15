import React,{Component} from 'react';
import {
  QuestionItemHeading,
  MandatoryIndicator
} from '../../../common/styledComponents/typography'
import {
  Flex,
  QuestionFillListContainer,
  QuestionListItem,
  CustomHelpWrapper,
  PreviewImage,
  FullImage
} from '../../../common/styledComponents/containers'

import ScrollTopOnMount from '../../../common/components/scrollTopOnMount';
import {
    IsMatrixQuestion,
    HasImagePreview,
} from '../../../common/questionTypes';
import QuestionBodyFactory from './questionBodyFactory';
import LazyLoad from 'react-lazyload';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button'

export class QuestionFillList extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      openDialog: false,
      dialogImage: '',
    };
  }

    renderImagePreview = (url) => (
      <LazyLoad>
        <PreviewImage onClick={() => this.handleOpenDialog(url)} alt={url} src={url}/>
      </LazyLoad>
    )

    checkFiltered = (questionId) => {
        if (this.props.filters[questionId]) {
            return this.props.filters[questionId].length > 0;
        }
        return false;
    };

    renderList = () => {
      return this.props.questions.map(question => {
        if(this.checkFiltered(question.questionId)) return null;
        return (
        <QuestionListItem
          key={question.questionId}
          id={`question_${question.questionId}`}
          matrix={IsMatrixQuestion(question.questionType)}
          error={this.props.errors && this.props.errors[question.questionId]}
        >
          <QuestionItemHeading>
            {question.questionTitle}
            {question.isMandatory && <MandatoryIndicator/>}
          </QuestionItemHeading>
          {HasImagePreview(question.questionType) && this.renderImagePreview(question.url)}
          <CustomHelpWrapper>
            {question.customHelp && question.customHelp.split('\n').map((item, key) => (
              <span key={key}>{item}<br/></span>
            ))}
          </CustomHelpWrapper>
          {QuestionBodyFactory.build(question)}
        </QuestionListItem>
      )})
    }

    handleOpenDialog = (imageUrl) => this.setState({openDialog:true, dialogImage: imageUrl})
    handleCloseDialog = () => this.setState({openDialog: false});

    render() {
        return (
            <Flex column>
              <ScrollTopOnMount/>
              <QuestionFillListContainer>
                {this.renderList()}
              </QuestionFillListContainer>
              <Dialog
                open={this.state.openDialog}
                onClose={this.handleCloseDialog}
                fullScreen
              >
                <DialogTitle id="image-dialog-title">{"Náhled"}</DialogTitle>
                <DialogContent>
                  <LazyLoad>
                    <FullImage src={this.state.dialogImage} alt={this.state.dialogImage}/>
                  </LazyLoad>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseDialog}>
                    Zavřít
                  </Button>
                </DialogActions>
              </Dialog>
            </Flex>
        );
    }
}

export default QuestionFillList
