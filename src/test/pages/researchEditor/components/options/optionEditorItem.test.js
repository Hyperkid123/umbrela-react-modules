import React from 'react'
import OptionEditorItem, {OptionEditorItem as Snapshot} from '../../../../../pages/researchEditorModule/components/options/optionEditorItem';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'
import DndContext from '../../../../../common/components/dndContext';
import { DragDropContext } from 'react-dnd';


describe('Option editor item component', () => {
  const initialState  = {
    questions: {
      activeQuestion: {
        questionId: 1,
        questionType: 'CloseQuestion'
      }
    },
    options: {
      options: []
    },
    ui: {
      draggingElement: false
    }
  };

  const mockStore = configureStore();
  it('should create component correctly', () => {
    let store = mockStore(initialState);
    let wrapper = shallow(
      <DndContext>
        <OptionEditorItem store={store}/>
      </DndContext>
    );
    expect(wrapper).toBeDefined();
  })
  it('should render correctly', () => {
      const tree = shallow(
        <DndContext>
          <Snapshot
            questionType='CloseQuestion'
            questionId={1}
            option={{optionId: 1, title: 'foo'}}
          />
        </DndContext>
      );
      expect(toJson(tree)).toMatchSnapshot();
  });

  it('should call synchronizeOption', () => {
    const synchronizeOption = jest.fn();
    const wrapper = shallow(
      <Snapshot
        synchronizeOption={synchronizeOption}
        option={{optionId: 1, title: 'foo'}}
        questionType='CloseQuestion'
        questionId={1}
      />, DragDropContext
    );
    wrapper.instance().updateOption({title: 'foo', questionType: 'CloseQuestion', optionType: 'NormalOption'});
    expect(synchronizeOption.mock.calls.length).toEqual(1);
  })
});
