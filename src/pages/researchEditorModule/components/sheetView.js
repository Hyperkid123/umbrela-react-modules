  import React,{Component} from 'react';

import {
  LABEL_LENGTH,
} from '../../../common/constants';

import {
  Flex,
  FlexSection
} from '../../../common/styledComponents/containers';
import {DeleteNotification} from '../../../common/styledComponents/typography';
import {
  TextFieldComent
} from '../../../common/components/labels';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ActionDelete from 'material-ui-icons/DeleteForever';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  deleteSheet,
  changeSheetTitle,
  updateSheetInformation,
} from '../../../redux/actions';

import QuestionsCreator from './questionsCreator';

class SheetView extends Component {
    constructor(props){
    	super(props);
    	this.state = {
        showDelete: false
      };
    }

    componentDidMount() {
      if(this.props.activeSheet && this.props.activeSheet.newSheet){
          //this.sheetTitleInput.focus();
          //this.sheetTitleInput.select();
      }
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.props.activeSheet && this.props.activeSheet.newSheet){
          //this.sheetTitleInput.focus();
          //this.sheetTitleInput.select();
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

    ];
      if(this.props.activeSheet) {
        return (
          <Flex>
            <FlexSection fullWidth autoHeight>
              <Paper square style={{padding: 10}}>
                <Flex grow baseline>
                  <Flex column grow>
                    <TextField
                      name="sheetTitleInput"
                      style={{width: 'auto', marginRight: 15}}
                      value={this.props.activeSheet.title}
                      onChange={(event, newValue) => {
                        this.props.changeSheetTitle(newValue)
                      }}
                      onBlur={this.handleUpdateSheetTitle}
                    />
                    <TextFieldComent
                      error={this.props.activeSheet.title.length >= LABEL_LENGTH}
                      label={`${this.props.activeSheet.title.length} z ${LABEL_LENGTH} znaků`}
                      alignRight
                    />
                  </Flex>
                  <Button raised onClick={this.handleDeleteOpen}>
                    <ActionDelete/>
                    Smazat
                  </Button>
                </Flex>
                <QuestionsCreator/>
              </Paper>
            </FlexSection>
            <Dialog
              open={this.state.showDelete}
              onClose={this.handleDeleteClose}
            >
              Smazat arch <DeleteNotification>{this.props.activeSheet.title}</DeleteNotification>?
              <Button
                color='secondary'
                onClick={this.handleDeleteSheet}
              >
                <ActionDelete/>
                Smazat
              </Button>
              <Button
                raised
                color='primary'
                onClick={this.handleDeleteClose}
              >
                Zpět
              </Button>
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
