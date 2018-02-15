import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {submitAnswers} from '../../redux/actions/';
import {Link, Redirect} from 'react-router-dom';
import {
  FillIntroContainer,
  FlexSection,
  Flex
} from '../../common/styledComponents/containers';
import Paper from 'material-ui/Paper'
import {
  MediumHeading,
  IntroTextParagraph
} from '../../common/styledComponents/typography';
import deepOrange from 'material-ui/colors/deepOrange';
import Loading from '../../common/components/loadingScreen';

export class SubmitPage extends Component {
  componentDidMount() {
    if(this.props.isLoaded && !this.props.isFetching) {
      const answers = {...this.props.answers}
      delete answers.isFetching;
      this.props.submitAnswers(answers)
    }
  }

  renderFetching = () => (
    <FlexSection style={{marginLeft: 'auto', marginRight: 'auto'}}>
      <FillIntroContainer>
        <Paper>
          <Flex horizontalCenter>
            <IntroTextParagraph>
              <MediumHeading>
                Vaše odpovědi se odesílají.
              </MediumHeading>
            </IntroTextParagraph>
          </Flex>
          <Loading/>
        </Paper>
      </FillIntroContainer>
    </FlexSection>
  )
  render() {
    if(!this.props.isLoaded) return <Redirect to='/'/>
    if(this.props.isFetching) return this.renderFetching();
      return (
        <FlexSection style={{marginLeft: 'auto', marginRight: 'auto'}}>
          <FillIntroContainer auto horizontalCenter verticalCenter>
            <Paper style={{padding: 10}} square>
              <MediumHeading>
                Vaše odpovědi byly odeslány.
              </MediumHeading>
              <IntroTextParagraph>
                {this.props.leaveText && this.props.leaveText.split('\n').map((item, key) => (
                  <span key={key}>{item}<br/></span>
                ))}
              </IntroTextParagraph>
              <IntroTextParagraph>
                O projektu Umbrela se můžete dozvědět více &nbsp; <a style={{color: deepOrange[500]}} href="http://umbrela.mendelu.cz">zde</a>.
              </IntroTextParagraph>
            </Paper>
          </FillIntroContainer>
        </FlexSection>
      );
  }
}

function mapStateToProps({research, answers}) {
  return {
    isLoaded: research.research,
    leaveText: research.leaveText,
    title: research.title,
    isFetching: answers.isFetching,
    answers
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    submitAnswers
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPage)
