import React from 'react'
import EnhancedTable from '../../../../../pages/dataReviewModule/components/sortableTable/enhancedTable';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Enhanced table component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.columnData = {}
    initialProps.footerTitle = 'foo';
    initialProps.answerCount = 33;
    initialProps.data = [{
      name: 'row',
      avg: 11,
      med: 3,
      mod: 13.5
    }, {
      name: 'row 2',
      avg: 111,
      med: 33,
      mod: 130.5
    }]
  });

  it('should render correctly', () => {
    const tree = shallow(
      <EnhancedTable {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('should sort table data to asc', () => {
    const wrapper = shallow(
      <EnhancedTable {...initialProps}/>
    )
    wrapper.setState({order: 'desc'})
    wrapper.instance().handleRequestSort({}, 'name');

    console.log(wrapper.state().date);
    expect(wrapper.state().order).toEqual('asc')
  })

  it('should sort table data to desc', () => {
    const wrapper = shallow(
      <EnhancedTable {...initialProps}/>
    )
    wrapper.setState({order: 'asc'})
    wrapper.instance().handleRequestSort({}, 'name');

    console.log(wrapper.state().date);
    expect(wrapper.state().order).toEqual('desc')
  })
});
