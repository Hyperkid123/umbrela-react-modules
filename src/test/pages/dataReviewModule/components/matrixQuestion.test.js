import React from 'react'
import MatrixQuestion from '../../../../pages/dataReviewModule/components/matrixQuestion';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Matrix question component', () => {
  const initialProps = {}
  beforeEach(() => {
    initialProps.data = {
      dividedData: [{
        questionTitle: 'title',
        respondents: 100,
        answerCount: 33
      }]
    };
    initialProps.showLegend = true;
    initialProps.chartType = 'PIE_CHART';
    initialProps.question = {}
    initialProps.isOptionImage = false;
  });

  it('should render correctly', () => {
    const tree = shallow(
      <MatrixQuestion {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('should render correctly with images as subquestion', () => {
    const tree = shallow(
      <MatrixQuestion {...initialProps} isOptionImage={true}/>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })
});
