import React from 'react'
import PyramidCreator, {PyramidCreator as Snapshot} from '../../../../pages/q-method/components/pyramidCreator';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'

describe('Q-method navigation component', () => {
  const initialState  = {
    qMethodBuilder: {
      present: {
        rows: [{
          blocks: 1
        },{
          blocks: 3
        }],
      },
      past: [],
      future: [],
    }
  };

  const mockStore = configureStore();
  it('should create component correctly', () => {
    let store = mockStore(initialState);
    let wrapper = shallow(<PyramidCreator store={store}/>);
    expect(wrapper).toBeDefined(); 
  })
  it('should render correclty' , () => {
      const tree = shallow(
        <Snapshot rows={[{blocks: 2}, {blocks: 5}]}/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });
});
