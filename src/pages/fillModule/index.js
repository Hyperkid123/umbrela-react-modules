import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Flex} from '../../common/styledComponents/containers';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui-icons/Notifications';
import ContentAdd from 'material-ui-icons/Add';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const paperStyle = {
  margin: 20,
  padding: 20
}

class FillModule extends Component {
    componentWillMount() {
    }
    render() {
          return (
            <div>
              <TextField/>
              <AppBar position="static" color="default">
                <Toolbar>
                  <Typography type="title" color="inherit">
                    Title
                  </Typography>
                </Toolbar>
              </AppBar>
              <Paper square style={paperStyle}>
                <Badge
                  badgeContent={4}
                  color='primary'
                >
                  <NotificationsIcon />
                </Badge>
                <Badge
                  badgeContent={10}
                  color='secondary'
                >
                  <IconButton aria-label="Notifications">
                    <NotificationsIcon />
                  </IconButton>
                </Badge>
              </Paper>
              <Card>
                <CardContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardContent>
                <CardActions>
                  <Button>
                    Action1
                  </Button>
                  <Button>
                    Action2
                  </Button>
                </CardActions>
              </Card>
              <h3>{`testUtil()`}</h3>
              <Paper square style={paperStyle}>
                <Flex row>
                  <Button raised color='primary'>
                    Button1
                  </Button>
                  <Button raised color='secondary'  style={{marginRight: 'auto'}}>
                    Button2
                  </Button>
                </Flex>
              </Paper>
              <Paper square style={paperStyle}>
                <Button fab>
                  <ContentAdd />
                </Button>
                <Button mini={true} fab>
                  <ContentAdd />
                </Button>
                <Button color='secondary' fab>
                  <ContentAdd />
                </Button>
              </Paper>
              <Paper style={paperStyle} square>
                <CircularProgress size={80} thickness={5} />
              </Paper>
            </div>
          )
      }
  }

function mapStateToProps({research}) {
  return {
    research,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FillModule);
