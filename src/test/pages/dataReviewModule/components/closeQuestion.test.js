import React from 'react'
import CloseQuestion from '../../../../pages/dataReviewModule/components/closeQuestion';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Close question component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.data = {
      datasets:[{
        data:[{}]
      }]
    };
    initialProps.chartType = 'PIE_CHART';
    initialProps.showLegend = true;
    initialProps.noAnimation = false;
    initialProps.url = false;
  })

  it('should render correclty', () => {
    const tree = shallow(
      <CloseQuestion {...initialProps}/>
    );
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render correclty with image', () => {
    const tree = shallow(
      <CloseQuestion {...initialProps} url='foo.com'/>
    );
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should update state to show image', () => {
    const wrapper = shallow(
      <CloseQuestion {...initialProps} url='foo.com'/>
    )
    wrapper.instance().handleShowImage();
    expect(wrapper.state().showImage).toBeTruthy()
  })

  it('should update state to hide image', () => {
    const wrapper = shallow(
      <CloseQuestion {...initialProps} url='foo.com'/>
    )
    wrapper.instance().handleCloseImage();
    expect(wrapper.state().showImage).toBeFalsy()
  })
});
