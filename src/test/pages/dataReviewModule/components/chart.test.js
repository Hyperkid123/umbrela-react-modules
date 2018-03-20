import React from 'react'
import Chart from '../../../../pages/dataReviewModule/components/chart';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import * as chartTypes from '../../../../common/chartTypes'

describe('Chart component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.data = {};
    initialProps.chartType = 'foo';
    initialProps.showLegend = true;
    initialProps.questionType = 'foo';
    initialProps.question = {}
    initialProps.data = {barData: {}}
  })

  it('should render empty', () => {
    const tree = shallow(
      <Chart {...initialProps}/>
    );
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render open question', () => {
    const tree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.OPEN_QUESTION}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render close question', () => {
    const tree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.CLOSE_MULTI_WITH_OPEN_QUESTION}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render matrix question', () => {
    const tree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.MATRIX_MULTI_IMAGE_QUESTION}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render order question', () => {
    const tree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.DIVIDE_QUESTION}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  })
});
