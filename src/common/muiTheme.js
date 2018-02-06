import deepOrange from 'material-ui/colors/deepOrange';
import grey from 'material-ui/colors/grey';

import { createMuiTheme } from 'material-ui/styles';
export default createMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary: {
        main: deepOrange[500],
        dark: deepOrange[500],
      },
    },
    raisedButton: {
      fontWeight: 300
    },
    appBar: {
      titleFontWeight: 300
    },
});
