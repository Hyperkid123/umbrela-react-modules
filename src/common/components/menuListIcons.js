import React from 'react';
import {
  MenuItem,
  MenuListLabel,
  MenuItemEllipsisWrapper,
} from '../styledComponents/containers';
import {DefaultLink} from '../styledComponents/typography';
import Tooltip from 'material-ui/Tooltip';

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
