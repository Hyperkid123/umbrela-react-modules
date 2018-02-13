import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import FiberManualRecord from 'material-ui-icons/FiberManualRecord'
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';


import {Flex} from '../../../common/styledComponents/containers';

export default class LegendTable extends Component {

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
    const actions = [
      <Button
        key={0}
        primary={true}
        keyboardFocused={true}
        onClick={this.handleCloseImage}
      >
        Zavřít
      </Button>,
    ];
    return (
      <Flex grow>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan='2'>Možnost</TableCell>
              <TableCell>Počet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderTableBody()}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan='2'>Respondenti: {this.props.data.respondents}</TableCell>
              <TableCell>{this.props.data.answerCount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Dialog
          title="Preview"
          actions={actions}
          modal={false}
          open={this.state.showImage}
          contentStyle={{
            width: '90%',
            maxWidth: 'none',
          }}
          onRequestClose={this.handleCloseImage}
        >
          <Flex>
            <img src={this.state.image}/>
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
