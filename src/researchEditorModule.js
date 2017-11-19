import React from 'react';
import ReactDOM from 'react-dom';
import ResearchEditor from './pages/researchEditorModule';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import orangeTheme from './common/muiTheme';
import {Provider} from 'react-redux';

import configureStore from './redux/configureStore';
const store = configureStore();
const ResearchEditorModuleWrapper = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={orangeTheme}>
      <ResearchEditor/>
    </MuiThemeProvider>
  </Provider>
)
ReactDOM.render(<ResearchEditorModuleWrapper />, document.getElementById('umbrelaResearchEditor'));
