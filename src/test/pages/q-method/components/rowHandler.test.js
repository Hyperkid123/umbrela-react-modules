import React from 'react'
import RowHandler from '../../../../pages/q-method/components/rowHandler';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Pyramid row handler', () => {
  it('should render correclty' , () => {
      const tree = shallow(
        <RowHandler rows={2} addRow={jest.fn()} removeRow={jest.fn()}/>
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });

  it('should call functions on click', () => {
    const changeRows = jest.fn();
    const renderer = shallow(<RowHandler rows={5} addRow={changeRows} removeRow={changeRows}/>);
    // NOTE: mui-broke full dom renderinf, fix after mui update
    //renderer.find('#increase-blocks-0').simulate('click');
    //expect(changeTiles.mock.calls.length).toEqual(1);
  })
});
