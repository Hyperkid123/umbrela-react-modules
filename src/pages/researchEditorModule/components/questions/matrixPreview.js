import React,{Component} from 'react';
import {Flex, MatrixTable, MatrixTableHeader, MatrixtableCell, MatrixTableBody, PreviewImage, MatrixTableRow, FullImage} from '../../../../common/styledComponents/containers';
import {divideMatrixOptions} from '../../../../common/utils';
import {HasOptionsAsImage, HasMultipleAnswers} from '../../../../common/questionTypes';
import Checkbox from 'material-ui/Checkbox';
import RadioUncheckedIcon from 'material-ui-icons/RadioButtonUnchecked';
import RadioCheckedIcon from 'material-ui-icons/RadioButtonChecked';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import LazyLoad from 'react-lazyload';
import {MATRIX_INPUT_FIX} from '../../../../common/constants';

export default class MatrixPreview extends Component {

    constructor(props){
    	super(props);
    	this.state = {
        modalOpen: false,
        imgSource: null,
      };
    }

    handleOpen = (imgSource) => {
        this.setState({
          modalOpen: true,
          imgSource,
        });
    };

    handleClose = () => {
        this.setState({modalOpen: false});
    };

    componentWillReceiveProps() {
        this.setState({modalOpen: false});
    }

    renderTableHeader = (columns) => {
      const header = [<MatrixtableCell key='empty'></MatrixtableCell>]
      columns.forEach((column) => {
        header.push(<MatrixtableCell filler key={column.optionId}><span>{column.title}</span></MatrixtableCell>)
      })
      return header;
    }

    renderRowInputs = (rowSize) => {
        const filler = [];
        for (let i = 0; i < rowSize; i++) {
            filler.push(<MatrixtableCell key={i}>{this.getOptionInput()}</MatrixtableCell>);
        }
        return filler;
    }

    getOptionInput = () => {
      if(HasMultipleAnswers(this.props.questionType)) {
        return (
          <Checkbox style={MATRIX_INPUT_FIX}/>
        )
      }
      return (
        <Checkbox
          icon={<RadioUncheckedIcon/>}
          style={MATRIX_INPUT_FIX}
          checkedIcon={<RadioCheckedIcon/>}
        />
       )
    }

    renderTableRows = (rows, rowSize) => {
      return rows.map((row) => {
        return(
          <MatrixTableRow filler key={row.optionId}>
            <MatrixtableCell>{this.renderRowTitle(row)}</MatrixtableCell>
            {this.renderRowInputs(rowSize)}
          </MatrixTableRow>
        )
      })
    }

    renderRowTitle = (row) => {
      if(HasOptionsAsImage(this.props.questionType)) {
        return (
            <PreviewImage style={{cursor: 'pointer'}} src={row.title} alt={row.title} onClick={() => this.handleOpen(row.title)}/>
        )
      }
      return <span>{row.title}</span>
    }

    render() {
        const {rows, columns} = divideMatrixOptions(this.props.options);
        const modalActions = [
               <Button
                 label="Zavřít"
                 key='closeAction'
                 primary={true}
                 onClick={this.handleClose}
               />,
        ];
        return (
            <Flex column>
              <MatrixTable>
                <MatrixTableHeader>
                  <tr>
                    {this.renderTableHeader(columns)}
                  </tr>
                </MatrixTableHeader>
                <MatrixTableBody>
                  {this.renderTableRows(rows, columns.length)}
                </MatrixTableBody>
              </MatrixTable>
              <Dialog
                  title="Náhled"
                  actions={modalActions}
                  modal={false}
                  open={this.state.modalOpen}
                  onRequestClose={this.handleClose}
                  contentStyle={{width: '90%', maxWidth: 'none', marginTop: 10, marginBottom: 10}}
                  autoScrollBodyContent={true}
                >
                  <LazyLoad>
                    <FullImage src={this.state.imgSource} alt={this.state.imgSource}/>
                  </LazyLoad>
                </Dialog>
            </Flex>
        );
    }
}
