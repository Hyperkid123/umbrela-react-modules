import React,{Component} from 'react';
import ScrollTopOnMount from '../../common/components/scrollTopOnMount';
import {
  Flex,
  FillSheetHeaderContainer
} from '../../common/styledComponents/containers';
import {SheetFillTitle, SheetFillCounter} from '../../common/styledComponents/typography';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {startResearch} from '../../redux/actions/';
import {Link, Redirect} from 'react-router-dom';
import { withRouter } from 'react-router';
import Button from 'material-ui/Button';
import QuestionFillList from './components/questionFillList';
import {validateAnswers} from '../../common/validator'

const scrollOptions = {
    block: 'start',
    behavior: 'smooth',
};

export class SheetFill extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      errors: null,
    };
  }

  componentDidMount() {
    this.props.startResearch();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.sheetId !== nextProps.match.params.sheetId) {
      window.scrollTo(0, 0);
    }
  }

  handleNextSheet = (path) => {
    const {valid, errors} = validateAnswers(this.props.activeSheet, this.props.answers, this.props.filters);
    if(valid) {
      this.setState({errors: null});
      return this.props.history.push(path)
    } else {
      this.setState({errors: errors});
      this.scrollToErrorElement(errors[Object.keys(errors)[0]].question)
    }
  }

  scrollToErrorElement = (question) => {
    const element = document.getElementById('question_' + question.questionId);
    element.scrollIntoView(scrollOptions);
  }

  renderPrevButton = () => {
    const sheetId = parseInt(this.props.match.params.sheetId, 10)
    if(sheetId > 0) {
      return (
        <Link to={`/fill/${sheetId - 1}`} style={{marginRight: 10}}>
          <Button raised>
            Zpět
          </Button>
        </Link>
      )
    }
    return null;
  }

  renderNextButton = () => {
    const sheetId = parseInt(this.props.match.params.sheetId, 10);
    if(sheetId < this.props.sheetCount - 1) {
      return (
        <Button onClick={() => this.handleNextSheet(`/fill/${sheetId + 1}`)} raised>
          Další
        </Button>
      )
    } else {
      return (
        <Button onClick={() => this.handleNextSheet(`/submit`)} raised color='primary'>
          Odeslat
        </Button>
      )
    }
  }

  render() {
    if(!this.props.isLoaded || !this.props.filters) return <Redirect to='/'/>
    const sheetNumber = parseInt(this.props.match.params.sheetId, 10) + 1
      return (
          <Flex horizontalCenter column>
            <ScrollTopOnMount/>
            <Flex>
              <FillSheetHeaderContainer>
                <SheetFillTitle>{this.props.activeSheet.sheetTitle}</SheetFillTitle>
                <SheetFillCounter>{sheetNumber}/{this.props.sheetCount}</SheetFillCounter>
              </FillSheetHeaderContainer>
            </Flex>
            <QuestionFillList errors={this.state.errors} questions={this.props.activeSheet.questions} filters={this.props.filters}/>
            <Flex horizontalCenter style={{marginBottom: 10}}>
              {this.renderPrevButton()}
              {this.renderNextButton()}
            </Flex>
          </Flex>
      );
  }
}

function mapStateToProps({research, filters, answers}, initialProps) {
  const sheetId = parseInt(initialProps.match.params.sheetId, 10);
  return {
    isLoaded: research.research,
    activeSheet: research.sheets[sheetId],
    sheetCount: research.sheets.length,
    filters: filters ? filters.filters : null,
    answers: answers
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startResearch,
  },dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SheetFill))
