import reducer from '../../../redux/reducers/filterReducer';
import * as types from '../../../redux/actions/actionTypes';

describe('Filter reducer', () => {
  const initialState = null;
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should create correct filter structure', () => {
    const filter2 = [{
      questionId: 3,
      optionId: 999
    }]
    const filter1 = [{
      questionId: 2,
      optionId: 333
    }, {
      questionId: 3,
      optionId: 555
    }]
    const questions = [{
        questionId: 1,
        filters: filter1
      }, {
        questionId: 2,
        filters: filter2
      }, {
        questionId: 3,
        filters: []
      }
    ]
    const sheets = [{
      questions
    }];
    const research = {
      sheets,
    }

    const expectedState =  {
      "filteringOptions": {
        "333": [2],
        "555": [3],
        "999": [3]},
      "filters": {
        "2": [],
        "3": []},
      "questionFilters": {},
      "sourceQuestionMap": {
        "1": [2, 3],
        "2": [3]}
      }
    expect(reducer(initialState, {
      type: types.CREATE_FILTER_STRUCTURE,
      research
    })).toEqual(expectedState)
  });

  it('should mark question as filtered for single close question', () => {
    const filteredState =  {
      "filteringOptions": {
        "333": [2],
        "555": [3],
        "999": [3]
      }, "filters": {
        "2": [],
        "3": []},
    "questionFilters": {},
    "sourceQuestionMap": {
      "1": [2, 3],
      "2": [3]}
    }
    const action = {
      type: types.CLOSE_OPEN_QUESTION_ANSWER,
      payload: {
        checked: true,
        optionId: 333,
        questionId: 1,
      }
    }

    const expectedState =   {
      "filteringOptions": {
        "333": [2],
        "555": [3],
        "999": [3]
      }, "filters": {
        "2": [333],
        "3": []},
      "questionFilters": {},
      "sourceQuestionMap": {
        "1": [2, 3],
        "2": [3]}
      }
    expect(reducer(filteredState, action)).toEqual(expectedState);
  })

  it('should remove filters for single close question', () => {
    const filteredState =  {
      "filteringOptions": {
        "333": [2],
        "555": [3],
        "999": [3]
      }, "filters": {
        "2": [333],
        "3": []},
    "questionFilters": {
      "1": [333]
    },
    "sourceQuestionMap": {
      "1": [2, 3],
      "2": [3]}
    }
    const action = {
      type: types.CLOSE_OPEN_QUESTION_ANSWER,
      payload: {
        checked: false,
        optionId: 333,
        questionId: 1,
      }
    }

    const expectedState =   {
      "filteringOptions": {
        "333": [2],
        "555": [3],
        "999": [3]
      }, "filters": {
        "2": [],
        "3": []},
      "questionFilters": {
        "1": [333]
      },
      "sourceQuestionMap": {
        "1": [2, 3],
        "2": [3]}
      }
    expect(reducer(filteredState, action)).toEqual(expectedState);
  })

  it('should add filter for multi close question', () => {
    const filteredState =  {
      "filteringOptions": {
        "333": [2],
        "555": [3],
        "999": [3]
      }, "filters": {
        "2": [],
        "3": []},
    "questionFilters": {},
    "sourceQuestionMap": {
      "1": [2, 3],
      "2": [3]}
    }
    const action = {
      type: types.CLOSE_MULTI_ANSWER,
      payload: {
        checked: true,
        optionId: 333,
        questionId: 1,
      }
    }

    const expectedState =   {
      "filteringOptions": {
        "333": [2],
        "555": [3],
        "999": [3]
      }, "filters": {
        "2": [333],
        "3": []},
      "questionFilters": {},
      "sourceQuestionMap": {
        "1": [2, 3],
        "2": [3]}
      }
    expect(reducer(filteredState, action)).toEqual(expectedState);
  })

  it('should remove filter for multi close question', () => {
    const filteredState =  {
      "filteringOptions": {
        "333": [2],
        "555": [3],
        "999": [3]
      }, "filters": {
        "2": [333, 999],
        "3": []},
    "questionFilters": {},
    "sourceQuestionMap": {
      "1": [2, 3],
      "2": [3]}
    }
    const action = {
      type: types.CLOSE_MULTI_ANSWER,
      payload: {
        checked: false,
        optionId: 333,
        questionId: 1,
      }
    }

    const expectedState =   {
      "filteringOptions": {
        "333": [2],
        "555": [3],
        "999": [3]
      }, "filters": {
        "2": [999],
        "3": []},
      "questionFilters": {},
      "sourceQuestionMap": {
        "1": [2, 3],
        "2": [3]}
      }
    expect(reducer(filteredState, action)).toEqual(expectedState);
  })
});
