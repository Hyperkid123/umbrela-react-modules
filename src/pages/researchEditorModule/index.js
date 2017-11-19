import React,{Component} from 'react';
import {testUtil} from '../../common/utils';

export default class ResearchEditorModule extends Component {

    render() {
        return (
            <div className="class-name">
              <h1>ResearchEditor component</h1>
              <h3>{testUtil()}</h3>
            </div>
        );
    }
}
