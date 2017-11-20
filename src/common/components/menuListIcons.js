import React from 'react';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import IconButton from 'material-ui/IconButton';
import {
  MenuListIconsContainer,
  MenuItem,
  MenuListLabel,
  Flex,
} from '../styledComponents/containers';
import {DefaultLink} from '../styledComponents/typography';

export const ChevronUp = ({tooltip}) => (
  <IconButton tooltip={tooltip}>
    <ExpandLess />
  </IconButton>
);

export const ChevronDown = ({tooltip}) => (
  <IconButton tooltip={tooltip}>
    <ExpandMore />
  </IconButton>
);

export const MenuListIconsWrapper = ({tooltipUp, tooltipDown}) => (
  <MenuListIconsContainer>
    <ChevronUp tooltip={tooltipUp}/>
    <ChevronDown tooltip={tooltipDown}/>
  </MenuListIconsContainer>
)

export const MenuListItem = ({link, label}) => (
    <MenuItem>
      <Flex verticalCenter>
        <MenuListLabel>
          <DefaultLink href={link}>{label}</DefaultLink>
        </MenuListLabel>
        <MenuListIconsWrapper tooltipUp='Up' tooltipDown='Down'/>
      </Flex>
    </MenuItem>
)
