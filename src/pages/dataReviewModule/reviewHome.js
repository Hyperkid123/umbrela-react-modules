import React,{Component} from 'react';
import {
  Flex,
} from '../../common/styledComponents/containers';
import ResearchContainer from './researchContainer';
import OptionsBar from './optionsBar';

export default class ReviewHome extends Component {

    render() {
        return (
            <Flex column>
              <OptionsBar/>
              <ResearchContainer/>
            </Flex>
        );
    }
}
