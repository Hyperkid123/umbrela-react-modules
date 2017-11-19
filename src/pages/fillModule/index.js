import React,{Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {testUtil} from '../../common/utils';
import {
  testAction,
} from '../../redux/actions';

class FillModule extends Component {
    componentWillMount() {
      this.props.testAction();
    }
    render() {
        if(this.props.research.msg) {
          return (
            <div>
              <h1>Fill module component</h1>
              <h2>{this.props.research.msg}</h2>
              <h3>{testUtil()}</h3>
            </div>
          )
        }
        return (
            <div className="class-name">
              <h1>Fill module component</h1>
            </div>
        );
    }
}

function mapStateToProps({research}) {
  return {
    research,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    testAction
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FillModule);
