import {injectGlobal} from 'styled-components';
import deepOrange from 'material-ui/colors/deepOrange';
import grey from 'material-ui/colors/grey';

injectGlobal`
  body{
    margin: 0;
    padding: 0;
    background-color: ${grey[200]};
    font-family: 'Roboto', sans-serif;
  }
  .active-link > button, .active-link svg {
    color: ${deepOrange[500]} !important;
    fill: ${deepOrange[500]} !important
  }
  a {
    text-decoration: none;
  }
`;
