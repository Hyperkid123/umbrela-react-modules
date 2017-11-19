import styled from 'styled-components';

export const Flex = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  align-items:  ${props => props.verticalCenter ? 'center' : 'null'};
  justify-content: ${props => props.horizintalCenter ? 'center' : 'null'};
`
