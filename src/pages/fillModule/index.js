import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {testUtil} from '../../common/utils';
import {
  testAction,
} from '../../redux/actions';
import {Flex} from '../../common/containers';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const paperStyle = {
  margin: 20,
  padding: 20
}

class FillModule extends Component {
    componentWillMount() {
      this.props.testAction();
    }
    render() {
        if(this.props.research.msg) {
          return (
            <div>
              <AppBar
                title="Material ui components theming"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
              />
              <Paper rounded={false} style={paperStyle}>
                <Badge
                  badgeContent={4}
                  primary={true}
                >
                  <NotificationsIcon />
                </Badge>
                <Badge
                  badgeContent={10}
                  secondary={true}
                  badgeStyle={{top: 12, right: 12}}
                >
                  <IconButton tooltip="Notifications">
                    <NotificationsIcon />
                  </IconButton>
                </Badge>
              </Paper>
              <Card>
                <CardHeader
                  title={this.props.research.msg}
                  subtitle={testUtil()}
                />
                <CardTitle title={this.props.research.msg} subtitle={testUtil()} />
                <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
                <CardActions>
                  <FlatButton label="Action1" />
                  <FlatButton label="Action2" />
                </CardActions>
              </Card>
              <h3>{testUtil()}</h3>
              <Paper rounded={false} style={paperStyle}>
                <Flex row>
                  <RaisedButton label={'Button'} primary/>
                  <RaisedButton label={'Button'} secondary  style={{marginRight: 'auto'}}/>
                </Flex>
              </Paper>
              <Paper rounded={false} style={paperStyle}>
                <FloatingActionButton>
                  <ContentAdd />
                </FloatingActionButton>
                <FloatingActionButton mini={true}>
                  <ContentAdd />
                </FloatingActionButton>
                <FloatingActionButton secondary>
                  <ContentAdd />
                </FloatingActionButton>
              </Paper>
              <Paper style={paperStyle} rounded={false}>
                <CircularProgress size={80} thickness={5} />
              </Paper>
            </div>
          )
        }
        return (
            <div className="class-name">
              <h1>Fill module component</h1>
            </div>
        );
    }
}

function mapStateToProps({research}) {
  return {
    research,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    testAction
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FillModule);
