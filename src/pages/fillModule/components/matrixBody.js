/**
 * Created by rela on 26/06/17.
 */
import React, {Component} from 'react';
import {OptionTypes} from '../../../common/optionTypes';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';


import Checkbox from 'material-ui/Checkbox';
import RadioUncheckedIcon from 'material-ui-icons/RadioButtonUnchecked';
import RadioCheckedIcon from 'material-ui-icons/RadioButtonChecked';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  MatrixTable,
  MatrixTableHeader,
  MatrixtableCell,
  MatrixTableBody,
  PreviewImage,
  MatrixTableRow,
  FullImage,
  ModalWrapper
} from '../../../common/styledComponents/containers';
import {
    HasMultipleAnswers,
    HasOptionsAsImage,
} from '../../../common/questionTypes';

import {
  answerMatrixMulti,
  answerMatrixSingle
} from '../../../redux/actions';


const inputWidth = {
    width: 40,
    margin: 'auto',
    borderLeft: '16px solid transparent',
};

class MatrixBody extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
            previewImage: '',
        };
    }
    handleOpen = (image) => {
        this.setState({modalOpen: true, previewImage: image});
    };

    handleClose = () => {
        this.setState({modalOpen: false});
    };

    componentWillReceiveProps() {
        this.setState({modalOpen: false});
    }

    getChecked = (rowId, columnId) => {
        if (!this.props.answer) return false;
        const rows = this.props.answer;
        if (!rows[rowId]) return false;
        const row = rows[rowId];
        let result = false;
        row.forEach((option) => {
            if (option === columnId) result = true;
        });
        return result;
    };

    createMatrix = (options) => {
        const columns = [];
        const rows = [];
        options.forEach((option) => {
            if (option.optionType === OptionTypes.ColumnOption) columns.push(option);
            else rows.push(option);
        });
        const headers = columns.map((column) => {
            return <MatrixtableCell key={column.optionId}>{column.optionTitle}</MatrixtableCell>;
        });
        headers.unshift(<MatrixtableCell key="question"></MatrixtableCell>);
        return (
            <MatrixTable>
                <MatrixTableHeader>
                <MatrixTableRow>
                    {headers}
                </MatrixTableRow>
                </MatrixTableHeader>
                <MatrixTableBody>
                {this.createMatrixRow(rows, columns.length, columns)}
                </MatrixTableBody>
            </MatrixTable>
        );
    };

    createRowFiller = (rowId, columns) => {
        const filler = [];
        for (let i = 0; i < columns.length; i++) {
            filler.push(<MatrixtableCell key={i}>{this.getOptionInput(rowId, columns[i].optionId)}</MatrixtableCell>);
        }
        return filler;
    };


    createMatrixRow = (rows, columnsNumber, columns) => {
        return rows.map((row) => {
            return (
                <MatrixTableRow filler key={row.optionId}>
                    <MatrixtableCell>{this.getOptionPreview(row.optionTitle)}</MatrixtableCell>
                    {this.createRowFiller(row.optionId, columns)}
                </MatrixTableRow>
            );
        });
    };

    getOptionInput = (rowId, columnId) => {
        if (HasMultipleAnswers(this.props.questionType)) return <Checkbox
            onChange={(event, isInputChecked) => this.handleMatrixMultiAnswer(rowId, columnId, isInputChecked)}
            style={inputWidth}
            checked={this.getChecked(rowId, columnId)}/>;
        return <Checkbox
          icon={<RadioUncheckedIcon/>}
          style={inputWidth}
          checkedIcon={<RadioCheckedIcon/>}
          onChange={(event, isInputChecked) => this.handleMatrixSingleAnswer(rowId, columnId, isInputChecked)}
          checked={this.getChecked(rowId, columnId)}/>;
    };

    getOptionPreview = (optionTitle) => {
        if (HasOptionsAsImage(this.props.questionType)){
            return(
              <div>
                <PreviewImage onClick={() => this.handleOpen(optionTitle)} src={optionTitle}/>
              </div>
            );
        }
        return <span>{optionTitle}</span>;
    };

    handleMatrixSingleAnswer = (rowId, columnId, checked) => {
        this.props.answerMatrixSingle(this.props.questionId, rowId, columnId, checked);
    };
    handleMatrixMultiAnswer = (rowId, columnId, checked) => {
        this.props.answerMatrixMulti(this.props.questionId, rowId, columnId, checked);
    };


    render() {
      console.log(HasMultipleAnswers(this.props.questionType), this.props.questionType);
        return (
            <div>
                {this.createMatrix(this.props.options)}
                <Modal
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                  style={{height: 'auto', marginTop: 20}}
                >
                  <ModalWrapper>
                    <Paper square>
                      <FullImage src={this.state.previewImage} alt={this.state.previewImage}/>
                    </Paper>
                  </ModalWrapper>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps({answers}, initialProps) {
  return {
    answer: answers[initialProps.questionId]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    answerMatrixSingle,
    answerMatrixMulti,
  },dispatch)
}

/**MatrixBody.propTypes = {
    answer: PropTypes.object,
    questionId: PropTypes.number.isRequired,
    questionType: PropTypes.string.isRequired,
    answerMatrixMulti: PropTypes.func.isRequired,
    answerMatrixSingle: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    lang: PropTypes.object.isRequired,
};*/

export default connect(mapStateToProps, mapDispatchToProps)(MatrixBody)
