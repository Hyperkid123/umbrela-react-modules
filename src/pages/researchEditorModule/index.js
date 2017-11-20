import React,{Component} from 'react';
import '../../common/globalStyles';
import {
  ViewContainer,
  MenuContainer,
  Flex,
  FlexSection,
  MenuList,
  MenuItem,
  MenuListLabel
} from '../../common/styledComponents/containers';
import {BigHeading, MediumHeading, SmallHeading} from '../../common/styledComponents/typography';
import Paper from 'material-ui/Paper';
import {MenuListIconsWrapper, MenuListItem} from '../../common/components/menuListIcons';
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
                          <MenuListItem link='#' label='test test test test test test test test test test test test'/>
                          <MenuItem>test</MenuItem>
                          <MenuItem>test</MenuItem>
                          <MenuItem>test</MenuItem>
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
