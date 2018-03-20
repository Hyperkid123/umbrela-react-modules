import React from 'react'
import ResearchContainer, {ResearchContainer as Snapshot} from '../../../pages/dataReviewModule/researchContainer';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Research container component', () => {
  it('should render empty correclty' , () => {
      const tree = shallow(
        <Snapshot
          sheets={[]}
          activeSheet={{}}
          hideSheets={false}
          isFetching={false}
          getSheets={jest.fn()}
        />
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });

  const mockStore = configureStore();
  let initialState = {
    ui: {
      hideSheets: false,
    },
    editor: {
      sheets: [],
      isFetching: false,
      activeSheet: {}
    }
  };

  it('should create component correctly', () => {
    let store = mockStore(initialState);
    let wrapper = shallow(<ResearchContainer store={store}/>);
    expect(wrapper).toBeDefined();
  })
});
