import React,{Component} from 'react';
import {fetchQuestionIfNeeded} from '../../redux/actions';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import LoadingScreen from '../../common/components/loadingScreen';
import {Flex, FlexSection} from '../../common/styledComponents/containers';
import {SmallHeading} from '../../common/styledComponents/typography';
import Chart from './components/chart'

export class QuestionsContainer extends Component {

    componentDidMount() {
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
      if(!questionData.has(parseInt(this.props.match.params.questionId, 10))) return <LoadingScreen/>;
      const chartData = questionData.get(parseInt(this.props.match.params.questionId, 10));
      const question = questions[this.props.match.params.questionId];
      return (
          <Flex>
            <FlexSection fullWidth autoHeight>
              <Flex column style={{marginTop: 10}}>
                <SmallHeading>{question.title}</SmallHeading>
              </Flex>
              <Chart
                showLegend={this.props.ui.hideChartlegend}
                chartType={this.props.ui.chartType}
                data={Object.assign({}, chartData)}
                question={question}
                questionType={question.type}
              />
            </FlexSection>
          </Flex>
      );
    }
}

const mapStateToProps = (state, initialProps) => {
  return{
    isFetching: state.data.isFetching,
    questionData: state.data.questionData,
    questions: state.data.questions,
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchQuestionIfNeeded
  },dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionsContainer))
