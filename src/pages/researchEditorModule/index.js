import React,{Component} from 'react';
import '../../common/globalStyles';
import DNDContext from '../../common/components/dndContext';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getSheets,
} from '../../redux/actions';

import SheetMenu from '../common/sheetMenu';
import SheetView from './components/sheetView';
import QuestionView from './components/questionView';
import Grid from 'material-ui/Grid';


export class ResearchEditorModule extends Component {
    componentWillMount() {
      this.props.getSheets(window.researchId)
    }
    renderBody = () => (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
          <SheetMenu sheets={this.props.sheets}/>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
          <Grid container spacing={0}>
            <QuestionView/>
          </Grid>
          <Grid container spacing={0}>
            <SheetView/>
          </Grid>
        </Grid>
      </Grid>
    )
    render() {
      return (
        <DNDContext>
          {this.renderBody()}
        </DNDContext>
      );
    }
}



function mapStateToProps({editor}) {
  return {
    sheets: editor.sheets,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getSheets
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResearchEditorModule);
