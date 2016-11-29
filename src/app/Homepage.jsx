import React from 'react';
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
      <RecipeGrid />
    );
  }
}


module.exports = module.default = module.Homepage = Homepage;
