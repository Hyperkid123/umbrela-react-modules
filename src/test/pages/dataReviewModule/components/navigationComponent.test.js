import React from 'react'
import {MenuListItem} from '../../../../pages/dataReviewModule/components/navigationComponents';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Menu list item component', () => {
  const initialProps = {};

  beforeEach(() => {
    initialProps.link = 'some/link/somwhere';
    initialProps.label = 'label';
    initialProps.onClick = jest.fn();
    initialProps.active = false;
  });

  it('should render correctly while not active', () => {
    const tree = shallow(
      <MenuListItem {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('should render correctly while active', () => {
    const tree = shallow(
      <MenuListItem {...initialProps} active={true}/>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })
});
