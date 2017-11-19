import React,{Component} from 'react';
import '../../common/globalStyles';
import {
  ViewContainer,
  MenuContainer,
  Flex,
  FlexSection,
  MenuList
} from '../../common/styledComponents/containers';
import {BigHeading, MediumHeading, SmallHeading} from '../../common/styledComponents/typography';
import Paper from 'material-ui/Paper';
import { Scrollbars } from 'react-custom-scrollbars';

export default class ResearchEditorModule extends Component {

    render() {
        return (
            <ViewContainer>
              <Flex grow>
                <FlexSection>
                  <Paper rounded={false}>
                    <MenuContainer>
                      <SmallHeading>Research editor component</SmallHeading>
                      <Scrollbars
                        style={{height: 'calc(100vh - 2em - 60px)'}}
                      >
                        <MenuList>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                          <li>test</li>
                        </MenuList>
                      </Scrollbars>
                    </MenuContainer>
                  </Paper>
                </FlexSection>
                <FlexSection>
                  <BigHeading>ResearchEditor component</BigHeading>
                </FlexSection>
                <FlexSection>
                  <MediumHeading>ResearchEditor component</MediumHeading>
                </FlexSection>
              </Flex>
            </ViewContainer>
        );
    }
}
