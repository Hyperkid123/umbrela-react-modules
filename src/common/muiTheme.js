import deepOrange from 'material-ui/colors/deepOrange';
import grey from 'material-ui/colors/grey';

import { createMuiTheme } from 'material-ui/styles';
export default createMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: deepOrange[500],
        accent1Color: grey[700],
    },
    raisedButton: {
      fontWeight: 300
    },
    appBar: {
      titleFontWeight: 300
    },
    tabs: {
      backgroundColor: grey[200],
      textColor: grey[900],
      selectedTextColor: grey[900],
    }
});
