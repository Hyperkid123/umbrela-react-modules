import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CollapsibleSection from '../../../common/components/collapsibleSection';
import {getQuestions, getOptions} from '../../../redux/actions';
import QuestionFiltrations from './questionFiltrations';
import {CanHaveOpenQuestion} from '../../../common/questionTypes';
import Grid from 'material-ui/Grid';
import {
  CardWrapper,
  CardHeader,
  CardBody
} from '../../../common/styledComponents/card';

export class FiltrationView extends Component {

    componentDidMount() {
        this.props.getQuestions(this.props.activeSheetId);
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.activeSheetId !== this.props.activeSheetId) {
        this.props.getQuestions(nextProps.activeSheetId);
      }
    }

    renderQuestionFiltrations = () => this.props.questions.map((question) => {
      if(CanHaveOpenQuestion(question.questionType)) {
        return (
          <CollapsibleSection
            sectionTitle={question.title}
            key={question.questionId}
            >
              <QuestionFiltrations
                questionOrder={question.questionOrder}
                questionId={question.questionId}/>
          </CollapsibleSection>
        )
      }
      return null
    })

    render() {
        const {title} = this.props.activeSheet;
        return (
          <Grid item xs={12}>
            <CardWrapper transparent>
              <CardHeader transparent>
                {title}
              </CardHeader>
              <CardBody>
                {this.props.questions && this.renderQuestionFiltrations()}
              </CardBody>
            </CardWrapper>
          </Grid>
        );
    }
}

function mapStateToProps({editor, questions}) {
  return{
    activeSheet: editor.activeSheet,
    activeSheetId: editor.activeSheet.sheetId,
    questions: questions.questions,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getQuestions,
    getOptions
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltrationView)
