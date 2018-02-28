import React,{Component} from 'react';
import CloseQuestions from './closeQuestion';
import OpenQuestion from './openQuestion';
import MatrixQuestion from './matrixQuestion';
import PropTypes from 'prop-types';
import {Flex} from '../../../common/styledComponents/containers';
import LegendTable from './legendTable';
import DivideQuestion from './divideQuestion';
import Grid from 'material-ui/Grid';

import {
  OPEN_QUESTION,
  CLOSE_QUESTION,
  CLOSE_MULTI_QUESTION,
  CLOSE_WITH_OPEN_QUESTION,
  CLOSE_MULTI_WITH_OPEN_QUESTION,
  MATRIX_MULTI_IMAGE_QUESTION,
  MATRIX_MULTI_QUESTION,
  MATRIX_SINGLE_IMAGE_QUESTION,
  MATRIX_SINGLE_QUESTION,
  DIVIDE_QUESTION,
  ORDER_QUESTION,
  OPEN_WITH_IMAGE_QUESTIONS,
  IMAGE_OPTIONS_QUESTION,
  IMAGE_OPTIONS_MULTI_QUESTION,
  IMAGE_OPTIONS_WITH_OPEN_QUESTION,
  IMAGE_OPTIONS_MULTI_WITH_OPEN_QUESTION,
  MEDIA_QUESTION,
  MEDIA_MULTI_QUESTION,
  MEDIA_WITH_OPEN_QUESTION,
  MEDIA_MULTI_WITH_OPEN_QUESTION,
  isOptionImage,
  hasImagePreview,
} from '../../../common/chartTypes';

export default class Chart extends Component {

  renderChart = () => {
    switch (this.props.questionType) {
      case OPEN_QUESTION:
      case OPEN_WITH_IMAGE_QUESTIONS:
        return (
          <OpenQuestion question={this.props.question} data={this.props.data}/>
        );
      case CLOSE_QUESTION:
      case CLOSE_MULTI_QUESTION:
      case CLOSE_WITH_OPEN_QUESTION:
      case CLOSE_MULTI_WITH_OPEN_QUESTION:
      case IMAGE_OPTIONS_QUESTION:
      case IMAGE_OPTIONS_MULTI_QUESTION:
      case IMAGE_OPTIONS_WITH_OPEN_QUESTION:
      case IMAGE_OPTIONS_MULTI_WITH_OPEN_QUESTION:
      case MEDIA_QUESTION:
      case MEDIA_MULTI_QUESTION:
      case MEDIA_WITH_OPEN_QUESTION:
      case MEDIA_MULTI_WITH_OPEN_QUESTION:
        return (
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <CloseQuestions
                  hasImagePreview={hasImagePreview(this.props.question.type)}
                  showLegend={this.props.showLegend}
                  chartType={this.props.chartType}
                  data={this.props.data.barData}
                  url={this.props.question.url}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <LegendTable isOptionImage={isOptionImage(this.props.question.type)} data={this.props.data}/>
              </Grid>
            </Grid>
        );
      case  MATRIX_MULTI_IMAGE_QUESTION:
      case  MATRIX_MULTI_QUESTION:
      case  MATRIX_SINGLE_IMAGE_QUESTION:
      case  MATRIX_SINGLE_QUESTION:
        return (
          <Flex>
            <MatrixQuestion
              data={this.props.data}
              chartType={this.props.chartType}
              showLegend={this.props.showLegend}
              question={this.props.question}
              isOptionImage={isOptionImage(this.props.question.type)}
            />
          </Flex>
        );
      case DIVIDE_QUESTION:
      case ORDER_QUESTION:
        return(
          <DivideQuestion data={this.props.data}/>
        );
      default:
        return null;

    }
  }

  render() {
    return this.renderChart();
  }
}

Chart.propTypes = {
  data: PropTypes.object.isRequired,
  chartType: PropTypes.string.isRequired,
  showLegend: PropTypes.bool.isRequired,
  questionType: PropTypes.string.isRequired,
  question: PropTypes.object.isRequired,
};
