import React from 'react';
import ReactDOM from 'react-dom';
import FillModue from './pages/fillModule';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const MuiFillModule = () => (
  <MuiThemeProvider>
    <FillModue/>
  </MuiThemeProvider>
)

ReactDOM.render(<MuiFillModule />, document.getElementById('umbrelaFillModule'));
