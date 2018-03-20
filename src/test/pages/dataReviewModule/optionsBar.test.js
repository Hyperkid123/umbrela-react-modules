import React from 'react'
import OptionsBar, {OptionsBar as Snapshot} from '../../../pages/dataReviewModule/optionsBar';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'

describe('Research editor landing component', () => {
  it('should render correclty' , () => {
      const tree = shallow(
        <Snapshot translate={jest.fn()}/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });

  const mockStore = configureStore();
  let initialState = {
    ui: {
      hideSheets: false,
      hideQuestions: false,
      hideChartlegend: false,
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

  it('should create component correctly', () => {
    let store = mockStore(initialState);
    let wrapper = shallow(<OptionsBar store={store}/>);
    expect(wrapper).toBeDefined();
  })

  it('should handle menu open correclty' , () => {
      const wrapper = shallow(
        <Snapshot translate={jest.fn()}/>
      );
      wrapper.instance().handleMenuOpen({currentTarget: 'foo'});
      expect(wrapper.state().menuAnchor).toEqual('foo')
  });

  it('should handle menu close correctly', () => {
    const wrapper = shallow(
      <Snapshot translate={jest.fn()}/>
    );
    wrapper.instance().handleMenuClose();
    expect(wrapper.state().menuAnchor).toEqual(null)
  })

  it('should mount correctly', () => {
    const changeChartType = jest.fn();
    const wrapper = mount(
      <Snapshot changeChartType={changeChartType} translate={jest.fn()}/>
    );
    expect(wrapper).toBeDefined()
  })
});
