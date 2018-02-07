import React,{Component} from 'react';
import '../../common/globalStyles';
import {
  ViewContainer,
  Flex,
} from '../../common/styledComponents/containers';
import DNDContext from '../../common/components/dndContext';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getSheets,
} from '../../redux/actions';

import SheetMenu from '../common/sheetMenu';
import SheetView from './components/sheetView';
import QuestionView from './components/questionView';


export class ResearchEditorModule extends Component {
    componentWillMount() {
      this.props.getSheets(window.researchId)
    }
    render() {
        return (
            <ViewContainer>
              <Flex grow column>
                <DNDContext>
                  <SheetMenu sheets={this.props.sheets}/>
                  <Flex grow column>
                    <QuestionView/>
                    <SheetView/>
                  </Flex>
                </DNDContext>
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
