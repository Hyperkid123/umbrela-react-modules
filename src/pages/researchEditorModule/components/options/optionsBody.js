import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Flex} from '../../../../common/styledComponents/containers';
import {SmallHeading,} from '../../../../common/styledComponents/typography';
import {IsMatrixQuestion} from '../../../../common/questionTypes';
import CloseOptionsEditor from './closeOptionsEditor';
import MatrixOptionsEditor from './matrixOptionsEditor';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

class OptionsBody extends Component {

    render() {
        return (
            <Flex column>
                <SmallHeading withouthBorder>
                  {this.props.translate('options.options')}
                </SmallHeading>
                {IsMatrixQuestion(this.props.questionType) ? <MatrixOptionsEditor/> : <CloseOptionsEditor/>}
            </Flex>
        );
    }
}

function mapStateToProps({questions, locale}) {
  return{
    questionType: questions.activeQuestion.questionType,
    translate: getTranslate(locale),
    currentLanguage: getActiveLanguage(locale).code,
  }
}

export default connect(mapStateToProps)(OptionsBody)
