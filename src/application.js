'use strict';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

import {Homepage} from 'app';
import {createElement} from 'react';
import {render} from 'react-dom';

var renderParent = document.getElementById('mainContainer');

const props = {
  userAgent: navigator.userAgent,
};

render(createElement(Homepage, props), renderParent);
