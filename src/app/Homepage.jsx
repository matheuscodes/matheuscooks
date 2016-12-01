import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {RecipeGrid} from 'app';

/**
 * Root HTML.
 * @author Matheus
 * @since 1.0.0
 */
class Homepage extends React.Component {
  propTypes: {
    userAgent: PropTypes.string
  }

  render() {
    return (
      <MuiThemeProvider>
        <RecipeGrid />
      </MuiThemeProvider>
    );
  }
}


module.exports = Homepage;
