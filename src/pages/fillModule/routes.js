import React from 'react';
import {
  Route,
  Switch,
  HashRouter as Router
} from 'react-router-dom';
import FillLanding from './fillLanding';
import SheetFill from './sheetFill';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={FillLanding}/>
      <Route exact path='/fill/:sheetId' component={SheetFill}/>
    </Switch>
  </Router>
)

export default Routes
