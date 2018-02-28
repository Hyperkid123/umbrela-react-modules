import React from 'react';
import ReactDOM from 'react-dom';
import ResearchEditor from './pages/researchEditorModule';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import orangeTheme from './common/muiTheme';
import {Provider} from 'react-redux';
import StatusBar from './pages/researchEditorModule/components/statusBar';
import Filtrations from './pages/researchEditorModule/filtrations';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import Grid from 'material-ui/Grid';

import configureStore from './redux/configureStore';
const store = configureStore();

const ResearchEditorModuleWrapper = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={orangeTheme}>
      <Router>
        <Grid container spacing={0}>
          <StatusBar/>
          <Route exact path='/' component={ResearchEditor}/>
          <Route path='/filtrations' component={Filtrations}/>
        </Grid>
      </Router>
    </MuiThemeProvider>
  </Provider>
)
ReactDOM.render(<ResearchEditorModuleWrapper />, document.getElementById('umbrelaResearchEditor'));
