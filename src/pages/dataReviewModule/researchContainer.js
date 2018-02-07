import React,{Component} from 'react';
import SheetMenu from '../common/sheetMenu';
import {Flex} from '../../common/styledComponents/containers';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {getSheets} from '../../redux/actions'
import DnDContext from '../../common/components/dndContext';
import LoadingScreen from '../../common/components/loadingScreen';
import SheetsContainer from './sheetsContainer';
import { withRouter } from 'react-router-dom';

export class ResearchContainer extends Component {
    componentWillMount() {
      this.props.getSheets(window.researchId)
    }

    render() {
      if(this.props.isFetching) return <LoadingScreen/>
        return (
            <Flex column>
              <DnDContext>
                {!this.props.hideSheets && <SheetMenu preventDrag hideNewSheet sheets={this.props.sheets}/>}
                {this.props.activeSheet && <SheetsContainer/>}
              </DnDContext>
            </Flex>
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
