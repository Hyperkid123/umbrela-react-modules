import React from 'react'
import ClosePreview from '../../../../../pages/researchEditorModule/components/questions/closePreview';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Close preview component', () => {
  it('should render correctly empty', () => {
    const tree = shallow(
      <ClosePreview
        options={[]}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly normal options', () => {
    const tree = shallow(
      <ClosePreview
        options={[{
          optionType: 'NormalOption',
          title: 'foo',
          optionId: 1
        }, {
          optionType: 'OpenOption'
        }]}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly open option', () => {
    const tree = shallow(
      <ClosePreview
        options={[{
          optionType: 'NormalOption',
          title: 'foo',
          optionId: 1
        }, {
          optionType: 'OpenOption',
        }]}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly image options', () => {
    const tree = shallow(
      <ClosePreview
        questionType='ImageOptionsQuestion'
        options={[{
          optionType: 'NormalOption',
          title: 'foo',
          optionId: 1
        }, {
          optionType: 'OpenOption',
        }]}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly set open answer', () => {
    const wrapper = shallow(
      <ClosePreview
        options={[]}
      />
    );
    wrapper.instance().setOpenAnswer('foo');
    expect(wrapper.state().openAnswer).toEqual('foo');
  });
});
