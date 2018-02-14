import React,{Component} from 'react';
import {
  FillIntroContainer,
  FlexSection,
  Flex
} from '../../common/styledComponents/containers';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getResearchStructure} from '../../redux/actions/';
import Loading from '../../common/components/loadingScreen';
import Paper from 'material-ui/Paper';
import {
  MediumHeading,
  IntroTextParagraph
} from '../../common/styledComponents/typography';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';

export class FillLanding extends Component {
    componentDidMount() {
      this.props.getResearchStructure()
    }

    render() {
      if(!this.props.isLoaded) return <Loading/>
      return (
          <FlexSection style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <FillIntroContainer auto horizontalCenter verticalCenter>
              <Paper style={{padding: 10}} square>
                <MediumHeading>
                  {this.props.title}
                </MediumHeading>
                <IntroTextParagraph>
                  {this.props.introText && this.props.introText.split('\n').map((item, key) => (
                    <span key={key}>{item}<br/></span>
                  ))}
                </IntroTextParagraph>
                <Flex horizontalCenter>
                  <Link to='/fill/0'>
                    <Button raised color='primary'>
                      Vyplnit dotazník
                    </Button>
                  </Link>
                </Flex>
              </Paper>
            </FillIntroContainer>
          </FlexSection>
      );
    }
}

function mapStateToProps({research}) {
  return {
    isLoaded: research.research,
    introText: research.introText,
    title: research.title
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getResearchStructure
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FillLanding)
