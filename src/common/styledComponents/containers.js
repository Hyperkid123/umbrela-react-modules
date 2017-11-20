import styled from 'styled-components';
import {
  white,
  grey300,
} from 'material-ui/styles/colors';

export const Flex = styled.div`
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  align-items:  ${props => props.verticalCenter ? 'center' : 'null'};
  justify-content: ${props => props.horizintalCenter ? 'center' : 'null'};
  flex-grow: ${props => props.grow ? 1 : 0};
`

export const ViewContainer = styled.div`
  width: calc(100% - 2em);
  min-height: calc(100vh - 2em);
  margin: 0;
  padding: 1em;
`

export const MenuContainer = styled.div`
  max-width: 400px;
  background-color: ${white};
  padding: 10px;
`

export const FlexSection = styled.section`
  margin: 10px;
  height: calc(100vh - 2em - 20px);
`

export const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-right: 8px;
`
export const MenuItem = styled.li`
  padding: 0 .5em 0 .5em;
  font-size: 1.2em;
  height: 48px;
  cursor: pointer;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  &:hover {
    background-color: ${grey300}
  }
  &:hover > div > div:last-child {
    display: flex;
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
