import React from 'react'
import SheetMenu, {SheetMenu as Snapshot} from '../../../pages/common/sheetMenu';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Sheet menu component', () => {
  const initialProps = {};
  beforeEach(() => {
    initialProps.sheets = [];
    initialProps.researchId = 0;
    initialProps.activeSheetId = 0;
    initialProps.draggingElement = false;
    initialProps.translate = jest.fn();
    initialProps.createNewSheet = jest.fn();
    initialProps.selectEditorSheet = jest.fn();
    initialProps.dragSheetCard = jest.fn();
    initialProps.remapSheets = jest.fn();
    initialProps.preventDrag = false;
  });

  it('should render correclty empty', () => {
    const tree = shallow(
      <Snapshot {...initialProps}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render loading heading', () => {
    const tree = shallow(
      <Snapshot {...initialProps} sheets={false}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  })

  it('should call dragSheetCard action on move card', () => {
    const dragSheetCard = jest.fn();
    const wrapper = shallow(
      <Snapshot {...initialProps} dragSheetCard={dragSheetCard}/>
    )
    wrapper.instance().moveCard(10, 99);
    expect(dragSheetCard).toHaveBeenCalledWith(10, 99);
  });

  it('should render correclty with draggable menu', () => {
    const sheets = [{
      sheetId: 0,
      title: 'sheet 0'
    }, {
      sheetId: 1,
      title: 'sheet 1'
    }]
    const tree = shallow(
      <Snapshot {...initialProps} sheets={sheets}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correclty with non draggable menu', () => {
    const sheets = [{
      sheetId: 0,
      title: 'sheet 0'
    }, {
      sheetId: 1,
      title: 'sheet 1'
    }]
    const tree = shallow(
      <Snapshot {...initialProps} sheets={sheets} preventDrag={true}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correclty empty withnout new sheet button', () => {
    const tree = shallow(
      <Snapshot {...initialProps} hideNewSheet={true}/>
    )
    expect(toJson(tree)).toMatchSnapshot();
  });
});
