'use strict';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

import Homepage from 'app/Homepage.jsx';
import {createElement} from 'react';
import {render} from 'react-dom';

console.log("Loading");

var renderParent = document.getElementById('mainContainer');

const props = {
  userAgent: navigator.userAgent,
};

render(createElement(Homepage, props), renderParent);

console.log("Loaded");
