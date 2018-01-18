import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Flex, FlexSection} from '../../../common/styledComponents/containers';
import {SmallHeading} from '../../../common/styledComponents/typography';
import Paper from 'material-ui/Paper';
import CollapsibleSection from '../../../common/components/collapsibleSection';

class FiltrationView extends Component {

    render() {
        const {title} = this.props.activeSheet;
        return (
            <Flex>
              <FlexSection fullWidth autoHeight>
                <Paper rounded={false} style={{padding: 10}}>
                  <Flex column>
                    <SmallHeading>{title}</SmallHeading>
                    <CollapsibleSection sectionTitle='test'>
                      <div>
                        sadjasjkdjhsadsdaj
                      </div>
                    </CollapsibleSection>
                  </Flex>
                </Paper>
              </FlexSection>
            </Flex>
        );
    }
}

function mapStateToProps({editor}) {
  return{
    activeSheet: editor.activeSheet
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltrationView)
