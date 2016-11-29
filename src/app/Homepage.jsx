import React from 'react';

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
      <div style={{margin: '0 0 48pt'}}>
        'This is a test.'
      </div>
    );
  }
}

module.exports = module.default = module.Homepage = Homepage;
