import React from 'react'
import {Pagination} from '../../../../pages/dataReviewModule/components/pagination';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Pagination component', () => {
  const initialProps = {}

  beforeEach(() => {
    initialProps.pageNumbers = [1, 2, 3];
    initialProps.currentPage = 1;
    initialProps.pageClick = jest.fn();
    initialProps.translate = jest.fn();
  });

  it('should render correctly', () => {
    const tree = shallow(
      <Pagination {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
