import React,{Component} from 'react';
import {
  MenuContainer,
  FlexSection,
  MenuList,
} from '../../../common/styledComponents/containers';
import { Scrollbars } from 'react-custom-scrollbars';
import {SmallHeading} from '../../../common/styledComponents/typography';
import {MenuListItem} from '../../../common/components/menuListIcons';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import ActionAdd from 'material-ui/svg-icons/content/add';
import SheetDraggableCard from './sheetDraggableCard';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactTooltip from 'react-tooltip';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createNewSheet,
  selectEditorSheet,
  dragSheetCard,
  remapSheets,
} from '../../../redux/actions';

class SheetMenu extends Component {

    moveCard = (dragIndex, hoverIndex) => {
      this.props.dragSheetCard(dragIndex, hoverIndex);
    };

    renderSheets = () => {
      return this.props.sheets.map((sheet, i) => {
        return (
          <SheetDraggableCard
            index={i}
            key={sheet.sheetId}
            moveCard={this.moveCard}
            onDragEnd={this.props.remapSheets}
            researchId={this.props.researchId}
          >
            <MenuListItem
              key={sheet.sheetId}
              sheetId={sheet.sheetId}
              onClick={this.props.selectEditorSheet}
              label={sheet.title}
              active={!this.props.draggingElement && this.props.activeSheetId === sheet.sheetId}
              dragging={this.props.draggingElement}
              tooltipLabel="Tažením můžete změnit pořadí archu"
            />
          </SheetDraggableCard>
        )
      });
    }

    render() {
        if(!this.props.sheets) {
          return <SmallHeading>Loading</SmallHeading>
        }
        return (
          <FlexSection minWidth={300}>
            <Paper rounded={false}>
              <MenuContainer>
                <SmallHeading>Arhy</SmallHeading>
                <Scrollbars
                  style={{height: 'calc(100vh - 2em - 60px)'}}
                >
                  <FlatButton onClick={() => this.props.createNewSheet(window.researchId)} primary icon={<ActionAdd/>} label='Nový arch'/>
                  <MenuList>
                    {this.renderSheets()}
                  </MenuList>
                </Scrollbars>
              </MenuContainer>
            </Paper>
            {!this.props.draggingElement ? <ReactTooltip place="right" effect="solid" type="info" delayShow={800}/> : null}
          </FlexSection>
        );
    }
}



function mapStateToProps({editor, ui}) {
  return {
    sheets: editor.sheets,
    researchId: editor.researchId,
    activeSheetId: editor.activeSheet ? editor.activeSheet.sheetId : null,
    draggingElement: ui.dragging,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createNewSheet,
    selectEditorSheet,
    dragSheetCard,
    remapSheets,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SheetMenu);
