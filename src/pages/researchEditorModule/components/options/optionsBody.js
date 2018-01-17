import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex} from '../../../../common/styledComponents/containers';
import {SmallHeading,} from '../../../../common/styledComponents/typography';
import {IsMatrixQuestion} from '../../../../common/questionTypes';
import CloseOptionsEditor from './closeOptionsEditor';
import MatrixOptionsEditor from './matrixOptionsEditor';

class OptionsBody extends Component {

    render() {
        return (
            <Flex column>
                <SmallHeading withouthBorder>Možnosti</SmallHeading>
                {IsMatrixQuestion(this.props.questionType) ? <MatrixOptionsEditor/> : <CloseOptionsEditor/>}
            </Flex>
        );
    }
}

function mapStateToProps({questions}) {
  return{
    questionType: questions.activeQuestion.questionType,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsBody)
