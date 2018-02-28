import React,{Component} from 'react';
import {
  MenuList,
} from '../../common/styledComponents/containers';
import {
  CardWrapper,
  CardHeader,
  CardBody
} from '../../common/styledComponents/card';
import {SmallHeading} from '../../common/styledComponents/typography';
import {MenuListItem} from '../../common/components/menuListIcons';
import Button from 'material-ui/Button';
import ActionAdd from 'material-ui-icons/Add';
import SheetDraggableCard from './sheetDraggableCard';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createNewSheet,
  selectEditorSheet,
  dragSheetCard,
  remapSheets,
} from '../../redux/actions';

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
            preventDrag={this.props.preventDrag}
          >
            <MenuListItem
              key={sheet.sheetId}
              sheetId={sheet.sheetId}
              onClick={this.props.selectEditorSheet}
              label={sheet.title}
              active={!this.props.draggingElement && this.props.activeSheetId === sheet.sheetId}
              dragging={this.props.draggingElement}
              tooltipLabel="Tažením můžete změnit pořadí archu"
              preventDrag={this.props.preventDrag}
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
          <CardWrapper>
            <CardHeader>
              Archy
            </CardHeader>
            <CardBody>
              {!this.props.hideNewSheet &&
                <Button disabled={this.props.hideNewSheet} color='primary' onClick={() => this.props.createNewSheet(window.researchId)}>
                  <ActionAdd/>
                  Nový arch
                </Button>
              }
              <MenuList>
                {this.renderSheets()}
              </MenuList>
            </CardBody>
          </CardWrapper>
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
