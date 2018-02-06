import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadQuestions, saveFilter} from '../../../../redux/actions';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ListIcon from 'material-ui-icons/List';
import Checkbox from 'material-ui/Checkbox';
import lodash from 'lodash';

class FilterableQuestionsList extends Component {

  componentWillMount() {
    this.props.loadQuestions(this.props.sheetId);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.sheetId !== this.props.sheetId) {
      this.props.loadQuestions(nextProps.sheetId);
    }
  }

  renderSelectableList = () => {
    const list = [];
    this.props.questions.forEach((question) => {
      if(this.props.filterOrder && question.questionOrder <= this.props.questionOrder) return null;
      const checked = this.findIfFiltered(question.questionId);
      list.push(
        <ListItem
          key={question.questionId}
          dense
          button
          onClick={() => this.props.saveFilter(this.props.selectedOptionId, question.questionId, checked)}
        >
          <Checkbox checked={checked}/>
          <ListItemText primary={question.title}/>
        </ListItem>
      )
    })
    return list
  };

  findIfFiltered = (questionId) => {
    return !!lodash.find(this.props.filters[this.props.selectedOptionId], (filter) => filter === questionId);
  }

  render() {
    if (!this.props.questions || this.props.questions.length === 0) return null;
    const renderableList = this.props.questions ? this.renderSelectableList() : [];
    if(renderableList.length === 0) return null;
    console.log('re render');
    return (
      <List style={{margin: 5}}>
        <ListItem>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary={this.props.title}/>
        </ListItem>
        <Divider/>
        {renderableList}
      </List>
    );
  }
}

const mapStateToProps = (_, initialProps) => ({questions, options}) => {
  return {
    questions: questions.allQuestions[initialProps.sheetId],
    filters: options.optionsFilters
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadQuestions,
    saveFilter,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterableQuestionsList)
