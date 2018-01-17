import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Flex} from '../../../common/styledComponents/containers';
import Check from 'material-ui/svg-icons/navigation/check';
import Cross from 'material-ui/svg-icons/navigation/close';
import {red500, greenA400, grey700} from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';

class StatusBar extends Component {

    render() {
        const {isFetching, failed} = this.props;

        return (
          <Flex end>
            <div style={{paddingRight: 10, paddingLeft: 10, textAlign: 'center'}}>
              {isFetching ?
                <div>
                  <CircularProgress size={32}/>
                  &nbsp;Ukládání
                </div>:
                failed ?
                <div>
                  <Cross color={greenA400}/><span style={{position: 'relative', bottom: 5, color: grey700}}>
                    &nbsp;Nepodařilo se uložit poslední změnu, zopakujte prosím poslení akci.
                  </span>
                </div>
                :
                <div>
                  <Check color={greenA400}/><span style={{position: 'relative', bottom: 5, color: grey700}}>
                    &nbsp;Vše je v pořádku
                  </span>
                </div>
            }
            </div>
          </Flex>
        );
    }
}

function mapStateToProps({editor, questions, options}) {
  return{
    isFetching: editor.isFetching || questions.isFetching || options.isFetching,
    failed: editor.failed || questions.failed || options.failed,
  }
}

export default connect(mapStateToProps)(StatusBar)
