import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getSheets,
} from '../../redux/actions';
import DNDContext from '../../common/components/dndContext';
import SheetMenu from '../common/sheetMenu';
import FiltrationView from './components/filtrationView';
import Grid from 'material-ui/Grid';

export class Filtrations extends Component {
    componentWillMount() {
      this.props.getSheets(window.researchId)
    }

    render() {
        return (
          <DNDContext>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
              <SheetMenu hideNewSheet sheets={this.props.sheets}/>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
              <Grid container spacing={0}>
                {this.props.activeSheet && <FiltrationView/>}
              </Grid>
            </Grid>
          </DNDContext>
        );
    }
}

function mapStateToProps({editor}) {
  return{
    sheets: editor.sheets,
    activeSheet: editor.activeSheet,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getSheets
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtrations)
