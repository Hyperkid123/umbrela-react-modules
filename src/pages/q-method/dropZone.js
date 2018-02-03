import React,{Component} from 'react';
import {ViewContainer} from '../../common/styledComponents/containers';
import ImageDropZone from './components/imageDropZone';

export default class DropZone extends Component {

    render() {
        return (
          <ViewContainer>
            <ImageDropZone/>
          </ViewContainer>
        );
    }
}
