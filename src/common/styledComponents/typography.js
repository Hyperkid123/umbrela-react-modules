import styled from 'styled-components';
import {
  deepOrange500,
  grey800, grey900,
  black,
  white
} from 'material-ui/styles/colors';

const BaseHeading = styled.h2`
  font-weight: 300;
  border-bottom: 1px solid ${deepOrange500};
  border: ${props => props.withouthBorder ? 'none' : ''};
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

export const DefaultLink = styled.a`
  color: ${black};
  text-decoration: none;
`

export const FillQuestionheading = SmallHeading.extend`
  border: none;
  font-weight: 500;
  ::before {
    content: counter(step-increment);
    font-weight: bold;
    padding: 3px 8px;
    margin-right: 3px;
    float: left;
    background-color: ${deepOrange500};
    color: ${white};
    border-radius: 2px;
    font-size: 0.8em;
  }
`

export const CustomHelp = styled.span`
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: ${grey800}
`
export const DeleteNotification = styled.span`
  font-style:italic;
  color: ${grey900}
`
export const StatusMessage = styled.span`
  position: relative;
  bottom: 5px;
`
