import React from 'react'
import {LegendTable} from '../../../../pages/dataReviewModule/components/legendTable';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Legend table component', () => {
  const initialProps = {};

  beforeEach(() => {
    initialProps.data = {
      answerCount: 5001,
      respondents: 3899,
      barData: {
        data: {
          labels: ['label1', 'label2'],
          datasets: [{
            backgroundColor: 'red',
            data: [5000, 1]
          }]
        }
      }
    }
    initialProps.translate = jest.fn();
    initialProps.isOptionImage = false;
  });

  it('should render correctly', () => {
    const tree = shallow(
      <LegendTable {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('should update state on show image', () => {
    const wrapper = shallow(
      <LegendTable {...initialProps} isOptionImage={true}/>
    )
    const imageUrl = 'foo.url';
    wrapper.instance().handleShowImage(imageUrl);
    expect(wrapper.state()).toEqual({showImage: true, image: imageUrl});
  });

  it('should update state on image close', () => {
    const wrapper = shallow(
      <LegendTable {...initialProps} isOptionImage={true}/>
    )
    wrapper.instance().handleCloseImage();
    expect(wrapper.state().showImage).toBeFalsy()
  })
});
