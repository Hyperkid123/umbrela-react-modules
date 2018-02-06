import React from 'react'
import CloseOptionsEditor, {CloseOptionsEditor as Snapshot} from '../../../../../pages/researchEditorModule/components/options/closeOptionsEditor';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import DndContext from '../../../../../common/components/dndContext';

describe('Options editor component', () => {
  const initialState  = {
    questions: {
      activeQuestion: {
        questionId: 1
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
    let wrapper = shallow(<CloseOptionsEditor store={store}/>);
    expect(wrapper).toBeDefined();
  })
  it('should render correclty with open option' , () => {
      const tree = shallow(
        <Snapshot
          activeQuestion={{questionId: 0}}
          getOptions={jest.fn()}
          options={[
            {optionId: 10, optionOrder: 10},
            {optionId: 1, optionOrder: 1, optionType: 'OpenOption', title: 'foo'}
          ]}
        />
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correclty without open option' , () => {
      const tree = shallow(
        <Snapshot
          activeQuestion={{questionId: 0}}
          getOptions={jest.fn()}
          options={[
            {optionId: 10, optionOrder: 10},
            {optionId: 1, optionOrder: 1, optionType: 'NormalOption', title: 'foo'}
          ]}
        />
      ).dive();
      expect(toJson(tree)).toMatchSnapshot();
  });

  it('should call getOptions before mount on question change', () => {
    const getOptions = jest.fn();
    const wrapper = shallow(<Snapshot activeQuestion={{questionId: 0}} options={[]} getOptions={getOptions}/>);
    expect(getOptions.mock.calls.length).toEqual(1);
    wrapper.instance().componentWillReceiveProps({activeQuestion: {questionId: 2}});
    // NOTE: 2 because function is called before mount and after update
    expect(getOptions.mock.calls.length).toEqual(2);
  })

  it('should call synchronizeOption' , () => {
    const synchronizeOption = jest.fn();
    const wrapper = shallow(
      <Snapshot
        activeQuestion={{questionId: 0, questionType:'CloseQuestion'}}
        options={[]}
        getOptions={jest.fn()}
        synchronizeOption={synchronizeOption}
      />
    );
    wrapper.instance().updateOption({title: 'foo', optionType: 'NormalOption'});
    expect(synchronizeOption.mock.calls.length).toEqual(1);
  })

  it('should call callbacks on for open option', () => {
    const onChange = jest.fn();
    let store = mockStore(initialState);
    const renderer = mount(
      <Provider store={store}>
        <DndContext>
          <Snapshot
            activeQuestion={{questionId: 0, questionType:'CloseQuestion'}}
            options={[
              {
                title: 'f',
                optionType: 'NormalOption',
                optionId: 1,
                optionOrder: 1,
              }
            ]}
            getOptions={jest.fn()}
            synchronizeOption={jest.fn()}
            changeOptionTitle={onChange}
          />
        </DndContext>
      </Provider>
    );
    //renderer.find('input[type="text"]').last().simulate('change', {}, 'foo');
    //expect(onChange.mock.calls.length).toEqual(1);
  })
});