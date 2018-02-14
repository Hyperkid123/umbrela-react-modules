import React,{Component} from 'react';
import {ViewContainer} from '../../common/styledComponents/containers';
import Routes from './routes';
import '../../common/globalStyles';
import DNDContext from '../../common/components/dndContext';

export default class FillModule extends Component {
    componentWillMount() {
    }
    render() {
          return (
            <ViewContainer>
              <DNDContext>
                <Routes/>
              </DNDContext>
            </ViewContainer>
          )
      }
  }
