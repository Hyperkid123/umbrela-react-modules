import React,{Component} from 'react';
import {Doughnut, Bar, Polar, Line} from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {Flex, ChartContainer} from '../../../common/styledComponents/containers';
import Dialog from 'material-ui/Dialog';
import ImageIcon from 'material-ui-icons/Image';
import Button from 'material-ui/Button';

import {
   PIE_CHART,
   DOUGHNUT_CHART,
} from '../../../common/chartTypes';



export default class CloseQuestions extends Component {

  constructor(props){
    super(props);
    this.state = {
      showImage: false,
    };
  }

  handleShowImage = () => this.setState({showImage: true});
  handleCloseImage = () => this.setState({showImage: false});

  renderChart = () => {
    const globalOptions = {
      responsive: true,
      legend: {
        display: !this.props.showLegend,
      },

      tooltips: {
        callbacks: {
          title: function (tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          },
          label: function (tooltipItem, data) {
            var amount = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            var total = eval(data.datasets[tooltipItem.datasetIndex].data.join('+'));
            return amount + ' / ' + total + ' ( ' + parseFloat(amount * 100 / total).toFixed(2) + '% )';
          },
        },
      },
    };

    const charts = {
      PIE_CHART: <Doughnut options={{...globalOptions, cutoutPercentage: 0}} width={400} height={400} data={this.props.data.data} redraw={true}/>,
      BAR_CHART: <Bar options={globalOptions} data={this.props.data.data} redraw={true}/>,
      POLAR_CHART:<Polar options={globalOptions} data={this.props.data.data} redraw={true}/>,
      LINE_CHART:<Line options={globalOptions} data={this.props.data.data} redraw={true}/>,
      DOUGHNUT_CHART:<Doughnut options={globalOptions} data={this.props.data.data} redraw={true}/>,
    };
    return charts[this.props.chartType];
  }

  renderImagePreview = () => {
    if(this.props.url){
      return(
         <Button
           fab
           onClick={this.handleShowImage}
           color='primary'
           style={{position: 'absolute'}}
         >
           <ImageIcon />
         </Button>
      );
    }
    return null;
  }

  render() {
    return (
      <Flex style={{position: 'relative'}}>
        <ChartContainer horizontalCenter pie={this.props.chartType === PIE_CHART || this.props.chartType === DOUGHNUT_CHART}>
          {this.renderChart()}
        </ChartContainer>
        {this.renderImagePreview()}
        <Dialog
          open={this.state.showImage}
          onClose={this.handleCloseImage}
        >
          <Flex>
            <img src={this.props.url}/>
          </Flex>
        </Dialog>
      </Flex>

    );
  }
}

CloseQuestions.propTypes = {
  data: PropTypes.object.isRequired,
  chartType: PropTypes.string.isRequired,
  showLegend: PropTypes.bool.isRequired,
  noAnimation: PropTypes.bool,
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
