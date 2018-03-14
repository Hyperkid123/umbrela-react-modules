import React from 'react'
import DividePreview from '../../../../../pages/researchEditorModule/components/questions/dividePreview';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Divide Preview component', () => {
  it('should render correctly empty', () => {
    const tree = shallow(
      <DividePreview
        options={[]}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with options', () => {
    const tree = shallow(
      <DividePreview
        options={[{
          optionId: 1,
          title: 'foo'
        }, {
          optionId: 2,
          title: 'foo2'
        }]}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should update points', () => {
    const wrapper = shallow(
      <DividePreview
        options={[{
          optionId: 1,
          title: 'foo'
        }, {
          optionId: 2,
          title: 'foo2'
        }]}
        scalePoints={100}
      />
    );
    wrapper.instance().handleDivideValue(0, 50);
    expect(wrapper.instance().remainingPoints()).toEqual(50);
    wrapper.instance().handleDivideValue(1, 100);
    expect(wrapper.instance().remainingPoints()).toEqual(50);
  });
});
