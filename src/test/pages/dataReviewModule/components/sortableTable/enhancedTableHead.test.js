import React from 'react'
import EnhancedTableHead from '../../../../../pages/dataReviewModule/components/sortableTable/enhancedTableHead';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Enhanced table head component', () => {
  const initialProps = {}
  beforeEach(() => {
    initialProps.onRequestSort = jest.fn();
    initialProps.orderBy = 'name';
    initialProps.order = 'asc';
    initialProps.columnData = [{
      id: 1,
      numeric: false,
    }, {
      id: 33,
      numeric: true
    }]
  });

  it('should render correctly', () => {
    const tree = shallow(
      <EnhancedTableHead {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('should call sort', () => {
    const onRequestSort = jest.fn();
    const wrapper = shallow(
      <EnhancedTableHead {...initialProps} onRequestSort={onRequestSort}/>
    )
    wrapper.instance().createSortHandler('foo');
    expect(onRequestSort.mock.calls.length).toEqual(0)
  })
});
