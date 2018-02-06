import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Flex, FlexSection} from '../../../common/styledComponents/containers';
import {SmallHeading} from '../../../common/styledComponents/typography';
import CollapsibleSection from '../../../common/components/collapsibleSection';
import {getQuestions, getOptions} from '../../../redux/actions';
import QuestionFiltrations from './questionFiltrations';
import {CanHaveOpenQuestion} from '../../../common/questionTypes'

class FiltrationView extends Component {

    componentDidMount() {
        this.props.getQuestions(this.props.activeSheetId);
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.activeSheetId !== this.props.activeSheetId) this.props.getQuestions(nextProps.activeSheetId);
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
            <Flex>
              <FlexSection fullWidth autoHeight>
                  <Flex column style={{marginTop: 10}}>
                    <SmallHeading>{title}</SmallHeading>
                    {this.props.questions && this.renderQuestionFiltrations()}
                  </Flex>
              </FlexSection>
            </Flex>
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
