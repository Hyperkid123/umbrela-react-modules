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
    const openTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.OPEN_QUESTION}
      />
    );
    expect(toJson(openTree)).toMatchSnapshot();

    const openImageTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.OPEN_WITH_IMAGE_QUESTIONS}
      />
    );
    expect(toJson(openImageTree)).toMatchSnapshot();
  })

  it('should render close question', () => {
    const closeTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.CLOSE_QUESTION}
      />
    );
    expect(toJson(closeTree)).toMatchSnapshot();

    const closeWithMultiTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.CLOSE_MULTI_QUESTION}
      />
    );
    expect(toJson(closeWithMultiTree)).toMatchSnapshot();

    const closeWithOpenTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.CLOSE_WITH_OPEN_QUESTION}
      />
    );
    expect(toJson(closeWithOpenTree)).toMatchSnapshot();

    const closeMultiWithOpenTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.CLOSE_MULTI_WITH_OPEN_QUESTION}
      />
    );
    expect(toJson(closeMultiWithOpenTree)).toMatchSnapshot();
    //image
    const imageTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.IMAGE_OPTIONS_QUESTION}
      />
    );
    expect(toJson(imageTree)).toMatchSnapshot();

    const imageMultiTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.IMAGE_OPTIONS_MULTI_QUESTION}
      />
    );
    expect(toJson(imageMultiTree)).toMatchSnapshot();

    const imageWithOpenTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.IMAGE_OPTIONS_WITH_OPEN_QUESTION}
      />
    );
    expect(toJson(imageWithOpenTree)).toMatchSnapshot();

    const imageMultiWithOpenTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.IMAGE_OPTIONS_MULTI_WITH_OPEN_QUESTION}
      />
    );
    expect(toJson(imageMultiWithOpenTree)).toMatchSnapshot();
    ///media
    const mediaTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.MEDIA_QUESTION}
      />
    );
    expect(toJson(mediaTree)).toMatchSnapshot();

    const mediaMultiTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.MEDIA_MULTI_QUESTION}
      />
    );
    expect(toJson(mediaMultiTree)).toMatchSnapshot();

    const mediaWithopenTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.MEDIA_WITH_OPEN_QUESTION}
      />
    );
    expect(toJson(mediaWithopenTree)).toMatchSnapshot();

    const mediaMultiWithOpenTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.MEDIA_MULTI_WITH_OPEN_QUESTION}
      />
    );
    expect(toJson(mediaMultiWithOpenTree)).toMatchSnapshot();
  })

  it('should render matrix question', () => {
    const matrixSingleTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.MATRIX_SINGLE_QUESTION}
      />
    );
    expect(toJson(matrixSingleTree)).toMatchSnapshot();

    const matrixMultiTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.MATRIX_MULTI_QUESTION}
      />
    );
    expect(toJson(matrixMultiTree)).toMatchSnapshot();

    const matrixSingleImageTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.MATRIX_SINGLE_IMAGE_QUESTION}
      />
    );
    expect(toJson(matrixSingleImageTree)).toMatchSnapshot();

    const matrixMultiImageTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.MATRIX_MULTI_IMAGE_QUESTION}
      />
    );
    expect(toJson(matrixMultiImageTree)).toMatchSnapshot();
  })

  it('should render order question', () => {
    const tree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.DIVIDE_QUESTION}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();

    const orderTree = shallow(
      <Chart
        {...initialProps}
        questionType={chartTypes.ORDER_QUESTION}
      />
    );
    expect(toJson(orderTree)).toMatchSnapshot();
  })
});
