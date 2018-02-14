import React,{Component} from 'react';
import ScrollTopOnMount from '../../common/components/scrollTopOnMount';
import {
  Flex,
  FillSheetHeaderContainer
} from '../../common/styledComponents/containers';
import {SheetFillTitle, SheetFillCounter} from '../../common/styledComponents/typography';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {startResearch} from '../../redux/actions/';
import {Link, Redirect} from 'react-router-dom';
import { withRouter } from 'react-router';
import Button from 'material-ui/Button';
import QuestionFillList from './components/questionFillList';

export class SheetFill extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      errors: null,
    };
  }

  componentDidMount() {
    this.props.startResearch();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.sheetId !== nextProps.match.params.sheetId) {
      window.scrollTo(0, 0);
    }
  }

  renderPrevButton = () => {
    const sheetId = parseInt(this.props.match.params.sheetId, 10)
    if(sheetId > 0) {
      return (
        <Link to={`/fill/${sheetId - 1}`} style={{marginRight: 10}}>
          <Button raised>
            Zpět
          </Button>
        </Link>
      )
    }
    return null;
  }

  renderNextButton = () => {
    const sheetId = parseInt(this.props.match.params.sheetId, 10);
    if(sheetId < this.props.sheetCount - 1) {
      return (
        <Link to={`/fill/${sheetId + 1}`}>
          <Button raised>
            Další
          </Button>
        </Link>
      )
    } else {
      return (
        <Link>
          <Button raised color='primary'>
            Odeslat
          </Button>
        </Link>
      )
    }
  }

  render() {
    if(!this.props.isLoaded) return <Redirect to='/'/>
    const sheetNumber = parseInt(this.props.match.params.sheetId, 10) + 1
      return (
          <Flex horizontalCenter column>
            <ScrollTopOnMount/>
            <Flex>
              <FillSheetHeaderContainer>
                <SheetFillTitle>{this.props.activeSheet.sheetTitle}</SheetFillTitle>
                <SheetFillCounter>{sheetNumber}/{this.props.sheetCount}</SheetFillCounter>
              </FillSheetHeaderContainer>
            </Flex>
            <QuestionFillList questions={this.props.activeSheet.questions}/>
            <Flex horizontalCenter style={{marginBottom: 10}}>
              {this.renderPrevButton()}
              {this.renderNextButton()}
            </Flex>
          </Flex>
      );
  }
}

function mapStateToProps({research}, initialProps) {
  const sheetId = parseInt(initialProps.match.params.sheetId, 10);
  return {
    isLoaded: research.research,
    activeSheet: research.sheets[sheetId],
    sheetCount: research.sheets.length,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startResearch,
  },dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SheetFill))
