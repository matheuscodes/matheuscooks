'use strict';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

import {Homepage} from 'app';
import {createElement} from 'react';
import {render} from 'react-dom';
import {request} from 'app/helpers';
import getLanguage from 'engine/getLanguage';
import translations from 'app/translations';

console.log('apss',translations[getLanguage()],getLanguage())

var renderParent = document.getElementById('mainContainer');

const props = {
  userAgent: navigator.userAgent,
  translations: translations[getLanguage()],
};

let callbacks = {
  context: this,
  '200': (response) => {
    props.translations.recipes = JSON.parse(response.responseText);
    let callbacks = {
      context: this,
      '200': (response) => {
        props.translations.ingredients = JSON.parse(response.responseText);
        render(createElement(Homepage, props), renderParent);
      }
    }
    request(`languages/${getLanguage()}/ingredients.json`,'GET',callbacks).send();
  }
}
request(`languages/${getLanguage()}/recipes.json`,'GET',callbacks).send();
