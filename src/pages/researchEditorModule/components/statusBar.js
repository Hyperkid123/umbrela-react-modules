import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Flex} from '../../../common/styledComponents/containers';
import Check from 'material-ui/svg-icons/navigation/check';
import Cross from 'material-ui/svg-icons/navigation/close';
import {red500, greenA400, grey700} from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';
import {
  NavLink
} from 'react-router-dom';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router'

class StatusBar extends Component {

    isActive = (match, location) => {

    }

    render() {
        const {isFetching, failed} = this.props;

        return (
          <Flex style={{paddingRight: 26, paddingLeft: 26}} auto>
            <div>
              <NavLink exact strict activeClassName='active-link' to='/'>
                <FlatButton label='Editor' icon={<EditIcon/>}/>
              </NavLink>
              <NavLink exact strict activeClassName='active-link' to='/filtrations'>
                <FlatButton label='Filtrace' icon={<FilterIcon/>}/>
              </NavLink>
            </div>
            <div style={{ textAlign: 'center', marginLeft: 'auto', padding: '4px 0 4px 0'}}>
              {isFetching ?
                <div>
                  <CircularProgress size={24} thickness={1} style={{position: 'relative', bottom: 0}}/>
                  <span style={{position: 'relative', bottom: 5, color: grey700}}>
                    &nbsp;Vše je v pořádku
                  </span>
                </div>:
                failed ?
                <div>
                  <Cross color={red500}/><span style={{position: 'relative', bottom: 5, color: grey700}}>
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

export default withRouter(connect(mapStateToProps)(StatusBar))
