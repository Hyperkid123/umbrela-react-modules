const base = window.base;
const POST = 'POST';
//const DELETE = 'DELETE';
//const GET = 'GET';

export const getSheetsRequest = (researchId) => {
  return fetch(`${base}get-sheets/${researchId}`);
}

export const newSheetRequest = (sheetTitle, researchId) => {
  return fetch(`${base}create-sheet/${researchId}`, {
    method: POST,
    body: JSON.stringify({title: sheetTitle}),
  });
}

export const deleteSheetRequest = (sheetId, researchId) => {
  return fetch(`${base}delete-sheet/${researchId}`, {
    method: POST,
    body: JSON.stringify({sheetId: sheetId}),
  })
}

export const updateSheetRequest = (sheet) => {
  return fetch(`${base}update-sheet/`, {
    method: POST,
    body: JSON.stringify({sheet}),
  })
}

export const remapSheetsRequest = (sheets, researchId) => {
  return fetch(`${base}remap-sheets/${researchId}`, {
    method: POST,
    body: JSON.stringify({sheets}),
  })
}

export const researchStructureRequest = researchId => {
  return fetch(`${base}get-research-structure/${researchId}`)
}

export const submitAnswersRequest = (payload, researchId) => {
  return fetch(`${base}save-session/${researchId}`, {
    method: POST,
    body: JSON.stringify(payload),
  })
}

export const getQuestionsRequest = sheetId => {
  return fetch(`${base}get-questions/${sheetId}`)
}

export const createQuestionRequest = payload => {
  return fetch(`${base}create-question`, {
    method: POST,
    body: JSON.stringify(payload)
  })
}

export const questionStructureRequest = questionId => {
  return fetch(`${base}get-question-structure/${questionId}`)
}

export const deleteQuestionRequest = questionId => {
  return fetch(`${base}delete-question`, {
    method: POST,
    body: JSON.stringify({questionId}),
  })
}

export const synchronizeQuestionRequest = question => {
  return fetch(`${base}synchronize-question`, {
    method: POST,
    body: JSON.stringify({question: {...question}}),
  })
}

export const remapQuestionsRequest = (sheetId, questions) => {
  return fetch(`${base}remap-questions`, {
    method: POST,
    body: JSON.stringify({
      sheetId,
      questions
    }),
  })
}

export const questionAnswersRequest = questionId => {
  return fetch(`${base}get-question-answers/${questionId}`);
}

export const questionOptionsRequest = questionId => {
  return fetch(`${base}get-question-options/${questionId}`);
}

export const questionoptionsFilterRequest = questionId => {
  return fetch(`${base}get-question-options-filter/${questionId}`);
}

export const synchronizeOptionRequest = option => {
  return fetch(`${base}synchronize-option`, {
    method: POST,
    body: JSON.stringify({option}),
  })
}

export const remapOptionsRequest = (questionId, options) => {
  return fetch(`${base}remap-options`, {
    method: POST,
    body: JSON.stringify({
      questionId,
      options
    })
  })
}

export const deleteOptionRequest = option => {
  return fetch(`${base}/delete-option`, {
    method: POST,
    body: JSON.stringify({
      option,
    })
  })
}

export const saveFilterRequest = (optionId, questionId, checked) => {
  return fetch(`${base}/save-filter`, {
    method: POST,
    body: JSON.stringify({
      filterType: 'hide_question',
      optionId,
      questionId,
      checked
    }),
  })
}
