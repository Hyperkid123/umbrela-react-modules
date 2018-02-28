import React,{Component} from 'react';
import {Flex} from '../../../common/styledComponents/containers';
import Tabs, { Tab } from 'material-ui/Tabs';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadOptions} from '../../../redux/actions';
import AppBar from 'material-ui/AppBar';
import FilterableQuestionsList from './filtrations/filterableQuestionsList';

class QuestionFiltrations extends Component {

    constructor(props){
    	super(props);
    	this.state = {
        tab: 0,
        selectedOptionId: this.props.options && this.props.options[0] ? this.props.options[0].optionId : null
      };
    }

    componentWillMount() {
      this.props.loadOptions(this.props.questionId);
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.questionId !== this.props.questionId) {
        this.props.loadOptions(nextProps.questionId);
      }
      if(!this.state.selectedOptionId && !this.props.options && nextProps.options && nextProps.options[0]) {
        this.setState({
          selectedOptionId: nextProps.options[0].optionId
        })
      }
    }

    setCurrentTab = (tab) => {
      if(this.props.options && this.props.options[tab]){
        this.setState({
          tab,
          selectedOptionId: this.props.options[tab].optionId
        })
      }
    };

    renderOptionsTabs = () => this.props.options.map((option, i) => <Tab key={option.optionId} label={option.title}/>);

    renderFilterableLists = () => this.props.sheets.map((sheet) => {
      if(sheet.sheetOrder >= this.props.activeSheet.sheetOrder) {
        return (
          <FilterableQuestionsList
            key={sheet.sheetId}
            title={sheet.title}
            sheetId={sheet.sheetId}
            questionId={this.props.questionId}
            questionOrder={this.props.questionOrder}
            selectedOptionId={this.state.selectedOptionId}
            filterOrder={this.props.activeSheet.sheetId === sheet.sheetId}
          />
        )
      }
      return null;
    })

    render() {
      const {tab} = this.state;
      return (
          <Flex column>
            <AppBar position="static" color="default" style={{maxWidth: 'calc(100vw - 400px - 20px)'}}>
              <Tabs
                value={tab}
                fullWidth
                onChange={(event, value) => this.setCurrentTab(value)}
                scrollable
                scrollButtons='auto'
                indicatorColor='primary'
              >
                {this.props.options && this.renderOptionsTabs()}
              </Tabs>
            </AppBar>
            <Flex horizontalCenter wrap='true'>
              {this.props.sheets && this.renderFilterableLists()}
            </Flex>
          </Flex>
      );
    }
}

const mapStateToProps = (_, initialProps) => ({options, editor}) => {
  return {
    options: options.allOptions[initialProps.questionId],
    sheets: editor.sheets,
    activeSheet: editor.activeSheet
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadOptions
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionFiltrations)
