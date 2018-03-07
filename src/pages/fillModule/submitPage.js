import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {submitAnswers} from '../../redux/actions/';
import {Redirect} from 'react-router-dom';
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
import blue from 'material-ui/colors/blue';
import Loading from '../../common/components/loadingScreen';
import Grid from 'material-ui/Grid';
import {
  CardWrapper,
  CardHeader,
  CardBody
} from '../../common/styledComponents/card';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

export class SubmitPage extends Component {
  componentDidMount() {
    if(!window.preview && this.props.isLoaded && !this.props.isFetching) {
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
                {this.props.translate('fill.submit.sending')}
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
    const {translate} = this.props;
      return (
        <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
          <CardWrapper>
            <CardHeader>
                <h2>{translate('fill.submit.finished')}</h2>
              </CardHeader>
              <CardBody>
                <IntroTextParagraph>
                  {this.props.leaveText && this.props.leaveText.split('\n').map((item, key) => (
                    <span key={key}>{item}<br/></span>
                  ))}
                  {!this.props.leaveText && translate('fill.submit.finalWord')}
                </IntroTextParagraph>
                <IntroTextParagraph>
                  {translate('fill.submit.learMore')}&nbsp;<a style={{color: blue[500]}} href="http://umbrela.mendelu.cz">{translate('fill.submit.here')}</a>.
                  {window.preview && <p style={{color: 'red'}}>{translate('fill.submit.preview')}</p>}
                </IntroTextParagraph>
              </CardBody>
            </CardWrapper>
          </Grid>
      );
  }
}

function mapStateToProps({research, answers, locale}) {
  return {
    isLoaded: research.research,
    leaveText: research.leaveText,
    title: research.title,
    isFetching: answers.isFetching,
    answers,
    translate: getTranslate(locale),
    currentLanguage: getActiveLanguage(locale).code,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    submitAnswers
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPage)
