import React,{Component} from 'react';
import '../../common/globalStyles';
import Grid from 'material-ui/Grid';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import ReviewHome from './reviewHome';

export default class DataReviewModule extends Component {
  render() {
    return (
      <Grid item xs={12}>
        <Router>
          <Route path='/' component={ReviewHome}/>
        </Router>
      </Grid>
    );
  }
}
