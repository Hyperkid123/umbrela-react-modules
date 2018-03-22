import React from 'react'
import {MenuListItem} from '../../common/components/menuListIcons';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Menu list item components', () => {
  const initialProps = {
    link: '/link',
    label: 'label',
    onClick: jest.fn(),
    sheetId: 0,
    active: false,
    tooltipLabel: 'label',
    dragging: false,
    preventDrag: false,
  };
  it('should render list item', () => {
    const tree = shallow(
      <MenuListItem {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
