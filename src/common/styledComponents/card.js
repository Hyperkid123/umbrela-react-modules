import styled from 'styled-components';
import grey from 'material-ui/colors/grey';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';

export const CardWrapper = styled.div`
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: ${props => props.questionList ? '700px' : 0};
  max-width: ${props => props.questionList ? props => props.matrix ? 'auto' : '700px' : 'auto'};
  word-wrap: break-word;
  background-color: ${props => props.transparent ? `transparent` : `#fff`};
  background-clip: border-box;
  box-sizing: border-box;
  border: 0;
  box-shadow: ${props => props.transparent ? `none` : `0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)`};
  border-radius: 2px!important;
  margin-bottom: .5rem!important;
  font-weight: 400;
  margin-left: 15px;
  margin-right: 15px;
`

export const CardHeader = styled.div`
  color: #212121 !important;
  min-width: 0;
  white-space: ${props => props.questionList ? 'wrap' : 'nowrap'};
  overflow:${props => props.questionList ? 'overflow' : 'hidden'};
  text-overflow:${props => props.questionList ? 'initial' : 'ellipsis'};
  padding: .75rem 1.25rem;
  margin-bottom: 0;
  background-color: ${props => !props.transparent ? `rgba(0,0,0,.03)` : `rgba(255,255,255,.8)`};
  border-bottom: 1px solid;
  border-color: #BDBDBD;
  box-sizing: border-box;
  box-shadow: ${props => !props.transparent ? `none` : `0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)`};
  h2 {
    font-weight: 400;
    margin: .25em 0;
  }
`

export const CardBody = styled.div`
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
  box-sizing: border-box;
  border-top: ${props => props.questionList ? `10px solid` : `none`};
  border-color: ${props => props.error ? red.A200 : 'transparent'};
`
export const InputHeader = styled.div`
  padding-top: 12px;
  background-color: rgba(0, 0, 0, 0.03);
  height: 49px;
  box-sizing: border-box;
  position: relative;
  svg {
    padding-left: 8px;
    position: absolute;
    top: 0;
    color: ${grey[700]};
  }
  input {
    margin: 0;
    padding: 1px 20px 12px 28px;
    width: calc(100% - 40px);
    color: #212121 !important;
    height: auto;
  }
`

export const CardControlls = styled.div`
  padding-left: 1.25rem;
  padding-right: 1.25rem;
`
export const CardListItemheading = styled.h3`
  font-weight: 400;
  margin: .2em 0;
  span:first-child {
    display: inline-block;
    height: 1.25em;
    width: 1.25em;
    background-color: ${blue[500]};
    color: white;
    padding: .25em;
    text-align: center;
    border-radius: 2px;
    margin-right: .25em;
  }
`
