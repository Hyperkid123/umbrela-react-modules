import React from 'react'
import ResearchContainer, {ResearchContainer as Snapshot} from '../../../pages/dataReviewModule/researchContainer';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('Research container component', () => {
  it('should render empty correctly' , () => {
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

  it('should render correctly with hidden sheets' , () => {
    const tree = shallow(
      <Snapshot
        sheets={[]}
        activeSheet={{}}
        hideSheets={true}
        isFetching={false}
        getSheets={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });


  it('should render correctly while loading sheets' , () => {
    const tree = shallow(
      <Snapshot
        sheets={[]}
        activeSheet={{}}
        hideSheets={false}
        isFetching={true}
        getSheets={jest.fn()}
      />
    ).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });
});
