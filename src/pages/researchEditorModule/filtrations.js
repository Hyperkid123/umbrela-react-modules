import React,{Component} from 'react';
import {Flex, ViewContainer} from './../../common/styledComponents/containers';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getSheets,
} from '../../redux/actions';
import DNDContext from '../../common/components/dndContext';
import SheetMenu from './components/sheetMenu';

class Filtrations extends Component {
    componentWillMount() {
      this.props.getSheets(window.researchId)
    }

    render() {
        return (  <ViewContainer>
            <Flex grow column>
              <DNDContext>
                <SheetMenu sheets={this.props.sheets}/>
                <Flex grow column>
                </Flex>
              </DNDContext>
            </Flex>
          </ViewContainer>
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
