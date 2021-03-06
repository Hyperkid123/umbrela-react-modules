  import React,{Component} from 'react';

import {
  LABEL_LENGTH,
} from '../../../common/constants';
import {DeleteNotification} from '../../../common/styledComponents/typography';
import {
  TextFieldComent
} from '../../../common/components/labels';
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
import Grid from 'material-ui/Grid';
import {
  CardWrapper,
  CardControlls,
  CardBody,
  InputHeader
} from '../../../common/styledComponents/card';
import Input, { InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import EditIcon from 'material-ui-icons/ModeEdit';

import QuestionsCreator from './questionsCreator';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

export class SheetView extends Component {
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
      if(this.props.activeSheet) {
        const {translate} = this.props;
        return (
          <Grid item xs={12}>
            <CardWrapper>
              <InputHeader>
                <FormControl fullWidth>
                  <Input
                    name="sheetTitleInput"
                    fullWidth
                    value={this.props.activeSheet.title}
                    onChange={(event) => {
                      this.props.changeSheetTitle(event.target.value)
                    }}
                    onBlur={this.handleUpdateSheetTitle}
                    onKeyPress={(event) => {if(event.key === 'Enter') this.handleUpdateSheetTitle()}}
                    inputRef={(input) => { this.sheetTitleInput = input; }}
                    startAdornment={<InputAdornment position='start'><EditIcon/></InputAdornment>}
                  />
                </FormControl>
              </InputHeader>
              <TextFieldComent
                error={this.props.activeSheet.title.length >= LABEL_LENGTH}
                label={`${this.props.activeSheet.title.length} ${translate('common.from')} ${LABEL_LENGTH} ${translate('common.characters')}`}
                alignRight
              />
              <CardControlls>
                <Grid container spacing={0} justify="flex-end" direction="row">
                  <Grid item>
                    <Button raised onClick={this.handleDeleteOpen}>
                      <ActionDelete/>
                      {translate('sheets.delete')}
                    </Button>
                  </Grid>
                </Grid>
              </CardControlls>
              <CardBody>
                <Grid item>
                  <QuestionsCreator/>
                </Grid>
              </CardBody>
            </CardWrapper>
            <Dialog
              open={this.state.showDelete}
              onClose={this.handleDeleteClose}
            >
              <Grid container justify='center' maxWidth={false} style={{padding: 16}}>
                <Grid item xs={12}>
                  {translate('sheets.delete')} <DeleteNotification>{this.props.activeSheet.title}</DeleteNotification>?
                </Grid>
                <Grid item>
                  <Button
                    raised
                    color='secondary'
                    onClick={this.handleDeleteSheet}
                    >
                      {translate('common.delete')}
                    </Button>
                </Grid>
                <Grid item>
                  <Button
                    raised
                    color='primary'
                    onClick={this.handleDeleteClose}
                    >
                      {translate('common.cancel')}
                    </Button>
                </Grid>
              </Grid>
            </Dialog>
          </Grid>
        );
      } else {
        return null;
      }

    }
}

function mapStateToProps({editor, locale}) {
  return {
    activeSheet: editor.activeSheet,
    translate: getTranslate(locale),
    currentLanguage: getActiveLanguage(locale).code,
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
