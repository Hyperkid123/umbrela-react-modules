import React,{Component} from 'react';
import {fetchQuestionIfNeeded} from '../../redux/actions';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import LoadingScreen from '../../common/components/loadingScreen';
import Chart from './components/chart'
import {
  CardWrapper,
  CardHeader,
  CardBody
} from '../../common/styledComponents/card';

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
            <CardWrapper transparent>
              <CardHeader transparent>
                {question.title}
              </CardHeader>
              <CardBody transparent>
                <Chart
                  showLegend={this.props.ui.hideChartlegend}
                  chartType={this.props.ui.chartType}
                  data={Object.assign({}, chartData)}
                  question={question}
                  questionType={question.type}
                />
              </CardBody>
            </CardWrapper>
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
