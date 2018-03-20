import React from 'react'
import {DivideQuestion as Snapshot} from '../../../../pages/dataReviewModule/components/divideQuestion';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Divide question component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.data = {
      data:[{
        title: 'foo',
        avg: 77,
        median: 15,
        modus: 3,
        values:[1,2,3,4],
        size: 5
      }]
    };
    initialProps.translate = jest.fn()
  })

  it('should render correctly', () => {
    const tree = shallow(
      <Snapshot {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })
});
