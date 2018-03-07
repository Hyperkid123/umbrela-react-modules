import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {getQuestions, fetchQuestionIfNeeded} from '../../redux/actions'
import QuestionsNavigation from './components/questionsNavigation';
import {Route} from 'react-router-dom'
import QuestionsContainer from './questionsContainer';
import { withRouter } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

export class SheetsContainer extends Component {

    componentDidMount() {
      this.props.activeSheet && this.props.getQuestions(this.props.activeSheet.sheetId)
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.activeSheet.sheetId !== nextProps.activeSheet.sheetId) {
        nextProps.activeSheet && this.props.getQuestions(nextProps.activeSheet.sheetId)
      }
    }

    render() {
      if(!this.props.questions) return null;
      const {hideQuestions} = this.props;
        return (
          <Grid container spacing={0}>
            <Grid item xs={hideQuestions ? 0 : 12} sm={hideQuestions ? 0 : 12} md={hideQuestions ? 0 : 5} lg={hideQuestions ? 0 : 4} xl={hideQuestions ? 0 : 3}>
              {!this.props.hideQuestions &&
                <QuestionsNavigation
                  title={this.props.translate('questions.questions')}
                  onClick={() => {}}
                  questions={this.props.questions}/>
              }
            </Grid>
            <Grid item xs={12} sm={12} md={hideQuestions ? 12 : 7} lg={hideQuestions ? 12 : 8} xl={hideQuestions ? 12 : 9}>
              <Route path={`/question/:questionId`} component={QuestionsContainer}/>
            </Grid>
          </Grid>
        );
    }
}

function mapStateToProps({editor, questions, ui, locale}) {
  return {
    activeSheet: editor.activeSheet,
    questions: questions.questions,
    hideQuestions: ui.hideQuestions,
    isFetching: questions.isFetching,
    translate: getTranslate(locale),
    currentLanguage: getActiveLanguage(locale).code,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getQuestions,
    fetchQuestionIfNeeded,
  },dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SheetsContainer))
