import React,{Component} from 'react';
import {PaginationsList, PaginationsListItem} from '../../../common/styledComponents/containers'
import Button from 'material-ui/Button';
import { localize } from 'react-localize-redux';

class Pagination extends Component {

  renderPageNumbers = () => {
    return this.props.pageNumbers.map((number, index) => {
      return(
        <ChangePageButton
          key={index}
          onClick={() => this.props.pageClick(number)}
          active={number === this.props.currentPage}
          label={number}
        />
      );
    });
  }

  render() {
      return (
          <PaginationsList>
            <ChangePageButton
              onClick={() => this.props.pageClick(this.props.currentPage - 1)}
              label={this.props.translate('common.back')}
              disabled={this.props.currentPage === 1}
            />
            {this.renderPageNumbers()}
            <ChangePageButton
              onClick={() => this.props.pageClick(this.props.currentPage + 1)}
              label={this.props.translate('common.next')}
              disabled={this.props.currentPage === this.props.pageNumbers[this.props.pageNumbers.length - 1]}
            />
          </PaginationsList>
      );
  }
}

const ChangePageButton = ({onClick, label, disabled, active}) => (
  <PaginationsListItem disabled={disabled} active={active}>
    <Button onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  </PaginationsListItem>
)

export default localize(Pagination, 'locale');
