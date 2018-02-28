import React from 'react';
import ReactDOM from 'react-dom';
import FillModue from './pages/fillModule';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import orangeTheme from './common/muiTheme';
import {Provider} from 'react-redux';
import Grid from 'material-ui/Grid';

import configureStore from './redux/configureStore';
const store = configureStore();
const FillModuleWrapper = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={orangeTheme}>
      <Grid style={{minHeight: '100vh'}} container spacing={0} justify='center' direction='row' alignItems='center'>
        <FillModue/>
      </Grid>
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(<FillModuleWrapper />, document.getElementById('umbrelaFillModule'));
