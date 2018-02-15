import React from 'react';
import {
  Route,
  Switch,
  HashRouter as Router
} from 'react-router-dom';
import FillLanding from './fillLanding';
import SheetFill from './sheetFill';
import SubmitPage from './submitPage';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={FillLanding}/>
      <Route exact path='/fill/:sheetId' component={SheetFill}/>
      <Route exact path='/submit' component={SubmitPage}/>
    </Switch>
  </Router>
)

export default Routes
