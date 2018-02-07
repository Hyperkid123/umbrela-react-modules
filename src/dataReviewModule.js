import React from 'react';
import ReactDOM from 'react-dom';
import DataReviewModule from './pages/dataReviewModule';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import orangeTheme from './common/muiTheme';
import {Provider} from 'react-redux';

import configureStore from './redux/configureStore';
const store = configureStore();
const DataReviewModuleWrapper = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={orangeTheme}>
      <DataReviewModule/>
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(<DataReviewModuleWrapper />, document.getElementById('umbrelaDataReview'));
