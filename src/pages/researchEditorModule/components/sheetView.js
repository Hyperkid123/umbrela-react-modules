import React,{Component} from 'react';
import {
  Flex,
  FlexSection
} from '../../../common/styledComponents/containers';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  deleteSheet,
  changeSheetTitle,
  updateSheetInformation,
} from '../../../redux/actions';

class SheetView extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        showDelete: false
      };
    }

    componentDidMount() {
      if(this.props.activeSheet && this.props.activeSheet.newSheet){
          this.sheetTitleInput.focus();
          this.sheetTitleInput.select();
      }
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.props.activeSheet && this.props.activeSheet.newSheet){
          this.sheetTitleInput.focus();
          this.sheetTitleInput.select();
      }
    }

    handleDeleteOpen = () => {
      this.setState({showDelete: true});
    }

    handleDeleteClose = () => {
      this.setState({showDelete: false})
    }

    handleDeleteSheet = () => {
      this.props.deleteSheet(this.props.activeSheet.sheetId, window.researchId);
      this.setState({showDelete: false});
    }

    handleUpdateSheetTitle = () => {
      this.props.updateSheetInformation(this.props.activeSheet, window.researchId)
    }

    render() {
      const deleteAction = [
      <FlatButton
        label="Smazat"
        secondary
        icon={<ActionDelete/>}
        onClick={this.handleDeleteSheet}
      />,
      <RaisedButton
        label="Zpět"
        primary={true}
        onClick={this.handleDeleteClose}
      />,
    ];
      if(this.props.activeSheet) {
        return (
          <Flex>
            <FlexSection fullWidth>
              <Paper rounded={false} style={{padding: 10}}>
                <Flex baseline>
                    <TextField
                      ref={(input) => { this.sheetTitleInput = input; }}
                      name="sheetTitleInput"
                      style={{flex: 2, marginRight: 15}}
                      underlineStyle={{height: 1}}
                      value={this.props.activeSheet.title}
                      onChange={(event, newValue) => this.props.changeSheetTitle(newValue)}
                      onBlur={this.handleUpdateSheetTitle}
                    />
                    <RaisedButton onClick={this.handleDeleteOpen} secondary icon={<ActionDelete/>} label='Smazat arch'/>
                </Flex>
              </Paper>
            </FlexSection>
            <Dialog
              actions={deleteAction}
              modal={false}
              open={this.state.showDelete}
              onRequestClose={this.handleDeleteClose}
            >
              Smazat arch?
            </Dialog>
          </Flex>
        );
      } else {
        return null;
      }

    }
}

function mapStateToProps({editor}) {
  return {
    activeSheet: editor.activeSheet,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteSheet,
    changeSheetTitle,
    updateSheetInformation
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SheetView);
