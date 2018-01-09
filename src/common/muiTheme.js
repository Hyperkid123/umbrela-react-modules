import {
  deepOrange500,
  grey700,
  grey200,
  white,
  black
} from 'material-ui/styles/colors';

import {darken, fade, emphasize, lighten} from 'material-ui/utils/colorManipulator';

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
    },
    tabs: {
      backgroundColor: grey200,
      textColor: fade(black, 0.7),
      selectedTextColor: fade(black, 0.7),
    }
});
