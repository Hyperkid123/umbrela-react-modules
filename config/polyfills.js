'use strict';
import raf from './rafPolyfill';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
var jsdom = require('jsdom');
const { JSDOM } = jsdom;

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
  const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;
  global.document = document;
  global.window = document.defaultView;
  global.navigator = {
    userAgent: 'node.js'
  };
  Enzyme.configure({ adapter: new Adapter() }); 
}
