import React,{Component} from 'react';
import '../../common/globalStyles';
import {
  ViewContainer,
  Flex,
} from '../../common/styledComponents/containers';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import ReviewHome from './reviewHome';

export default class DataReviewModule extends Component {
  render() {
    return (
      <ViewContainer>
        <Flex grow column>
          <Router>
            <Route path='/' component={ReviewHome}/>
          </Router>
        </Flex>
      </ViewContainer>
    );
  }
}
