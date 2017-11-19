import styled from 'styled-components';
import {
  deepOrange500,
  grey800,
} from 'material-ui/styles/colors';

const BaseHeading = styled.h2`
  font-weight: 300;
  border-bottom: 1px solid ${deepOrange500};
  color: ${grey800};
`;

export const BigHeading = BaseHeading.extend`
  font-size: 56px;
`
export const MediumHeading = BaseHeading.extend`
  font-size: 34px;
  margin-top: 10px;
  margin-bottom: 10px;
`
export const SmallHeading = BaseHeading.extend`
  font-size: 24px;
  margin-top: 5px;
  margin-bottom: 5px;
`
