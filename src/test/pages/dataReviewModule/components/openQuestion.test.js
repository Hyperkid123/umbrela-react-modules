import React from 'react'
import {OpenQuestion} from '../../../../pages/dataReviewModule/components/openQuestion';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Open question component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.data = {
      answers: [{
        shortAnswer: 'foo'
      }, {
        shortAnswer: 'foo2'
      }, {
        shortAnswer: 'foo3'
      }]
    };
    initialProps.question = {};
    initialProps.translate = jest.fn();
  });

  it('should render correctly', () => {
    const tree = shallow(
      <OpenQuestion {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('should update state on answer filter', () => {
    const wrapper = shallow(
      <OpenQuestion {...initialProps}/>
    )
    wrapper.instance().handleSearchChange('2');
    expect(wrapper.state().filterText).toEqual('2');
    expect(wrapper.state().answers).toEqual([{shortAnswer: 'foo2'}]);
  })

  it('should update state on image show', () => {
    const wrapper = shallow(
      <OpenQuestion {...initialProps}/>
    )
    wrapper.instance().handleShowImage();
    expect(wrapper.state().showImage).toBeTruthy()
  })

  it('should update state on image close', () => {
    const wrapper = shallow(
      <OpenQuestion {...initialProps}/>
    )
    wrapper.instance().handleCloseImage();
    expect(wrapper.state().showImage).toBeFalsy()
  })

  it('should change items per page', () => {
    const wrapper = shallow(
      <OpenQuestion {...initialProps}/>
    )
    wrapper.instance().handleItemsPerPageChange({target: {value: 1}})
    expect(wrapper.state().itemsPerPage).toEqual(1)
  })

  it('should update state on page change', () => {
    const wrapper = shallow(
      <OpenQuestion {...initialProps}/>
    )
    wrapper.instance().handlePageClick(1);
    expect(wrapper.state().currentPage).toEqual(1)
  })

  it('should render with image preview', () => {
    const tree = shallow(
      <OpenQuestion {...initialProps} question={{
        url: 'image.com'
      }}/>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('should render extra page number', () => {
    const wrapper = shallow(
      <OpenQuestion {...initialProps}/>
    )
    wrapper.setState({
      answers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      itemsPerPage: 1
    })
    wrapper.setState({currentPage: 5})
    const pageNumbers = wrapper.instance().pageNumbers()
    const expectedNumbers = [1, 2, 3, 5, 8, 9, 10];
    expect(pageNumbers).toEqual(expectedNumbers)
  })

  it('should update state on new props', () => {
    const nextData = {
      answers: []
    }
    const wrapper = shallow(
      <OpenQuestion {...initialProps}/>
    )
    wrapper.setProps({data: nextData})
    expect(wrapper.state().answers).toEqual(nextData.answers);
  })
});
