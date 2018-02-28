import {injectGlobal} from 'styled-components';
import blue from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey';

injectGlobal`
  body{
    margin: 0;
    padding: 0;
    background-color: ${grey[200]};
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
    font-size: 1rem;
  }
  .active-link > button, .active-link svg {
    color: ${blue[500]} !important;
    fill: ${blue[500]} !important
  }
  a {
    text-decoration: none;
  }
`;
