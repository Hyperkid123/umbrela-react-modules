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
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

export class SheetMenu extends Component {

    moveCard = (dragIndex, hoverIndex) => {
      this.props.dragSheetCard(dragIndex, hoverIndex);
    };

    renderDraggableSheets = () => this.props.sheets.map((sheet, i) => (
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
          tooltipLabel={this.props.translate('sheets.drag')}
          preventDrag={this.props.preventDrag}
        />
      </SheetDraggableCard>
    ))
    renderSheets = () => {
      const {translate} = this.props;
      return this.props.sheets.map((sheet, i) => {
        return (
            <MenuListItem
              key={sheet.sheetId}
              sheetId={sheet.sheetId}
              onClick={this.props.selectEditorSheet}
              label={sheet.title}
              active={!this.props.draggingElement && this.props.activeSheetId === sheet.sheetId}
              dragging={this.props.draggingElement}
              tooltipLabel={translate('sheets.drag')}
              preventDrag={this.props.preventDrag}
            />
        )
      });
    }

    render() {
      const {translate} = this.props;
        if(!this.props.sheets) {
          return <SmallHeading>Loading</SmallHeading>
        }
        return (
          <CardWrapper>
            <CardHeader>
              {translate('sheets.sheets')}
            </CardHeader>
            <CardBody>
              {!this.props.hideNewSheet &&
                <Button disabled={this.props.hideNewSheet} color='primary' onClick={() => this.props.createNewSheet(translate('sheets.titlePlaceholder'))}>
                  <ActionAdd/>
                  {translate('sheets.newSheet')}
                </Button>
              }
              <MenuList>
                {this.props.preventDrag ? this.renderSheets() : this.renderDraggableSheets()}
              </MenuList>
            </CardBody>
          </CardWrapper>
        );
    }
}



function mapStateToProps({editor, ui, locale}) {
  return {
    sheets: editor.sheets,
    researchId: editor.researchId,
    activeSheetId: editor.activeSheet ? editor.activeSheet.sheetId : null,
    draggingElement: ui.dragging,
    translate: getTranslate(locale),
    currentLanguage: getActiveLanguage(locale).code,
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
