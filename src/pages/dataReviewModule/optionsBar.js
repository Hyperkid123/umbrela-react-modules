import React,{Component} from 'react';
import {
  Flex,
} from '../../common/styledComponents/containers';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import ChevronRight from 'material-ui-icons/ChevronRight';
import InsertChart from 'material-ui-icons/InsertChart';
import {
  hideQuestions as switchQuestions,
  hideSheets as switchSheets,
  hideChartlegend as switchChartLegend,
  changeChartType,
} from '../../redux/actions';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import {
   PIE_CHART,
   BAR_CHART,
   POLAR_CHART,
   LINE_CHART,
   DOUGHNUT_CHART,
} from '../../common/chartTypes';
import Fade from 'material-ui/transitions/Fade';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';


export class OptionsBar extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      showChartMenu: false,
      menuAnchor: null,
    };
  }

  handleMenuOpen = event => this.setState({menuAnchor: event.currentTarget})
  handleMenuClose = () => this.setState({menuAnchor: null})

  render() {
    const {translate} = this.props;
      return (
          <Flex>
            <Button onClick={this.props.switchSheets}>
              {this.props.hideSheets ? translate('review.showSheets') : translate('review.hideSheets')}
              {this.props.hideSheets ? <ChevronRight/>: <ChevronLeft/>}
            </Button>
            <Button onClick={this.props.switchQuestions}>
              {this.props.hideQuestions ? translate('review.showQuestions') : translate('review.hideQuestions')}
              {this.props.hideQuestions ?  <ChevronRight/> : <ChevronLeft/>}
            </Button>
            <div style={{marginLeft: 'auto'}}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.props.hideChartlegend}
                    onChange={this.props.switchChartLegend}
                  />
                }
                label={translate('review.hideLegend')}
              />
            </div>
            <Button onClick={this.handleMenuOpen}>
              <InsertChart/>
              {translate('review.chartType')}
            </Button>
            <Menu
              anchorEl={this.state.menuAnchor}
              open={Boolean(this.state.menuAnchor)}
              onClose={this.handleMenuClose}
              transition={Fade}
            >
              <MenuItem onClick={() => this.props.changeChartType(PIE_CHART)}>
                {translate('review.chartTypes.pie')}
              </MenuItem>
              <MenuItem onClick={() => this.props.changeChartType(BAR_CHART)}>
                {translate('review.chartTypes.bar')}
              </MenuItem>
              <MenuItem onClick={() => this.props.changeChartType(LINE_CHART)}>
                {translate('review.chartTypes.line')}
              </MenuItem>
              <MenuItem onClick={() => this.props.changeChartType(POLAR_CHART)}>
                {translate('review.chartTypes.polar')}
              </MenuItem>
              <MenuItem onClick={() => this.props.changeChartType(DOUGHNUT_CHART)}>
                {translate('review.chartTypes.doughnut')}
              </MenuItem>
            </Menu>
          </Flex>
      );
    }
}

function mapStateToProps({ui, locale}) {
  return{
    hideSheets: ui.hideSheets,
    hideQuestions: ui.hideQuestions,
    hideChartlegend: ui.hideChartlegend,
    translate: getTranslate(locale),
    currentLanguage: getActiveLanguage(locale).code,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    switchQuestions,
    switchSheets,
    switchChartLegend,
    changeChartType,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsBar)
