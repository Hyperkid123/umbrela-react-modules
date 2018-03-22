import React from 'react'
import {
  QuestionListItem,
  ChartContainer,
  PaginationsListItem,
  MatrixTableRow,
  LabelContainer,
  MenuItem,
  MenuContainer,
  FlexSection,
  Flex
} from '../../../common/styledComponents/containers';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Styled containers components', () => {
  it('should render Question list item for matrix question correctly', () => {
    const tree = shallow(
      <QuestionListItem matrix>
        <div>foo</div>
      </QuestionListItem>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('should render Question list item with answer error correctly', () => {
    const tree = shallow(
      <QuestionListItem error>
        <div>foo</div>
      </QuestionListItem>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('should render Chart container for pie chart correctly', () => {
    const tree = shallow(
      <ChartContainer>
        <div>foo</div>
      </ChartContainer>
    )
    expect(toJson(tree)).toMatchSnapshot()
      const pieTree = shallow(
        <ChartContainer pie>
          <div>foo</div>
        </ChartContainer>
      )
      expect(toJson(pieTree)).toMatchSnapshot()
  })

  it('should render Paginations list item with correct collors based on active state', () => {
    const disbaledTree = shallow(
      <PaginationsListItem disabled>
        <div>foo</div>
      </PaginationsListItem>
    )
    expect(toJson(disbaledTree)).toMatchSnapshot()

    const activeTree = shallow(
      <PaginationsListItem active>
        <div>foo</div>
      </PaginationsListItem>
    )
    expect(toJson(activeTree)).toMatchSnapshot()

    const tree = shallow(
      <PaginationsListItem>
        <div>foo</div>
      </PaginationsListItem>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('should render matrix table row with filler cells', () => {
    const tree = shallow(
      <MatrixTableRow>
        <td>foo</td>
        <td>foo</td>
        <td>foo</td>
        <td>foo</td>
        <td>foo</td>
      </MatrixTableRow>
    )
    expect(toJson(tree)).toMatchSnapshot();

    const fillerTree = shallow(
      <MatrixTableRow filler>
        <td>foo</td>
        <td>foo</td>
        <td>foo</td>
        <td>foo</td>
        <td>foo</td>
      </MatrixTableRow>
    )
    expect(toJson(fillerTree)).toMatchSnapshot();
  })

  it('it should render Label container component with left margin', () => {
    const leftTree = shallow(
      <LabelContainer alignRight>
        foo
      </LabelContainer>
    )
    expect(toJson(leftTree)).toMatchSnapshot()
  })

  it('it should render Label container component with error', () => {
    const errorTree = shallow(
      <LabelContainer error>
        foo
      </LabelContainer>
    )
    expect(toJson(errorTree)).toMatchSnapshot()
  })

  it('should render menu item active', () => {
    const activeTree = shallow(
      <MenuItem active>
        foo
      </MenuItem>
    )
    expect(toJson(activeTree)).toMatchSnapshot();
  })


  it('should render menu item dragging', () => {
    const draggingTree = shallow(
      <MenuItem dragging>
        foo
      </MenuItem>
    )
    expect(toJson(draggingTree)).toMatchSnapshot();
  })

  it('should render Menu container full width', () => {
    const tree = shallow(
      <MenuContainer>
        foo
      </MenuContainer>
    )
    expect(toJson(tree)).toMatchSnapshot();

    const fullWidthTree = shallow(
      <MenuContainer fullWidth>
        foo
      </MenuContainer>
    )
    expect(toJson(fullWidthTree)).toMatchSnapshot();
  })

  it('should render Flex section correctly based on props', () => {
    const tree = shallow(
      <FlexSection>
        foo
      </FlexSection>
    )
    expect(toJson(tree)).toMatchSnapshot();

    const minWidthTree = shallow(
      <FlexSection minWidth={33}>
        foo
      </FlexSection>
    )
    expect(toJson(minWidthTree)).toMatchSnapshot();

    const autoHeightTree = shallow(
      <FlexSection autoHeight>
        foo
      </FlexSection>
    )
    expect(toJson(autoHeightTree)).toMatchSnapshot();

    const fullWidthtree = shallow(
      <FlexSection fullWidth>
        foo
      </FlexSection>
    )
    expect(toJson(fullWidthtree)).toMatchSnapshot();
  })

  it('should render Flex component based on props', () => {
    const tree = shallow(
      <Flex>
        foo
      </Flex>
    )
    expect(toJson(tree)).toMatchSnapshot()

    const autoWidthTree = shallow(
      <Flex auto>
        foo
      </Flex>
    )
    expect(toJson(autoWidthTree)).toMatchSnapshot()

    const baselineTree = shallow(
      <Flex baseline>
        foo
      </Flex>
    )
    expect(toJson(baselineTree)).toMatchSnapshot()


    const endTree = shallow(
      <Flex end>
        foo
      </Flex>
    )
    expect(toJson(endTree)).toMatchSnapshot()
  })
});
