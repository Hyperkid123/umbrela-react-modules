import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex} from '../../../common/styledComponents/containers';
import PyramidRow from './pyramidRow';
import PyramidDescription from './pyramidDescription';
import RowHandler from './rowHandler';
import {changeRowBlocks, addPyramidRow, removePyramidRow} from '../../../redux/actions';
import { ActionCreators as UndoActionCreators } from 'redux-undo'

class PyramidCreator extends Component {
    renderRows = () => this.props.rows.map((row, iterator) => (
      <PyramidRow key={iterator} blocks={row.blocks} changeTiles={this.props.changeRowBlocks} rowIndex={iterator}/>
    ));
    render() {
        return (
            <Flex column horizintalCenter>
              <PyramidDescription/>
              <Flex>
                <Flex column>
                  {this.renderRows()}
                </Flex>
              </Flex>
              <RowHandler addRow={this.props.addPyramidRow} removeRow={this.props.removePyramidRow} rows={this.props.rows.length}/>
            </Flex>
        );
    }
}
function mapStateToProps({qMethodBuilder}) {
  return{
    rows: qMethodBuilder.present.rows,
    canUndo: qMethodBuilder.past.length > 0,
    canRedo: qMethodBuilder.future.length > 0
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeRowBlocks,
    addPyramidRow,
    removePyramidRow,
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PyramidCreator);
