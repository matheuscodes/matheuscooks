import React from 'react';
import {white,fullBlack} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {RecipeGrid} from 'app';

const muiTheme = getMuiTheme({
  fontFamily: 'DJBChalkItUp',
  palette: {
    textColor: white,
    canvasColor: fullBlack,
    primary1Color: fullBlack
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
        <RecipeGrid translations={this.props.translations} />
      </MuiThemeProvider>
    );
  }

}

Homepage.propTypes = {
  userAgent: React.PropTypes.string,
  translations: React.PropTypes.object,
}

module.exports = Homepage;
