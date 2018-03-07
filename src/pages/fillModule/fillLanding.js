import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getResearchStructure} from '../../redux/actions/';
import Loading from '../../common/components/loadingScreen';
import {
  IntroTextParagraph
} from '../../common/styledComponents/typography';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import {
  CardWrapper,
  CardHeader,
  CardBody
} from '../../common/styledComponents/card';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

export class FillLanding extends Component {
    componentDidMount() {
      this.props.getResearchStructure()
    }

    render() {
      if(!this.props.isLoaded) return <Loading/>
      if(!this.props.isLoaded) return <Loading/>
      return (
        <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
          <CardWrapper>
            <CardHeader>
              <h2>{this.props.title}</h2>
            </CardHeader>
            <CardBody>
              <IntroTextParagraph>
                {this.props.introText && this.props.introText.split('\n').map((item, key) => (
                  <span key={key}>{item}<br/></span>
                ))}
              </IntroTextParagraph>
              <Grid container spacing={0} justify='center' direction='row' alignItems='center'>
                <Grid item>
                    <Link to='/fill/0'>
                      <Button raised color='primary'>
                        {this.props.translate('fill.start')}
                      </Button>
                    </Link>
                </Grid>
              </Grid>
            </CardBody>
          </CardWrapper>
        </Grid>
      );
    }
}

function mapStateToProps({research, filters, locale}) {
  return {
    isLoaded: research.research,
    introText: research.introText,
    title: research.title,
    filters: filters,
    translate: getTranslate(locale),
    currentLanguage: getActiveLanguage(locale).code,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getResearchStructure
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FillLanding)
