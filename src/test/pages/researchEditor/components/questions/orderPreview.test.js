import React from 'react'
import OrderPreview from '../../../../../pages/researchEditorModule/components/questions/orderPreview';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Order Preview component', () => {
    it('should render correctly empty', () => {
      const tree = shallow(
        <OrderPreview
          options={[]}
        />
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should render correctly with options', () => {
      const tree = shallow(
        <OrderPreview
          options={[{
            title: 'foo',
            optionId: 1
          }, {
            title: 'foo2',
            optionId: 2
          }]}
        />
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
    });
});
