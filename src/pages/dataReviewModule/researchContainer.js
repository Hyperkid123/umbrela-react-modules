import React,{Component} from 'react';
import SheetMenu from '../common/sheetMenu';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {getSheets} from '../../redux/actions'
import DnDContext from '../../common/components/dndContext';
import LoadingScreen from '../../common/components/loadingScreen';
import SheetsContainer from './sheetsContainer';
import { withRouter } from 'react-router-dom';
import Grid from 'material-ui/Grid';

export class ResearchContainer extends Component {
    componentWillMount() {
      this.props.getSheets(window.researchId)
    }

    render() {
      if(this.props.isFetching) return <LoadingScreen/>
      const {hideSheets} = this.props;
        return (
            <DnDContext>
              <Grid container spacing={0}>
                <Grid item xs={hideSheets ? 0 : 12} sm={hideSheets ? 0 : 12} md={hideSheets ? 0 : 4} lg={hideSheets ? 0 : 3} xl={hideSheets ? 0 : 2}>
                  {!this.props.hideSheets && <SheetMenu preventDrag hideNewSheet sheets={this.props.sheets}/>}
                </Grid>
                <Grid item xs={12} sm={12} md={hideSheets ? 12 : 8} lg={hideSheets ? 12 : 9} xl={hideSheets ? 12 : 10}>
                  {this.props.activeSheet && <SheetsContainer/>}
                </Grid>
              </Grid>
            </DnDContext>
        );
    }
}

function mapStateToProps({editor, ui}) {
  return{
    sheets: editor.sheets,
    hideSheets: ui.hideSheets,
    isFetching: editor.isFetching,
    activeSheet: editor.activeSheet
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getSheets
  },dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResearchContainer))
