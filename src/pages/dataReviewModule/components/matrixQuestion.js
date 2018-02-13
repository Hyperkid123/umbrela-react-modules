import React,{Component} from 'react';
import PropTypes from 'prop-types';
import CloseQuestion from './closeQuestion';
import {Flex} from '../../../common/styledComponents/containers';
import LegendTable from './legendTable';
import Section from '../../../common/components/collapsibleSection';

export default class MatrixQuestion extends Component {

  renderCharts = () => {
    return this.props.data.dividedData.map((subQuestion, index) => {

      let buttonLabel = subQuestion.questionTitle;
      if(this.props.isOptionImage){
        buttonLabel = subQuestion.questionTitle.substr(subQuestion.questionTitle.lastIndexOf('/') + 1);
      }
      return (
        <Section sectionTitle={buttonLabel} key={index}>
          <Flex>
            <CloseQuestion
              url={this.props.isOptionImage ? subQuestion.questionTitle : false}
              noAnimation
              showLegend={this.props.showLegend}
              chartType={this.props.chartType}
              data={subQuestion}/>
            <LegendTable data={{barData: subQuestion, respondents: subQuestion.respondents, answerCount: subQuestion.answerCount}}/>
          </Flex>
      </Section>
      );
    });
  }

  render() {
    return (
            <Flex column grow>
                {this.renderCharts()}
            </Flex>
    );
  }
}

MatrixQuestion.propTypes = {
  data: PropTypes.object.isRequired,
  showLegend: PropTypes.bool.isRequired,
  chartType: PropTypes.string.isRequired,
  question: PropTypes.object.isRequired,
  isOptionImage: PropTypes.bool.isRequired,
};
