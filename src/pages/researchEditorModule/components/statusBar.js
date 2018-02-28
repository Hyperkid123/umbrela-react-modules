import React,{Component} from 'react';
import {connect} from 'react-redux';
import {StatusBarList} from '../../../common/styledComponents/containers';
import Check from 'material-ui-icons/Check';
import Cross from 'material-ui-icons/Close';
import { CircularProgress } from 'material-ui/Progress';
import {
  NavLink
} from 'react-router-dom';
import EditIcon from 'material-ui-icons/ModeEdit';
import FilterIcon from 'material-ui-icons/FilterList';
import Button from 'material-ui/Button';
import { withRouter } from 'react-router'
import grey from 'material-ui/colors/grey';
import Grid from 'material-ui/Grid';

class StatusBar extends Component {
    render() {
        const {isFetching, failed} = this.props;

        return (
          <Grid item xs={12} spacing={0}>
            <StatusBarList>
              <li>
              <NavLink exact strict activeClassName='active-link' to='/'>
                <Button>
                  <EditIcon/>
                  Editor
                </Button>
              </NavLink>
            </li>
            <li>
              <NavLink exact strict activeClassName='active-link' to='/filtrations'>
                <Button>
                  <FilterIcon/>
                  Filtrace
                </Button>
              </NavLink>
            </li>
            <li>
              {isFetching ?
                <div>
                  <CircularProgress size={24} thickness={1} style={{position: 'relative', bottom: 0}}/>
                  <span style={{position: 'relative', bottom: 5, color: grey[700]}}>
                    &nbsp;Vše je v pořádku
                  </span>
                </div>:
                failed ?
                  <div>
                    <Cross color='error'/><span style={{position: 'relative', bottom: 5, color: grey[700]}}>
                      &nbsp;Nepodařilo se provést podlení akci, zopakujte ji prosím.
                    </span>
                  </div>
                :
                <div>
                  <Check/><span style={{position: 'relative', bottom: 5, color: grey[700]}}>
                    &nbsp;Vše je v pořádku
                  </span>
                </div>
            }
          </li>
          </StatusBarList>
          </Grid>
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
