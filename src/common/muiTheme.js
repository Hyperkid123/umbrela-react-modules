import {
  deepOrange500,
  grey700,
} from 'material-ui/styles/colors';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
export default getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: deepOrange500,
        accent1Color: grey700,
    },
    raisedButton: {
      fontWeight: 300
    },
    appBar: {
      titleFontWeight: 300
    }
});
