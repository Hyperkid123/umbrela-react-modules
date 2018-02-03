import React from 'react';
import ReactDOM from 'react-dom';
import QMethodModule from './pages/q-method';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import orangeTheme from './common/muiTheme';
import {Provider} from 'react-redux';

import configureStore from './redux/configureStore';
const store = configureStore();
const FillModuleWrapper = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={orangeTheme}>
      <QMethodModule/>
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(<FillModuleWrapper />, document.getElementById('umbrelaQmethod'));
