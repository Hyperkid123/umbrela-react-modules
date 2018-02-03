import React from 'react'
import ImageDropZone, {ImageDropZone as Snapshot} from '../../../../pages/q-method/components/imageDropZone';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'

describe('ImageDropZone component', () => {
  const initialState  = {
    qMethodBuilder: {
      present: {
        images: []
      }
    }
  };

  const mockStore = configureStore();
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<ImageDropZone store={store}/>)
  });

  it('should render correclty' , () => {
      const tree = shallow(
        <Snapshot/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });
});
