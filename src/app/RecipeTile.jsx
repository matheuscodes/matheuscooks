import React from 'react';
import {autobind} from 'core-decorators'
import {constants} from 'app/helpers';

import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import OpenInNew from 'material-ui/svg-icons/action/open-in-new';

/**
 * Tile of a recipe.
 * @author Matheus
 * @since 1.0.0
 */
 @autobind
class RecipeTile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {hover:false}
  }

  onMouseEnterHandler() {
    this.setState({
      hover: true
    });
  }

  onMouseLeaveHandler() {
    this.setState({
      hover: false
    });
  }

  render() {
    return (
      <GridTile
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        title={this.state.hover ? this.props.recipeId : undefined}
        actionIcon={
          <IconButton>
            <OpenInNew color="white" />
          </IconButton>
        } >
        <img
          src={[
            constants.image.server,
            'images/recipes/',
            this.props.recipeId,
            constants.image.extension
          ].join('')} />
      </GridTile>
    );
  }
}

RecipeTile.propTypes = {
  recipeId: React.PropTypes.string
}

module.exports = RecipeTile;
