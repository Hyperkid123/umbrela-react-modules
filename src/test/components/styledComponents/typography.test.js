import React from 'react'
import {SmallHeading} from '../../../common/styledComponents/typography';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Typography styled components', () => {
  it('should render heading withouth border', () => {

    const tree = shallow(
      <SmallHeading>
        foo
      </SmallHeading>
    )
    expect(toJson(tree)).toMatchSnapshot()

    const noBorderTree = shallow(
      <SmallHeading withouthBorder>
        foo
      </SmallHeading>
    )
    expect(toJson(noBorderTree)).toMatchSnapshot()
  })
});
