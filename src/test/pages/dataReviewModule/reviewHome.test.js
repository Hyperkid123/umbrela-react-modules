import React from 'react'
import ReviewHome from '../../../pages/dataReviewModule/reviewHome';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Review home component', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <ReviewHome/>
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  })
});
