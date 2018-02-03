import React,{Component} from 'react';
import {Flex} from '../../../../common/styledComponents/containers';
import TextField from 'material-ui/TextField';
import { LinearProgress } from 'material-ui/Progress';

export default class DividePreview extends Component {

    constructor(props){
    	super(props);
    	this.state = {
        options: [],
        scalePoints: 0,
        avaliablePoints: 0,
      };
    }

    componentWillMount() {
      this.setState({
        scalePoints: this.props.scalePoints,
        options: [this.props.options],
        avaliablePoints: this.props.scalePoints,
        optionsValues: this.createOptionValues(this.props.options),
      })
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.questionId !== this.props.questionId){
        this.setState({
          scalePoints: nextProps.scalePoints,
          options: nextProps.options,
          avaliablePoints: nextProps.scalePoints,
          optionsValues: this.createOptionValues(nextProps.options),
        })
      }
    }

    createOptionValues = (options) => {
      return options.map((option) => {
        return 0;
      });
    }

    renderScalePoints = () => {
        return (
            <label>Zbývající body: {this.remainingPoints()}</label>
        );
    };

    remainingPoints = () => {
        return parseInt(this.state.scalePoints) - this.state.optionsValues.reduce((a, b) => a + b, 0);
    };

    handleSelectInput = (event) => {
      event.target.select();
    }

    handleDivideValue = (index, value) => {
      value = value || 0;
      if(this.remainingPoints() + this.state.optionsValues[index] - parseInt(value) >= 0) {
        const optionsValues = this.state.optionsValues;
        optionsValues[index] = parseInt(value);
        this.setState({optionsValues});
      } else if(this.remainingPoints() < this.remainingPoints() - parseInt(value) || isNaN(this.remainingPoints())) {
        const optionsValues = this.state.optionsValues;
        optionsValues[index] = parseInt(value);
        this.setState({optionsValues});
      }else {
        console.log('not enought points', console.log(this.remainingPoints()));
      }
    }

    renderOptions = () => {
      return this.props.options.map((option, index) => {
        return (
          <Flex key={option.optionId}>
            <TextField
              style={{width: 150, flexShrink: 0}}
              type='number'
              onFocus={(event) => this.handleSelectInput(event)}
              value={this.state.optionsValues[index]}
              name={`divide_input_${option.optionId}`}
              min={0}
              onChange={(event, newValue) => this.handleDivideValue(index, newValue)}
            />
            <Flex column grow style={{marginLeft: 10, paddingTop: 17}}>
              {option.title}
              <LinearProgress mode='determinate' min={0} max={this.props.scalePoints} value={this.state.optionsValues[index]}/>
            </Flex>
          </Flex>
        )
      });
    }


    render() {
        return (
          <Flex column>
            {this.renderScalePoints()}
            {this.renderOptions()}
          </Flex>
        );
    }
}
