import React,{Component} from 'react';
import {fetchQuestionIfNeeded} from '../../redux/actions';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import LoadingScreen from '../../common/components/loadingScreen';
import {Flex, FlexSection} from '../../common/styledComponents/containers';
import {SmallHeading} from '../../common/styledComponents/typography';

export class QuestionsContainer extends Component {

    componentWillMount() {
      this.props.fetchQuestionIfNeeded(this.props.match.params.questionId);
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.match.params.questionId !== nextProps.match.params.questionId) {
        this.props.fetchQuestionIfNeeded(nextProps.match.params.questionId);
      }
    }

    render() {
      const { questionData, isFetching, questions} = this.props;
      if(isFetching) return <LoadingScreen/>;
      if(!questionData.has(parseInt(this.props.match.params.questionId, 10))) return <h1>No data</h1>;
      const chartData = questionData.get(parseInt(this.props.match.params.questionId));
      const question = questions[this.props.match.params.questionId];
      return (
          <Flex>
            <FlexSection fullWidth autoHeight>
              <Flex column style={{marginTop: 10}}>
                <SmallHeading>{question.title}</SmallHeading>
              </Flex>
            </FlexSection>
          </Flex>
      );
    }
}

const mapStateToProps = (state, initialProps) => {
  return{
    isFetching: state.data.isFetching,
    questionData: state.data.questionData,
    questions: state.data.questions
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchQuestionIfNeeded
  },dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionsContainer))
