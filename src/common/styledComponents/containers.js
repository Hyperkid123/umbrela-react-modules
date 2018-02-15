import styled from 'styled-components';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';
import deepOrange from 'material-ui/colors/deepOrange'

export const Flex = styled.div`
  width: ${props => props.auto ? 'auto' : '100%'};
  max-height: 100%;
  display: flex;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  align-items:  ${props => props.verticalCenter ? 'center' : 'null'};
  align-items: ${props => props.baseline ? 'baseline' : 'null'};
  justify-content: ${props => props.horizontalCenter ? 'center' : 'null'};
  justify-content: ${props => props.end ? 'flex-end' : 'null'};
  flex-grow: ${props => props.grow ? 1 : 0};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'no-wrap'};
`

export const ViewContainer = styled.div`
  width: calc(100% - 2em);
  min-height: calc(100vh - 171px);
  margin: 0;
  padding: 0 1em;
`

export const MenuContainer = styled.div`
  max-width: ${props => props.fullWidth ? '100%' : '400px'};
  background-color: white;
  padding: 10px;
`

export const FlexSection = styled.section`
  margin: 10px 10px 0 10px;
  min-width: ${props => props.minWidth ? `${props.minWidth}px` : `0px`};
  height: ${props => props.autoHeight ? 'auto' :  'calc(100vh - 190px)'};
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
  background-color: ${props => props.active ? grey[300] : 'white'};
  &:hover {
    background-color: ${props => !props.dragging ? grey[300] : 'white'};
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
  display: table-cell;
  vertical-align: middle;
`
export const LabelContainer = styled.div`
  margin-left: ${props => props.alignRight ? 'auto' : 0};
  padding-left: 0;
  padding-right: 15px;
  font-size: 0.8em;
  color: ${props => props.error ? red[500] : grey[500]};
`

export const PreviewImage = styled.img`
  max-width: 600px;
  height: auto;
  border-radius: 5px;
  cursor: pointer;
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
  > div:not(:first-of-type){
    display: none !important;
  }
  &:hover{
    > div:not(:first-of-type){
      display: block !important;
    }
  }
`

export const CustomHelpWrapper = styled.div`
  font-size: .9em;
  color: ${grey[700]}
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
  background-color: ${grey[200]};
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
  margin-left: auto;
  margin-right: auto;
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
    background-color: ${props => props.filler ? grey[200] : 'white'}
  }
  > td:not(:first-of-type){
    background-color: ${props => props.filler ? grey[100] : 'white'}
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
export const ThumbNail = styled.img`
  width: auto;
  height: 150px;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
`
export const PaginationsList = styled.ul `
  list-style: none;
  li:first-of-type button {
    border-right: none;
  }
  li:last-of-type button {
    border-right: 1px solid ${grey[300]};
  }
`
export const PaginationsListItem = styled.li`
  float: left;
  button {
    border: 1px solid ${grey[300]};
    border-right: none;
    border-radius: 0;
    background-color: ${props => props.disabled ? 'transparent' : props.active ? deepOrange[500] : 'white'};
    color ${props => props.active ? 'white' : 'black'};
    min-width: 48px;
  }
`
export const ChartContainer = Flex.extend`
  max-width: ${props => props.pie ? '600px' : 'auto'};
  position: relative;
  min-width: 0;
`
export const FillIntroContainer = Flex.extend`
  height: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

export const FillSheetHeaderContainer = styled.div`
  border-bottom: 1px solid ${deepOrange[500]};
  display: flex;
  width: 100%;
`
export const QuestionFillListContainer = styled.ol`
    list-style-type: none;
    padding: 0;
`
export const QuestionListItem = styled.li`
  counter-increment: step-counter;
  background: white;
  transition: all .3s linear;
  border-top: 10px ${props => props.error ? deepOrange[500] : 'white'} solid;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  padding: 20px;
  margin-bottom: 15px;
  display: ${props => props.matrix ? 'table' : 'list-item'};
  width: ${props => props.matrix ? 'auto' : '780px'};
  min-width: 780px;
  margin-left: auto;
  margin-right: auto;
  &::before{
    font-family: 'Open Sans', sans-serif;
    content: counter(step-counter);
    margin-right: 10px;
    font-size: 1em;
    font-weight: 100;
    background-color: ${deepOrange[500]};
    border-radius: 2px;
    color: white;
    font-weight: bold;
    padding: 3px 8px;
    margin-top: 0px;
    float: left;
  }
`;

export const ModalWrapper = Flex.extend`
  height: auto;
  width: auto;
  margin-left: auto;
  margin-right: auto;
`
export const MenuItemEllipsisWrapper = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
`
