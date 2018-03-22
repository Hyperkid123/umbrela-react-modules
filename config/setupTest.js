import 'raf/polyfill';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;
global.window.base = 'http://localhost:3000/';
global.window.researchId = 1;
global.window.lang = 'en';
//setup for testing scroll to DOM element in sheetFill.test.js
const questionTestElement = global.window.document.createElement('div');
questionTestElement.setAttribute('id', 'question_99');
questionTestElement.scrollIntoView = jest.fn();
global.window.document.getElementsByTagName('body')[0].appendChild(questionTestElement);

//setup for mounting tests
const dataReviewModuleContainer = global.window.document.createElement('div');
dataReviewModuleContainer.setAttribute('id', 'umbrelaDataReview');
global.window.document.getElementsByTagName('body')[0].appendChild(dataReviewModuleContainer);

const fillModuleContainer = global.window.document.createElement('div');
fillModuleContainer.setAttribute('id', 'umbrelaFillModule');
global.window.document.getElementsByTagName('body')[0].appendChild(fillModuleContainer);

const qMethodModuleContainer = global.window.document.createElement('div');
qMethodModuleContainer.setAttribute('id', 'umbrelaQmethod');
global.window.document.getElementsByTagName('body')[0].appendChild(qMethodModuleContainer);

const researchEditorModuleContainer = global.window.document.createElement('div');
researchEditorModuleContainer.setAttribute('id', 'umbrelaResearchEditor');
global.window.document.getElementsByTagName('body')[0].appendChild(researchEditorModuleContainer);
// Fail tests on any warning
console.error = message => {
   throw new Error(message);
};
