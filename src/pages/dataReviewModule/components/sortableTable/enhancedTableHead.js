import React,{Component} from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';

export default class EnhancedTableHead extends Component {

    createSortHandler = property => event => {
      console.log('sem tu');
      this.props.onRequestSort(event, property)
    }

    renderColumns = () => {
      const { order, orderBy, columnData } = this.props;
      return columnData.map((column) => (
        <TableCell
          key={column.id}
          numeric={column.numeric}
          sortDirection={orderBy === column.id ? order : false}
        >
          <Tooltip
            title="Seřadit"
            placement={column.numeric ? 'bottom-end' : 'bottom-start'}
            enterDelay={300}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={order}
              onClick={this.createSortHandler(column.id)}
            >
              {column.label}
            </TableSortLabel>
          </Tooltip>
        </TableCell>
      ))
    }

    render() {
      return (
          <TableHead>
              <TableRow>
                {this.renderColumns()}
              </TableRow>
          </TableHead>
      );
    }
}
