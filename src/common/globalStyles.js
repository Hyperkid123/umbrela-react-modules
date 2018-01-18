import {injectGlobal} from 'styled-components';
import {grey200, deepOrange500} from 'material-ui/styles/colors';

injectGlobal`
  body{
    margin: 0;
    padding: 0;
    background-color: ${grey200};
    font-family: 'Roboto', sans-serif;
  }
  .active-link > button, .active-link svg {
    color: ${deepOrange500} !important;
    fill: ${deepOrange500} !important
  }
`;
