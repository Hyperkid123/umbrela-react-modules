import React from 'react'
import MatrixBody, {MatrixBody as Snapshot} from '../../../../pages/fillModule/components/matrixBody';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Matrix body component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.answers = {};
    initialProps.answerMatrixMulti = jest.fn();
    initialProps.answerMatrixSingle = jest.fn();
    initialProps.questionId = 0;
    initialProps.options = [];
  });

  it('should render correctly empty', () => {
    const tree = shallow(
      <Snapshot {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  const mockStore = configureStore();
  let initialState = {};
  let store;
  beforeEach(() => {
    initialState = {
      answers: {},
      locale: {
        languages: [{
          name: "English",
          code: 'en',
          active: true,
        }],
        translations: {}
      }
    }
  });

  it('should create component correctly', () => {
    store = mockStore(initialState);
    let wrapper = shallow(
      <MatrixBody
        questionId={0}
        store={store}
        options={[]}
      />);
    expect(wrapper).toBeDefined();
  });

  it('should call single answer action', () => {
    const answerMatrixSingle = jest.fn();
    const wrapper = shallow(
      <Snapshot {...initialProps} answerMatrixSingle={answerMatrixSingle}/>
    )
    wrapper.instance().handleMatrixSingleAnswer(1, 10, false)
    expect(answerMatrixSingle).toHaveBeenCalledWith(0, 1, 10, false)
  })

  it('should call multi answer action', () => {
    const answerMatrixMulti = jest.fn();
    const wrapper = shallow(
      <Snapshot {...initialProps} answerMatrixMulti={answerMatrixMulti}/>
    )
    wrapper.instance().handleMatrixMultiAnswer(1, 10, false)
    expect(answerMatrixMulti).toHaveBeenCalledWith(0, 1, 10, false)
  })
  let options = [];
  beforeEach(() => {
    options = [{
      optionId: 0,
      optionType: 'ColumnOption',
      optionTitle: 'option column 0'
    }, {
      optionId: 1,
      optionType: 'ColumnOption',
      optionTitle: 'option column 1'
    }, {
      optionId: 2,
      optionType: 'RowOption',
      optionTitle: 'option row 0'
    }]
  });

  it('should render correctly with options', () => {
    const tree = shallow(
      <Snapshot {...initialProps} options={options}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render correctly with row options as images', () => {
    const tree = shallow(
      <Snapshot
        {...initialProps}
        options={options}
        questionType='MatrixSingleImageQuestion'
      />
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render correctly with checkboxes', () => {
    const tree = shallow(
      <Snapshot
        {...initialProps}
        options={options}
        questionType='MatrixMultiQuestion'
      />
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render correctly with radiobuttons', () => {
    const tree = shallow(
      <Snapshot
        {...initialProps}
        options={options}
        questionType='MatrixSingleQuestion'
      />
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should update state on image preview open', () => {
    const wrapper = shallow(
      <Snapshot {...initialProps}/>
    )
    wrapper.instance().handleOpen('image.foo');
    expect(wrapper.state()).toEqual({
      modalOpen: true,
      previewImage: 'image.foo'
    })
  })

  it('should update state on image preview close', () => {
    const wrapper = shallow(
      <Snapshot {...initialProps}/>
    )
    wrapper.instance().handleClose();
    expect(wrapper.state().modalOpen).toBeFalsy()
  })

  it('should update state on new props', () => {
    const wrapper = shallow(
      <Snapshot {...initialProps}/>
    )
    wrapper.setProps({});
    expect(wrapper.state().modalOpen).toBeFalsy()
  })

  it('should return false answer value if no answers exist', () => {
    const wrapper = shallow(
      <Snapshot {...initialProps}/>
    )
    expect(wrapper.instance().getChecked(0, 0)).toBeFalsy();
  })

  it('should return correct answer value if answers exist', () => {
    const answer = {
      "33": [10, 11, 5]
    }
    const wrapper = shallow(
      <Snapshot {...initialProps} answer={answer}/>
    )
    expect(wrapper.instance().getChecked(0, 0)).toBeFalsy();
    expect(wrapper.instance().getChecked(33, 11)).toBeTruthy();
    expect(wrapper.instance().getChecked(33, -10)).toBeFalsy();
  })
});
