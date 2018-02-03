import styled from 'styled-components';
import {
  white,
  grey300, grey500, grey700, grey200, grey100,
  red500,
} from 'material-ui/styles/colors';

export const Flex = styled.div`
  width: ${props => props.auto ? 'auto' : '100%'};
  max-height: 100%;
  display: flex;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  align-items:  ${props => props.verticalCenter ? 'center' : 'null'};
  align-items: ${props => props.baseline ? 'baseline' : 'null'};
  justify-content: ${props => props.horizintalCenter ? 'center' : 'null'};
  justify-content: ${props => props.end ? 'flex-end' : 'null'};
  flex-grow: ${props => props.grow ? 1 : 0};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'no-wrap'};
`

export const ViewContainer = styled.div`
  width: calc(100% - 2em);
  min-height: calc(100vh - 1em - 28px);
  margin: 0;
  padding: 0 1em;
`

export const MenuContainer = styled.div`
  max-width: ${props => props.fullWidth ? '100&' : '400px'};
  background-color: ${white};
  padding: 10px;
`

export const FlexSection = styled.section`
  margin: 10px;
  min-width: ${props => props.minWidth ? `${props.minWidth}px` : `0px`};
  height: ${props => props.autoHeight ? 'auto' :  'calc(100vh - 2em - 20px - 28px)'};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`

export const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-right: 8px;
`
export const MenuItem = styled.div`
  padding: 0 .5em 0 .5em;
  font-size: 1.2em;
  height: 48px;
  cursor: pointer;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  background-color: ${props => props.active ? grey300 : white};
  &:hover {
    background-color: ${props => !props.dragging ? grey300 : white};
  }
  > div {
    height: 100%;
  }
`

export const MenuListIconsContainer = Flex.extend`
  display: none;
  margin-left: auto;
  width: auto;
`

export const MenuListLabel = styled.div`
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
export const LabelContainer = styled.div`
  margin-left: ${props => props.alignRight ? 'auto' : 0};
  padding-left: 0;
  padding-right: 15px;
  font-size: 0.8em;
  color: ${props => props.error ? red500 : grey500};
`

export const PreviewImage = styled.img`
  max-width: 600px;
  height: auto;
  border-radius: 5px;
`
export const FullImage = PreviewImage.extend`
  max-width: 90%;
  display: block;
  margin-left: auto;
  margin-right:auto;
`

export const OptionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const OptionItemWrapper = Flex.extend`
  > div:last-of-type, button:last-of-type{
    display: none !important;
  }
  &:hover{
    > div:last-of-type{
      display: block !important;
    }
    > button:last-of-type {
      display: block !important;
    }
  }
`

export const CustomHelpWrapper = styled.div`
  font-size: .9em;
  color: ${grey700}
  margin: 0;
  padding: 10px;
`

export const CustomHelpLine = styled.div`
  margin:0 0 5px 0;
  padding: 0;
  &:last-child {
    margin: 0;
  }
`
export const OptionsFillListWrapper = Flex.extend`
  padding-left: 20px;
  padding-right: 20px;
  width: calc(100% - 40px);
`

export const PreviewImageContainer = styled.div`
  display: table;
  margin-right: 1em;
`
export const OrderQuestionList = styled.div`
  width: 100%;
`

export const OrderQuestionItem = styled.div`
  width: 420px;
  margin-left: auto;
  margin-right: auto;
  padding: 1em 1rem;
  padding-left: .2em;
  margin-bottom: .5rem;
  background-color: ${grey200};
  cursor: move;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  > svg{
    opacity: 0;
  }
  &:hover > svg {
    opacity: 1;
  }
`
export const ListColumn = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`
export const MatrixTable = styled.table`
  border-collapse:collapse;
`
export const MatrixTableHeader = styled.thead`
  text-align: center;
`
export const MatrixtableCell = styled.td`
  padding: .4em;
  text-align: center;
`
export const MatrixTableBody = styled.tbody`

`

export const MatrixTableRow = styled.tr`
  &:nth-child(odd) > td:not(:first-of-type){
    background-color: ${props => props.filler ? grey200 : white}
  }
  > td:not(:first-of-type){
    background-color: ${props => props.filler ? grey100 : white}
  }
`

export const SectionBody = styled.div`
  max-height: ${props => props.open ? '1500px' : 0};
  transition: max-height .5s ease-in;
  overflow: hidden;
  height:auto;
  >div{
    padding: 5px;
  }
`;

export const Sectionhead = styled.div`
  cursor: pointer;
  padding: 10px;
`;

export const PyramidTile = styled.div`
  width: 96px;
  height: 96px;
  margin: 2px
`

export const AddPyramidTile = styled.div`
  display: flex;
  flex-shrink: 10;
  padding: 5px;
  justify-content: center;
  align-items: center;
  min-width: 100px;
`
