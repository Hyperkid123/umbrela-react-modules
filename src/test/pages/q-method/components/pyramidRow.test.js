import React from 'react'
import PyramidRow from '../../../../pages/q-method/components/pyramidRow';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import { createMuiTheme } from 'material-ui/styles';

describe('Q-method navigation component', () => {
  it('should render correclty' , () => {
      const tree = shallow(
        <PyramidRow blocks={5} changeTiles={jest.fn()} rowIndex={1}/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });

  it('should call functions on click', () => {
    const changeTiles = jest.fn();
    const muiTheme = createMuiTheme()
    const renderer = shallow(<PyramidRow blocks={5} changeTiles={changeTiles} rowIndex={1}/>, {context: {muiTheme}});
    // NOTE: mui-broke full dom renderinf, fix after mui update
    //renderer.find('#increase-blocks-0').simulate('click');
    //expect(changeTiles.mock.calls.length).toEqual(1);
  })
});
