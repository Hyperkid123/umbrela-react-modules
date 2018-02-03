import React from 'react';
import ReactDOM from 'react-dom';
import QMethodModule from './pages/q-method';
import DropZone from './pages/q-method/dropZone';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import orangeTheme from './common/muiTheme';
import {Provider} from 'react-redux';
import Navigation from './pages/q-method/components/navigation';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'

import configureStore from './redux/configureStore';
const store = configureStore();
const FillModuleWrapper = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={orangeTheme}>
      <Router>
        <div>
          <Navigation/>
          <Route exact path='/' component={QMethodModule}/>
          <Route path='/upload' component={DropZone}/>
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(<FillModuleWrapper />, document.getElementById('umbrelaQmethod'));
