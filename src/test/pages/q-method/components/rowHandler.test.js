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
    const renderer = mount(<RowHandler rows={5} addRow={changeRows} removeRow={changeRows}/>);
    renderer.find('button').first().simulate('click');
    expect(changeRows.mock.calls.length).toEqual(1);
    renderer.find('button').last().simulate('click');
    expect(changeRows.mock.calls.length).toEqual(2);
  })
});
