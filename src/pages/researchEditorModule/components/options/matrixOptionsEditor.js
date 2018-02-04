import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex, OptionsList, ListColumn} from '../../../../common/styledComponents/containers';
import {SmallHeading} from '../../../../common/styledComponents/typography';
import NewOption from './newOption';
import {getOptions, deleteOption} from '../../../../redux/actions';
import OptionEditorItem from './optionEditorItem';
import {divideMatrixOptions} from '../../../../common/utils';

export class MatrixOptionsEditor extends Component {
    componentWillMount() {
      this.props.getOptions(this.props.activeQuestion.questionId);
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.activeQuestion.questionId !== this.props.activeQuestion.questionId) {
        this.props.getOptions(nextProps.activeQuestion.questionId);
      }
    }

    renderOptionsList = (list) => {
      return list.map((option, index) => {
        return (
           <OptionEditorItem
             draggingElement={this.props.draggingElement}
             option={option}
             index={option.optionOrder}
             key={option.optionId}
             optionOrder={option.optionOrder}
             deleteOption={() => this.props.deleteOption(option)}
          />
        )
      })
    }

    render() {
        const {rows, columns} = divideMatrixOptions(this.props.options);
        return (
          <Flex>
            <Flex column>
              <ListColumn>
                <SmallHeading>Sloupce</SmallHeading>
                <OptionsList>
                  {this.renderOptionsList(columns)}
                </OptionsList>
                <NewOption hintText='Nový sloupec' optionType='ColumnOption'/>
              </ListColumn>
            </Flex>
            <Flex column>
              <ListColumn>
                <SmallHeading>Řádky</SmallHeading>
                <OptionsList>
                  {this.renderOptionsList(rows)}
                </OptionsList>
                <NewOption hintText='Nový řádek' optionType='RowOption'/>
              </ListColumn>
            </Flex>
          </Flex>
        );
    }
}

function mapStateToProps({questions, options, ui}) {
  return{
    activeQuestion: questions.activeQuestion,
    options: options.options,
    draggingElement: ui.dragging
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getOptions,
    deleteOption,
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MatrixOptionsEditor)
