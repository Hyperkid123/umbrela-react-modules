import React,{Component} from 'react';
import {Flex} from '../../common/styledComponents/containers';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {getQuestions, fetchQuestionIfNeeded} from '../../redux/actions'
import QuestionsNavigation from './components/questionsNavigation';
import {Route} from 'react-router-dom'
import QuestionsContainer from './questionsContainer';
import { withRouter } from 'react-router-dom';

export class SheetsContainer extends Component {

    componentDidMount() {
      this.props.activeSheet && this.props.getQuestions(this.props.activeSheet.sheetId)
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.activeSheet.sheetId !== nextProps.activeSheet.sheetId) {
        console.log(nextProps, this.props);
        nextProps.activeSheet && this.props.getQuestions(nextProps.activeSheet.sheetId)
      }
    }

    render() {
      if(!this.props.questions) return null;
        return (
            <Flex className="class-name">
                {!this.props.hideQuestions && <QuestionsNavigation onClick={() => {}} questions={this.props.questions}/>}
                <Route path={`/question/:questionId`} component={QuestionsContainer}/>
            </Flex>
        );
    }
}

function mapStateToProps({editor, questions, ui}) {
  return {
    activeSheet: editor.activeSheet,
    questions: questions.questions,
    hideQuestions: ui.hideQuestions,
    isFetching: questions.isFetching,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getQuestions,
    fetchQuestionIfNeeded,
  },dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SheetsContainer))
