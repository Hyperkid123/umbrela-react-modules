const base = window.base;
const POST = 'POST';
const DELETE = 'DELETE';
const GET = 'GET';

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

export const remapSheetsRquest = (sheets, researchId) => {
  return fetch(`${base}remap-sheets/${researchId}`, {
    method: POST,
    body: JSON.stringify({sheets}),
  })
}
