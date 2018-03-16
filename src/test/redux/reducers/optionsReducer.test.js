import reducer from '../../../redux/reducers/optionsReducer'
import * as types from '../../../redux/actions/actionTypes';

describe('Options reducer', () => {
  let initialState = {}
  beforeAll(() => {
    initialState = {
      options: [],
      isFetching: false,
      failed: false,
      allOptions: {},
      optionsFilters: {}
    }
  })

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set isFetching to true', () => {
    expect(reducer(initialState, {
      type: types.REQUEST_QUESTION_OPTIONS
    })).toEqual({
      ...initialState,
      isFetching: true
    })
  })

  it('should set new question options', () => {
    const options = [{
      title: 'option 1'
    }, {
      title: 'option 2'
    }]
    const expectedState = {
      ...initialState,
      options
    }
    expect(reducer(initialState, {
      type: types.GET_QUESTION_OPTIONS,
      options
    })).toEqual(expectedState)
  })

  it('should change option title', () => {
    const oldOptions = [{
      title: 'dont change'
    }, {
      title: 'change this'
    }]

    const newOptions = [{
      title: 'dont change'
    }, {
      title: 'changed title'
    }]

    const expectedState = {
      ...initialState,
      options: newOptions
    }

    expect(reducer({
      ...initialState,
      options: oldOptions
    }, {
      type: types.CHANGE_OPTION_TITLE,
      payload: {
        optionOrder: 1,
        title: 'changed title'
      }
    })).toEqual(expectedState)
  })

  it('should reorder quesion options', () => {
    const options = [{
      title: 'option 1'
    }, {
      title: 'option 2'
    }, {
      title: 'option 3'
    }]
    const remapedOptions = [{
      title: 'option 3'
    }, {
      title: 'option 2'
    }, {
      title: 'option 1'
    }]
    expect(reducer({
      ...initialState,
      options
    }, {
      type: types.DRAG_OPTION_CARD,
      dragIndex: 0,
      hoverIndex: 2
    })).toEqual({
      ...initialState,
      options: remapedOptions
    })
  })

  it('should register option fetch failed', () => {
    expect(reducer(initialState, {
      type: types.OPTION_FETCH_FAILED
    })).toEqual({
      ...initialState,
      failed: true
    })
  })

  it('should store question options', () => {
    const allOptions = {
      "1": [{}, {}]
    }
    const preLoadedState = {
      ...initialState,
      allOptions
    }
    const newOptions = [{
      title: 'option 1'
    }, {
      title: 'option 2'
    }]
    const expectedState = {
      ...initialState,
      allOptions: {
        ...allOptions,
        "2": newOptions
      }
    }
    expect(reducer(preLoadedState, {
      type: types.STORE_OPTIONS,
      payload: {
        questionId: 2,
        options: newOptions
      }
    })).toEqual(expectedState)
  })

  it('should store new options filter', () => {
    const preLoadedState = {
      ...initialState,
      optionsFilters: {
        foo: 'foo'
      }
    }
    const newFilter = {
      filter: 'filters'
    }
    const expectedState = {
      ...preLoadedState,
      optionsFilters: {
        foo: 'foo',
        filter: 'filters'
      }
    }
    expect(reducer(preLoadedState, {
      type: types.STORE_OPTIONS_FILTERS,
      filters: newFilter
    })).toEqual(expectedState)
  })

  it('should add question to option filter', () => {
    const optionsFilters = {
      "1": [1, 2]
    }
    const expectedState = {
      ...initialState,
      optionsFilters: {
        "1": [1, 2, 3]
      }
    }
    expect(reducer({
      ...initialState,
      optionsFilters
    }, {
      type: types.SWITCH_FILTER,
      payload: {
        checked: false,
        optionId: 1,
        questionId: 3
      }
    })).toEqual(expectedState)
  })

  it('should remove question from option filter', () => {
    const optionsFilters = {
      "1": [1, 2 ,3]
    }
    const expectedState = {
      ...initialState,
      optionsFilters: {
        "1": [1, 2]
      }
    }
    expect(reducer({
      ...initialState,
      optionsFilters
    }, {
      type: types.SWITCH_FILTER,
      payload: {
        checked: true,
        optionId: 1,
        questionId: 3
      }
    })).toEqual(expectedState)
  })
})
