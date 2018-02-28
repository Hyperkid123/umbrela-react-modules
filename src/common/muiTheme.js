import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';


import { createMuiTheme } from 'material-ui/styles';
export default createMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: red.A200
      }
    },
    raisedButton: {
      fontWeight: 300
    },
    appBar: {
      titleFontWeight: 300
    },
});
