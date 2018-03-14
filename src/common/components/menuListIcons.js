import React from 'react';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';
import {
  MenuListIconsContainer,
  MenuItem,
  MenuListLabel,
  MenuItemEllipsisWrapper,
} from '../styledComponents/containers';
import {DefaultLink} from '../styledComponents/typography';
import Tooltip from 'material-ui/Tooltip';

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

export const MenuListItem = ({link, label, onClick, sheetId, active, tooltipLabel, dragging, preventDrag}) => (
        <Tooltip
          title={tooltipLabel}
          enterDelay={500}
          disableTriggerFocus={dragging || preventDrag}
          disableTriggerHover={dragging || preventDrag}
          disableTriggerTouch={dragging || preventDrag}
          placement='top'
        >
          <MenuItem dragging={dragging} data-tip={tooltipLabel} active={active} onClick={() => onClick(sheetId)}>
          <MenuItemEllipsisWrapper verticalCenter>
            <MenuListLabel>
              <DefaultLink href={link}>{label}</DefaultLink>
            </MenuListLabel>
          </MenuItemEllipsisWrapper>
    </MenuItem>
  </Tooltip>
)
