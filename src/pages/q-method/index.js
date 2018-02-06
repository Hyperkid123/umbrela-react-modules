import React,{Component} from 'react';
import '../../common/globalStyles';
import {
  ViewContainer,
  Flex,
} from '../../common/styledComponents/containers';
import PyramidCreator from './components/pyramidCreator';

export default class DataReviewModule extends Component {

    render() {
        return (
          <ViewContainer>
            <Flex column>
              <PyramidCreator/>
            </Flex>
          </ViewContainer>
        );
    }
}
