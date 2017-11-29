import React,{Component} from 'react';
import '../../common/globalStyles';
import {
  ViewContainer,
  Flex,
} from '../../common/styledComponents/containers';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getSheets,
} from '../../redux/actions';

import SheetMenu from './components/sheetMenu';
import SheetView from './components/sheetView';

class ResearchEditorModule extends Component {
    componentWillMount() {
      this.props.getSheets(window.researchId)
    }
    render() {
        return (
            <ViewContainer>
              <Flex grow>
                <SheetMenu sheets={this.props.sheets}/>
                <SheetView/>
              </Flex>
            </ViewContainer>
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
