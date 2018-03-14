import React from 'react'
import MatrixPreview from '../../../../../pages/researchEditorModule/components/questions/matrixPreview';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Matrix Preview component', () => {
  it('should render correctly empty', () => {
    const tree = shallow(
      <MatrixPreview
        options={[]}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with options', () => {
    const tree = shallow(
      <MatrixPreview
        questionType='MatrixSingleImageQuestion'
        options={[{
          optionType: 'ColumnOption',
          optionId: 0,
        }, {
          optionType: 'RowOption',
          optionId: 1,
        }]}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render checkboxes', () => {
    const tree = shallow(
      <MatrixPreview
        questionType='MatrixMulti'
        options={[{
          optionType: 'ColumnOption',
          optionId: 0,
        }, {
          optionType: 'RowOption',
          optionId: 1,
        }]}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should close image preview on new props', () => {
    const wrapper = shallow(
      <MatrixPreview
        options={[]}
      />
    );
    wrapper.setProps({});
    expect(wrapper.state().modalOpen).toBeFalsy();
  });

  it('should open modal with image preview', () => {
    const wrapper = shallow(
      <MatrixPreview
        options={[]}
      />
    );
    wrapper.instance().handleOpen('foo.png');
    expect(wrapper.state().modalOpen).toBeTruthy();
    expect(wrapper.state().imgSource).toEqual('foo.png');
  })

  it('should close modal with image preview', () => {
    const wrapper = shallow(
      <MatrixPreview
        options={[]}
      />
    );
    wrapper.instance().handleClose();
    expect(wrapper.state().modalOpen).toBeFalsy();
  })
});
