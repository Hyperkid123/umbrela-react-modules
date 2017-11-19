import React,{Component} from 'react';
import {testUtil} from '../../common/utils';

export default class DataReviewModule extends Component {

    render() {
        return (
            <div className="class-name">
              <h1>Data review module</h1>
              <h3>{testUtil()}</h3>
            </div>
        );
    }
}
