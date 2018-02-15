import React from 'react';
import {
  MenuItem,
  MenuListLabel,
  Flex,
} from '../../../common/styledComponents/containers';
import {
  NavLink
} from 'react-router-dom';

export const MenuListItem = ({link, label, onClick, active}) => (
  <NavLink to={link} style={{color: 'black'}}>
    <MenuItem active={active} onClick={onClick}>
      <Flex verticalCenter>
        <MenuListLabel>
          <span>{label}</span>
        </MenuListLabel>
      </Flex>
    </MenuItem>
  </NavLink>
)
