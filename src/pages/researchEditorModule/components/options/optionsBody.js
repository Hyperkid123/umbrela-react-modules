import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex} from '../../../../common/styledComponents/containers';
import {SmallHeading,} from '../../../../common/styledComponents/typography';
import CloseOptionsEditor from './closeOptionsEditor';

class OptionsBody extends Component {

    render() {
        return (
            <Flex column>
                <SmallHeading withouthBorder>Možnosti</SmallHeading>
                <CloseOptionsEditor/>
            </Flex>
        );
    }
}

function mapStateToProps({questions}) {
  return{
    activeQuestion: questions.activeQuestion,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsBody)
