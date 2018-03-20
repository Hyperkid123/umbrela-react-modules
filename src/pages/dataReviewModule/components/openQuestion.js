import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import ImageIcon from 'material-ui-icons/Image';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Pagination, {} from './pagination'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import SearchIcon from 'material-ui-icons/Search';
import { FormControl } from 'material-ui/Form';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { localize } from 'react-localize-redux';


import {
  Flex
} from '../../../common/styledComponents/containers';

 export class OpenQuestion extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 10,
      answers: [],
      filterText: '',
      showImage: false,
    };
  }

  handleShowImage = () => this.setState({showImage: true});
  handleCloseImage = () => this.setState({showImage: false});

  componentWillReceiveProps(nextProps) {
    this.setState({answers: nextProps.data.answers});
  }

  componentWillMount() {
    this.setState({answers: this.props.data.answers});
  }

  pageNumbers = () => {
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.answers.length / this.state.itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    if(pageNumbers.length > 6){
      const length = pageNumbers.length;
      pageNumbers = [
        ...pageNumbers.slice(0,3),
        ...pageNumbers.slice(length - 3, length),
      ];
      if(this.state.currentPage > 3 && this.state.currentPage < pageNumbers[pageNumbers.length - 3]){
        const currentPage = this.state.currentPage;
        pageNumbers = [
          ...pageNumbers.slice(0,3),
          currentPage,
          ...pageNumbers.slice(3, pageNumbers.length),
        ];
      }
    }
    return pageNumbers;
  }

  handlePageClick = (page) => {
    this.setState({currentPage: page});
  }

  renderCurrentList = (answers) => {
    return answers.map((answer, index) => {
      return(
        <ListItem button key={index}>
          <ListItemText primary={answer.shortAnswer}/>
        </ListItem>
      );
    });
  }

  handleItemsPerPageChange = (event) =>{
    const maxPage = Math.ceil(this.state.answers.length / event.target.value);
    let currentPage = this.state.currentPage;
    if(currentPage > maxPage) currentPage = maxPage;
    currentPage = currentPage === 0 ? 1 : currentPage;
    this.setState({itemsPerPage: event.target.value, currentPage});
  }

  handleSearchChange = (value) => {
    const newArray = this.props.data.answers.filter((answer) => {
      return answer.shortAnswer.toLowerCase().includes(value.toLowerCase());
    });
    let currentPage = this.state.currentPage;
    const maxPage = Math.ceil(newArray.length / this.state.itemsPerPage);
    if(currentPage > maxPage) currentPage = maxPage;
    currentPage = currentPage === 0 ? 1 : currentPage;
    this.setState({filterText: value, answers: newArray, currentPage});
  }

  renderImagePreview = () => {
    if(this.props.question.url){
      return(
         <Button
           color='primary'
           fab
           onClick={this.handleShowImage}
           style={{marginLeft: 'auto'}}
         >
           <ImageIcon />
         </Button>
      );
    }
    return null;
  }

  render() {
    const {translate} = this.props;
    const lastIndex = this.state.currentPage * this.state.itemsPerPage;
    const firstIndex = lastIndex - this.state.itemsPerPage;
    const currentAnswers = this.state.answers.slice(firstIndex, lastIndex);
    return (
      <Flex grow column>
        <Flex style={{marginTop: 5}}>
          <FormControl>
            <InputLabel htmlFor="search">{translate('common.search')}</InputLabel>
            <Input
              id="adornment-search"
              type='text'
              value={this.state.filterText}
              onChange={(event) => this.handleSearchChange(event.target.value)}
              endAdornment={
                <InputAdornment position="end" style={{marginTop: 0}}>
                    <SearchIcon color="disabled"/>
                </InputAdornment>
              }
            />
          </FormControl>
          <Flex auto style={{marginLeft: 'auto', alignSelf: 'flex-end'}} verticalCenter>
            <span>
              {translate('review.answersPerPage')} &nbsp;
            </span>
            <Select
              value={this.state.itemsPerPage}
              onChange={this.handleItemsPerPageChange}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </Flex>
        </Flex>
        <Flex horizontalCenter>
          <Pagination currentPage={this.state.currentPage} pageNumbers={this.pageNumbers()} pageClick={this.handlePageClick}/>
        </Flex>
        <Flex auto horizontalCenter>
          <Paper>
            <List style={{flex: '0 1 auto'}} component='nav'>
              {this.renderCurrentList(currentAnswers)}
            </List>
          </Paper>
        </Flex>
        {this.renderImagePreview()}
        <Dialog
          open={this.state.showImage}
          onClose={this.handleCloseImage}
        >
          <img src={this.props.question.url} alt={this.props.question.url}/>
        </Dialog>
      </Flex>
    );
  }
}

OpenQuestion.propTypes = {
  data: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
};

export default localize(OpenQuestion, 'locale');
