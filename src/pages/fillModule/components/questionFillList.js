import React,{Component} from 'react';
import {
  MandatoryIndicator
} from '../../../common/styledComponents/typography'
import {
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
import {
  CardWrapper,
  CardHeader,
  CardBody,
  CardListItemheading
} from '../../../common/styledComponents/card';
import Grid from 'material-ui/Grid';

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
      let questionCounter = 0;
      return this.props.questions.map(question => {
        if(this.checkFiltered(question.questionId)) return null;
        questionCounter += 1;
        return (
          <Grid item xs={12}
            key={question.questionId}
            id={`question_${question.questionId}`}>
            <Grid container spacing={0} justify='center' alignItems='center'>
              <Grid item>
                <CardWrapper
                  questionList
                  matrix={IsMatrixQuestion(question.questionType)}
                >
                  <CardHeader questionList>
                    <CardListItemheading>
                      <span>
                        {questionCounter}
                      </span>
                      <span>
                        {question.questionTitle}
                      </span>
                      {question.isMandatory && <MandatoryIndicator/>}
                    </CardListItemheading>
                  </CardHeader>
                  <CardBody
                    questionList
                    error={this.props.errors && this.props.errors[question.questionId]}
                  >
                    {HasImagePreview(question.questionType) && this.renderImagePreview(question.url)}
                    <CustomHelpWrapper>
                      {question.customHelp && question.customHelp.split('\n').map((item, key) => (
                        <span key={key}>{item}<br/></span>
                      ))}
                    </CustomHelpWrapper>
                    {QuestionBodyFactory.build(question)}
                  </CardBody>
                </CardWrapper>
              </Grid>
            </Grid>
          </Grid>
        )})
    }

    handleOpenDialog = (imageUrl) => this.setState({openDialog:true, dialogImage: imageUrl})
    handleCloseDialog = () => this.setState({openDialog: false});

    render() {
        return (
          <Grid container spacing={0} alignItems='center' justify='center'>
            <ScrollTopOnMount/>
            <Grid item container spacing={0} style={{marginTop: 10}}>
              {this.renderList()}
            </Grid>
            <Dialog
              open={this.state.openDialog}
              onClose={this.handleCloseDialog}
              maxWidth={false}
              >
                <DialogTitle id="image-dialog-title">{"Náhled"}</DialogTitle>
                <DialogContent>
                  <LazyLoad>
                    <FullImage src={this.state.dialogImage} alt={this.state.dialogImage}/>
                  </LazyLoad>
                </DialogContent>
                <DialogActions>
                  <Button raised color='secondary' onClick={this.handleCloseDialog}>
                    Zavřít
                  </Button>
                </DialogActions>
              </Dialog>
          </Grid>
        );
    }
}

export default QuestionFillList
