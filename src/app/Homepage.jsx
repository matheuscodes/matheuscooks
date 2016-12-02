import React from 'react';
import {white,fullBlack} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {RecipeGrid} from 'app';

const muiTheme = getMuiTheme({
  fontFamily: 'DJBChalkItUp',
  palette: {
    textColor: white,
    canvasColor: fullBlack
  },
});

/**
 * Root HTML.
 * @author Matheus
 * @since 1.0.0
 */
class Homepage extends React.Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <RecipeGrid />
      </MuiThemeProvider>
    );
  }

}

Homepage.propTypes = {
  userAgent: React.PropTypes.string
}

module.exports = Homepage;
