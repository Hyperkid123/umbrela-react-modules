import styled from 'styled-components';
import {
  white,
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
`
