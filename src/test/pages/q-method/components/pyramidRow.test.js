import React from 'react'
import PyramidRow from '../../../../pages/q-method/components/pyramidRow';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import { createMuiTheme } from 'material-ui/styles';

describe('Pyramid row component', () => {
  it('should render correclty' , () => {
      const tree = shallow(
        <PyramidRow blocks={5} changeTiles={jest.fn()} rowIndex={1}/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });

  it('should call functions on click', () => {
    const changeTiles = jest.fn();
    const muiTheme = createMuiTheme()
    const renderer = mount(<PyramidRow blocks={5} changeTiles={changeTiles} rowIndex={0}/>, {context: {muiTheme}});
    let button = renderer.find('button').first();
    button.simulate('click');
    expect(changeTiles.mock.calls.length).toEqual(1);
    button = renderer.find('button').last();
    button.simulate('click');
    expect(changeTiles.mock.calls.length).toEqual(2);
  })
});
