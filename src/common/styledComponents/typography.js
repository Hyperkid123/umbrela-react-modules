import styled from 'styled-components';
import blue from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';

const BaseHeading = styled.h2`
  font-weight: 300;
  border-bottom: 1px solid ${blue[500]};
  border: ${props => props.withouthBorder ? 'none' : ''};
  color: ${grey[800]};
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

export const DefaultLink = styled.span`
  color: black;
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
    background-color: ${blue[500]};
    color: white;
    border-radius: 2px;
    font-size: 0.8em;
  }
`

export const CustomHelp = styled.span`
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: ${grey[800]}
`
export const DeleteNotification = styled.span`
  font-style:italic;
  color: ${grey[900]}
`
export const StatusMessage = styled.span`
  position: relative;
  bottom: 5px;
`

export const IntroTextParagraph = styled.p`
  padding: 10px;
`
export const SheetFillTitle = MediumHeading.extend`
  border: none
`
export const SheetFillCounter = MediumHeading.extend`
  border-bottom: none;
  margin-left: auto;
`
export const QuestionItemHeading = styled.h3`
  font-family: 'Open Sans', sans-serif;
  font-weight: 100;
  font-size: 20px;
  margin-top: 0;
  line-height: normal;
  max-width: 780px;
`;

export const MandatoryIndicator = styled.span`
  &::after{
    content: ' *';
    color: ${red[500]};
  }
`;
