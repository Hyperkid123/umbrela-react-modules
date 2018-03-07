import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FiberManualRecord from 'material-ui-icons/FiberManualRecord'
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';
import {Flex} from '../../../common/styledComponents/containers';
import { localize } from 'react-localize-redux';

class LegendTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      image: '',
      showImage: false,
    };
  }

  handleShowImage = (url) => {
    if(this.props.isOptionImage){
      this.setState({showImage: true, image: url});
    }
  }
  handleCloseImage = () => this.setState({showImage: false});

  renderTableBody = () => {
    const {labels, datasets} = this.props.data.barData.data;
    const {backgroundColor, data} = datasets[0];
    return labels.map((label, index) => {
      let buttonLabel = label;
      if(this.props.isOptionImage){
        buttonLabel = label.substr(label.lastIndexOf('/') + 1);
      }
      return (
        <TableRow key={index}
          data-tip
          data-for={`${index}_tooltip`}
          onClick={() => this.handleShowImage(label)}
        >
          <TableCell>
            <FiberManualRecord style={{color: backgroundColor[index]}}/>
          </TableCell>
          <TableCell>
              {buttonLabel}
          </TableCell>
          <TableCell>
            {data[index]}
          </TableCell>
        </TableRow>
      );
    });
  }

  render() {
    const {translate} = this.props;
    return (
      <Flex grow>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan='2'>{translate('review.divideAttributes.option')}</TableCell>
              <TableCell>{translate('review.count')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderTableBody()}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan='2'>{translate('review.respondents')}: {this.props.data.respondents}</TableCell>
              <TableCell>{this.props.data.answerCount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Dialog
          title="Preview"
          modal={false}
          open={this.state.showImage}
          onClose={this.handleCloseImage}
        >
          <Flex>
            <img src={this.state.image} alt={this.state.image}/>
          </Flex>
        </Dialog>
      </Flex>
    );
  }
}

LegendTable.propTypes = {
  data: PropTypes.object.isRequired,
  isOptionImage: PropTypes.bool,
};

export default localize(LegendTable, 'locale');
