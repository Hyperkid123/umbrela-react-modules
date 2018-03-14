import React from 'react'
import SheetView, {SheetView as Snapshot} from '../../../../pages/researchEditorModule/components/sheetView';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Sheet View component', () => {
  const initialState  = {
    editor: {
      activeSheet: {
        sheetId: 10
      }
    },
    locale: {
      languages: [{
        name: "English",
        code: 'en',
        active: true,
      }],
      translations: {}
    }
  };

  const mockStore = configureStore();
  it('should create component correctly', () => {
    let store = mockStore(initialState);
    let wrapper = shallow(<SheetView store={store}/>);
    expect(wrapper).toBeDefined();
  });


  it('should render correctly', () => {
    const tree = shallow(
      <Snapshot
        activeSheet={{
          title: 'foo',
        }}
        translate={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with modal', () => {
    const wrapper = shallow(
      <Snapshot
        activeSheet={{
          title: 'foo',
        }}
        translate={jest.fn()}
      />
    );
    wrapper.setState({showDelete: true});
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call delete sheet', () => {
    const deleteSheet = jest.fn();
    const wrapper = shallow(
      <Snapshot
        activeSheet={{
          title: 'foo',
        }}
        translate={jest.fn()}
        deleteSheet={deleteSheet}
      />
    );
    wrapper.instance().handleDeleteSheet();
    expect(deleteSheet.mock.calls.length).toBe(1);
    expect(wrapper.state().open).toBeFalsy();
  })
});
