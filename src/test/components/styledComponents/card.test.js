import React from 'react'
import {CardBody, CardHeader, CardWrapper} from '../../../common/styledComponents/card';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Card style components', () => {
  it('should render Card body correctly while in uqestion list', () => {
    const tree = shallow(
      <CardBody questionList>
        <p>foo</p>
      </CardBody>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render Card body correctly with error', () => {
    const tree = shallow(
      <CardBody error>
        <p>foo</p>
      </CardBody>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should render Card header correctly with shadow', () => {
    const shadowTree = shallow(
      <CardHeader transparent>
        <p>foo</p>
      </CardHeader>
    )
    expect(toJson(shadowTree)).toMatchSnapshot();

    const transparentTree = shallow(
      <CardHeader>
        <p>foo</p>
      </CardHeader>
    )
    expect(toJson(transparentTree)).toMatchSnapshot();
  })

  it('should render Card header with ellipsis if as question list', () => {
    const listTree = shallow(
      <CardHeader questionList>
        <p>foo</p>
      </CardHeader>
    )
    expect(toJson(listTree)).toMatchSnapshot();
  })

  it('should render Card wrapper in question list', () => {
    const listTree = shallow(
      <CardWrapper questionList>
        <p>foo</p>
      </CardWrapper>
    )
    expect(toJson(listTree)).toMatchSnapshot();
      const matrixListTree = shallow(
        <CardWrapper questionList matrix>
          <p>foo</p>
        </CardWrapper>
      )
      expect(toJson(matrixListTree)).toMatchSnapshot();
  })

  it('should render Card wrapper in transparent version', () => {
    const listTree = shallow(
      <CardWrapper transparent>
        <p>foo</p>
      </CardWrapper>
    )
    expect(toJson(listTree)).toMatchSnapshot();
  })
});
