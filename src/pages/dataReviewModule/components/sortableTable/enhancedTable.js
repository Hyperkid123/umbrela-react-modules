import React,{Component} from 'react';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from 'material-ui/Table';
import EnhancedTableHead from './enhancedTableHead'


export default class EnhancedTable extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      order: 'asc',
      orderBy: 'name',
      data: props.data,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  }

  renderData = () => {
    return this.state.data.map((row, i) => (
      <TableRow
        hover
        key={i}
      >
        <TableCell>
          {row.name}
        </TableCell>
        <TableCell numeric>
          {row.avg}
        </TableCell>
        <TableCell numeric>
          {row.med}
        </TableCell>
        <TableCell numeric>
          {row.mod}
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    const { order, orderBy} = this.state;
    return (
      <Table>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={this.handleRequestSort}
          columnData={this.props.columnData}
        />
        <TableBody>
          {this.renderData()}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              {this.props.footerTitle}: {this.props.answerCount}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}
