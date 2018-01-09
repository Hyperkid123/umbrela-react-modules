import styled from 'styled-components';
import {
  white,
  grey300, grey500,
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
  flex-grow: ${props => props.grow ? 1 : 0};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'no-wrap'};
`

export const ViewContainer = styled.div`
  width: calc(100% - 2em);
  min-height: calc(100vh - 2em);
  margin: 0;
  padding: 1em;
`

export const MenuContainer = styled.div`
  max-width: ${props => props.fullWidth ? '100&' : '400px'};
  background-color: ${white};
  padding: 10px;
`

export const FlexSection = styled.section`
  margin: 10px;
  min-width: ${props => props.minWidth ? `${props.minWidth}px` : `0px`};
  height: ${props => props.autoHeight ? 'auto' :  'calc(100vh - 2em - 20px)'};
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

export const OptionsList = styled.ul`
  list-style: none;
`
